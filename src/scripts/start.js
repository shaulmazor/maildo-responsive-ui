
//------------------------------------------------------
// loadTemplates
//------------------------------------------------------

function loadTemplates(callback) {

    var templatesList= ["toolbar", "find-area", "actions", "mail-list", "compose", "mail-viewer"];

    for (var i = 0; i < templatesList.length; i++) {
        var name = templatesList[i];
        $('.md').append(templatesArr[name]);
    }

    callback();
}


//------------------------------------------------------
// switchTheme
//------------------------------------------------------

function switchTheme(theme) {

    $('html').removeClass().addClass(theme);
    $('#cssSrc').attr('href', 'css/' + theme + ".css");
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

        dialog.setDialog({
            el: ".btn-move .btn-anchor",
            title: "Move to",
            classname: "folder-list",
            wrapper: "folder-list-wrapper",
            template: templatesArr["folder-list"]
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
        dialog.setDialog({
            el:"#md",
            title:"About",
            classname:"infobox",
            wrapper: "infobox-wrapper",
            template: templatesArr["infobox"]
        });


        setTimeout(function(){
            $(".resources-link").bind( "click", function() {

                dialog.setModalDialog({
                    el: "#md",
                    title:"Resources",
                    classname:"resources",
                    wrapper: "resources-wrapper",
                    template: templatesArr["resources"]
                });
            });
        },500)
    });

    $(".btn-settings").bind( "click", function() {
        dialog.setDialog({
            el:"#md",
            title:"Settings",
            classname:"settings",
            wrapper: "settings-wrapper",
            template: templatesArr["settings"]
        });

        setTimeout(function(){
            $(".settings .lang").bind( "click", function() {
                dialog.setModalDialog({
                    el: "#md",
                    title:"Choose Language",
                    classname:"settings-options",
                    wrapper: "settings-options-wrapper",
                    template: templateArr["language-options"]
                });
            });

            $(".settings .theme").bind( "click", function() {

                dialog.setModalDialog({
                    el: "#md",
                    title:"Choose Theme",
                    classname:"settings-options",
                    wrapper: "settings-options-wrapper",
                    template: templatesArr["theme-options"],
                    onRender: function(){
                        $('.theme-options input').on('change', function() {
                            var theme = $('input[name=radioTheme]:checked').val();
                            switchTheme(theme);
                        });
                    }
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


