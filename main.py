# import pydevd
import radicale
from importapp import wsgi_app as importApp
from radicale import config, Application as Radicale

# pydevd.settrace('10.0.2.2', port=9009, stdoutToServer=True, stderrToServer=True, suspend=False)
radicale.log.start()


class RadicaleWithImportSupport(object):
    def __init__(self, radicale, importapp):
        self.radicale = radicale
        self.importapp = importapp

    def __call__(self, environ, start_response):
        prefix = config.get("server", "base_prefix").rstrip('/')
        if environ['PATH_INFO'] in [prefix+'/import', prefix+'/export']:
            radicale.log.LOGGER.debug('Handing over to import app (stripped %s)' % prefix)
            environ['PATH_INFO'] = environ['PATH_INFO'][len(prefix):]
            return self.importapp.__call__(environ, start_response)

        return self.radicale.__call__(environ, start_response)

application = RadicaleWithImportSupport(Radicale(), importApp)
