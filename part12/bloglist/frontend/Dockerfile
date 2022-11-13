FROM node:18 AS base
WORKDIR /usr/src/app
COPY package.json package.json
COPY package-lock.json package-lock.json

FROM base AS test
RUN npm ci
COPY . .
ENV CI=true
RUN npm run test

FROM base as build
RUN npm ci --production
COPY . .
RUN npm run build

FROM node:18 AS prod
WORKDIR /usr/src/app
RUN npm install -g serve
COPY --from=build --chown=node:node /usr/src/app/build build
USER node
CMD [ "serve", "build" ]