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

    // Prepare the updates for each widget
    const updates = [];

    // Update widget A
    updates.push(
      miro.board.widgets.update({
        id: widgetA.id,
        clientVisible: true, // Ensure the widget is visible
        url: linkB, // Add hyperlink to widget B
      })
    );

    // Update widget B
    updates.push(
      miro.board.widgets.update({
        id: widgetB.id,
        clientVisible: true,
        url: linkA,
      })
    );

    // Execute the updates
    await Promise.all(updates);

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
