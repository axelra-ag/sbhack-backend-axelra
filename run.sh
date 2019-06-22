#!/usr/bin/env bash
if [ -d /home/ubuntu/axelra-backend/node_modules ]
  then
    echo 'Node_modules folder exists'
else
  npm install
fi

pm2 stop axelra-backend
pm2 flush
echo '#############################'
echo 'pPreparing before start is completed.'
echo '#############################'
pm2 restart runserver.json --env prod
pm2 log