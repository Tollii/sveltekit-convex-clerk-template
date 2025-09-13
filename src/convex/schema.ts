import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
    /* ------------------------------------------------------------------ *
     * User data imported from Clerk Webhooks                             *
     * ------------------------------------------------------------------ */
    users: defineTable({
        name: v.string(),
        email: v.string(),
        externalId: v.string(),
    }).index("byExternalId", ["externalId"]),
});