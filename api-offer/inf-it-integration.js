$(function(){
    var rpcId = "0";
    var subpath = $('<a>').attr('href', globalAccountSettings[0].href)[0].pathname.replace('/radicale','');
    var content = document.location.protocol+"//owner:$API_TOKEN@$API_HOST"+subpath;

    var btn = $('<div id="intSync" title="Sync"/>');
        btn.click(function(){
            window.parent.postMessage({renderTemplate: {rpcId: rpcId, template: content}}, "*");
        });

        btn.appendTo('.integration_d');

    window.addEventListener("message", function(event) {
      if (event.data.rpcId === rpcId) {
        if (event.data.error) {
          console.log("ERROR: " + event.data.error);
        } else {

            var dlg = $('<div><p>For CalDAV\\CardDAV syncing please use this URL:</p><p/><iframe frameborder="0" allowtransparency="true" /></div>');
            dlg.find('iframe').attr("src", event.data.uri);

            dlg.dialog({
                modal: true,
                width: 700,
                dialogClass: 'sandstorm-offer'
            });
        }
      }
    });
});