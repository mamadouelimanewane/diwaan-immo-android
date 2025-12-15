// Système de permissions basé sur les rôles
export enum Role {
    USER = 'USER',
    AGENT = 'AGENT',
    ADMIN = 'ADMIN'
}

export interface Permission {
    resource: string;
    actions: ('create' | 'read' | 'update' | 'delete')[];
}

// Matrice de permissions par rôle
export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
    [Role.USER]: [
        {
            resource: 'properties',
            actions: ['read']
        },
        {
            resource: 'favorites',
            actions: ['create', 'read', 'delete']
        },
        {
            resource: 'inquiries',
            actions: ['create', 'read']
        },
        {
            resource: 'profile',
            actions: ['read', 'update']
        }
    ],

    [Role.AGENT]: [
        {
            resource: 'properties',
            actions: ['create', 'read', 'update', 'delete'] // Ses propres propriétés
        },
        {
            resource: 'favorites',
            actions: ['create', 'read', 'delete']
        },
        {
            resource: 'inquiries',
            actions: ['create', 'read', 'update']
        },
        {
            resource: 'profile',
            actions: ['read', 'update']
        },
        {
            resource: 'clients',
            actions: ['create', 'read', 'update']
        },
        {
            resource: 'reservations',
            actions: ['read', 'update']
        }
    ],

    [Role.ADMIN]: [
        {
            resource: '*', // Accès complet
            actions: ['create', 'read', 'update', 'delete']
        }
    ]
};

// Helper function to check if user has permission
export function hasPermission(
    userRole: Role,
    resource: string,
    action: 'create' | 'read' | 'update' | 'delete'
): boolean {
    const permissions = ROLE_PERMISSIONS[userRole];

    // Admin has all permissions
    if (userRole === Role.ADMIN) {
        return true;
    }

    // Check specific resource permissions
    const resourcePermission = permissions.find(p => p.resource === resource);
    if (!resourcePermission) {
        return false;
    }

    return resourcePermission.actions.includes(action);
}

// Middleware helper for API routes
export function requirePermission(
    resource: string,
    action: 'create' | 'read' | 'update' | 'delete'
) {
    return (userRole: Role) => {
        if (!hasPermission(userRole, resource, action)) {
            throw new Error('Permission denied');
        }
    };
}

// Features enabled by role
export const ROLE_FEATURES: Record<Role, string[]> = {
    [Role.USER]: [
        'search_properties',
        'view_property_details',
        'save_favorites',
        'contact_agents',
        'submit_inquiries'
    ],

    [Role.AGENT]: [
        'search_properties',
        'view_property_details',
        'save_favorites',
        'contact_agents',
        'submit_inquiries',
        'publish_properties',
        'manage_own_properties',
        'view_client_inquiries',
        'manage_clients',
        'access_rental_manager',
        'view_analytics'
    ],

    [Role.ADMIN]: [
        'full_admin_access',
        'manage_all_properties',
        'manage_all_users',
        'manage_agents',
        'manage_partnerships',
        'manage_developers',
        'manage_agencies',
        'manage_reservations',
        'view_all_analytics',
        'system_configuration',
        'backup_restore',
        'security_audit',
        'god_mode'
    ]
};

// Check if user has access to a feature
export function hasFeature(userRole: Role, feature: string): boolean {
    const features = ROLE_FEATURES[userRole];
    return features.includes(feature) || features.includes('full_admin_access');
}

// Route protection helpers
export const PROTECTED_ROUTES: Record<string, Role[]> = {
    '/admin': [Role.ADMIN],
    '/admin/*': [Role.ADMIN],
    '/rent/manager': [Role.AGENT, Role.ADMIN],
    '/rent/manager/*': [Role.AGENT, Role.ADMIN],
    '/dashboard': [Role.USER, Role.AGENT, Role.ADMIN]
};

export function canAccessRoute(userRole: Role, route: string): boolean {
    // Check exact match first
    if (PROTECTED_ROUTES[route]) {
        return PROTECTED_ROUTES[route].includes(userRole);
    }

    // Check wildcard patterns
    for (const [pattern, allowedRoles] of Object.entries(PROTECTED_ROUTES)) {
        if (pattern.endsWith('/*')) {
            const basePath = pattern.slice(0, -2);
            if (route.startsWith(basePath)) {
                return allowedRoles.includes(userRole);
            }
        }
    }

    // Public route
    return true;
}
