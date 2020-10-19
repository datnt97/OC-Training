var sortable = require('sortablejs');
var contentItem = require('./content-item');
const contentText = require('./content-text');

module.exports = {
    initSortableColumn: function () {
        let columnItems = [...document.getElementsByClassName('tweb-column')];
        columnItems.forEach(item => {
            let itemId = $(item).attr('id');
            this.onCreateSortableColumn(itemId);
        });
    },
    onCreateSortableColumn: function (itemId) {
        let el = document.getElementById(itemId);
        sortable.Sortable.create(el, {
            handle: '.handle-element, .handle-section',
            group: {
                name: 'tweb-column',
                put: [
                    'content-items', 
                    'box-items', 
                    'widget-items', 
                    'tweb-section', 
                    'tweb-column'
                ]
            },
            animation: 500, 
            onStart(evt) {                              
                if($(evt.item).hasClass('tweb-section')) contentItem.removeHeight(evt.item.id);
                contentText.hideTextToolAll();
            },
            onMove: function(evt) {  
                $(evt.dragged).css({
                    width: '',
                    height: ''
                });
            },
            onEnd: function(evt) {
                let boxSectionId = $(evt.to).parents('.tweb-section').attr('id'),
                    sectionId = $(evt.to).attr('id'),
                    contentType = "Box",
                    boxColumns = 1,
                    elementDragged = evt.item,
                    columnsId = [];

                if($(evt.to).hasClass('tweb-sections') && $(evt.item).hasClass('tweb-element')) {
                    // Create a new box if dragging to tweb-sections
                    columnsId.push(evt.from.id)
                    contentItem.onCreateContentItem(sectionId, contentType, evt.item, boxColumns) 
                        .then(data => {
                            let sectionId = data,
                                newSection = document.getElementById(sectionId),
                                newColumnsId = [...$(newSection).find('.tweb-column')].map(item => item.id);
                            
                            // Add the dragged item to new section's column.
                            [...$(newSection).find('.tweb-column')].map(item => {      
                                $(item).append(evt.item);
                                contentItem.onChange(evt.item.id, item.id);
                                contentItem.removeHeight(evt.item.id);
                                contentItem.setHeight(evt.item.id);
                            });

                            module.exports.initSortableColumn(); 
                            module.exports.onSave();

                            // Set number of columns for content box
                            $(`#${sectionId}`).find('input[id*="_Box_NumberofColumns_Value"]').val(boxColumns);
                                                        
                        })
                        .catch(err => console.log(err));  
                } else {
                    // Change input order to save the content item for new list
                    contentItem.onChange(evt.item.id, evt.to.id);

                    // Save the height of column has been changes when drag a content.
                    module.exports.onSave();
                }

                if($(elementDragged).hasClass('tweb-element')) {
                    $(elementDragged).css({
                        height: $(elementDragged).height()
                    });
                }
                
            }
        });        
    },

    getHeight(columnId) {
        return new Promise(resolve => {
            let column = document.getElementById(columnId),
                columnHeight = $(column).outerHeight(),
                id = column.dataset.targetId;

            resolve({
                id : id,
                height: columnHeight
            });            
        });
    },

    onSave() {
        let columnsId = [...$('.tweb-column')].map(item => item.id);

        Promise.all(columnsId.map(item => this.getHeight(item)))
            .then(results => {
                results.map(data => {
                    $(`#${data.id}_wHeight`).val(data.height);
                });     
            })
            .catch(err => console.log(err));
    }
}