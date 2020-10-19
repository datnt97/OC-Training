
module.exports = {
    initalSection: function() {
        var arrWidgetTemplates = $('div[id*="Column_widgetTemplatePlaceholder"]>.tweb-element').toArray();
        arrWidgetTemplates.forEach((widgetTemplate, index) => {
            const contentItemId = $(widgetTemplate).find('.content-item').attr('id');
            $(widgetTemplate).css({
                // top: parseFloat($(`input[id*="${contentItemId}_wTop"]`).val()),
                // left: parseFloat($(`input[id*="${contentItemId}_wLeft"]`).val()),
                // width: parseFloat($(`input[id*="${contentItemId}_wWidth"]`).val()),
                height: parseFloat($(`input[id*="${contentItemId}_wHeight"]`).val())
            });
        });
    },
    
    saveSections: function(sectionId) {
        $(`#${sectionId}`).find('input[id*="Column_wHeight"]').val($(`#${sectionId}`).outerHeight());
    }   
};

