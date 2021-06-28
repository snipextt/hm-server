FROM node

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN npm install --production=false
RUN npm build:npm

EXPOSE 2002
RUN npm run:npm

