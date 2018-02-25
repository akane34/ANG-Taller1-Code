FROM ubuntu:16.04

#install mongodb
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
RUN echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | tee /etc/apt/sources.list.d/10gen.list
RUN apt-get update
RUN dpkg-divert --local --rename --add /sbin/initctl
RUN apt-get install mongodb-10gen
RUN mkdir -p /data/db

#install nodejs
RUN apt-get install -y git
RUN apt-get install -y npm
RUN apt-get install -y nodejs
RUN ln -s /usr/bin/nodejs /usr/bin/node

WORKDIR /app
#RUN git clone -b master https://github.com/akane34/ANG-Taller1-Code.git /app/
#ADD . /app
COPY run_start.sh /app/run_start.sh

RUN chmod 777 /app/run_start.sh
#RUN npm install

EXPOSE 4001 27017
ENTRYPOINT ["/app/run_start.sh"]
CMD ["npm", "start"]