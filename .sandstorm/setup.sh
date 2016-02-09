#!/bin/bash
INF_IT_VER=0.13.1
set -euo pipefail
export DEBIAN_FRONTEND=noninteractive

apt-get update
apt-get install -y nginx uwsgi uwsgi-plugin-python python-virtualenv
service nginx stop
systemctl disable nginx

#configure radicale
mkdir -p /etc/radicale
mkdir -p /var/lib/radicale
ln -sf /opt/app/radicale.config /etc/radicale/config
ln -sf /opt/app/radicale.rights /etc/radicale/rights

echo "Downloading and configuring InfCloud"
curl -s https://www.inf-it.com/InfCloud_$INF_IT_VER.zip > /opt/app/infcloud.zip
unzip -q -n /opt/app/infcloud.zip -d /opt/app
