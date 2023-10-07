FROM --platform=linux/amd64 node:20-alpine as build
WORKDIR /app
COPY package.json .
RUN yarn install
COPY . .


RUN yarn build

FROM nginx

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 4200
