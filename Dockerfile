FROM node:alpine

# Set UTC timezone
RUN echo "UTC" > /etc/timezone

# Install needed packages
RUN apk add zip unzip curl bash su-exec supervisor

# Setup bash
RUN sed -i 's/bin\/ash/bin\/bash/g' /etc/passwd

# Configure node
RUN mkdir -p /.npm/cache
RUN chown -R node:node /.npm
RUN npm config set cache /.npm/cache --global

# Configure supervisor
RUN mkdir -p /etc/supervisor.d/
COPY ./docker/dev/app/supervisord.ini /etc/supervisor.d/supervisord.ini
RUN mkdir -p /var/log/supervisor

# Load entrypoint script
COPY ./docker/dev/app/start-container /usr/local/bin/start-container
RUN chmod +x /usr/local/bin/start-container

# Expose port
EXPOSE 80

# Set working directory
WORKDIR /app

# Set container entrypoint
CMD ["start-container"]

