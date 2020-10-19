import Sortable from 'sortablejs';

import boxSection from './box-section';
import boxSectionChildren from './box-section-children';
import boxSectionColumn from './box-section-column';
import contentItem from './content-item';
import contentText from './content-text';

let title = '<h2><strong>Lorem ipsum dolor sit amet.</strong></h2>',
    paragraph = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at orci nulla. 
        Aenean congue nulla faucibus finibus gravida. Suspendisse dictum, ex quis accumsan tincidunt, 
        nunc nisi volutpat enim, sed efficitur purus dolor vel nisl. Fusce lorem nibh, euismod et faucibus nec, scelerisque et nisi. 
        Vestibulum sagittis diam felis, non aliquam ipsum consectetur ut. Mauris elit ligula, bibendum at faucibus a, gravida sit amet ex. 
        Etiam sagittis nisl tincidunt gravida euismod. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
        In ultricies orci ac ante molestie maximus. Donec dictum semper nulla, sit amet convallis lorem ornare non. 
        In id velit lobortis, ultrices nisl non, laoreet lectus. Proin ultrices sed ex ac tempus. 
        Nulla vulputate turpis at augue sagittis, tempus consectetur lacus porttitor. 
        Praesent mattis vestibulum sem, ac faucibus ipsum posuere sit amet. 
        Vestibulum libero purus, eleifend et molestie a, scelerisque ut diam.`;

function onRemove() {
    $('.remove').click((e) => {
        e.stopPropagation();
        let $this = $(e.target);

        confirmDialog({
            ...$this.data(), callback: function (r) {
                if (r) {        
                    $this.closest('.widget-template').remove();
                    boxSectionColumn.onSave();
                    $(document).trigger('contentpreview:render');
                }
            }
        });
    });
}

function onDragMenuItems() {
    let el = document.getElementById('content-items');
    let sortableMenuItems = Sortable.create(el, {
        group: {
            name: 'content-items',
            pull: 'clone',
            put: false
        },
        handle: '.menu-item',
        animation: 0,
        sort: false,
        onStart(evt) {
            contentText.hideTextToolAll();
        },
        onMove: function (evt) {
            $(evt.dragged).css({
                'list-style-type': 'none'
            });
        },
        onEnd: function (evt) {
            let sectionId = $(evt.to).attr('id'),
                contentType = $(evt.item).data('widget-type'),
                element = evt.item;

            let dropped = $(evt.to).hasClass('tweb-column') ? true : false;

            if (dropped) {
                contentItem.onCreateContentItem(sectionId, contentType, element)
                    .then(data => {
                        const elementId = data;
                        const $element = $("#" + elementId);
                        let sectionId = $element.parents().closest('.tweb-section').attr('id');

                        // Edit style for this content item
                        $element
                            .removeClass('col-md-6 px-1')
                            // .addClass('tweb-element draggable resizable');
                            .addClass('tweb-element');

                        // Initial content item.
                        contentItem.initialContentItem(elementId); 
                    
                        let heightToolbar = null;
                        switch (contentType) {
                            case "Image":
                                const $initalToolbar = $element.find(".media-field-toolbar");
                                heightToolbar = $initalToolbar.outerHeight(true);
                                break;
                            case "Video":
                                heightToolbar = Math.round($element.find(".media-field-toolbar").outerHeight(true));
                                break;
                            case "Title":
                                $element.find('textarea').val(title);

                                // Add trumbowyg editor for content text.
                                contentText.initialTrumbowyg();
                                contentText.initialAction();

                                $element.height('');
                                $element.css({
                                    height: $element.height()
                                });   
                                break;
                            case "Paragraph":
                                $element.find('textarea').val(paragraph);  
                                    
                                // Add trumbowyg editor for content text.
                                contentText.initialTrumbowyg();
                                contentText.initialAction();

                                $element.height('');
                                $element.css({
                                    height: $element.height()
                                });                           
                                break;
                        }

                        initialContentElement(); 

                        boxSectionColumn.initSortableColumn();
                        boxSectionColumn.onSave();

                        setTimeout(() => {
                            // set preview for content
                            contentItem.initPreview(elementId);
                        }, 300);
                        // Save
                        contentItem.saveContentItem(elementId);
                        boxSectionChildren.saveSections(sectionId);

                    })
                    .catch(err => console.log(err));
            }
        }
    });
}

function onDragBoxItems() {
    let el = document.getElementById('box-items');
    let sortableBoxItems = Sortable.create(el, {
        group: {
            name: 'box-items',
            pull: 'clone',
            put: false
        },
        handle: '.box',
        animation: 0,
        sort: false,
        onStart(evt) {
            contentText.hideTextToolAll();
        },
        onClone: function (evt) {

        },
        onMove: function (evt) {
            $(evt.dragged).css({
                'list-style-type': 'none'
            });      
             
            $(document).find('.tweb-column').css({
                height: ''
            });          
        },
        onEnd: function (evt) {
            // Get the data order to create a content box
            let sectionId = $(evt.to).attr('id'),
                contentType = $(evt.item).data('widget-type'),
                boxColumns = $(evt.item).data('number-of-columns'),
                elementId = null;

            let dropped = $(evt.to).hasClass('widget-template-placeholder') ? true : false;

            if (dropped) {
                contentItem.onCreateContentItem(sectionId, contentType, evt.item, boxColumns)
                    .then(data => {
                        elementId = data;

                        // Add content item for this new section
                        boxSectionColumn.initSortableColumn();
                        boxSectionColumn.onSave();

                        // Set number of columns for content box
                        $(`#${elementId}`).find('input[id*="_Box_NumberofColumns_Value"]').val(boxColumns);

                        initialContentBox();
                    });
            }
        }
    });
}

