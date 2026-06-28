# Todo API v2

A simple REST API built with **Node.js**, **Express**, and **Mongoose** for managing todos.

## Features

* Create a todo
* Get all todos with pagination
* Update a todo
* Soft delete a todo
* MongoDB using Mongoose
* Automatic `createdAt` and `updatedAt`
* Database reconnects automatically (5 attempts with a 5-second delay)

---

## Project Structure

```text
.
├── controllers/
├── lib/
├── models/
├── routes/
├── services/
├── utils/
├── .env.example
├── .env
├── app.js
├── server.js
└── README.md
```

---

## Todo Schema

```js
{
  title: String,
  description: String,
  completed: Boolean,
  deleted: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

> Internally, shorter field names are used in MongoDB (`t`, `d`, `c`, `del`) through Mongoose aliases to reduce storage.

---

## API Endpoints

### Get Todos

```http
GET /todo/v2?page=1&limit=20
```

Returns paginated todos.

---

### Create Todo

```http
POST /todo/v2
```

Body

```json
{
  "title": "Learn Mongoose",
  "description": "Practice schema design and CRUD."
}
```

---

### Update Todo

```http
PATCH /todo/v2/:id
```

Body

```json
{
  "title": "Updated title",
  "description": "Updated description"
}
```

---

### Soft Delete Todo

```http
DELETE /todo/v2/:id
```

Marks the todo as deleted instead of permanently removing it.

---

## Environment Variables

Create a `.env` file.

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/todo
```

---

## Installation

Clone the repository.

```bash
git clone <repository-url>
```

Install dependencies.

```bash
npm install
```

Create a `.env` file using `.env.example`.

Start the server.

```bash
npm start
```

For development:

```bash
npm run dev
```

---

## Pagination

The GET endpoint supports:

| Query   | Description              | Default |
| ------- | ------------------------ | ------- |
| `page`  | Page number              | `1`     |
| `limit` | Number of todos per page | 20      |

Example:

```http
GET /todo/v2?page=2&limit=5
```

---

## Notes

* Deleted todos are soft deleted.
* Mongoose aliases provide readable field names while storing compact keys in MongoDB.
* Database connection automatically retries up to **5 times** with a **5-second delay** if the initial connection fails.

---

## Tech Stack

* Node.js
* Express
* MongoDB
* Mongoose

---

## Future Improvements

* Authentication
* Input validation
* Search and filtering
* Sorting
* Unit and integration tests
