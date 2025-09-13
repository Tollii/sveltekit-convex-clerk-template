import { query, type QueryCtx } from "$convex/server";

export const current = query({
    args: {},
    handler: async (ctx) => {
        return await getCurrentUser(ctx);
    }
});

export const getAll = query({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Not authenticated")
        }

        return await ctx.db.query("users").collect();
    }
});

export async function getCurrentUserOrThrow(ctx: QueryCtx) {
    const user = await getCurrentUser(ctx);
    if (!user) {
        throw new Error("User record not found");
    }
    return user;
}

export async function getCurrentUser(ctx: QueryCtx) {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
        return null;
    }
    return await byExternalId(ctx, identity.subject);
}


export async function byExternalId(ctx: QueryCtx, externalId: string) {
    return await ctx.db
        .query("users")
        .withIndex("byExternalId", (q) => q.eq("externalId", externalId))
        .unique();
}