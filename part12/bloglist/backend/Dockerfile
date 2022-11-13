FROM node:18 AS base
WORKDIR /usr/src/app
COPY package.json package.json
COPY package-lock.json package-lock.json

FROM base AS test
RUN npm ci
COPY . .
ENV CI=true
RUN npm run test

FROM base AS prod
COPY --chown=node:node . .
RUN npm ci --only=production
USER node
CMD npm start
