var globalAccountSettings=[
    {
        href: location.protocol+'//'+location.hostname+
            (location.port ? ':'+location.port: '')+'/radicale/owner/calendar.ics/',
        userAuth: {userName: 'someuser', userPassword: 'somepaswd'},
        timeOut: 90000,
        lockTimeOut: 10000,
        checkContentType: true,
        settingsAccount: true,
        delegation: true,
        hrefLabel: 'Current Grain',
        forceReadOnly: null,
        ignoreAlarms: false,
        backgroundCalendars: []
    }
];
var globalBackgroundSync=true;
var globalSyncResourcesInterval=120000;
var globalEnableRefresh=false;
var globalEnableKbNavigation=true;
var globalInterfaceLanguage='en_US';
var globalInterfaceCustomLanguages=[];
var globalSortAlphabet=' 0123456789'+
    'AÀÁÂÄÆÃÅĀBCÇĆČDĎEÈÉÊËĒĖĘĚFGĞHIÌÍÎİÏĪĮJKLŁĹĽMNŃÑŇOÒÓÔÖŐŒØÕŌ'+
    'PQRŔŘSŚŠȘșŞşẞTŤȚțŢţUÙÚÛÜŰŮŪVWXYÝŸZŹŻŽ'+
    'aàáâäæãåābcçćčdďeèéêëēėęěfgğhiìíîïīįıjklłĺľmnńñňoòóôöőœøõō'+
    'pqrŕřsśšßtťuùúûüűůūvwxyýÿzźżžАБВГҐДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЮЯ'+
    'Ьабвгґдеєжзиіїйклмнопрстуфхцчшщюяь';
var globalSearchTransformAlphabet={
    '[ÀàÁáÂâÄäÆæÃãÅåĀā]': 'a', '[ÇçĆćČč]': 'c', '[Ďď]': 'd',
    '[ÈèÉéÊêËëĒēĖėĘęĚě]': 'e', '[Ğğ]': 'g', '[ÌìÍíÎîİıÏïĪīĮį]': 'i',
    '[ŁłĹĺĽľ]': 'l', '[ŃńÑñŇň]': 'n', '[ÒòÓóÔôÖöŐőŒœØøÕõŌō]': 'o',
    '[ŔŕŘř]': 'r', '[ŚśŠšȘșŞşẞß]': 's', '[ŤťȚțŢţ]': 't',
    '[ÙùÚúÛûÜüŰűŮůŪū]': 'u', '[ÝýŸÿ]': 'y', '[ŹźŻżŽž]': 'z'
};
var globalResourceAlphabetSorting=true;
var globalNewVersionNotifyUsers=null;
var globalDatepickerFirstDayOfWeek=1;
var globalHideInfoMessageAfter=1800;
var globalEditorFadeAnimation=666;
var globalEventStartPastLimit=3;
var globalEventStartFutureLimit=3;
var globalTodoPastLimit=1;
var globalLoadedCalendarCollections=[];
var globalLoadedTodoCollections=[];
var globalActiveCalendarCollections=[];
var globalActiveTodoCollections=[];
var globalActiveView='multiWeek';
var globalOpenFormMode='double';
var globalTodoListFilterSelected=['filterAction', 'filterProgress'];
var globalCalendarStartOfBusiness=8;
var globalCalendarEndOfBusiness=17;
var globalDefaultEventDuration=120;

var globalDisplayHiddenEvents=false;
var globalTimeZoneSupport=true;
var globalTimeZone='Europe/Berlin';
var globalTimeZonesEnabled=[];
var globalRewriteTimezoneComponent=true;
var globalRemoveUnknownTimezone=false;
var globalShowHiddenAlarms=false;
var globalIgnoreCompletedOrCancelledAlarms=true;
var globalMozillaSupport=false;
var globalWeekendDays=[0, 6];
var globalAppleRemindersMode=true;