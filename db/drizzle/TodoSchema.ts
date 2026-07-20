import { boolean, pgEnum, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";


export const priorityEnum = pgEnum("priority", ["high", "medium", "low"]);

export const DrizzleTodo = pgTable("todo", {
    id: uuid().primaryKey().defaultRandom(),
    title: varchar({ length: 60 }).notNull(),
    description: varchar({ length: 500 }),
    priority: priorityEnum().notNull().default("low"),
    completed: boolean().notNull().default(false),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").$onUpdate(() => new Date()).defaultNow()
})