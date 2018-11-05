FROM node:8.12.0-alpine

WORKDIR /app

COPY . /app

RUN yarn install \
  && yarn build 

EXPOSE 3000
