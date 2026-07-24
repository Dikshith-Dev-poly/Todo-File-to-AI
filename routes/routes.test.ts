import { describe, expect, test, beforeAll } from "vitest"
import request from "supertest"
import app from "../app.js";
import dbConnect from "../db/dbConnect.js";
import env from "../config/env.js";
import seed from "../db/seed.js";
import mongoose from "mongoose";
const crypto = require('node:crypto');


beforeAll(async () => {
    await seed();
    await dbConnect();
});

const url = "/api/v3/todos";

describe("GET Request", () => {
    describe("Success", () => {
        test("GET /api/v3/todos", async () => {
            const result = await request(app).get(url);
            expect(result.status).toBe(200);
            expect(result.body.success).toBe(true);
            expect(result.body.message).toBe("Data fetched Successfully");
            expect(result.type).toBe("application/json");
            expect(result.body.data).toBeDefined();
            expect(result.body.data).toHaveProperty("totalPage");
            expect(typeof result.body.data.totalPage).toBe("number");
            expect(result.body.data).toHaveProperty("page");
            expect(typeof result.body.data.page).toBe("number");
            expect(result.body.data).toHaveProperty("limit");
            expect(typeof result.body.data.limit).toBe("number");
            expect(result.body.data).toHaveProperty("hasPrev");
            expect(typeof result.body.data.hasPrev).toBe("boolean");
            expect(result.body.data).toHaveProperty("hasNext");
            expect(typeof result.body.data.hasNext).toBe("boolean");
            expect(result.body.data).toHaveProperty("data");
            expect(Array.isArray(result.body.data.data)).toBe(true);
            expect(result.body.data.data[0]).toMatchObject({ title: expect.any(String), description: expect.any(String), priority: expect.any(String), completed: expect.any(Boolean) });
            //default
            expect(result.body.data.page).toBe(1);
            expect(result.body.data.limit).toBe(env.LIMIT);
        });
    })
    describe("pagination and filtering", () => {
        test("GET /api/v3/todos?page=2", async () => {
            const result = await request(app).get(url + "?page=2");
            expect(result.body.data.page).toBe(2);
            expect(result.body.data.hasPrev).toBe(true);
        })
        test("GET /api/v3/todos?priority=high", async () => {
            const result = await request(app).get(url + "?priority=high");
            for (let data of result.body.data.data) {
                expect(data.priority).toBe("high");
            }
        })
        test("GET /api/v3/todos?completed=true", async () => {
            const result = await request(app).get(url + "?completed=true");
            for (let data of result.body.data.data) {
                expect(data.completed).toBe(true);
            }
        })
        test("GET /api/v3/todos?priority=low&completed=true", async () => {
            const result = await request(app).get(url + "?priority=low&completed=true");
            for (let data of result.body.data.data) {
                expect(data.completed).toBe(true);
                expect(data.priority).toBe("low");
            }
        })
    })

    describe("Validation", () => {
        test("GET /api/v3/todos?page=-1", async () => {
            const result = await request(app).get(url + "?page=-1");
            expect(result.status).toBe(400);
            expect(result.body.success).toBe(false);
            expect(result.body.message).toBe("Invalid query");
        })
        test("GET /api/v3/todos?completed=lll", async () => {
            const result = await request(app).get(url + "?completed=ll");
            expect(result.status).toBe(400);
            expect(result.body.success).toBe(false);
            expect(result.body.message).toBe("Invalid query");
        })
        test("GET /api/v3/todos?priority=abc", async () => {
            const result = await request(app).get(url + "?priority=abc");
            expect(result.status).toBe(400);
            expect(result.body.success).toBe(false);
            expect(result.body.message).toBe("Invalid query");
        })
    })
})


