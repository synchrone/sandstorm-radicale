$(function(){
    var subpath = $('<a>').attr('href', globalAccountSettings[0].href)[0].pathname;
    var isCalDav = subpath.indexOf('.ics') > -1;

    function setupSync(){
        var petname = (isCalDav ? 'Cal' : 'Card') + 'DAV Sync';

        var dlg = $('<div>'+
            '<p>For '+petname+' please use this URL:</p>'+
            '<iframe class="url" frameborder="0" allowtransparency="true" seamless />'+
            '<p>Username:</p>'+
            '<div class="iframish">sandstorm</div>'+
            '<p>Password:</p>'+
            '<iframe class="password" frameborder="0" allowtransparency="true" seamless />'+
            '<p><a href="http://radicale.org/user_documentation/#idstarting-the-client" target="_blank">How to set up my device to synchronize?</a></p>'+
        '</div>');

        dlg.dialog({
            width: "50%",
            dialogClass: 'infIt-dialog',
            modal: true,
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
            // It's important commonParams is the same for both postMessage calls.
            // Sandstorm can generate different tokens for mismatching requests, and
            // api-hash subdomain in iframe.url will not be corresponding to iframe.password
            var commonParams = {
                // iOS does unauthenticated requests to api endpoint during settings dialog credential check (?!)
                // so we stub an anonymous response here with hardcoded DAV headers as per RFC4791, Section 5.1
                unauthenticated: {options: {dav: ["1", "2", "3", "calendar-access", "addressbook", "extended-mkcol"]}},
                petname: petname,
                clipboardButton: 'right'
            };

            //separately requesting password to render in a separate iframe
            window.parent.postMessage({
                renderTemplate: $.extend(commonParams, {
                    rpcId: 'iframe.password',
                    template: "$API_TOKEN"
                })
            }, "*");

            //and the sync URL
            window.parent.postMessage({
                renderTemplate: $.extend(commonParams, {
                    rpcId: 'iframe.url',
                    template: document.location.protocol+"//$API_HOST"+subpath
                })
            }, "*");
        });
        btn.appendTo('.integration_d');
    }

    function setupImport(){
        var dlg = $('<div>'+
            '<h2>Import</h2>'+
            '<p>Please choose an iCal formatted file to import</p>'+
            '<p><input type="file" name="file" /></p>'+
            '<p><span class="status" /></p>'+
            '<h2>Export</h2>'+
            '<p><a href="/radicale/export?path='+encodeURIComponent(subpath)+'">Download the contents</a></p>'+
        '</div>');

        dlg.dialog({
            width: "50%",
            dialogClass: 'infIt-dialog',
            modal: true,
            autoOpen: false
        });

        dlg.find('input[type=file]').change(function(){
            var inputEl = this;
            if(inputEl.files.length < 1){
                return;
            }

            var statusEl = dlg.find('.status');
            function setMessage(text, color){
                statusEl.css('color', color || 'red').text(text)
            }

            var file = inputEl.files[0];

            if(['.vcf','.ics'].indexOf(file.name.substr(file.name.length - 4)) == -1){
                return setMessage('Invalid extension. Please use an .ics or .vcf file');
            }

            var data = new FormData();
            data.append('path', subpath);
            data.append('file', file);
            $.ajax({
                type: 'POST',
                url: '/radicale/import',
                data: data,
                contentType: false,
                processData: false,
                error: function(){
                    setMessage('An error occurred');
                },
                success: function(response){
                    response.imported > 0 ?
                        setMessage(response.imported + ' items successfully imported', 'green'):
                        setMessage('No items were imported', 'black')
                    ;
                },
                beforeSend: function(){
                    inputEl.enabled = false;
                    setMessage('Uploading ...', 'black');
                },
                complete: function(){
                    inputEl.enabled = true;
                }
            });
        });

        var btn = $('<div id="intImport" title="Import"/>');
        btn.click(function(){
            dlg.dialog('open');
        });
        btn.appendTo('.integration_d');
    }

    setupSync();
    setupImport();
});

//disable Backspace navigate back, which behaves poorly inside Sandstorm's iframe
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