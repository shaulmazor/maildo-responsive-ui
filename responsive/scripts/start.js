
//------------------------------------------------------
// loadTemplates
//------------------------------------------------------

function loadTemplates(callback){

    var templatesArr = [
        {
            path:"./templates/toolbar.tmpl",
            domEntry: ".innerContainer"
        },
        {
            path:"./templates/find-area.tmpl",
            domEntry: ".innerContainer"
        },
        {
            path:"./templates/actions.tmpl",
            domEntry: ".innerContainer"
        },
        {
            path:"./templates/mail-list.tmpl",
            domEntry: ".innerContainer"
        },
        {
            path:"./templates/compose.tmpl",
            domEntry: ".innerContainer"
        },
        {
            path:"./templates/mail-viewer.tmpl",
            domEntry: ".innerContainer"
        }
    ];

    load(0);

    function load(i){

        if(i < templatesArr.length){
            $.get(templatesArr[i].path, function(data, textStatus, XMLHttpRequest){
                $(templatesArr[i].domEntry).append(data);
                load(i+1);
            });
        }else{
            callback();
        }
    }
}


//------------------------------------------------------
// setDomEvents
//------------------------------------------------------


function setDomEvents() {

    var dialog = new Dialog();

    $(".btn-show-menu").bind( "click", function() {
        if($(".menuPosition").hasClass("open-nav")){
            $(".menuPosition").removeClass("open-nav");
            $(".menuPosition").addClass("close-nav");
        }else{
            $(".menuPosition").removeClass("close-nav");
            $(".menuPosition").addClass("open-nav");

            setTimeout(function(){
                $(".menuPosition").bind( "clickoutside", function() {
                    $(".menuPosition").unbind();
                    $(".menuPosition").removeClass("open-nav");
                    $(".menuPosition").addClass("close-nav");
                });
            },50);
        }
    });

    $(".actions .chkbox-select").bind( "click", function(event) {

        var target = $(event.target);

        if(target.hasClass("checked")){
            $(".chkbox-select").removeClass("checked");
            $(".select-actions").removeClass("show");
        }else{
            $(".chkbox-select").addClass("checked");
            $(".select-actions").addClass("show");
        }
    });


    $(".mail-list .chkbox-select").bind( "click", function(event) {

        var target = $(event.target);

        if(target.hasClass("checked")){
            target.removeClass("checked");
        }else{
            target.addClass("checked");
        }

        if($(".mail-list .chkbox-select.checked").length == 0){
            $(".select-actions").removeClass("show");
        }else{
            $(".select-actions").addClass("show");
        }
    });

    $(".btn-move").bind( "click", function(e) {

        $.get("./templates/dialogs/folder-list.tmpl", function(data, textStatus, XMLHttpRequest) {
            dialog.setDialog({
                el: ".btn-move .btn-anchor",
                title: "Move to",
                classname: "folder-list",
                wrapper: "folder-list-wrapper",
                template: data
            });
        });
    });

    $(".btn-compose").bind( "click", function() {
        $(".compose-area").addClass("show");
    });

    $(".toolbar .btn-find").bind( "click", function() {

        if($(".find-area").hasClass("show")){
            $(".menuPosition").removeClass("show");
        }else{
            $(".find-area").addClass("show");

            setTimeout(function(){
                $(".find-area").bind( "clickoutside", function() {
                    $(".find-area").unbind();
                    $(".find-area").removeClass("show");
                });
            },50);
        }
    });

    $(".compose-view-close").bind( "click", function() {
        $(".compose-area").removeClass("show");
    });

    $(".btn-info").bind( "click", function() {
        $.get("./templates/dialogs/infobox.tmpl", function(data, textStatus, XMLHttpRequest){
            dialog.setDialog({
                el:"#md",
                title:"About",
                classname:"infobox",
                wrapper: "infobox-wrapper",
                template:data
            });
        });

        setTimeout(function(){
            $(".resources-link").bind( "click", function() {

                $.get("./templates/dialogs/resources.tmpl", function(data, textStatus, XMLHttpRequest){
                    dialog.setModalDialog({
                        el: "#md",
                        title:"Resources",
                        classname:"resources",
                        wrapper: "resources-wrapper",
                        template:data
                    });
                });
            });
        },500)
    });

    $(".btn-settings").bind( "click", function() {
        $.get("./templates/dialogs/settings.tmpl", function(data, textStatus, XMLHttpRequest){
            dialog.setDialog({
                el:"#md",
                title:"Settings",
                classname:"settings",
                wrapper: "settings-wrapper",
                "template":data
            });
        });

        setTimeout(function(){
            $(".lang-panel").bind( "click", function() {

                $.get("./templates/dialogs/language-options.tmpl", function(data, textStatus, XMLHttpRequest){
                    dialog.setModalDialog({
                        el: "#md",
                        title:"Choose Language",
                        classname:"settings-options",
                        wrapper: "settings-options-wrapper",
                        template: data
                    });
                });
            });

            $(".theme-panel").bind( "click", function() {

                $.get("./templates/dialogs/theme-options.tmpl", function(data, textStatus, XMLHttpRequest){
                    dialog.setModalDialog({
                        el: "#md",
                        title:"Choose Theme",
                        classname:"settings-options",
                        wrapper: "settings-options-wrapper",
                        template: data
                    });
                });
            });

        },500);
    });

    $(".mail .content").bind("click", function(){
        $("#md").addClass("mail-viewer-mode");
        $("item-total").addClass("hide");
        $("item-total").addClass("show");
    });

    $(".btn-back").bind("click", function(){
        $("#md").removeClass("mail-viewer-mode");
    });

}

//------------------------------------------------------
// onDomReady
//------------------------------------------------------

$( document).ready(function() {
    loadTemplates(function(){
        setDomEvents();
    });
});


