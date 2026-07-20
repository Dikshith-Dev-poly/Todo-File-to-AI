export interface TodoInterface {
    title: string,
    description: string,
    priority: "high" | "medium" | "low",
    completed: boolean;
}