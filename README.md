# Todo V3 API

A production-style REST API built with **Express**, **TypeScript**, and **Zod** that supports **multiple databases** through a configurable adapter.

The same API can run on either:

* MongoDB (using Mongoose)
* PostgreSQL (using Drizzle ORM)

The database is selected using an environment variable, allowing the application code to remain unchanged.

---

# Features

* TypeScript
* Express.js
* Zod request validation
* Multi-database architecture

  * MongoDB + Mongoose
  * PostgreSQL + Drizzle ORM
* Environment-based database switching
* Pagination
* Filtering
* Database seeding
* Integration testing using Vitest and Supertest
* RESTful API design

---

# Tech Stack

| Category       | Technology         |
| -------------- | ------------------ |
| Runtime        | Node.js            |
| Language       | TypeScript         |
| Framework      | Express.js         |
| Validation     | Zod                |
| MongoDB ORM    | Mongoose           |
| PostgreSQL ORM | Drizzle ORM        |
| Testing        | Vitest + Supertest |

---


# Installation

Clone the repository

```bash
git clone <repository-url>
cd todov3
```

Install dependencies

```bash
npm install
```

---

# Environment Variables

Create a `.env` file.

```env
DATABASE=choose

POSTGRESQL_URL=postgresql://postgres:password@localhost:5432/todov3

MONGODB_URI=mongodb://localhost:27017/todov3

NODE_ENV=development

PORT=3000

LIMIT=10
```

## DATABASE

Choose which database the application should use.

```
DATABASE=mongodb
```

or

```
DATABASE=postgresql
```

No code changes are required when switching databases.

---

# Available Scripts

Run development server

```bash
npm run dev
```

Generate Drizzle migrations

```bash
npm run generate
```

Push schema to PostgreSQL

```bash
npm run push
```

Open Drizzle Studio

```bash
npm run studio
```

Seed the database

```bash
npm run seed
```

Run tests

```bash
npm run test
```

---

# API Endpoints

Base URL

```
/api/v3
```

---

## Home

### GET

```
GET /api/v3/
```

Returns a welcome message.

---

## Get All Todos

### GET

```
GET /api/v3/todos
```

---

### Pagination

```
GET /api/v3/todos?page=2
```

Pagination limit is controlled by

```
LIMIT
```

inside the `.env` file.

---

### Filter by Completion

```
GET /api/v3/todos?completed=true
```

```
GET /api/v3/todos?completed=false
```

---

### Filter by Priority

```
GET /api/v3/todos?priority=high
```

```
GET /api/v3/todos?priority=medium
```

```
GET /api/v3/todos?priority=low
```

---

### Combine Pagination and Filtering

```
GET /api/v3/todos?page=2&completed=true
```

```
GET /api/v3/todos?page=3&priority=high
```

---

### Combine  Filtering

```
GET /api/v3/todos?priority=low&completed=true
```


---

## Create Todo

### POST

```
POST /api/v3/todos
```

Request Body

```json
{
  "title": "Learn TypeScript",
  "description": "Finish backend project",
  "priority": "high",
  "completed": false
}
```

### Required Fields

| Field       | Required | Default |
| ----------- | -------- |  -----  |
| title       | Yes      |        |
| description | No       |        |
| priority    | No       |    low    | 
| completed   | No       |    false    |

---

## Update Todo

### PUT

```
PUT /api/v3/todos/:id
```

Example

```json
{
  "title": "Updated title",
  "completed": true
}
```

---

## Delete Todo

### DELETE

```
DELETE /api/v3/todos/:id
```

Performs a **hard delete**.

---

# Validation

Incoming requests are validated using **Zod** before reaching the business logic.

Validation includes:

* Required title
* Valid priority values
* Valid completed boolean
* Request parameter validation
* Query validation

---

# Database Seeding

Populate the selected database with sample data.

```bash
npm run seed
```

The seed script respects the configured database.

```
DATABASE=mongodb
```

or

```
DATABASE=postgresql
```

---

# Testing

The project includes API tests using:

* Vitest
* Supertest

Run all tests

```bash
npm test
```

Tests cover API endpoints, request validation, and expected responses.

---


