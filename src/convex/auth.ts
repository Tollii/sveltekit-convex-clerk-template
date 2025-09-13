import { internalMutation } from "$convex/server";
import { v, type Validator } from "convex/values";
import type { UserJSON } from "svelte-clerk/server";
import { byExternalId } from "./users";

export const upsertFromClerk = internalMutation({
    args: { data: v.any() as Validator<UserJSON> }, // no runtime validation, trust Clerk
    async handler(ctx, { data }) {

        const userAttributes = {
            name: `${data.first_name} ${data.last_name}`,
            externalId: data.id,
            email: data.email_addresses.find((email) => email.id === data.primary_email_address_id)!.email_address
        };

        const user = await byExternalId(ctx, data.id);
        if (user) {
            await ctx.db.patch(user._id, userAttributes);
        } else {
            await ctx.db.insert("users", userAttributes);
        }
    }
});

export const deleteFromClerk = internalMutation({
    args: { clerkUserId: v.string() },
    async handler(ctx, { clerkUserId }) {
        const user = await byExternalId(ctx, clerkUserId);
        if (user)
            await ctx.db.delete(user._id);
        else {
            console.warn("User not found with Clerk user ID - ", clerkUserId)
        }
    }
});