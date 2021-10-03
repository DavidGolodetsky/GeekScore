# base image
FROM node:12.2.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

ENV VUE_APP_BACKEND_HOST="geek-backend"

# install and cache app dependencies
COPY ./package.json /app/package.json

COPY . /app/src

RUN npm install --legacy-peer-deps
RUN npm install @vue/cli@3.7.0 -g

# set working directory to source
WORKDIR /app/src

# start app
CMD ["npm", "run", "serve"]
