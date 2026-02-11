const singletonTypes = new Set(['landingPage', 'footer', 'settings']);

export const structure = (S) => {
  const singletonItems = [
    S.listItem()
      .title('Landing Page')
      .id('landingPage')
      .child(S.document().schemaType('landingPage').documentId('landingPage')),
    S.listItem()
      .title('Footer')
      .id('footer')
      .child(S.document().schemaType('footer').documentId('footer')),
    S.listItem()
      .title('Settings')
      .id('settings')
      .child(S.document().schemaType('settings').documentId('settings')),
  ];

  const documentTypeListItems = S.documentTypeListItems().filter(
    (listItem) => !singletonTypes.has(listItem.getId())
  );

  return S.list()
    .title('Content')
    .items([...singletonItems, S.divider(), ...documentTypeListItems]);
};

export const singletonTypesList = Array.from(singletonTypes);
