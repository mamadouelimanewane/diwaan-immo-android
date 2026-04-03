'use client';

import { useEffect, useState } from 'react';

interface Listing {
  id: string;
  title: string;
  city: string;
  price: number;
  status: 'ACTIVE' | 'DRAFT' | 'RENTED' | 'INACTIVE';
  views: number;
}

const STATUS_LABELS: Record<string, string> = {
  ACTIVE: 'Actif',
  DRAFT: 'Brouillon',
  RENTED: 'Loué',
  INACTIVE: 'Inactif',
};

const STATUS_COLORS: Record<string, string> = {
  ACTIVE: '#22c55e',
  DRAFT: '#9ca3af',
  RENTED: '#3b82f6',
  INACTIVE: '#ef4444',
};

function formatFCFA(amount: number): string {
  return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';
}

export default function ListingsPage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function fetchListings() {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      const res = await fetch('/api/rent/manager/listings', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Erreur lors du chargement des annonces');
      const data = await res.json();
      setListings(data.listings ?? data ?? []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchListings();
  }, []);

  async function handleDelete(id: string, title: string) {
    const confirmed = window.confirm(
      `Êtes-vous sûr de vouloir supprimer l'annonce "${title}" ? Cette action est irréversible.`
    );
    if (!confirmed) return;

    try {
      setDeletingId(id);
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/properties/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Erreur lors de la suppression');
      await fetchListings();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Erreur lors de la suppression');
    } finally {
      setDeletingId(null);
    }
  }

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px' }}>Chargement...</div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '60px', color: '#ef4444' }}>
        <p style={{ fontSize: '18px', marginBottom: '16px' }}>{error}</p>
        <button
          onClick={fetchListings}
          style={{
            padding: '10px 24px',
            background: '#2563eb',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '15px',
          }}
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '4px' }}>Mes Annonces</h1>
          <span
            style={{
              display: 'inline-block',
              background: '#f1f5f9',
              color: '#475569',
              borderRadius: '999px',
              padding: '2px 14px',
              fontSize: '14px',
              fontWeight: 600,
            }}
          >
            {listings.length} annonce{listings.length !== 1 ? 's' : ''}
          </span>
        </div>
        <a
          href="/rent/manager/list"
          style={{
            padding: '10px 22px',
            background: '#2563eb',
            color: '#fff',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '15px',
          }}
        >
          + Publier une annonce
        </a>
      </div>

      {listings.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '60px',
            background: '#f8fafc',
            borderRadius: '12px',
            border: '1px dashed #cbd5e1',
          }}
        >
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏠</div>
          <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '12px' }}>Aucune annonce active</h2>
          <p style={{ color: '#64748b', marginBottom: '28px' }}>
            Commencez à louer votre bien dès aujourd'hui.
          </p>
          <a
            href="/rent/manager/list"
            style={{
              padding: '12px 28px',
              background: '#2563eb',
              color: '#fff',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 600,
            }}
          >
            Publier une annonce
          </a>
        </div>
      ) : (
        <div style={{ overflowX: 'auto', borderRadius: '12px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                {['Titre', 'Ville', 'Prix', 'Statut', 'Vues', 'Actions'].map((col) => (
                  <th
                    key={col}
                    style={{
                      padding: '14px 16px',
                      textAlign: 'left',
                      fontSize: '13px',
                      fontWeight: 700,
                      color: '#475569',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {listings.map((listing, idx) => (
                <tr
                  key={listing.id}
                  style={{
                    borderBottom: idx < listings.length - 1 ? '1px solid #f1f5f9' : 'none',
                    background: idx % 2 === 0 ? '#fff' : '#fafafa',
                  }}
                >
                  <td style={{ padding: '14px 16px', fontWeight: 600, color: '#1e293b', maxWidth: '220px' }}>
                    <span
                      title={listing.title}
                      style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                    >
                      {listing.title}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px', color: '#475569' }}>{listing.city}</td>
                  <td style={{ padding: '14px 16px', color: '#1e293b', fontWeight: 500 }}>
                    {formatFCFA(listing.price)}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '3px 12px',
                        borderRadius: '999px',
                        background: STATUS_COLORS[listing.status] ?? '#9ca3af',
                        color: '#fff',
                        fontSize: '12px',
                        fontWeight: 700,
                      }}
                    >
                      {STATUS_LABELS[listing.status] ?? listing.status}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px', color: '#475569' }}>{listing.views ?? 0}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <a
                        href={`/homes/${listing.id}`}
                        style={{
                          padding: '6px 14px',
                          background: '#2563eb',
                          color: '#fff',
                          borderRadius: '6px',
                          textDecoration: 'none',
                          fontSize: '13px',
                          fontWeight: 600,
                        }}
                      >
                        Modifier
                      </a>
                      <button
                        onClick={() => handleDelete(listing.id, listing.title)}
                        disabled={deletingId === listing.id}
                        style={{
                          padding: '6px 14px',
                          background: deletingId === listing.id ? '#fca5a5' : '#ef4444',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: deletingId === listing.id ? 'not-allowed' : 'pointer',
                          fontSize: '13px',
                          fontWeight: 600,
                        }}
                      >
                        {deletingId === listing.id ? 'Suppression...' : 'Supprimer'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
