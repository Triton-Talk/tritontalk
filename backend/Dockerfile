FROM node:alpine AS BUILDER

WORKDIR /usr/src/app

RUN apk update && apk --no-cache add curl bash && rm -rf /var/cache/apk/*

COPY package*.json ./

RUN curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin

RUN npm ci
RUN npm prune --production 

RUN /usr/local/bin/node-prune

FROM alpine

WORKDIR /usr/src/app

RUN apk update && apk --no-cache add npm 

COPY --from=BUILDER /usr/src/app .
COPY . .

EXPOSE 3001

CMD /bin/ash
