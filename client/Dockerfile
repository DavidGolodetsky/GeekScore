# base image
FROM node:lts-alpine@sha256:a251de4db0e0632446c0ba62adbe1e37ff148a53732e4574d2ed0f5462cc4407

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
