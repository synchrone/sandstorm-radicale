#!/usr/bin/env python3
import logging
import argparse
from webassets.script import CommandLineEnvironment
from webassets.loaders import PythonLoader

parser = argparse.ArgumentParser(description='Build assets')
parser.add_argument('--loglevel', dest='loglevel', default='DEBUG', help='DEBUG, INFO, WARN, ERROR or CRITICAL')
parser.add_argument('--debug', action='store_true', default=False, help='debug resource pipelining')
parser.add_argument('--reference', action='store_true', default=True, help='Reference resources built from --reference-file')
parser.add_argument('--reference-tmpl', dest='reference_tmpl', default='infcloud/index.html.tmpl', help='The html template to patch with resource links')
parser.add_argument('--reference-output', dest='reference_output', default='infcloud/index.html', help='The html file to output')
parser.add_argument('command', metavar='command', default='build', help='build, watch or clean')
args = parser.parse_args()

# Setup a logger
log = logging.getLogger('webassets')
log.addHandler(logging.StreamHandler())
log.setLevel(logging.__dict__[args.loglevel])

loader = PythonLoader('webassets_config')
assets_env = loader.load_environment()
assets_env.debug = args.debug

cmdenv = CommandLineEnvironment(assets_env, log)
cmdenv.build()

if args.debug:
    print("The following files are produced by assets pipeline:")
    print(assets_env['js'].urls())
    print(assets_env['css'].urls())

if args.command != 'build':
    cmdenv.invoke(args.command, {})

if args.reference:
    index = open(args.reference_tmpl, 'r')
    index_contents = index.read()
    index.close()

    js_prepped = ['<link rel="stylesheet" href="%s" type="text/css" />' % url for url in assets_env['css'].urls()]
    css_prepped = ['<script src="%s" type="text/javascript"></script>' % url for url in assets_env['js'].urls()]
    index_contents = index_contents\
        .replace('<!--JS_ASSETS-->', "\n".join(css_prepped))\
        .replace('<!--CSS_ASSETS-->', "\n".join(js_prepped))

    patched = open(args.reference_output ,'w+')
    patched.write(index_contents)
    patched.close()
