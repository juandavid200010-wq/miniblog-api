# MiniBlog API

API REST desarrollada en Node.js + Express con PostgreSQL para gestionar autores y posts.

## Tecnologías

- Node.js
- Express
- PostgreSQL
- pg
- Vitest + Supertest

## Requisitos previos

- Node.js v18 o superior
- PostgreSQL instalado y corriendo

## Instalación local

1. Clona el repositorio:
   git clone https://github.com/juandavid200010-wq/miniblog-api.git
   cd miniblog-api

2. Instala las dependencias:
   npm install

3. Crea el archivo .env basado en .env.example:
   cp .env.example .env

4. Edita el .env con tus datos de PostgreSQL.

5. Crea la base de datos en PostgreSQL:
   psql -d postgres -c "CREATE DATABASE miniblog_db;"

6. Ejecuta el script de setup y seed:
   psql -d miniblog_db -f src/db/setup.sql

7. Inicia el servidor:
   npm start

La API estará disponible en http://localhost:3000

## Ejecutar tests

npm test

## Endpoints disponibles

### Authors
- GET    /authors
- GET    /authors/:id
- POST   /authors
- PUT    /authors/:id
- DELETE /authors/:id

### Posts
- GET    /posts
- GET    /posts/:id
- GET    /posts/author/:authorId
- POST   /posts
- PUT    /posts/:id
- DELETE /posts/:id

## Variables de entorno

| Variable    | Descripción                  |
|-------------|------------------------------|
| PORT        | Puerto del servidor          |
| DB_HOST     | Host de PostgreSQL           |
| DB_PORT     | Puerto de PostgreSQL         |
| DB_NAME     | Nombre de la base de datos   |
| DB_USER     | Usuario de PostgreSQL        |
| DB_PASSWORD | Contraseña de PostgreSQL     |

## Deploy en Railway

1. Crea una cuenta en https://railway.app
2. Crea un nuevo proyecto y conecta tu repositorio de GitHub.
3. Agrega un servicio de PostgreSQL desde Railway.
4. Configura las variables de entorno en Railway con los valores del .env.
5. Railway desplegará automáticamente la aplicación.

## Documentación OpenAPI

El archivo de documentación se encuentra en docs/openapi.yaml.

## Uso de IA

Este proyecto fue desarrollado con asistencia de Claude. Se utilizaron prompts para guiar la estructura del proyecto, implementación de endpoints, configuración de tests.


## URL de producción

https://miniblog-api-production-b5c5.up.railway.app