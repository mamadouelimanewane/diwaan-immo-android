# 🔗 GUIDE D'INTÉGRATION FRONTEND → BACKEND

## Connecter le Frontend à l'API Backend

---

## 📋 PRÉREQUIS

✅ Backend API opérationnel (`npm run dev`)  
✅ MongoDB connecté et seedé  
✅ Token JWT fonctionnel  
✅ Package.json mis à jour  

---

## 🛠️ FICHIERS CRÉÉS

1. ✅ `src/lib/api-client.ts` - Client API complet
2. ⏳ Modifier `src/context/AuthContext.tsx` (à venir)
3. ⏳ Modifier `src/app/search/page.tsx` (à venir)
4. ⏳ Modifier `src/app/homes/[id]/page.tsx` (à venir)

---

## 🔌 UTILISATION DE L'API CLIENT

### Exemple 1 : Login

```typescript
import { api } from '@/lib/api-client';

// Dans votre composant
const  handleLogin = async (email: string, password: string) => {
  try {
    const { user, token } = await api.auth.login({ email, password });
    console.log('✅ Connecté:', user);
    // Le token est automatiquement sauvegardé dans localStorage
  } catch (error) {
    console.error('❌ Erreur login:', error);
  }
};
```

### Exemple 2 : Recherche de Propriétés

```typescript
import { api } from '@/lib/api-client';

// Rechercher des villas à Dakar
const searchProperties = async () => {
  try {
    const { properties, pagination } = await api.properties.getAll({
      city: 'Dakar',
      type: 'VILLA',
      minPrice: 50000000,
      maxPrice: 300000000,
      page: 1,
      limit: 20,
    });
    
    console.log(`Trouvé ${pagination.total} propriétés`);
    console.log(properties);
  } catch (error) {
    console.error('❌ Erreur recherche:', error);
  }
};
```

### Exemple 3 : Créer une Propriété

```typescript
import { api } from '@/lib/api-client';

const createProperty = async () => {
  try {
    // Nécessite être authentifié (token dans localStorage)
    const { property, message } = await api.properties.create({
      title: 'Belle Villa Almadies',
      description: 'Superbe villa...',
      type: 'VILLA',
      transactionType: 'SALE',
      price: 250000000,
      surface: 350,
      bedrooms: 4,
      bathrooms: 3,
      address: '12 Route des Almadies',
      city: 'Dakar',
      neighborhood: 'Almadies',
      images: ['https://...'],
      features: ['Piscine', 'Jardin'],
    });
    
    console.log('✅', message);
  } catch (error) {
    console.error('❌ Erreur création:', error);
  }
};
```

---

## 🔄 INTÉGRATION PAR PAGE

### 1. Page de Recherche (`/search`)

**Avant** (données mockées):
```typescript
const properties = MOCK_PROPERTIES.filter(...);
```

**Après** (API):
```typescript
import { api } from '@/lib/api-client';
import { useState, useEffect } from 'react';

export default function SearchPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const { properties } = await api.properties.getAll(filters);
        setProperties(properties);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [filters]);

  if (loading) return <div>Chargement...</div>;

  return (
    <div>
      {/* Filtres */}
      {/* Liste propriétés */}
    </div>
  );
}
```

---

### 2. Page Détail Propriété (`/homes/[id]`)

**Avant**:
```typescript
const property = MOCK_PROPERTIES.find(p => p.id === params.id);
```

**Après**:
```typescript
import { api } from '@/lib/api-client';

export default function PropertyPage({ params }: { params: { id: string } }) {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const { property } = await api.properties.getById(params.id);
        setProperty(property);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [params.id]);

  if (loading) return <div>Chargement...</div>;
  if (!property) return <div>Propriété non trouvée</div>;

  return <div>{/* Afficher property */}</div>;
}
```

---

### 3. AuthContext (Authentification Globale)

**Modifier `src/context/AuthContext.tsx`**:

```typescript
'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '@/lib/api-client';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Vérifier si l'utilisateur est déjà connecté au chargement
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      
      if (token) {
        try {
          const { user } = await api.auth.me();
          setUser(user);
        } catch (error) {
          // Token invalide ou expiré
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const { user } = await api.auth.login({ email, password });
    setUser(user);
  };

  const register = async (data: any) => {
    const { user } = await api.auth.register(data);
    setUser(user);
  };

  const logout = () => {
    api.auth.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```

