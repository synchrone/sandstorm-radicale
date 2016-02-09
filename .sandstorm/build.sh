#!/bin/bash
set -euo pipefail
VENV=/opt/app/env
if [ ! -d $VENV ] ; then
    virtualenv -p python3 $VENV
else
    echo "$VENV exists, moving on"
fi

if [ -f /opt/app/requirements.txt ] ; then
    $VENV/bin/pip install -r /opt/app/requirements.txt
fi

#rebuilding nginx config for dev
sed --expression 's/_subapp_/caldavzap/' /opt/app/nginx.conf.tmpl > /opt/app/caldav.nginx.conf;
sed --expression 's/_subapp_/carddavmate/' /opt/app/nginx.conf.tmpl > /opt/app/carddav.nginx.conf;
