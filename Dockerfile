FROM node:14-alpine

RUN mkdir /app
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build:npm

EXPOSE 2002
CMD npm run start:npm

