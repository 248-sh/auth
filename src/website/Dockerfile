FROM node:alpine as base
ENV NODE_ENV=production
ENV PORT=3000

# install all node_modules, including dev
FROM base as deps
WORKDIR /app

COPY ./website/package.json ./website/package-lock.json ./
RUN npm install --production=false

# install only production modules
FROM deps as production-deps
WORKDIR /app

RUN npm prune --production=true

# build the app
FROM deps as build
WORKDIR /app

COPY ./website ./
RUN npm run build

# copy over assets required to run the app
FROM base
WORKDIR /app
EXPOSE 3000

COPY --from=production-deps /app/node_modules /app/node_modules
COPY --from=production-deps /app/package.json /app/package.json
COPY --from=production-deps /app/package-lock.json /app/package-lock.json
COPY --from=build /app/website /app/website
COPY --from=build /app/public /app/public

CMD ["npm", "start"]