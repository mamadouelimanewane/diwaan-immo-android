// API Client pour communiquer avec le backend
// Use Next.js internal API routes (not external server)
const API_URL = typeof window !== 'undefined' ? '' : 'http://localhost:3000';

export class ApiError extends Error {
    constructor(public status: number, message: string, public details?: any) {
        super(message);
        this.name = 'ApiError';
    }
}

// Helper pour les requêtes API
async function fetchApi<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
    };

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
    });

    const data = await response.json();

    if (!response.ok) {
        throw new ApiError(
            response.status,
            data.error || 'Une erreur est survenue',
            data.details
        );
    }

    return data;
}

// Authentication API
export const authApi = {
    // Register
    register: async (userData: {
        email: string;
        password: string;
        name: string;
        phone?: string;
    }) => {
        const data = await fetchApi<{
            success: boolean;
            user: any;
            token: string;
            message: string;
        }>('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData),
        });

        // Sauvegarder le token
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        return data;
    },

    // Login
    login: async (credentials: { email: string; password: string }) => {
        const data = await fetchApi<{
            success: boolean;
            user: any;
            token: string;
            message: string;
        }>('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
        });

        // Sauvegarder le token
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        return data;
    },

    // Get current user
    me: async () => {
        return fetchApi<{ success: boolean; user: any }>('/api/auth/me');
    },

    // Logout
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },
};

// Properties API
export const propertiesApi = {
    // Get all properties avec filtres
    getAll: async (params?: {
        page?: number;
        limit?: number;
        type?: string;
        city?: string;
        neighborhood?: string;
        minPrice?: number;
        maxPrice?: number;
        minSurface?: number;
        maxSurface?: number;
        bedrooms?: number;
        transactionType?: 'SALE' | 'RENT';
        status?: string;
        featured?: boolean;
        search?: string;
        ownerId?: string;
    }) => {
        const queryParams = new URLSearchParams();

        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    queryParams.append(key, value.toString());
                }
            });
        }

        const queryString = queryParams.toString();
        const endpoint = `/api/properties${queryString ? `?${queryString}` : ''}`;

        return fetchApi<{
            success: boolean;
            properties: any[];
            pagination: {
                page: number;
                limit: number;
                total: number;
                pages: number;
            };
        }>(endpoint);
    },

    // Get single property
    getById: async (id: string) => {
        return fetchApi<{ success: boolean; property: any }>(
            `/api/properties/${id}`
        );
    },

    // Create property (requires auth)
    create: async (propertyData: any) => {
        return fetchApi<{
            success: boolean;
            property: any;
            message: string;
        }>('/api/properties', {
            method: 'POST',
            body: JSON.stringify(propertyData),
        });
    },

    // Update property (requires auth)
    update: async (id: string, propertyData: any) => {
        return fetchApi<{
            success: boolean;
            property: any;
            message: string;
        }>(`/api/properties/${id}`, {
            method: 'PUT',
            body: JSON.stringify(propertyData),
        });
    },

    // Delete property (requires auth)
    delete: async (id: string) => {
        return fetchApi<{ success: boolean; message: string }>(
            `/api/properties/${id}`,
            {
                method: 'DELETE',
            }
        );
    },
};

// Export all
export const api = {
    auth: authApi,
    properties: propertiesApi,
};

export default api;
