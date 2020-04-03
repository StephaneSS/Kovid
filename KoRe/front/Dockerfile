ARG ENV=production

# Download dependancies
FROM node:12.16.1-alpine as node_install
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

# Build angular project
FROM node_install as node_build
ARG ENV
COPY . .
RUN npm run build -- --configuration=$ENV

# Copy server configs
FROM nginx:1.17.9-alpine
COPY --from=node_build /usr/src/app/dist/KoRe /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
