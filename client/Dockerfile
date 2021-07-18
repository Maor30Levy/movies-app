FROM node:14.17.2 as build

WORKDIR /app

COPY ./package.json /app/package.json

RUN yarn install
COPY . .
RUN yarn build

# CMD ["npm", "run", "serve"]

FROM nginx
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html