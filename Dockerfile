# To build and run with Docker:
#
#  $ docker build -t simplenote .
#  $ docker run -it --rm -p 3000:3000 simplenote
#
# CMD Startet nur den server

FROM node:latest

RUN mkdir -p /simplenote /home/nodejs && \
    groupadd -r nodejs && \
    useradd -r -g nodejs -d /home/nodejs -s /sbin/nologin nodejs && \
    chown -R nodejs:nodejs /home/nodejs

WORKDIR /simplenote
COPY package.json typings.json /simplenote/
RUN npm install --unsafe-perm=true

COPY . /simplenote
RUN chown -R nodejs:nodejs /simplenote
USER nodejs

CMD npm start
