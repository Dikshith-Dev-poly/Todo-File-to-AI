# Todo API v1


This is version 1 of todo project.Which uses text file as database.
db folder and respective files are created automatically.

Next-Use database

A simple Todo REST API built with **Node.js** and **Express**.

This project uses **text files as a database** to store todos, completed tasks, deleted tasks, and IDs. It was created to practice Express application structure, routing, controllers, services, and file handling using fs module.

## Features

* Create a todo
* Get all todos
* Delete a todo
* Mark a todo as completed
* Consistent JSON responses

## API Endpoints

### Get All Todos

```http
GET /todo/api/
```

### Create Todo

```http
POST /todo/api/
```

Request Body:
Example
```json
{
  "taskName": "Learn Express",
  "description": "Complete middleware section",
  "createdAt": "2026-06-22"
}
```

### Delete Todo

```http
DELETE /todo/api/:id
```

### Mark Todo as Completed

```http
PATCH /todo/api/complete?id=1
```

## Response Format

Success:

```json
{
  "success": true,
  "response": {}
}
```

Error:

```json
{
  "success": false,
  "response": "Error message"
}
```

## Installation

1. Clone the repository

```bash
git clone <repository-url>
```

2. Install dependencies

```bash
npm install
```

3. Start the server

```bash
npm start
```

or

```bash
npm run dev
```

4. Open

```text
http://localhost:3000
```





Thank you for reading 😁.