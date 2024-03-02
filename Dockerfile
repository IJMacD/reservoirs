FROM node:21 AS base
WORKDIR /app
COPY package.json yarn.lock /app/

FROM base AS build
RUN ["yarn", "install", "--frozen-lockfile"]
COPY public /app/public
COPY src /app/src
RUN ["yarn", "build"]

FROM base AS final
RUN ["yarn", "install", "--frozen-lockfile", "--production"]
COPY --from=build /app/build /app/dist
COPY server/ /app/
CMD ["node", "index.js"]