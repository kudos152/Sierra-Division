miro.onReady(() => {
  // Listen for keyboard events
  miro.addListener(miro.enums.event.KEYDOWN, async (e) => {
    if (e.key === 'x' && e.ctrlKey && e.shiftKey) {
      // Get the currently selected widgets
      const selectedWidgets = await miro.board.selection.get();

      if (selectedWidgets.length === 2) {
        const [widgetA, widgetB] = selectedWidgets;

        // Create links between the widgets
        await createBidirectionalLinks(widgetA, widgetB);
      } else {
        miro.showNotification('Please select exactly two objects.');
      }
    }
  });
});

async function createBidirectionalLinks(widgetA, widgetB) {
  // Create connector from A to B
  await miro.board.widgets.create({
    type: 'LINE',
    startWidgetId: widgetA.id,
    endWidgetId: widgetB.id,
    style: {
      lineColor: '#1a1a1a',
      lineWidth: 2,
      lineStyle: 1
    }
  });

  // Create connector from B to A
  await miro.board.widgets.create({
    type: 'LINE',
    startWidgetId: widgetB.id,
    endWidgetId: widgetA.id,
    style: {
      lineColor: '#1a1a1a',
      lineWidth: 2,
      lineStyle: 1
    }
  });

  miro.showNotification('Objects linked bidirectionally.');
}
