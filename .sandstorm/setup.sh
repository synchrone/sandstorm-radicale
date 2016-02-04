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
unzip -q -o /opt/app/carddavmate.zip -d /opt/app
ln -sf /opt/app/carddav.config.js /opt/app/carddavmate/config.js
sed -i -e 's/block/none/' /opt/app/carddavmate/cache_handler.js
sed -i -e ':a;N;$!ba;s/\/css" \/>\n\t<script/\/css" \/>\n\t<link rel="stylesheet" href="css\/hideresources.css" type="text\/css" \/>\n<script/' /opt/app/carddavmate/index.html

echo "Downloading and configuring CalDavZAP..."
curl -s https://www.inf-it.com/CalDavZAP_$INF_IT_VER.zip > /opt/app/caldavzap.zip
unzip -q -o /opt/app/caldavzap.zip -d /opt/app
ln -sf /opt/app/caldav.config.js /opt/app/caldavzap/config.js
sed -i -e 's/block/none/' /opt/app/caldavzap/cache_handler.js
sed -i -e ':a;N;$!ba;s/\/css" \/>\n\t<script/\/css" \/>\n\t<link rel="stylesheet" href="css\/hideresources.css" type="text\/css" \/>\n<script/' /opt/app/caldavzap/index.html