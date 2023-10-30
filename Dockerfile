# Stage 1
FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build  --prod
# Stage 2
FROM nginx:alpine
COPY --from=node /app/dist/propertysearch-app /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf
EXPOSE 80
