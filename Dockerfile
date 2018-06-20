FROM node:latest
WORKDIR /app
ADD package.json /app
ADD src /app/src
ADD test /app/test
RUN npm install --save-dev

