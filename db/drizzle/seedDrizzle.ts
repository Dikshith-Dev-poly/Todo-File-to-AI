import type { InferInsertModel } from "drizzle-orm";
import drizzledb from "./drizzleConnect.js";
import { DrizzleTodo } from "./TodoSchema.js";

const todoData: InferInsertModel<typeof DrizzleTodo>[] = [
    {
        title: "Read for exam-Drizzle",
        description: "Before 11am",
        priority: "high",
        completed: false,
    },
    {
        title: "Learn Drawing-Drizzle",
        description: "Increase creativity",
        priority: "low",
        completed: false,
    },
    {
        title: "Dance-Drizzle",
        description: "Enjoy",
        priority: "low",
        completed: true,
    },
    {
        title: "Take Both-Drizzle",
        description: "Be hygenic",
        priority: "medium",
        completed: true,
    },
    {
        title: "Bresh",
        description: "Keep my mouth fresh-Drizzle",
        priority: "medium",
        completed: false,
    },
    {
        title: "Take tablets-Drizzle",
        priority: "high",
        completed: true,
    },
];


async function seedDrizzle() {
    try {
        await drizzledb.delete(DrizzleTodo);
        await drizzledb.insert(DrizzleTodo).values(todoData);
        console.log("Postgresql seeded successfully");
    } catch (err) {
        console.log("Error seeding Postgresql");
    }
}

export default seedDrizzle;