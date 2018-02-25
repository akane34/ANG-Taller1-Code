#!/bin/sh
git clone -b master https://github.com/akane34/ANG-Taller1-Code.git /app/
mkdir -p /app/node_modules
npm install --prefix /app
mongod &
node /app/app.js