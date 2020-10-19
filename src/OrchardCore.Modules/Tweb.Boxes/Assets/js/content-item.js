
module.exports = {    
    initialContentItem: function(elementId) {
        var $element = $(`#${elementId}`);
        let $parentElement = $element.parents().closest('.tweb-column');
        const contentItemId = $element.find('.content-item').attr('id');    

        let top = 0,
            left = 0,
            // width = $parentElement.width(),
            height = contentItemId.includes('_HtmlBodyPart') ? 120 : 400; // Default

        $element.css({
            // top: top,
            // left: left,
            // width: width,
            height: height
        });
    },
    
    onCreateContentItem(sectionId , contentType, element, numberOfColumns) {
        return new Promise((resolve, reject) => {
            let section = document.getElementById(sectionId),
                $section = $(section);
                $bagPart = $section.find(".bagpart-" + $section.attr("id")).length == 0 ? $section : $section.find(`.bagpart-${0}`, $section.attr("id")),
                targetId = $bagPart.attr("id"),
                createContentUrl = $bagPart.data("createcontenturl"),
                flowmetadata = false,
                prefixesName = $bagPart.data("prefixes-name"),
                parentContentType = $bagPart.data("parent-content-type"),
                partName = $bagPart.data("part-name"),
                prefix = guid(),
                contentTypesName = $bagPart.data("contenttypes-name"),
                elementId = null; // Return content item id has been added. 
    
            $.ajax({
                url: `${createContentUrl}?id=${contentType}&prefix=${prefix}&prefixesName=${prefixesName}&contentTypesName=${contentTypesName}&targetId=${targetId}&flowmetadata=${flowmetadata}&parentContentType=${parentContentType}&partName=${partName}&numberOfColumns=${numberOfColumns}`
            }).done(data => {
                var result = JSON.parse(data);
                let elements = $.parseHTML(result.Content),
                    newElement = elements[1];
                
                section.replaceChild(newElement, element);
                elementId = $(newElement).attr('id');
    
                var dom = $(result.Scripts);
                dom.filter("script").each(function () {
                    $.globalEval(
                        this.text || this.textContent || this.innerHTML || ""
                    );
                }); 
    
                resolve(elementId);
    
            }).fail(err => reject(err));
        });
    },

    saveContentItem: function (elementId) {
        const contentItemId = $(`#${elementId}`).find('.content-item').attr('id');
        // $(`input[id*="${contentItemId}_wTop"]`).val(parseFloat(document.getElementById(elementId).style.top));
        // $(`input[id*="${contentItemId}_wLeft"]`).val(parseFloat(document.getElementById(elementId).style.left));
        // $(`input[id*="${contentItemId}_wWidth"]`).val(parseFloat(document.getElementById(elementId).style.width));
        $(`input[id*="${contentItemId}_wHeight"]`).val(parseFloat(document.getElementById(elementId).style.height));
    },

    onChange: (contentItemId, newSectionId) => {
        let dataList = $(`#${newSectionId}`).data(),
            $content = $(`#${contentItemId}`);

        const inputs = $content.hasClass('tweb-element') ? [...$content.find('.view').children('input')] : [...$content.children('input')];

        inputs.map(item => {
            if(item.id.includes('Prefixes')) {
                item.setAttribute('id', dataList.prefixesId);
                item.setAttribute('name', dataList.prefixesName);
            }

            if(item.id.includes('ContentTypes')) {
                item.setAttribute('id', dataList.contenttypesId);
                item.setAttribute('name', dataList.contenttypesName);
            }
        });
    },

    onDisplayTool() {        
        // $('.tweb-element, .trumbowyg-editor').click((e) => {
        //     e.stopPropagation();
        //     module.exports.onHideAllTool();
        //     let $content = $(e.target).parents('.tweb-element'),
        //         contentId = $content.attr('id');
        //     $content.find('.trumbowyg-button-pane, .tool-edit-button-pane').css({
        //         visibility: 'visible'
        //     });
        // });     
    },

    onHideAllTool() {
        // $('.trumbowyg-button-pane, .tool-edit-button-pane').css({
        //     visibility: 'hidden'
        // });
    },

    removeHeight(contentId) {
        let content = document.getElementById(contentId);
        [...$(content).find('.tweb-element')].map(item => {
            $(item).css({
                height: ''
            });
        });
    },

    setHeight(contentId) {
        let content = document.getElementById(contentId);
        [...$(content).find('.tweb-element')].map(item => {
            $(item).css({
                height: $(item).height()
            });
        });
    },

    initPreview(contentId) {
        const content = document.getElementById(contentId);
        [...$(content).find('.content-item')].map(item => {   
            let temp = $(item).clone();             
                                  
            $(content).find('.column-preview').append(temp);
        });
    }
}