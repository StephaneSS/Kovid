FROM node:12.16.1-alpine as node

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Stage 2
FROM nginx:1.17.9-alpine

COPY --from=node /usr/src/app/dist/KoRe /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
