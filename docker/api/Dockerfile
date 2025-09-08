FROM php:8.0.30-fpm

# Arguments defined in docker-compose.yml
ARG API_PATH
ARG API_PORT
ARG DB_PORT

# Set environment variables in the container
ENV DB_PORT=$DB_PORT

# Install system dependencies and enable necessary modules
RUN apt-get update \
    && apt-get install -y \
        git \
        curl \
        libpng-dev \
        libonig-dev \
        libxml2-dev \
        zip \
        unzip \
        build-essential \
        autoconf \
        libz-dev \
        libzip-dev \
        libssl-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip

# Install Composer (specific version)
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/$API_PATH

# Copy existing project files
COPY ../../$API_PATH .

# Create storage directories
RUN mkdir -p \
    storage/framework/cache/data \
    storage/framework/sessions \
    storage/framework/views \
    storage/logs \
    bootstrap/cache \
    vendor

# Set correct permissions
RUN chown -R www-data:www-data /var/www/$API_PATH \
    && chmod -R 775 /var/www/$API_PATH

# Copy custom php.ini
COPY ../../docker/api/php.ini /usr/local/etc/php/conf.d/memory-limit.ini

# Copy and change ownership of wait-for-it script
COPY ../../docker/common/wait-for-it.sh /usr/local/bin/

# Copy the entrypoint script
COPY ../../docker/$API_PATH/entrypoint.sh /entrypoint.sh

# Remove carriage return characters from wait-for-it.sh and entrypoint.sh using sed
RUN sed -i 's/\r//' /usr/local/bin/wait-for-it.sh
RUN sed -i 's/\r//' /entrypoint.sh

# Make the shellscripts executable
RUN chmod +x /usr/local/bin/wait-for-it.sh /entrypoint.sh

# Install Laravel dependencies automatically
RUN composer install

# Expose the specified port
EXPOSE $API_PORT

# Set the entrypoint
ENTRYPOINT ["/entrypoint.sh"]
