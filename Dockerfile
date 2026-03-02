FROM php:8.2-apache

# Instala dependências do sistema necessárias
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libsqlite3-dev \
    libcurl4-openssl-dev \
    pkg-config \
    libssl-dev \
    && rm -rf /var/lib/apt/lists/*

# Instala extensões do PHP necessárias para o projeto
# O pdo_sqlite é essencial para o banco de dados que você está usando
RUN docker-php-ext-install pdo pdo_sqlite

# Habilita módulos do Apache necessários para rotas e headers
RUN a2enmod rewrite headers \
    && echo "ServerName localhost" >> /etc/apache2/apache2.conf

# Usa a configuração de produção do PHP (performance e segurança)
RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"

# Define o diretório de trabalho
WORKDIR /var/www/html

# Copia os arquivos do projeto para o container
COPY --chown=www-data:www-data . /var/www/html/

# Ajustes finais de permissão para garantir que o Apache possa escrever no DB e Logs
# É crucial para o SQLite funcionar que a pasta pai também tenha permissão de escrita
RUN mkdir -p /var/www/html/logs \
    && touch /var/www/html/database.sqlite \
    && chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html \
    # Permissão específica para escrita
    && chmod -R 775 /var/www/html/logs \
    && chmod 664 /var/www/html/database.sqlite \
    && chmod 775 /var/www/html

EXPOSE 80
