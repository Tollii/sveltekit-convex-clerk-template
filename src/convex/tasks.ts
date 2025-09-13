import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const get = query({
    args: {},
    handler: async (ctx) => {
        const user = await ctx.auth.getUserIdentity();
        if (!user)
            return [];

        const tasks = await ctx.db.query("tasks").collect();
        return tasks.map((task) => ({ ...task, assigner: user?.email || "not@logged.in" })).sort((a, b) => Number(a.isCompleted) - Number(b.isCompleted))
    },
});

export const create = mutation({
    args: {
        text: v.string(),
    },
    handler: async (ctx, { text }) => {
        await ctx.db.insert("tasks", { text, isCompleted: false });
    },
});

export const remove = mutation({
    args: {
        id: v.id("tasks"),
    },
    handler: async (ctx, { id }) => {
        await ctx.db.delete(id);
    },
});

export const toggle = mutation({
    args: {
        id: v.id("tasks"),
    },
    handler: async (ctx, { id }) => {
        const task = await ctx.db.get(id);
        if (task) {
            await ctx.db.patch(id, { isCompleted: !task.isCompleted });
        }
    },
});