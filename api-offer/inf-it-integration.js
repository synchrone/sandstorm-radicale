$(function(){
    var subpath = $('<a>').attr('href', globalAccountSettings[0].href)[0].pathname;
    var isCalDav = subpath.indexOf('.ics') > -1;

    var petname = (isCalDav ? 'Cal' : 'Card') + 'DAV Sync';

    var dlg = $('<div>'+
        '<p>For '+petname+' please use this URL:</p>'+
        '<iframe class="url" frameborder="0" allowtransparency="true" seamless />'+
        '<p>Username:</p>'+
        '<div class="iframish">sandstorm</div>'+
        '<p>Password:</p>'+
        '<iframe class="password" frameborder="0" allowtransparency="true" seamless />'+
        '<p><a href="https://help.hover.com/hc/en-us/articles/217282047" target="_blank">How to set up iOS/Android to sync?</a></p>'+
        (isCalDav ? '<p><a href="https://help.hover.com/hc/en-us/articles/217282057" target="_blank">How to set up Mozilla Thunderbird to sync?</a></p>' : '')+
    '</div>');

    dlg.dialog({
        width: "50%",
        dialogClass: 'sandstorm-offer',
        autoOpen: false
    });

    window.addEventListener("message", function(event) {
        if (event.data.error) {
          console.log("ERROR: " + event.data.error);
          return;
        }
        dlg.find(event.data.rpcId)
            .attr('src', event.data.uri);
        dlg.dialog('open');
    });

    var btn = $('<div id="intSync" title="Sync"/>');
    btn.click(function(){
        //separately requesting password to render in a separate iframe
        window.parent.postMessage({renderTemplate: {rpcId: 'iframe.password', template: "$API_TOKEN", petname: petname}}, "*");
        //and the sync URL
        window.parent.postMessage({renderTemplate: {
            rpcId: 'iframe.url',
            template: document.location.protocol+"//$API_HOST"+subpath,
            static: {
                // iOS does unauthenticated requests to api endpoint during settings dialog credential check (?!)
                // so we stub an anonymous response here with hardcoded DAV headers as per RFC4791, Section 5.1
                options: {dav: ["1", "2", "3", "calendar-access", "addressbook", "extended-mkcol"]}
            },
            petname: petname
        }}, "*");
    });
    btn.appendTo('.integration_d');
});

//disable Backspace naviate back, which behaves poorly inside Sandstorm's iframe
$(function(){
    /*
     * this swallows backspace keys on any non-input element.
     * stops backspace -> back
     */
    var rx = /INPUT|SELECT|TEXTAREA/i;

    $(document).bind("keydown keypress", function(e){
        if( e.which == 8 ){ // 8 == backspace
            if(!rx.test(e.target.tagName) || e.target.disabled || e.target.readOnly ){
                e.preventDefault();
            }
        }
    });
});