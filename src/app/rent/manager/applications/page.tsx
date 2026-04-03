'use client';

import { useEffect, useState } from 'react';

interface Application {
  id: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone?: string;
  message?: string;
  propertyId: string;
  createdAt: string;
}

function formatDate(dateStr: string): string {
  try {
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(new Date(dateStr));
  } catch {
    return dateStr;
  }
}

function truncate(text: string, max: number): string {
  if (!text) return '';
  return text.length > max ? text.slice(0, max) + '...' : text;
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchApplications() {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      const res = await fetch('/api/rent/manager/applications', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Erreur lors du chargement des dossiers');
      const data = await res.json();
      setApplications(data.applications ?? data ?? []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchApplications();
  }, []);

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
          onClick={fetchApplications}
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
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: 0 }}>Dossiers de candidature</h1>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: '28px',
            height: '28px',
            padding: '0 10px',
            background: applications.length > 0 ? '#2563eb' : '#e2e8f0',
            color: applications.length > 0 ? '#fff' : '#64748b',
            borderRadius: '999px',
            fontSize: '14px',
            fontWeight: 700,
          }}
        >
          {applications.length}
        </span>
      </div>

      {applications.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '60px',
            background: '#f8fafc',
            borderRadius: '12px',
            border: '1px dashed #cbd5e1',
          }}
        >
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📋</div>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px', color: '#1e293b' }}>
            Aucun dossier en attente
          </h2>
          <p style={{ color: '#64748b' }}>
            Vous recevrez les candidatures ici lorsque des locataires postuleront à vos annonces.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {applications.map((app) => (
            <div
              key={app.id}
              style={{
                background: '#fff',
                borderRadius: '12px',
                boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                padding: '24px',
                border: '1px solid #e2e8f0',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: '12px',
                }}
              >
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1e293b', marginBottom: '4px' }}>
                    {app.applicantName}
                  </h3>
                  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '6px' }}>
                    <span style={{ fontSize: '14px', color: '#475569' }}>✉️ {app.applicantEmail}</span>
                    {app.applicantPhone && (
                      <span style={{ fontSize: '14px', color: '#475569' }}>📞 {app.applicantPhone}</span>
                    )}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '4px' }}>
                    {formatDate(app.createdAt)}
                  </div>
                  <div
                    style={{
                      display: 'inline-block',
                      padding: '2px 10px',
                      background: '#f1f5f9',
                      borderRadius: '6px',
                      fontSize: '12px',
                      color: '#475569',
                      fontWeight: 600,
                    }}
                  >
                    Bien #{app.propertyId}
                  </div>
                </div>
              </div>

              {app.message && (
                <div
                  style={{
                    marginTop: '16px',
                    padding: '12px 16px',
                    background: '#f8fafc',
                    borderRadius: '8px',
                    borderLeft: '3px solid #cbd5e1',
                  }}
                >
                  <p style={{ margin: 0, fontSize: '14px', color: '#475569', lineHeight: 1.6 }}>
                    {truncate(app.message, 100)}
                  </p>
                </div>
              )}

              <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                <a
                  href={`mailto:${app.applicantEmail}`}
                  style={{
                    padding: '9px 22px',
                    background: '#2563eb',
                    color: '#fff',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: '14px',
                  }}
                >
                  Répondre
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
