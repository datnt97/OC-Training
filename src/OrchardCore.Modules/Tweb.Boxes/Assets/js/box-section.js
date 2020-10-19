
var sortable = require('sortablejs');
const boxSectionColumn = require('./box-section-column');
var contentItem = require('./content-item');
const contentText = require('./content-text');

sortable.Sortable.create(Sections_widgetTemplatePlaceholder, {
    group: {
        name: 'tweb-section',
        put: [
            'tweb-section', 
            'tweb-column',
            'box-items'
        ]
    },
    handle: '.handle-section',
    animation: 500,
    onStart(evt) {
        contentItem.removeHeight(evt.item.id);
        contentText.hideTextToolAll();
    },
    onEnd(evt) {
        // Save box
        let boxSectionId = $(evt.to).parents('.tweb-section').attr('id');

        // Set height for content has class tweb-element
        contentItem.setHeight(evt.item.id);
        
        // Change input order to save the content item for new list
        contentItem.onChange(evt.item.id, evt.to.id);

        boxSectionColumn.onSave();
    }
});

module.exports = {
};