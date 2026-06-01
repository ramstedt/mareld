'use client';

import { useEffect, useMemo, useState } from 'react';

const STOCKHOLM_TIME_ZONE = 'Europe/Stockholm';

const formatDate = (date) =>
  date.toLocaleDateString('sv-SE', {
    timeZone: STOCKHOLM_TIME_ZONE,
    year: 'numeric',
    month: 'long',
  });

const formatTime = (date) =>
  date.toLocaleTimeString('sv-SE', {
    timeZone: STOCKHOLM_TIME_ZONE,
    hour: '2-digit',
    minute: '2-digit',
  });

const formatDateTime = (start, end, allDay) => {
  if (allDay) {
    return start.toLocaleDateString('sv-SE', {
      timeZone: STOCKHOLM_TIME_ZONE,
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
  return `${start.toLocaleDateString('sv-SE', {
    timeZone: STOCKHOLM_TIME_ZONE,
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })} • ${formatTime(start)}–${formatTime(end)}`;
};

const buildMonthRange = (viewDate) => {
  const start = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
  const end = new Date(
    viewDate.getFullYear(),
    viewDate.getMonth() + 1,
    0,
    23,
    59,
    59
  );
  return { start, end };
};

const startOfWeek = (date) => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = (day === 0 ? -6 : 1) - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
};

const buildCalendarGrid = (viewDate) => {
  const { start, end } = buildMonthRange(viewDate);
  const gridStart = startOfWeek(start);
  const grid = [];
  const current = new Date(gridStart);

  while (current <= end || current.getDay() !== 1) {
    grid.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  return grid;
};

const getDateKey = (date) =>
  new Intl.DateTimeFormat('sv-SE', {
    timeZone: STOCKHOLM_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);

const parseDateString = (dateString) => {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
};

const normalizeEventTime = (event) => {
  if (event.start?.date) {
    return {
      allDay: true,
      start: parseDateString(event.start.date),
      end: parseDateString(event.end?.date || event.start.date),
    };
  }
  return {
    allDay: false,
    start: new Date(event.start.dateTime),
    end: new Date(event.end.dateTime),
  };
};

export default function TattooerCalendar({ calendarId }) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY;
  const [viewDate, setViewDate] = useState(() => new Date());
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeEvent, setActiveEvent] = useState(null);

  const { start, end } = useMemo(() => buildMonthRange(viewDate), [viewDate]);
  const grid = useMemo(() => buildCalendarGrid(viewDate), [viewDate]);
  const stockholmMonthKey = useMemo(
    () => getDateKey(viewDate).slice(0, 7),
    [viewDate]
  );

  useEffect(() => {
    if (!calendarId || !apiKey) return;

    const fetchEvents = async () => {
      setLoading(true);
      setError('');
      try {
        const url = new URL(
          `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
            calendarId
          )}/events`
        );
        url.searchParams.set('key', apiKey);
        url.searchParams.set('singleEvents', 'true');
        url.searchParams.set('orderBy', 'startTime');
        url.searchParams.set('timeZone', STOCKHOLM_TIME_ZONE);
        url.searchParams.set('timeMin', start.toISOString());
        url.searchParams.set('timeMax', end.toISOString());

        const res = await fetch(url.toString());
        if (!res.ok) throw new Error('Failed to load calendar');
        const data = await res.json();
        setEvents(data.items || []);
      } catch (err) {
        setError(err.message || 'Failed to load calendar');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [calendarId, apiKey, start, end]);

  const eventsByDay = useMemo(() => {
    const map = new Map();
    events.forEach((event) => {
      const { start } = normalizeEventTime(event);
      const key = getDateKey(start);
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(event);
    });
    return map;
  }, [events]);

  if (!calendarId) {
    return (
<></>
    );
  }

  if (!apiKey) {
    return (
<></>
    );
  }

  return (
    <section className='px-[5%] py-12 md:py-16 no-button-style'>
      <div className='container'>
        <div className='mb-4 flex flex-col gap-3 md:mb-6 md:flex-row md:items-center md:justify-between'>
          <h2 className='text-2xl font-bold md:text-4xl'>Kalender</h2>
          <div className='flex items-center gap-2'>
            <button
              type='button'
              className='border border-[color:var(--ink)]/20 px-3 py-2 text-sm text-[var(--ink)] transition-colors hover:bg-[var(--surface-dark)] hover:text-[var(--bone)]'
              onClick={() =>
                setViewDate(
                  new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1)
                )
              }
            >
              Föregående
            </button>
            <button
              type='button'
              className='border border-[color:var(--ink)]/20 px-3 py-2 text-sm text-[var(--ink)] transition-colors hover:bg-[var(--surface-dark)] hover:text-[var(--bone)]'
              onClick={() =>
                setViewDate(
                  new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1)
                )
              }
            >
              Nästa
            </button>
          </div>
        </div>

        <div className='mb-4 text-sm font-semibold uppercase tracking-wide text-[color:var(--ink)]/60'>
          {formatDate(viewDate)}
        </div>

        {error ? (
          <p className='text-sm text-[var(--dusty-rose-clay)]'>{error}</p>
        ) : (
          <div className='relative'>
            <div className='space-y-3 md:hidden min-h-[360px]'>
              {grid.map((date) => {
                const key = getDateKey(date);
                const dayEvents = eventsByDay.get(key) || [];
                const isCurrentMonth = key.slice(0, 7) === stockholmMonthKey;
                if (!dayEvents.length || !isCurrentMonth) return null;

                return (
                  <div
                    key={key}
                    className='border border-[color:var(--ink)]/15 p-3'
                  >
                    <div className='mb-2 text-sm font-semibold'>
                      {date.toLocaleDateString('sv-SE', {
                        timeZone: STOCKHOLM_TIME_ZONE,
                        weekday: 'long',
                        day: 'numeric',
                        month: 'short',
                      })}
                    </div>
                    <div className='space-y-2'>
                      {dayEvents.map((event) => (
                        <button
                          key={event.id}
                          type='button'
                          className='block w-full border border-[color:var(--ink)]/10 px-2 py-2 text-left text-sm transition-colors hover:bg-[color:var(--ink)]/5'
                          onClick={() => setActiveEvent(event)}
                        >
                          {event.summary || 'Bokning'}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
              {!events.length && !loading ? (
                <p className='text-sm text-[color:var(--ink)]/60'>
                  Inga tider denna månad.
                </p>
              ) : null}
            </div>

            <div className='hidden md:grid grid-cols-7 gap-2 min-h-[520px]'>
              {['M', 'T', 'O', 'T', 'F', 'L', 'S'].map((day) => (
                <div
                  key={day}
                  className='text-xs font-semibold text-[color:var(--ink)]/55'
                >
                  {day}
                </div>
              ))}
              {grid.map((date) => {
                const key = getDateKey(date);
                const dayEvents = eventsByDay.get(key) || [];
                const isCurrentMonth = key.slice(0, 7) === stockholmMonthKey;

                return (
                  <div
                    key={key}
                    className={`min-h-[90px] border p-2 text-xs ${
                      isCurrentMonth
                        ? 'border-[color:var(--ink)]/15'
                        : 'border-[color:var(--ink)]/10 text-[color:var(--ink)]/40'
                    }`}
                  >
                    <div className='mb-1 font-semibold'>{date.getDate()}</div>
                    <div className='space-y-1'>
                      {dayEvents.map((event) => (
                        <button
                          key={event.id}
                          type='button'
                          className='block w-full truncate border border-[color:var(--ink)]/10 bg-[color:var(--ink)]/5 px-1 py-0.5 text-left text-[11px] transition-colors hover:bg-[color:var(--ink)]/10'
                          onClick={() => setActiveEvent(event)}
                        >
                          {event.summary || 'Bokning'}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {loading ? (
              <div className='absolute inset-0 flex items-center justify-center bg-[color:var(--bone)]/80 text-sm text-[color:var(--ink)]/70'>
                Laddar kalender…
              </div>
            ) : null}
          </div>
        )}
      </div>

      {activeEvent ? (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-[color:var(--ink)]/50 px-4'>
          <div className='w-full max-w-lg bg-[var(--bone)] p-6 text-[var(--ink)]'>
            <div className='mb-4 flex items-start justify-between gap-4'>
              <h3 className='text-xl font-bold'>{activeEvent.summary}</h3>
              <button
                type='button'
                className='text-sm text-[color:var(--ink)]/60 hover:text-[var(--ink)]'
                onClick={() => setActiveEvent(null)}
              >
                Stäng
              </button>
            </div>
            {(() => {
              const { start: startTime, end: endTime, allDay } =
                normalizeEventTime(activeEvent);
              return (
                <p className='mb-3 text-sm text-[color:var(--ink)]/60'>
                  {formatDateTime(startTime, endTime, allDay)}
                </p>
              );
            })()}
            {activeEvent.description ? (
              <p className='text-sm leading-6 text-[color:var(--ink)]/80'>
                {activeEvent.description}
              </p>
            ) : (
              <p className='text-sm text-[color:var(--ink)]/60'>
                Ingen beskrivning.
              </p>
            )}
          </div>
        </div>
      ) : null}
    </section>
  );
}
