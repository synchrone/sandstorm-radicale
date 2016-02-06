#!/bin/bash
INF_IT_VER=0.13.1
set -euo pipefail
export DEBIAN_FRONTEND=noninteractive

apt-get update
apt-get install -y nginx libmysqlclient-dev uwsgi uwsgi-plugin-python build-essential python-dev python-virtualenv
service nginx stop
systemctl disable nginx

#configure radicale
mkdir -p /etc/radicale
mkdir -p /var/lib/radicale
mkdir -p /var/log/radicale
ln -sf /opt/app/radicale.config /etc/radicale/config
ln -sf /opt/app/radicale.rights /etc/radicale/rights

echo "Downloading and configuring CardDavMATE"
curl -s https://www.inf-it.com/CardDavMATE_$INF_IT_VER.zip > /opt/app/carddavmate.zip
unzip -q -n /opt/app/carddavmate.zip -d /opt/app
ln -sf /opt/app/carddav.config.js /opt/app/carddavmate/config.js

echo "Downloading and configuring CalDavZAP..."
curl -s https://www.inf-it.com/CalDavZAP_$INF_IT_VER.zip > /opt/app/caldavzap.zip
unzip -q -n /opt/app/caldavzap.zip -d /opt/app
ln -sf /opt/app/caldav.config.js /opt/app/caldavzap/config.js