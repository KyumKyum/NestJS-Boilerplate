# Multi-level docker to minimize the image size

# Cache level: install dependencies
# Also need to install dev dependencies since nest keyword is installed as dev dependency
FROM node:18.17-alpine AS base
LABEL author="Jay Lim"
WORKDIR /usr/src/app

COPY --chown=node:node package.json package-lock.json ./
RUN npm ci

# Build level: Build project and install prod dependency
# Purge all unused dev-dependency after build.
FROM base AS build
WORKDIR /usr/src/app

COPY --chown=node:node --from=base /usr/src/app/node_modules ./node_modules
COPY --chown=node:node . .

RUN npm run build

# Temporararilly disable Husky and install only dependencies
RUN npm ci --omit=dev --ignore-scripts

# Launch level: Copy all build and node_modules files to the final image, launch the service.
FROM base as launch
WORKDIR /usr/src/app

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

USER node

CMD ["node", "dist/main.js"]