function confirmDialog({ callback, ...options }) {
    const defaultOptions = $('#confirmRemoveModalMetadata').data();
    const { title, message, okText, cancelText, okClass, cancelClass } = $.extend({}, defaultOptions, options);

    $('<div id="confirmRemoveModal" class="modal" tabindex="-1" role="dialog">\
        <div class="modal-dialog modal-dialog-centered" role="document">\
            <div class="modal-content">\
                <div class="modal-header">\
                    <h5 class="modal-title">' + title + '</h5>\
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                        <span aria-hidden="true">&times;</span>\
                    </button>\
                </div>\
                <div class="modal-body">\
                    <p>' + message + '</p>\
                </div>\
                <div class="modal-footer">\
                    <button id="modalOkButton" type="button" class="btn ' + okClass + '">' + okText + '</button>\
                    <button id="modalCancelButton" type="button" class="btn ' + cancelClass + '" data-dismiss="modal">' + cancelText + '</button>\
                </div>\
            </div>\
        </div>\
    </div>').appendTo("body");
    $("#confirmRemoveModal").modal({
        backdrop: 'static',
        keyboard: false
    });

    $("#confirmRemoveModal").on('hidden.bs.modal', function () {
        $("#confirmRemoveModal").remove();
    });

    $("#modalOkButton").click(function () {
        callback(true);
        $("#confirmRemoveModal").modal("hide");
    });

    $("#modalCancelButton").click(function () {
        callback(false);
        $("#confirmRemoveModal").modal("hide");
    });
}

function onDragWidgetItems() {
    let el = document.getElementById('widget-items');
    let sortableWidgetItems = Sortable.create(el, {
        group: {
            name: 'widget-items',
            pull: 'clone',
            put: false
        },
        handle: '.menu-item',
        animation: 0,
        sort: false,
        onStart(evt) {
            contentText.hideTextToolAll();
        },
        onMove: function (evt) {
            $(evt.dragged).css({
                'list-style-type': 'none'
            });
        },
        onEnd: function (evt) {
            let sectionId = $(evt.to).attr('id'),
                contentType = $(evt.item).data('widget-type'),
                element = evt.item;

            let dropped = $(evt.to).hasClass('tweb-column') ? true : false;

            if (dropped) {
                contentItem.onCreateContentItem(sectionId, contentType, element)
                    .then(data => {
                        const elementId = data;
                        const $element = $("#" + elementId);
                        let sectionId = $element.parents().closest('.tweb-section').attr('id');

                        // Edit style for this content item
                        $element
                            .removeClass('col-md-6 px-1')
                            .addClass('tweb-element');

                        // Initial content item.
                        contentItem.initialContentItem(elementId);
                        switch (contentType) {
                            case "ImageContent":
                                let textContents = [...$element.find('textarea')];

                                $(textContents[0]).val(title);
                                $(textContents[1]).val(paragraph);
                                
                                break;
                        }
                        setTimeout(function() {
                            
                            initialContentElement();

                            $element.height('');
                            $element.css({
                                height: $element.height()
                            });
                            boxSectionColumn.initSortableColumn();
                            boxSectionColumn.onSave();

                            // Save
                            contentItem.saveContentItem(elementId);
                            boxSectionChildren.saveSections(sectionId);
                            contentText.hideTextToolAll();
                            // set preview of content
                            contentItem.initPreview(elementId);
                        }, 300);
                }).catch(err => console.log(err));
            }
        }
    });
}

function initialContentElement() {
    // Add the action remove for what the content item has been created.
    onRemove();

    // Show edit tool.
    contentItem.onDisplayTool();  

    // Add trumbowyg editor for content text.
    contentText.initialTrumbowyg();
    contentText.initialAction();  
}

function initialContentBox() {
    // Add remove for the box.
    onRemove();

    // Initial top left for section 
    boxSectionChildren.initalSection();
}

$(document).ready(() => {


    boxSectionColumn.initSortableColumn();

    initialContentElement();
    initialContentBox();

    // Handle create content item 
    onDragBoxItems();
    onDragMenuItems();
    onDragWidgetItems();

    // Add editor for content text
    contentText.initialTrumbowyg();
    contentText.initialAction();
    contentText.hideTextToolAll();

    setTimeout(()=> {
        [...$(document).find('.tweb-element')].map(item => {
            contentItem.initPreview(item.id);
        });
    }, 300);
});

