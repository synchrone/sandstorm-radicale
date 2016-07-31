#!/usr/bin/env bash
## Debug flow:

/opt/app/.sandstorm/build.sh --debug

source /opt/app/env/bin/activate
pip install pydevd

HOME=/var uwsgi \
        --socket /var/run/uwsgi.sock \
        --plugin python3 \
        --virtualenv /opt/app/env \
        --pythonpath /opt/app \
        --wsgi-file /opt/app/main.py \
        --chmod-socket=777 &
UWSGIPID=$!

/usr/sbin/nginx -c /opt/app/${1:-"caldav"}.nginx.conf

kill $UWSGIPID