// Miro app for bidirectional linking
(async () => {
  // Load the Miro SDK
  await miro.onReady(() => {
    miro.board.ui.init({
      extensionPoints: {
        bottomBar: {
          title: 'Link Objects Bidirectionally',
          svgIcon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 3h4v2h-4zm1 7h2v2h-2zm0 7h2v2h-2z"/></svg>',
          onClick: async () => {
            const selectedItems = await miro.board.selection.get();
            
            // Ensure only two items are selected
            if (selectedItems.length === 2) {
              const [itemA, itemB] = selectedItems;
              
              // Create a link from A to B
              await miro.board.links.create({
                startItemId: itemA.id,
                endItemId: itemB.id,
              });
              
              // Create a link from B to A
              await miro.board.links.create({
                startItemId: itemB.id,
                endItemId: itemA.id,
              });

              miro.showNotification('Bidirectional link created successfully!');
            } else {
              miro.showErrorNotification('Please select exactly two items.');
            }
          }
        }
      }
    });
  });
})();
