# Dockerfile for React client

# Build react client
FROM node:10.16-alpine

# Set working directory
WORKDIR /app/frontend

# Add `node_modules/.bin` to the `PATH` environment variable
ENV PATH="./node_modules/.bin:$PATH"

# Copy package*.json into the correct directory
COPY package*.json /app/frontend

# Installing dependencies
RUN rm -rf node_modules package-lock.json && npm install --only=production

# Copy local files to app folder
COPY . .

EXPOSE 8000

CMD ["npm", "start"]
