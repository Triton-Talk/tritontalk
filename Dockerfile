FROM node:alpine as client-builder

WORKDIR /usr/src/app

COPY ./client/package*.json ./

RUN npm install --production

COPY ./client .

RUN npm run build 


FROM nginx:alpine

COPY --from=client-builder /usr/src/app/build /usr/share/nginx/html 
COPY ./testing/nginx/conf/default.conf /etc/nginx/conf.d/default.conf 

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
