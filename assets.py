#!/usr/bin/env python3
import logging
import argparse
from webassets.script import CommandLineEnvironment
from webassets.loaders import PythonLoader

parser = argparse.ArgumentParser(description='Build assets')
parser.add_argument('--loglevel', dest='loglevel', default='DEBUG', help='DEBUG, INFO, WARN, ERROR or CRITICAL')
parser.add_argument('--debug', action='store_true', help='debug resource pipelining')
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

