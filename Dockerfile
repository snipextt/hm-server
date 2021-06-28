FROM node

RUN npm install
RUN npm build:npm

EXPOSE 2002
RUN npm run:npm

