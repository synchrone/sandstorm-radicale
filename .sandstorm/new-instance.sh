#!/bin/bash

echo "Starting new instance ($SUBAPP)"

FLAG_FILE=/var/action.txt

if [ ! -f $FLAG_FILE ] ; then
    echo $SUBAPP > $FLAG_FILE
fi
/opt/app/.sandstorm/launcher.sh