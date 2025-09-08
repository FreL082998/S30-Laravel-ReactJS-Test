FROM node:16.20.2-alpine AS builder

# Define persistent environment variables
ARG WEB_PATH
ENV WEB_PATH=${WEB_PATH}

# Set working directory
WORKDIR /var/www/${WEB_PATH}

# Copy application code as root
COPY ../../${WEB_PATH} .

# Install dependencies
RUN npm install

# Build the application
RUN npm run build