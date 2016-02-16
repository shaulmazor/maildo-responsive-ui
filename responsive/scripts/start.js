
//------------------------------------------------------
// loadTemplates
//------------------------------------------------------

function loadTemplates(callback){

    var templatesArr = ["./templates/toolbar.tmpl",
                        "./templates/find-area.tmpl",
                        "./templates/actions.tmpl",
                        "./templates/mail-list.tmpl",
                        "./templates/compose.tmpl",
                        "./templates/mail-viewer.tmpl"];
    load(0);

    function load(i){

        if(i < templatesArr.length){
            $.get(templatesArr[i], function(data, textStatus, XMLHttpRequest){
                var template = XMLHttpRequest.responseText;
                $('.md').append(template);
                load(i+1);
            });
        }else{
            callback();
        }
    }
}


//------------------------------------------------------
// switchTheme
//------------------------------------------------------

function switchTheme(theme) {
    return $.get("./css/" + theme + ".css", function (_css) {
        $("theme-css").remove();
        $('html').removeClass().addClass(theme);
        $(['<style type="text/css" id="theme-css">', _css, '</style>'].join('')).appendTo('head');
    });
}


//------------------------------------------------------
// setDomEvents
//------------------------------------------------------


function setDomEvents() {

    var dialog = new Dialog();

    $(".btn-show-menu").bind( "click", function() {

        if($(".menu").hasClass("open-nav")){
            $(".menu").removeClass("open-nav");
            $(".menu").addClass("close-nav");
        }else{
            $(".menu").removeClass("close-nav");
            $(".menu").addClass("open-nav");

            setTimeout(function(){
                $(".menu").bind( "clickoutside", function() {
                    $(".menu").unbind();
                    $(".menu").removeClass("open-nav");
                    $(".menu").addClass("close-nav");
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
                template:XMLHttpRequest.responseText
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
                        template: XMLHttpRequest.responseText
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
                template: XMLHttpRequest.responseText
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
                        template: XMLHttpRequest.responseText
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
                        template: XMLHttpRequest.responseText,
                        onRender: function(){
                            $('.theme-options input').on('change', function() {
                                var theme = $('input[name=radioTheme]:checked').val();
                                switchTheme(theme);
                            });
                        }
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