---

### 4. Page Login (`/login`)

```typescript
'use client';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      router.push('/dashboard'); // Rediriger après login
    } catch (err: any) {
      setError(err.message || 'Identifiants invalides');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Connexion</h1>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Connexion...' : 'Se connecter'}
        </button>
      </form>
    </div>
  );
}
```

---

### 5. Admin Dashboard - Liste Propriétés

```typescript
'use client';
import { useState, useEffect } from 'react';
import { api } from '@/lib/api-client';
import { useAuth } from '@/context/AuthContext';

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Vérifier si admin
  useEffect(() => {
    if (user?.role !== 'ADMIN') {
      router.push('/');
    }
  }, [user]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        // Admin voit TOUTES les propriétés (même pending)
        const { properties } = await api.properties.getAll({
          status: undefined, // Pas de filtre statut
        });
        setProperties(properties);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer cette propriété ?')) return;

    try {
      await api.properties.delete(id);
      setProperties(properties.filter(p => p.id !== id));
      alert('✅ Propriété supprimée');
    } catch (error) {
      alert('❌ Erreur suppression');
    }
  };

  if (loading) return <div>Chargement...</div>;

  return (
    <div>
      <h1>Gestion des Propriétés</h1>
      <table>
        <thead>
          <tr>
            <th>Titre</th>
            <th>Ville</th>
            <th>Prix</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property) => (
            <tr key={property.id}>
              <td>{property.title}</td>
              <td>{property.city}</td>
              <td>{property.price.toLocaleString()} FCFA</td>
              <td>{property.status}</td>
              <td>
                <button onClick={() => handleDelete(property.id)}>
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

---

## 🔒 GESTION DES ERREURS

```typescript
import { api, ApiError } from '@/lib/api-client';

try {
  await api.auth.login({ email, password });
} catch (error) {
  if (error instanceof ApiError) {
    switch (error.status) {
      case 401:
        console.error('Identifiants invalides');
        break;
      case 404:
        console.error('Utilisateur non trouvé');
        break;
      case 500:
        console.error('Erreur serveur');
        break;
      default:
        console.error(error.message);
    }
  }
}
```

---

## 📊 GESTION DE L'ÉTAT (Loading, Error)

### Pattern Recommandé

```typescript
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await api.properties.getAll();
      setData(result.properties);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);

if (loading) return <LoadingSpinner />;
if (error) return <ErrorMessage message={error} />;
if (!data) return <div>Aucune donnée</div>;

return <div>{/* Afficher data */}</div>;
```

---

## ✅ CHECKLIST INTÉGRATION

### Backend
- [x] API routes créées
- [x] Authentication JWT
- [x] Database seedée
- [x] Tests API (cURL)

### Frontend
- [x] api-client.ts créé
- [ ] AuthContext modifié
- [ ] Page login créée
- [ ] Page search modifiée
- [ ] Page details modifiée
- [ ] Admin pages modifiées
- [ ] Tests E2E

---

## 🚀 PROCHAINES ÉTAPES

1. **Tester l'API Client**
```bash
# Dans console navigateur
import { api } from '@/lib/api-client';
await api.auth.login({ email: 'admin@diwaan.sn', password: 'admin123' });
```

2. **Modifier AuthContext** (code fourni ci-dessus)

3. **Créer page Login** (code fourni ci-dessus)

4. **Intégrer dans Search page** (code fourni ci-dessus)

5. **Remplacer toutes données mockées par API calls**

---

## 💡 TIPS

### Cache Requêtes
```typescript
// Utiliser React Query pour le caching
npm install @tanstack/react-query
```

### Optimistic Updates
```typescript
// Mettre à jour UI avant réponse serveur
const handleLike = (id) => {
  setLiked(true); // UI update immédiat
  api.properties.like(id).catch(() => setLiked(false)); // Rollback si erreur
};
```

### Debounce Search
```typescript
// Éviter trop de requêtes
import { debounce } from 'lodash';

const debouncedSearch = debounce(async (query) => {
  const { properties } = await api.properties.getAll({ search: query });
  setResults(properties);
}, 300);
```

---

## 📚 RESSOURCES

- API Client: `src/lib/api-client.ts`
- Backend Routes: `src/app/api/`
- Documentation API: `BACKEND_API_IMPLEMENTATION.md`

---

**© 2025 Diwaan - Guide d'Intégration Frontend/Backend**
