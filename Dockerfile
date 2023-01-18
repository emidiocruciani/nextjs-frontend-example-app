FROM node:alpine as base

# Set working directory
WORKDIR /app

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

# Configure supevisor (base)
RUN mkdir -p /etc/supervisor.d/
RUN mkdir -p /var/log/supervisor



FROM base as development

# Development variables
ARG WWWUSER=1000
ARG WWWGROUP=1000

ENV WWWUSER=$WWWUSER
ENV WWWGROUP=$WWWGROUP

# Configure supervisor (development)
COPY ./docker/dev/app/supervisord.ini /etc/supervisor.d/supervisord.ini

# Load entrypoint script
COPY ./docker/dev/app/start-container /usr/local/bin/start-container
RUN chmod +x /usr/local/bin/start-container

# Expose port
EXPOSE 80

# Set container entrypoint
CMD ["start-container"]



FROM base as production

# Copy all (see .dockerignore for exceptions)
COPY ./source /app/
RUN chown -R node:node /app

# Configure supervisor (production)
COPY ./docker/prod/app/supervisord.ini /etc/supervisor.d/supervisord.ini

# Load entrypoint script
COPY ./docker/prod/app/start-container /usr/local/bin/start-container
RUN chmod +x /usr/local/bin/start-container

# Expose port
EXPOSE 80

# Set on-start command
CMD ["start-container"]
