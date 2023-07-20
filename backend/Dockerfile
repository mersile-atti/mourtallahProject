# Dockerfile for the server

# Build the Node.js server
FROM node:16-alpine

# Set the working directory
WORKDIR /app/backend

# Copy package*.json into the correct directory
COPY package*.json ./

# Remove node_modules and package-lock.json, then reinstall dependencies
RUN npm install --silent

# Copy local files into the application folder
COPY . .

EXPOSE 5000

CMD ["npm", "start"]