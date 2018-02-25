#!/bin/sh
echo Cloning code from https://github.com/akane34/ANG-Taller1-Code.git
git clone -b master https://github.com/akane34/ANG-Taller1-Code.git /app/
mkdir -p /app/node_modules
echo npm install
npm install --prefix /app
echo mongodb start
mongod &
echo nodejs application start
node /app/app.js