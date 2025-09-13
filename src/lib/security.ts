import { error, redirect, type RequestEvent } from '@sveltejs/kit';
import type { SignedInAuthObject, SignedOutAuthObject } from '@clerk/backend/internal';

type SessionAuthObject = SignedInAuthObject | SignedOutAuthObject;

export class Security {
    private readonly auth: SessionAuthObject;

    constructor(private readonly event: RequestEvent) {
        this.auth = event.locals.auth();
    }

    /**
     * Produces side effect. 
     * Redirects when user is not authenticated
     */
    requireAuthentication() {
        if (!this.auth.userId) {
            redirect(307, '/signin');
        }
        return this;
    }

    /**
     * Produces side effect. 
     * Throws error when user lacks specified role
     */
    requireAuthenticatedRole(role: Role) {
        this.requireAuthentication();

        const permitted = this.auth.sessionClaims?.roles.includes(role);
        if (!permitted) {
            throw error(403, 'missing role: ' + role);
        }
        return this;
    }
}