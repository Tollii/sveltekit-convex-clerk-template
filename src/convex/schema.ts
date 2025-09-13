import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
    tasks: defineTable({
        text: v.string(),
        isCompleted: v.boolean(),
    }),

    users: defineTable({
        name: v.string(),
        email: v.string(),
        externalId: v.string(),
        roles: v.array(v.union(v.literal("admin"), v.literal("moderator")))
    }).index("byExternalId", ["externalId"]),
});