describe("Create  request", () => {
    describe("Success", () => {
        test("create todo by only passing title", async () => {
            const result = await request(app).post(url).send({ "title": "Test todo" });
            expect(result.status).toBe(201);
            expect(result.body.message).toBe("Todo created Successfully");
            expect(result.body.data.data).toMatchObject({ id: expect.any(String), title: "Test todo", description: null, priority: "low", completed: false });
        })
        test("create todo by only passing title,description", async () => {
            const result = await request(app).post(url).send({ id: expect.any(String), "title": "Test todo", "description": "desc" });
            expect(result.status).toBe(201);
            expect(result.body.message).toBe("Todo created Successfully");
            expect(result.body.data.data).toMatchObject({ id: expect.any(String), title: "Test todo", description: "desc", priority: "low", completed: false });
        })
        test("create todo by only passing title,description,priority", async () => {
            const result = await request(app).post(url).send({ id: expect.any(String), "title": "Test todo", "description": "desc", "priority": "high" });
            expect(result.status).toBe(201);
            expect(result.body.message).toBe("Todo created Successfully");
            expect(result.body.data.data).toMatchObject({ id: expect.any(String), title: "Test todo", description: "desc", priority: "high", completed: false });
        })
        test("create todo by passing entire body", async () => {
            const result = await request(app).post(url).send({ id: expect.any(String), "title": "Test todo", "description": "desc", "priority": "high", "completed": true });
            expect(result.status).toBe(201);
            expect(result.body.message).toBe("Todo created Successfully");
            expect(result.body.data.data).toMatchObject({ id: expect.any(String), title: "Test todo", description: "desc", priority: "high", completed: true });
        })
    })
    describe("Validation", () => {
        test("Body without title", async () => {
            const result = await request(app).post(url);
            expect(result.status).toBe(400);
            expect(result.body.message).toBe("Invalid input");
        })
    })
})



describe("Update request", () => {
    describe("Success", async () => {
        test("update title", async () => {
            const result = await request(app).post(url).send({ title: "Hello" });
            const updateResult = await request(app).patch(url + `/${result.body.data.data.id}`).send({ title: "updated" });
            expect(updateResult.statusCode).toBe(200);
            expect(updateResult.body.success).toBe(true);
            expect(updateResult.body.data.title).toBe("updated");
        })
    })
    describe("Validation", () => {
        test("Invalid id", async () => {
            const updateResult = await request(app).patch(url + `/abc`).send({ title: "updated" });
            expect(updateResult.statusCode).toBe(400);
            expect(updateResult.body.success).toBe(false);
            expect(updateResult.body.message).toBe("Invalid id");
        })
        const id = (env.DATABASE === "mongodb") ? new mongoose.Types.ObjectId().toString() : crypto.randomUUID();
        test("Invalid id-404", async () => {
            const updateResult = await request(app).patch(url + `/${id}`).send({ title: "updated" });
            expect(updateResult.statusCode).toBe(404);
            expect(updateResult.body.success).toBe(false);
            expect(updateResult.body.message).toBe("Invalid id");
        })
    })
})

describe("Delete request", () => {
    describe("Success", async () => {
        test("Delete todo", async () => {
            const result = await request(app).post(url).send({ title: "Hello" });
            const deleteResult = await request(app).delete(url + `/${result.body.data.data.id}`);
            expect(deleteResult.statusCode).toBe(200);
            expect(deleteResult.body.success).toBe(true);
            expect(deleteResult.body.message).toBe("Deleted successfully");
        })
    })
    describe("Validation", () => {
        test("Invalid id", async () => {
            const deleteResult = await request(app).patch(url + `/abc`);
            expect(deleteResult.statusCode).toBe(400);
            expect(deleteResult.body.success).toBe(false);
            expect(deleteResult.body.message).toBe("Invalid id");
        })
        const id = (env.DATABASE === "mongodb") ? new mongoose.Types.ObjectId().toString() : crypto.randomUUID();
        test("Invalid id-404", async () => {
            const deleteResult = await request(app).delete(url + `/${id}`);
            expect(deleteResult.statusCode).toBe(404);
            expect(deleteResult.body.success).toBe(false);
            expect(deleteResult.body.message).toBe("Invalid id");
        })
    })
})