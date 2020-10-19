module.exports = {
    initialTrumbowyg() {
        const btnsDef = {
                return: {
                    dropdown: ['undo', 'redo'],
                    ico: 'undo'
                },
                format: {
                    dropdown: ['strong', 'em', 'del'],
                    ico: 'strong'
                },
                script: {
                    dropdown: ['superscript', 'subscript'],
                    ico: 'superscript'
                },
                align: {
                    dropdown: ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
                    ico: 'justifyLeft'
                },
                order: {
                    dropdown:  ['unorderedList', 'orderedList'],
                    ico: 'unorderedList'
                }
            },
            btns =  [ 
                ['undo', 'redo'],
                ['formatting'],
                ['format'],
                ['script'],
                ['link'],
                // ['insertImage'],
                ['align'],
                ['order'],
                ['horizontalRule'],
                ['removeformat']
            ],
            lang = 'vi';
        var contentsId = [...$(document).find('textarea')].map(item => item.id);

        contentsId.map(id => {
            // See documentation at "https://alex-d.github.io/Trumbowyg/documentation/".
            $(`#${id}`).trumbowyg({
                lang: lang,
                autogrow: true,
                imageWidthModalEdit: true,
                resetCss: true,
                defaultLinkTarget: '_blank',
                btnsDef: btnsDef,
                btns : btns
            });
        });
    },

    initialAction() {
        // let borderColor = $(".trumbowyg-box").first().css('border-color');   
        let borderColor = "rgb(221, 221, 221)";

        $(".trumbowyg-editor").click(function () {
            var $contentElement = $(this).parent().parent();
            var $trumbowBoxElement = $contentElement.find(".trumbowyg-box");
            var $trumbowEditorElement = $contentElement.find(".trumbowyg-editor");
            var $trumbowBtnPanelElement = $contentElement.find(".trumbowyg-button-pane");

            $(this).closest('.tweb-element').css({
                height: ''
            });
            

            module.exports.hideTextToolAll();
            module.exports.showTextTool($trumbowBoxElement, $trumbowBtnPanelElement, $trumbowEditorElement);
        });

        $(".trumbowyg-editor").dblclick(function (e) {
            var $contentElement = $(this).parent().parent();
            // $contentElement.draggable("disable");
            $contentElement.css("cursor", "auto");
        });

        $(".trumbowyg-editor").hover(function () {
            var $trumbowBtnPanelElement = $(this).siblings(".trumbowyg-button-pane");

            if ($trumbowBtnPanelElement.css('visibility') !== 'visible') {
                $(this).css('border-color', borderColor);
            }

            $(this).mouseout(function () {
                let $element = $(this).closest('.tweb-element');
                $(this).css("border-color", "transparent");
                
                $element.css({
                    height: $element.height()
                });
            });
        });


        $(".trumbowyg-editor").mouseup(function () {
            var $contentElement = $(this).parent().parent();
            var $trumbowBoxElement = $contentElement.find(".trumbowyg-box");
            var $trumbowEditorElement = $contentElement.find(".trumbowyg-editor");
            var $trumbowBtnPanelElement = $contentElement.find(".trumbowyg-button-pane");

            module.exports.hideTextToolAll();
            module.exports.showTextTool($trumbowBoxElement, $trumbowBtnPanelElement, $trumbowEditorElement);
        });
    },

    hideTextToolAll() {
        $(".trumbowyg-button-pane").css('visibility', 'hidden');
        $(".trumbowyg-button-pane").css('z-index', '0');
        $(".trumbowyg-box, .image, .video, .navbar-collapse").css("border-color", "transparent");
        $(".media-field-toolbar").css('visibility', 'hidden');
    },
    
    showTextTool($trumbowBoxElement, $trumbowBtnPanelElement, $trumbowEditorElement) {
        const borderColor = "rgb(221, 221, 221)";
        $trumbowBtnPanelElement.css('visibility', 'visible');
        $trumbowBtnPanelElement.css('z-index', '1041');
        $trumbowBoxElement.css('border-color', borderColor);
        $trumbowEditorElement.css("border-color", "transparent");
    }

    
}