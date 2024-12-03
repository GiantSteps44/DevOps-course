# Stage 1: Build the React app
FROM node:alpine AS build

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

COPY . .
# Build the React app
RUN npm run build

# Stage 2: Serve the app with NGINX
FROM nginx:latest

# Copy the build files to NGINX's default directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy the NGINX configuration file
COPY ./nginx.conf /etc/nginx/nginx.conf

COPY .htpasswd /etc/nginx/.htpasswd
# Expose the port
EXPOSE 8081

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
