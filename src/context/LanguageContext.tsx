'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'fr' | 'wo';

interface Translations {
    heroTitle: string;
    heroSubtitle: string;
    searchPlaceholder: string;
    buy: string;
    rent: string;
    sell: string;
    loans: string;
    agents: string;
    signIn: string;

    // New keys
    dashboard: string;
    myProperties: string;
    addProperty: string;
    settings: string;
    logout: string;
    viewDetails: string;
    contactAgent: string;
    price: string;
    location: string;
    leads: string;
    views: string;
    online: string;
}

const translations: Record<Language, Translations> = {
    fr: {
        heroTitle: "Trouvez votre maison idéale au Sénégal",
        heroSubtitle: "Dakar, Saly, Saint-Louis... La plus grande sélection de biens immobiliers.",
        searchPlaceholder: "Entrez une adresse, un quartier, une ville...",
        buy: "Acheter",
        rent: "Louer",
        sell: "Vendre",
        loans: "Prêts",
        agents: "Agents",
        signIn: "Connexion",

        // Dashboard
        dashboard: "Tableau de Bord",
        myProperties: "Mes Annonces",
        addProperty: "Ajouter un bien",
        settings: "Paramètres",
        logout: "Déconnexion",

        // Common
        viewDetails: "Voir Détails",
        contactAgent: "Contacter l'Agent",
        price: "Prix",
        location: "Localisation",

        // Agent
        leads: "Contacts",
        views: "Vues",
        online: "En ligne"
    },
    wo: {
        heroTitle: "Wutal sa kër ci Sénégal",
        heroSubtitle: "Dakar, Saly, Ndar... Fi la gëna bari kër yi ñuy jaay ak yi ñuy luwé.",
        searchPlaceholder: "Bindal adresse, koñ, ville wala code ZIP",
        buy: "Jënd",
        rent: "Luwé",
        sell: "Jaay",
        loans: "Lébal",
        agents: "Courtiers",
        signIn: "Dugg",

        // Dashboard
        dashboard: "Tableau de Bord",
        myProperties: "Samay Annonce",
        addProperty: "Yokku kër",
        settings: "Paramètres",
        logout: "Génn",

        // Common
        viewDetails: "Xool Détails yi",
        contactAgent: "Wo Courtier bi",
        price: "Njëg",
        location: "Fumu nekk",

        // Agent
        leads: "Contacts",
        views: "Vues",
        online: "Ci ligne"
    }
};

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>('fr');

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
