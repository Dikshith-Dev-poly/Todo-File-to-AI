import mongoDBConnect from "./MongoDBConnect.js"
import MongoTodo from "./TodoModel.js"
import { disconnect } from "mongoose"

const todoData = [
    {
        title: "Read for exam",
        description: "Before 11am",
        priority: "high",
        completed: false,
    },
    {
        title: "Learn Drawing",
        description: "Increase creativity",
        priority: "low",
        completed: false,
    },
    {
        title: "Dance",
        description: "Enjoy",
        priority: "low",
        completed: true,
    },
    {
        title: "Take Both",
        description: "Be hygenic",
        priority: "medium",
        completed: true,
    },
    {
        title: "Bresh",
        description: "Keep my mouth fresh",
        priority: "medium",
        completed: false,
    },
    {
        title: "Take tablets",
        priority: "high",
        completed: true,
    },
]


async function seedMongo() {
    try {
        await mongoDBConnect();
        await MongoTodo.deleteMany();
        await MongoTodo.insertMany(todoData);
        await disconnect();
        console.log("MongoDB seeded successfully");
    } catch (err) {
        console.log("Error seeding mongoDB");
    }
}

export default seedMongo;