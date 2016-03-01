from webassets import Environment, Bundle
environment = Environment(directory='infcloud', url='/')
environment.register('js', Bundle(
    'cache_handler.js',
    Bundle('lib/jquery-2.1.4.min.js'),
    'lib/jquery.browser.js',
    'lib/jquery.autosize.js',
    'lib/jquery-ui-1.11.4.custom.js',
    'lib/jquery.quicksearch.js',
    'lib/jquery.placeholder-1.1.9.js',
    'lib/jshash-2.2_sha256.js',
    'lib/jquery.tagsinput.js',
    'lib/spectrum.js',
    'lib/fullcalendar.js',
    'lib/jquery-ui-dialog-only.js',
    'common.js',
    'webdav_protocol.js',
    'localization.js',
    'interface.js',
    'vcalendar_rfc_regex.js',
    'vcard_rfc_regex.js',
    'resource.js',
    'vcalendar.js',
    'vtodo.js',
    'lib/rrule.js',
    'addressbook.js',
    'data_process.js',
    'main.js',
    'forms.js',
    'timezones.js',
    'sandstorm-integration.js',
    filters='jsmin', output='compressed.js'
))

environment.register('css', Bundle(
    'css/jquery-ui.custom.css',
    'css/jquery.tagsinput.css',
    'css/spectrum.custom.css',
    'css/default.css',
    'css/fullcalendar.css',
    'css/default_integration.css',
    'css/hideresources.css',
    'css/sandstorm-integration.css',
    filters='cssmin', output='compressed.css'
))
