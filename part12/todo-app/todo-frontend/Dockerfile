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
ENV REACT_APP_BACKEND_URL=api/
RUN npm run build

FROM node:18 AS prod
WORKDIR /usr/src/app
RUN npm install -g serve
COPY --from=build /usr/src/app/build build
CMD [ "serve", "build" ]
