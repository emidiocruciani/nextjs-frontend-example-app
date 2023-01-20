# Example app nextjs frontend

See https://github.com/emidiocruciani/laravel-backend-example-app for a backend example implementation compatible with this application.

## Requirements

- docker, docker compose (v2)
- git

## Installation steps

- Create *docker-compose.override.yml* file from existing *docker-compose.override-example-yml* file.

```bash
cp docker-compose.override-example.yml docker-compose.override.yml
```

- Ensure backend services are up, and that environment variables point to right urls

You can now run this application with docker:

```bash
docker compose up
```

## Provisioned services

- application, http://localhost:3000
