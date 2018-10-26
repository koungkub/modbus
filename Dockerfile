FROM node:8.12.0-alpine

WORKDIR /app

COPY . /app

RUN yarn install \
  && yarn build \
  && node_modules/.bin/sequelize db:migrate

EXPOSE 3000

CMD ["yarn", "start"]