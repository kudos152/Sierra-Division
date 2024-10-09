miro.onReady(() => {
    miro.addListener(miro.enums.event.SELECTION_UPDATED, async (event) => {
        const selectedWidgets = event.data;
        if (selectedWidgets.length == 2) {
            let widgetA = selectedWidgets[0];
            let widgetB = selectedWidgets[1];

            // Get widget IDs and generate links
            let linkA = `https://miro.com/app/board/${miro.board.id}/?moveToWidget=${widgetA.id}`;
            let linkB = `https://miro.com/app/board/${miro.board.id}/?moveToWidget=${widgetB.id}`;

            // Update widget A to link to widget B
            await miro.board.widgets.update({
                id: widgetA.id,
                text: `${widgetA.text}\n\n[Link to B](${linkB})`
            });

            // Update widget B to link to widget A
            await miro.board.widgets.update({
                id: widgetB.id,
                text: `${widgetB.text}\n\n[Link to A](${linkA})`
            });

            miro.showNotification('Objects linked bi-directionally');
        }
    });
});