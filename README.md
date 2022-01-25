# ESDM

ESDM subject project repository

[![lint Actions Status](https://github.com/JoaoG250/ESDM/workflows/lint/badge.svg)](https://github.com/JoaoG250/ESDM/actions)
[![tests Actions Status](https://github.com/JoaoG250/ESDM/workflows/tests/badge.svg)](https://github.com/JoaoG250/ESDM/actions)

### Dependencies

- Docker
- Docker Compose

### Instructions to run locally

1. Build the application image: `docker-compose build`
1. Run initial api setup: `docker-compose run --rm api setup`
1. Launch the containers in your terminal: `docker-compose up`
1. Enter the following adresses in your browser:
   - Django admin: http://localhost:8000/admin
   - API Schema: http://localhost:8000/api/schema/
