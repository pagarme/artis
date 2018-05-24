FROM node:8.11.2-alpine

WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
