FROM node:alpine

RUN mkdir -p /usr/src/server
WORKDIR /usr/src/server

ARG NODE_ENV
ARG PORT
ARG REDIS

ENV NODE_ENV=$NODE_ENV
ENV PORT=$PORT
ENV REDIS=$REDIS

COPY package.json /usr/src/server/
RUN npm i
COPY . /usr/src/server
EXPOSE 8080

CMD [ "npm", "start" ]

