# Dockerfile for React client

# Build react client
FROM node:10.16-alpine

# Set working directory
WORKDIR /app/frontend

# Copy package*.json into the correct directory
COPY package*.json /app/frontend

# Installing dependencies
RUN npm install --silent
RUN npm run build

# Copy local files to app folder
COPY . /app/frontend


FROM ubuntu
RUN apt-get update
RUN apt-get install nginx -y
COPY --from=build /app/dist /var/www/html/
EXPOSE 8000
CMD ["nginx","-g","daemon off;"]