import { Anton, Barlow, Sedgwick_Ave } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar/Navbar';
import { Footer } from '@/components/Footer/Footer';

const anton = Anton({
  variable: '--header',
  subsets: ['latin'],
  weight: '400',
});

const barlow = Barlow({
  variable: '--content',
  subsets: ['latin'],
  weight: ['400', '700'],
});

const sedgwickAve = Sedgwick_Ave({
  variable: '--display',
  subsets: ['latin'],
  weight: '400',
});

export const metadata = {
  title: 'Mareld',
  description: 'Tatueringsstudio i Majorna',
};

export default function RootLayout({ children }) {
  return (
    <html lang='sv'>
      <body
        className={`${anton.variable} ${barlow.variable} ${sedgwickAve.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
