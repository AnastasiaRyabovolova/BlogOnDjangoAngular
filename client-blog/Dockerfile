FROM node:8.9.3
WORKDIR /tmp
ADD package.json /tmp
ADD yarn.lock /tmp
RUN npm install -g @angular/cli
RUN yarn
