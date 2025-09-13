import { internalMutation, internalAction } from "$convex/server";
import { v, type Validator } from "convex/values";
import type { UserJSON } from "svelte-clerk/server";
import type { Role } from "../app";
import { createClerkClient } from "@clerk/backend";
import { internal } from "$convex/api";
import schema from "./schema";
import { byExternalId } from "./users";

export const upsertFromClerk = internalMutation({
    args: { data: v.any() as Validator<UserJSON> }, // no runtime validation, trust Clerk
    async handler(ctx, { data }) {
        const roles = (data.unsafe_metadata?.roles as Role[]) || [];

        const userAttributes = {
            name: `${data.first_name} ${data.last_name}`,
            externalId: data.id,
            email: data.email_addresses.find((email) => email.id === data.primary_email_address_id)!.email_address,
            roles: roles
        };

        const user = await byExternalId(ctx, data.id);
        if (user) {
            await ctx.db.patch(user._id, userAttributes);
        } else {
            await ctx.db.insert("users", userAttributes);
        }

        ctx.scheduler.runAfter(0, internal.auth.syncRolesWithClerk, {
            clerkUserId: data.id,
            roles
        })
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

export const syncRolesWithClerk = internalAction({
    args: {
        clerkUserId: v.string(),
        roles: schema.tables.users.validator.fields.roles
    },
    async handler(_, { clerkUserId, roles }) {
        const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })
        await clerkClient.users.updateUserMetadata(clerkUserId, { publicMetadata: { roles } });
    }
});