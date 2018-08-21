# Stage 1
FROM node:9-alpine

ADD package.json package-lock.json nodemon.json /src/

WORKDIR /src

RUN set -x \
    && apk --no-cache add git \
    && npm install \
    && npm install

ADD . /src

RUN ls -la

CMD npm run dev

# RUN set -x \
#     && npm run build \
#     && rm node_modules -rf \
#     && mv prod_modules node_modules

# RUN ls -la

# # Stage 2
# FROM node:9-alpine

# WORKDIR /src

# COPY --from=0 /src /src/

# CMD npm run dev