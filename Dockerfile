FROM alpine

WORKDIR /usr/src/app

RUN apk update && apk add \
bash \
nodejs \
yarn

COPY . .
RUN yarn
RUN yarn run build