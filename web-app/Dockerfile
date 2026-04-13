FROM php:8.4-cli

RUN apt-get update && apt-get install -y \
    git \
    curl \
    zip \
    unzip \
    libpq-dev \
    nodejs \
    npm

RUN docker-php-ext-install pdo pdo_pgsql

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY . .

RUN composer install --no-interaction --optimize-autoloader
RUN npm install --prefer-offline --no-audit --no-fund || true
RUN npm run build --if-present || true

RUN cp .env.example .env
RUN php artisan key:generate

CMD sleep 5 && php artisan migrate --force && php artisan serve --host=0.0.0.0 --port=8000