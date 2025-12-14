import { z } from 'zod';

export const registerSchema = z.object({
    email: z.string().email('Email invalide'),
    password: z.string().min(8, 'Minimum 8 caractères'),
    name: z.string().min(2, 'Nom requis'),
    phone: z.string().optional(),
});

export const loginSchema = z.object({
    email: z.string().email('Email invalide'),
    password: z.string().min(1, 'Mot de passe requis'),
});

export const propertySchema = z.object({
    title: z.string().min(10, 'Titre trop court'),
    description: z.string().min(50, 'Description trop courte'),
    type: z.enum(['HOUSE', 'APARTMENT', 'LAND', 'COMMERCIAL', 'VILLA', 'STUDIO']),
    transactionType: z.enum(['SALE', 'RENT']),
    price: z.number().positive('Prix invalide'),
    surface: z.number().positive('Surface invalide'),
    bedrooms: z.number().int().min(0).optional(),
    bathrooms: z.number().int().min(0).optional(),
    address: z.string().min(5, 'Adresse requise'),
    city: z.string().min(2, 'Ville requise'),
    neighborhood: z.string().min(2, 'Quartier requis'),
    images: z.array(z.string()).min(1, 'Au moins 1 image requise'),

    // Senegal Specific
    hasGenerator: z.boolean().optional(),
    hasWaterTank: z.boolean().optional(),
    hasSecurity: z.boolean().optional(),
    hasPool: z.boolean().optional(),
    isFurnished: z.boolean().optional(),
});
