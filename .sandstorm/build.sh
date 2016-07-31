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

# See: https://github.com/synchrone/sandstorm-radicale/issues/21
bash -c "patch -p1 -i /opt/app/issue-21.diff --forward -d $VENV/lib/python3.4/site-packages/; exit 0"

echo "Generating NGINX configs..."
#rebuilding nginx config for dev
sed --expression 's/_subapp_/caldavzap/' /opt/app/nginx.conf.tmpl > /opt/app/caldav.nginx.conf;
sed --expression 's/_subapp_/carddavmate/' /opt/app/nginx.conf.tmpl > /opt/app/carddav.nginx.conf;

cd /opt/app/ && $VENV/bin/python assets.py build $*