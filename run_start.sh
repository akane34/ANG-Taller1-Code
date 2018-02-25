#!/bin/sh
git clone -b master https://github.com/akane34/ANG-Taller1-Code.git /app/
npm install
mongod &
npm start