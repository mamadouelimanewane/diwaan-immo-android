'use client';

import { useState } from 'react';

export default function ContentPage() {
    const [posts, setPosts] = useState([
        { id: 1, title: 'Guide : Comment acheter un terrain au Sénégal ?', author: 'Diwaan Team', date: '01 Déc 2025', views: '2.5k', status: 'Publié' },
        { id: 2, title: 'Top 5 des quartiers les plus prisés de Dakar', author: 'Sophie Diop', date: '28 Nov 2025', views: '1.8k', status: 'Publié' },
        { id: 3, title: 'Comprendre le bail à usage d\'habitation', author: 'Expert Juridique', date: '25 Nov 2025', views: '950', status: 'Brouillon' },
    ]);

    const [categories, setCategories] = useState(['Immobilier', 'Juridique', 'Tendances', 'Lifestyle', 'Conseils', 'Déco']);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedPost, setSelectedPost] = useState<any>(null);

    const handleDelete = (id: number) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
            setPosts(posts.filter(p => p.id !== id));
        }
    };

    const handleEdit = (post: any) => {
        setSelectedPost(post);
        setShowEditModal(true);
    };

    const handleAddCategory = () => {
        const newCategory = prompt('Nom de la nouvelle catégorie :');
        if (newCategory) {
            setCategories([...categories, newCategory]);
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1B254B' }}>Gestion du Contenu</h1>
                <button
                    onClick={() => setShowAddModal(true)}
                    style={{ background: '#006AFF', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                    + Nouvel Article
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
                {/* Articles List */}
                <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1B254B', marginBottom: '20px' }}>Articles & Guides</h3>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ textAlign: 'left', color: '#A3AED0', borderBottom: '1px solid #eee' }}>
                                <th style={{ padding: '12px' }}>Titre</th>
                                <th style={{ padding: '12px' }}>Auteur</th>
                                <th style={{ padding: '12px' }}>Vues</th>
                                <th style={{ padding: '12px' }}>Statut</th>
                                <th style={{ padding: '12px' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map((post) => (
                                <tr key={post.id} style={{ borderBottom: '1px solid #f9f9f9', fontSize: '14px' }}>
                                    <td style={{ padding: '16px', fontWeight: '500', color: '#1B254B' }}>{post.title}</td>
                                    <td style={{ padding: '16px', color: '#666' }}>{post.author}</td>
                                    <td style={{ padding: '16px' }}>{post.views}</td>
                                    <td style={{ padding: '16px' }}>
                                        <span style={{
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            fontSize: '12px',
                                            fontWeight: 'bold',
                                            background: post.status === 'Publié' ? '#E6F8F1' : '#eee',
                                            color: post.status === 'Publié' ? '#05CD99' : '#666'
                                        }}>
                                            {post.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '16px' }}>
                                        <button
                                            onClick={() => handleEdit(post)}
                                            style={{ marginRight: '8px', cursor: 'pointer', background: 'none', border: 'none', fontSize: '18px' }}
                                            title="Modifier"
                                        >
                                            ✏️
                                        </button>
                                        <button
                                            onClick={() => handleDelete(post.id)}
                                            style={{ cursor: 'pointer', background: 'none', border: 'none', fontSize: '18px' }}
                                            title="Supprimer"
                                        >
                                            🗑️
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Quick Actions / Categories */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1B254B', marginBottom: '16px' }}>Catégories</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {categories.map(tag => (
                                <span key={tag} style={{ background: '#F4F7FE', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', color: '#006AFF', fontWeight: '500' }}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <button
                            onClick={handleAddCategory}
                            style={{ marginTop: '16px', width: '100%', padding: '8px', border: '1px dashed #ccc', borderRadius: '8px', background: 'none', cursor: 'pointer', color: '#666' }}
                        >
                            + Ajouter une catégorie
                        </button>
                    </div>

                    <div style={{ background: 'linear-gradient(135deg, #4318FF 0%, #006AFF 100%)', padding: '24px', borderRadius: '16px', color: 'white' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>SEO Booster</h3>
                        <p style={{ fontSize: '13px', opacity: 0.8, marginBottom: '16px' }}>Optimisez le référencement de vos pages pour attirer plus de visiteurs.</p>
                        <button
                            onClick={() => alert('Configuration SEO en cours de développement')}
                            style={{ background: 'white', color: '#006AFF', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }}
                        >
                            Configurer
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal Ajouter */}
            {showAddModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div style={{ background: 'white', padding: '32px', borderRadius: '16px', width: '600px', maxWidth: '90%' }}>
                        <h2 style={{ marginBottom: '24px', color: '#1B254B' }}>Nouvel article</h2>
                        <form onSubmit={(e) => { e.preventDefault(); alert('Article créé!'); setShowAddModal(false); }}>
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#666' }}>Titre</label>
                                <input type="text" required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }} />
                            </div>
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#666' }}>Auteur</label>
                                <input type="text" required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }} />
                            </div>
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#666' }}>Contenu</label>
                                <textarea rows={6} style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', fontFamily: 'inherit' }}></textarea>
                            </div>
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#666' }}>Catégorie</label>
                                <select style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}>
                                    {categories.map(cat => <option key={cat}>{cat}</option>)}
                                </select>
                            </div>
                            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                                <button type="button" onClick={() => setShowAddModal(false)} style={{ flex: 1, padding: '12px', background: '#eee', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Annuler</button>
                                <button type="submit" style={{ flex: 1, padding: '12px', background: '#006AFF', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Publier</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal Modifier */}
            {showEditModal && selectedPost && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div style={{ background: 'white', padding: '32px', borderRadius: '16px', width: '600px', maxWidth: '90%' }}>
                        <h2 style={{ marginBottom: '24px', color: '#1B254B' }}>Modifier l'article</h2>
                        <form onSubmit={(e) => { e.preventDefault(); alert('Article modifié!'); setShowEditModal(false); }}>
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#666' }}>Titre</label>
                                <input type="text" defaultValue={selectedPost.title} style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }} />
                            </div>
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#666' }}>Statut</label>
                                <select defaultValue={selectedPost.status} style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}>
                                    <option>Brouillon</option>
                                    <option>Publié</option>
                                </select>
                            </div>
                            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                                <button type="button" onClick={() => setShowEditModal(false)} style={{ flex: 1, padding: '12px', background: '#eee', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Annuler</button>
                                <button type="submit" style={{ flex: 1, padding: '12px', background: '#006AFF', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Enregistrer</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
