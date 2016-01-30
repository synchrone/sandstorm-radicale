#!/bin/bash
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

#download and configure CardDavMATE
curl -s https://www.inf-it.com/CardDavMATE_0.13.1.zip > /opt/app/carddavmate.zip
unzip /opt/app/carddavmate.zip -d /opt/app
ln -sf /opt/app/carddav.config.js /opt/app/carddavmate/config.js
sed -i -e 's/block/none/' /opt/app/carddavmate/cache_handler.js

#download and configure CalDavZAP
curl -s https://www.inf-it.com/CalDavZAP_0.13.1.zip > /opt/app/caldavzap.zip
unzip /opt/app/caldavzap.zip -d /opt/app
ln -sf /opt/app/caldav.config.js /opt/app/caldavzap/config.js
sed -i -e 's/block/none/' /opt/app/caldavzap/cache_handler.js