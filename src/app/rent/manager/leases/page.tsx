'use client';

import { useEffect, useState } from 'react';

interface Lease {
  id: string;
  propertyTitle: string;
  propertyAddress: string;
  monthlyRent: number;
  status: 'ACTIVE' | 'EXPIRED' | 'PENDING' | 'TERMINATED';
  startDate: string;
  tenantName?: string;
  tenantEmail?: string;
}

const STATUS_LABELS: Record<string, string> = {
  ACTIVE: 'Actif',
  EXPIRED: 'Expiré',
  PENDING: 'En attente',
  TERMINATED: 'Résilié',
};

const STATUS_COLORS: Record<string, string> = {
  ACTIVE: '#22c55e',
  EXPIRED: '#9ca3af',
  PENDING: '#f59e0b',
  TERMINATED: '#ef4444',
};

function formatFCFA(amount: number): string {
  return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';
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

async function generateLeasePDF(lease: Lease, tenantName: string) {
  // Dynamically import jsPDF to avoid SSR issues
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF();

  const today = new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date());

  // Title
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('CONTRAT DE BAIL', 105, 30, { align: 'center' });

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`Dakar, le ${today}`, 105, 42, { align: 'center' });

  // Separator line
  doc.setDrawColor(180, 180, 180);
  doc.line(20, 50, 190, 50);

  // Parties
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text('PARTIES AU CONTRAT', 20, 62);

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text(`Locataire : ${tenantName || lease.tenantName || 'N/A'}`, 20, 74);
  if (lease.tenantEmail) {
    doc.text(`Email : ${lease.tenantEmail}`, 20, 84);
  }

  // Property details
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text('BIEN IMMOBILIER', 20, 100);

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text(`Intitulé : ${lease.propertyTitle}`, 20, 112);
  doc.text(`Adresse : ${lease.propertyAddress}`, 20, 122);

  // Financial terms
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text('CONDITIONS FINANCIÈRES', 20, 138);

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text(`Loyer mensuel : ${formatFCFA(lease.monthlyRent)}`, 20, 150);
  doc.text(`Date de début : ${formatDate(lease.startDate)}`, 20, 160);
  doc.text(`Statut du bail : ${STATUS_LABELS[lease.status] ?? lease.status}`, 20, 170);

  // Clauses
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text('CLAUSES GÉNÉRALES', 20, 186);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const clauses = [
    '1. Le loyer est payable mensuellement, le 1er de chaque mois.',
    '2. Le locataire s\'engage à maintenir le bien en bon état.',
    '3. Toute modification structurelle requiert l\'accord écrit du propriétaire.',
    '4. Le préavis de résiliation est fixé à un (1) mois.',
    '5. Le dépôt de garantie équivaut à deux (2) mois de loyer.',
  ];
  clauses.forEach((clause, i) => {
    doc.text(clause, 20, 198 + i * 10);
  });

  // Signatures
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Signature du locataire :', 20, 260);
  doc.text('Signature du propriétaire :', 120, 260);
  doc.line(20, 275, 90, 275);
  doc.line(120, 275, 190, 275);

  // Footer
  doc.setFontSize(9);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(150);
  doc.text('Document généré par LiviPro — Plateforme de gestion immobilière', 105, 290, { align: 'center' });

  doc.save(`bail_${lease.id}_${lease.propertyTitle.replace(/\s+/g, '_')}.pdf`);
}

export default function LeasesPage() {
  const [leases, setLeases] = useState<Lease[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [generatingId, setGeneratingId] = useState<string | null>(null);
  const [tenantName, setTenantName] = useState<string>('');

  async function fetchLeases() {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');

      // Try to get user info from localStorage for PDF generation
      const userStr = localStorage.getItem('user');
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          setTenantName(user.name ?? user.firstName ?? '');
        } catch {
          // ignore
        }
      }

      const res = await fetch('/api/rent/manager/leases', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Erreur lors du chargement des baux');
      const data = await res.json();
      setLeases(data.leases ?? data ?? []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchLeases();
  }, []);

  async function handleGeneratePDF(lease: Lease) {
    try {
      setGeneratingId(lease.id);
      await generateLeasePDF(lease, tenantName);
    } catch (err: unknown) {
      alert('Erreur lors de la génération du PDF : ' + (err instanceof Error ? err.message : 'Erreur inconnue'));
    } finally {
      setGeneratingId(null);
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
          onClick={fetchLeases}
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
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '40px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: 0 }}>Baux &amp; Contrats</h1>
        <span style={{ fontSize: '14px', color: '#64748b' }}>
          {leases.length} bail{leases.length !== 1 ? 'x' : ''}
        </span>
      </div>

      {leases.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '60px',
            background: '#f8fafc',
            borderRadius: '12px',
            border: '1px dashed #cbd5e1',
          }}
        >
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📄</div>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px', color: '#1e293b' }}>
            Aucun bail enregistré
          </h2>
          <p style={{ color: '#64748b', marginBottom: '28px' }}>
            Publiez une annonce et signez votre premier bail pour le voir apparaître ici.
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(420px, 1fr))', gap: '20px' }}>
          {leases.map((lease) => (
            <div
              key={lease.id}
              style={{
                background: '#fff',
                borderRadius: '12px',
                boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                border: '1px solid #e2e8f0',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h3
                  style={{
                    fontSize: '17px',
                    fontWeight: 700,
                    color: '#1e293b',
                    margin: 0,
                    flex: 1,
                    marginRight: '12px',
                  }}
                >
                  {lease.propertyTitle}
                </h3>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '3px 12px',
                    borderRadius: '999px',
                    background: STATUS_COLORS[lease.status] ?? '#9ca3af',
                    color: '#fff',
                    fontSize: '12px',
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {STATUS_LABELS[lease.status] ?? lease.status}
                </span>
              </div>

              <div style={{ fontSize: '14px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px' }}>
                📍 {lease.propertyAddress}
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '8px',
                  padding: '14px',
                  background: '#f8fafc',
                  borderRadius: '8px',
                }}
              >
                <div>
                  <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>
                    Loyer mensuel
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b', marginTop: '2px' }}>
                    {formatFCFA(lease.monthlyRent)}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>
                    Début du bail
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#475569', marginTop: '2px' }}>
                    {formatDate(lease.startDate)}
                  </div>
                </div>
              </div>

              {(lease.tenantName || lease.tenantEmail) && (
                <div style={{ fontSize: '13px', color: '#64748b' }}>
                  <span style={{ fontWeight: 600 }}>Locataire :</span>{' '}
                  {lease.tenantName ?? ''} {lease.tenantEmail ? `(${lease.tenantEmail})` : ''}
                </div>
              )}

              <button
                onClick={() => handleGeneratePDF(lease)}
                disabled={generatingId === lease.id}
                style={{
                  marginTop: '4px',
                  padding: '10px 18px',
                  background: generatingId === lease.id ? '#93c5fd' : '#2563eb',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: generatingId === lease.id ? 'not-allowed' : 'pointer',
                  fontWeight: 600,
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                {generatingId === lease.id ? (
                  'Génération en cours...'
                ) : (
                  <>📄 Générer contrat PDF</>
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
