#!/bin/sh

# Wait for the database to be ready
echo "Waiting for database connection on db:${DB_PORT}..."
/usr/local/bin/wait-for-it.sh db:${DB_PORT} --timeout=60 --strict -- echo "Database is ready!"

# Check if composer dependencies need to be installed
if [ ! -d "vendor" ] || [ composer.lock -nt vendor ]; then
    echo "New dependencies detected or vendor/ is missing. Running composer install..."
    composer install
else
    echo "No new dependencies detected. Skipping composer install."
fi

# Check if there are pending migrations
# if php artisan migrate:status | grep -q "No"; then
#     echo "No new migrations found. Skipping migration step."
# else
#     echo "New migrations detected. Running migrations..."
#     php artisan migrate
# fi

# Clear and optimize cache
echo "Clearing and optimizing cache..."
php artisan optimize:clear

# Start PHP-FPM
echo "Starting PHP-FPM..."
exec php-fpm
