var Dialog = function(){

    var template;
    var modalMode = false;

    //------------------------------------------------------

    var init = function(){
        $.get("./templates/dialog.tmpl", function(data){
            template = data;
        });
    };

    //------------------------------------------------------

    var setDialog = function(options){

        var el = $(options.el);
        var dialog = el.find(".dialog");

        if(dialog.length > 0){
            dialog.remove();
            modalMode = false;
            $('#md').removeClass("dialog-open-mode");
        }

        $('#md').addClass("dialog-open-mode");
        var newDialog =  $('<div class="dialog"/>').append(template);

        var dialogContainer = newDialog.find(".dialog-container");
        dialogContainer.addClass( options.wrapper);

        dialogContainer.find(".title").html(options.title);

        var dialogInnerContainer = newDialog.find(".dialog-container .dialog-inner-container");
        dialogInnerContainer.html( options.template);

        clickOut(newDialog);
        onClose(newDialog);

        el.append(newDialog);
     };

    //------------------------------------------------------

    var setModalDialog = function(options){

        var el = $(options.el);

        if(el.find(".dialog.modal-mode").length === 0){

            $('#md').addClass("dialog-open-mode");

            modalMode = true;
            var dialog =  $('<div class="dialog modal-mode"/>').append(template);


            var dialogContainer = dialog.find(".dialog-container");
            dialogContainer.addClass( options.wrapper);

            dialogContainer.find(".title").html(options.title);

            var dialogInnerContainer = dialog.find(".dialog-container .dialog-inner-container");
            dialogInnerContainer.html( options.template);


            onClose(dialog);
            el.append(dialog);
        }
    };

    //------------------------------------------------------

    var clickOut =function(dialog){
        setTimeout(function(){
            dialog.bind( "clickoutside", function() {
                if(!modalMode){
                    dialog.remove();
                    $('#md').removeClass("dialog-open-mode");
                }
            });
        },50);
    };

    //------------------------------------------------------

    var onClose =function(dialog){
        dialog.find(".dialog-container .dialog-header .cancel").bind( "click", function(e) {
            dialog.remove();
            modalMode = false;
            e.stopPropagation();
            $('#md').removeClass("dialog-open-mode");
        });
    };


    init();

    return{
        setDialog:setDialog,
        setModalDialog:setModalDialog

    }
};