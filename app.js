// app.js

// Wait for the Miro SDK to initialize
miro.onReady(() => {
  // Function to create bidirectional links
  async function createBidirectionalLink() {
    const selectedWidgets = await miro.board.selection.get();

    if (selectedWidgets.length !== 2) {
      miro.showNotification('Please select exactly two objects.');
      return;
    }

    const [widgetA, widgetB] = selectedWidgets;

    // Get the view links for the widgets
    const linkA = widgetA.viewLink;
    const linkB = widgetB.viewLink;

    // Check if the widgets support the 'url' property
    const widgetsToUpdate = [];

    if ('url' in widgetA) {
      widgetsToUpdate.push({
        id: widgetA.id,
        url: linkB,
      });
    } else {
      miro.showNotification('Selected widget A does not support hyperlinks.');
    }

    if ('url' in widgetB) {
      widgetsToUpdate.push({
        id: widgetB.id,
        url: linkA,
      });
    } else {
      miro.showNotification('Selected widget B does not support hyperlinks.');
    }

    if (widgetsToUpdate.length === 0) {
      miro.showError('Neither widget supports hyperlinks.');
      return;
    }

    // Update widgets with the hyperlinks
    await miro.board.widgets.update(widgetsToUpdate);

    miro.showNotification('Bidirectional link created!');
  }

  // Add event listener to the button
  document.getElementById('linkButton').addEventListener('click', createBidirectionalLink);

  // Function to handle keydown events
  function handleKeyDown(event) {
    // For Ctrl + Shift + X
    if (
      (event.ctrlKey || event.metaKey) &&
      event.shiftKey &&
      event.key.toLowerCase() === 'x'
    ) {
      event.preventDefault();
      createBidirectionalLink();
    }
  }

  // Add event listener for keydown events
  document.addEventListener('keydown', handleKeyDown);
});
