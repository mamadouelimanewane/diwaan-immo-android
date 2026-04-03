'use client';

import { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';

interface Plot {
    plotNumber: string;
}

interface Project {
    name: string;
}

interface Reservation {
    id: string;
    reservationNumber?: string;
    clientFirstName: string;
    clientLastName: string;
    plot?: Plot;
    project?: Project;
}

interface Payment {
    id: string;
    amount: number;
    paymentMethod: string;
    status: 'PENDING' | 'COMPLETED' | 'LATE' | 'CANCELLED' | 'REFUNDED';
    dueDate: string;
    createdAt?: string;
    reservation?: Reservation;
}

const STATUS_LABELS: Record<string, string> = {
    PENDING: 'En attente',
    COMPLETED: 'Complété',
    LATE: 'En retard',
    CANCELLED: 'Annulé',
    REFUNDED: 'Remboursé',
};

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
    PENDING: { bg: '#FEF3C7', color: '#92400E' },
    COMPLETED: { bg: '#D1FAE5', color: '#065F46' },
    LATE: { bg: '#FEE2E2', color: '#991B1B' },
    CANCELLED: { bg: '#F3F4F6', color: '#374151' },
    REFUNDED: { bg: '#EDE9FE', color: '#5B21B6' },
};

const METHOD_LABELS: Record<string, string> = {
    WAVE: 'Wave',
    ORANGE_MONEY: 'Orange Money',
    CASH: 'Espèces',
    BANK_TRANSFER: 'Virement bancaire',
    CHECK: 'Chèque',
};

type FilterType = 'ALL' | 'PENDING' | 'COMPLETED' | 'LATE';

function formatFCFA(amount: number): string {
    return amount.toLocaleString('fr-FR') + ' FCFA';
}

function formatDate(dateStr: string): string {
    if (!dateStr) return '—';
    try {
        return new Date(dateStr).toLocaleDateString('fr-FR');
    } catch {
        return dateStr;
    }
}

export default function PaymentsPage() {
    const [payments, setPayments] = useState<Payment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<FilterType>('ALL');

    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch('/api/rent/manager/payments', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(async (res) => {
                if (!res.ok) {
                    const text = await res.text();
                    throw new Error(text || `Erreur ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                const list: Payment[] = Array.isArray(data)
                    ? data
                    : Array.isArray(data?.payments)
                    ? data.payments
                    : [];
                setPayments(list);
            })
            .catch((err) => {
                setError(err.message || 'Impossible de charger les paiements.');
            })
            .finally(() => setLoading(false));
    }, []);

    const stats = {
        total: payments.length,
        pending: payments.filter((p) => p.status === 'PENDING').length,
        completed: payments.filter((p) => p.status === 'COMPLETED').length,
        late: payments.filter((p) => p.status === 'LATE').length,
        totalReceived: payments
            .filter((p) => p.status === 'COMPLETED')
            .reduce((sum, p) => sum + (p.amount || 0), 0),
    };

    const filtered = filter === 'ALL' ? payments : payments.filter((p) => p.status === filter);

    const generateReceipt = (payment: Payment) => {
        const doc = new jsPDF();
        const res = payment.reservation;
        const clientName = res
            ? `${res.clientFirstName || ''} ${res.clientLastName || ''}`.trim()
            : 'N/A';
        const reservationNumber = res?.reservationNumber || res?.id || 'N/A';
        const plotNumber = res?.plot?.plotNumber || 'N/A';
        const projectName = res?.project?.name || 'N/A';
        const paymentDate = payment.createdAt
            ? new Date(payment.createdAt).toLocaleDateString('fr-FR')
            : new Date().toLocaleDateString('fr-FR');
        const methodLabel =
            METHOD_LABELS[payment.paymentMethod] || payment.paymentMethod || 'N/A';

        // --- Branding header ---
        doc.setFillColor(0, 82, 180);
        doc.rect(0, 0, 210, 28, 'F');

        doc.setFontSize(20);
        doc.setTextColor(255, 255, 255);
        doc.setFont('helvetica', 'bold');
        doc.text('DIWAAN IMMOBILIER', 14, 18);

        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.text('Gestion Locative & Transactions Immobilières', 14, 25);

        // --- Document title ---
        doc.setFontSize(18);
        doc.setTextColor(0, 52, 130);
        doc.setFont('helvetica', 'bold');
        doc.text('QUITTANCE DE PAIEMENT', 105, 46, { align: 'center' });

        doc.setDrawColor(0, 82, 180);
        doc.setLineWidth(0.5);
        doc.line(14, 50, 196, 50);

        // --- Info block ---
        doc.setFontSize(10);
        doc.setTextColor(80, 80, 80);
        doc.setFont('helvetica', 'normal');
        doc.text(`Date d'émission : ${new Date().toLocaleDateString('fr-FR')}`, 14, 60);
        doc.text(`Date de paiement : ${paymentDate}`, 14, 68);
        doc.text(`Référence réservation : ${reservationNumber}`, 14, 76);

        // --- Client section ---
        doc.setFillColor(240, 245, 255);
        doc.roundedRect(14, 86, 182, 38, 3, 3, 'F');

        doc.setFontSize(9);
        doc.setTextColor(100, 100, 120);
        doc.setFont('helvetica', 'bold');
        doc.text('CLIENT', 20, 96);

        doc.setFontSize(13);
        doc.setTextColor(20, 20, 40);
        doc.setFont('helvetica', 'bold');
        doc.text(clientName, 20, 107);

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(80, 80, 100);
        doc.text(`Parcelle : ${plotNumber}   |   Projet : ${projectName}`, 20, 117);

        // --- Payment details table ---
        const tableTop = 136;
        const rowH = 12;
        const rows = [
            ['Montant', formatFCFA(payment.amount || 0)],
            ['Méthode de paiement', methodLabel],
            ["Date d'échéance", formatDate(payment.dueDate)],
            ['Statut', STATUS_LABELS[payment.status] || payment.status],
        ];

        doc.setFillColor(0, 82, 180);
        doc.rect(14, tableTop, 182, rowH, 'F');
        doc.setFontSize(9);
        doc.setTextColor(255, 255, 255);
        doc.setFont('helvetica', 'bold');
        doc.text('Désignation', 20, tableTop + 8);
        doc.text('Détail', 120, tableTop + 8);

        rows.forEach((row, i) => {
            const y = tableTop + rowH + i * rowH;
            if (i % 2 === 0) {
                doc.setFillColor(248, 250, 255);
                doc.rect(14, y, 182, rowH, 'F');
            }
            doc.setFontSize(9);
            doc.setTextColor(40, 40, 60);
            doc.setFont('helvetica', 'normal');
            doc.text(row[0], 20, y + 8);
            doc.setFont('helvetica', 'bold');
            doc.text(row[1], 120, y + 8);
        });

        // Border around table
        doc.setDrawColor(200, 210, 235);
        doc.setLineWidth(0.3);
        doc.rect(14, tableTop, 182, rowH * (rows.length + 1), 'S');

        // --- Amount highlight ---
        const amtY = tableTop + rowH * (rows.length + 1) + 16;
        doc.setFillColor(0, 52, 130);
        doc.roundedRect(14, amtY, 182, 22, 4, 4, 'F');
        doc.setFontSize(12);
        doc.setTextColor(255, 255, 255);
        doc.setFont('helvetica', 'bold');
        doc.text('MONTANT TOTAL REÇU :', 20, amtY + 14);
        doc.setFontSize(14);
        doc.text(formatFCFA(payment.amount || 0), 196, amtY + 14, { align: 'right' });

        // --- Signature ---
        const sigY = amtY + 42;
        doc.setDrawColor(180, 180, 200);
        doc.setLineWidth(0.3);
        doc.line(120, sigY + 20, 196, sigY + 20);
        doc.setFontSize(9);
        doc.setTextColor(100, 100, 120);
        doc.setFont('helvetica', 'normal');
        doc.text('Signature & Cachet Diwaan', 158, sigY + 26, { align: 'center' });

        doc.setFontSize(8);
        doc.text('Le gestionnaire,', 14, sigY + 8);
        doc.line(14, sigY + 20, 90, sigY + 20);
        doc.text('Signature du gestionnaire', 52, sigY + 26, { align: 'center' });

        // --- Footer ---
        doc.setFillColor(245, 247, 252);
        doc.rect(0, 275, 210, 22, 'F');
        doc.setFontSize(8);
        doc.setTextColor(120, 120, 140);
        doc.setFont('helvetica', 'italic');
        doc.text(
            'Ce document est généré électroniquement par Diwaan Gestion Immobilière. Il constitue une preuve légale de paiement.',
            105,
            283,
            { align: 'center' }
        );
        doc.text('www.diwaan.sn  |  contact@diwaan.sn  |  +221 33 000 00 00', 105, 290, {
            align: 'center',
        });

        doc.save(`Quittance_${reservationNumber}_${clientName.replace(/\s+/g, '_')}.pdf`);
    };

    const filterButtons: { label: string; value: FilterType; color: string }[] = [
        { label: 'Tous', value: 'ALL', color: '#1E40AF' },
        { label: 'En attente', value: 'PENDING', color: '#92400E' },
        { label: 'Complétés', value: 'COMPLETED', color: '#065F46' },
        { label: 'En retard', value: 'LATE', color: '#991B1B' },
    ];

    return (
        <div style={{ padding: '32px 24px', minHeight: '100vh', background: '#F8FAFC', fontFamily: 'Inter, system-ui, sans-serif' }}>

            {/* Page header */}
            <div style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#0F172A', margin: 0 }}>
                    Gestion des Paiements
                </h1>
                <p style={{ color: '#64748B', marginTop: '6px', fontSize: '14px' }}>
                    Suivi et gestion de tous les paiements
                </p>
            </div>

            {/* Stats bar */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', marginBottom: '28px' }}>
                <div style={{ background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.07)', borderLeft: '4px solid #3B82F6' }}>
                    <p style={{ fontSize: '12px', color: '#64748B', margin: '0 0 6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total paiements</p>
                    <p style={{ fontSize: '28px', fontWeight: '700', color: '#0F172A', margin: 0 }}>{stats.total}</p>
                </div>
                <div style={{ background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.07)', borderLeft: '4px solid #F59E0B' }}>
                    <p style={{ fontSize: '12px', color: '#64748B', margin: '0 0 6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>En attente</p>
                    <p style={{ fontSize: '28px', fontWeight: '700', color: '#92400E', margin: 0 }}>{stats.pending}</p>
                </div>
                <div style={{ background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.07)', borderLeft: '4px solid #10B981' }}>
                    <p style={{ fontSize: '12px', color: '#64748B', margin: '0 0 6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Complétés</p>
                    <p style={{ fontSize: '28px', fontWeight: '700', color: '#065F46', margin: 0 }}>{stats.completed}</p>
                </div>
                <div style={{ background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.07)', borderLeft: '4px solid #EF4444' }}>
                    <p style={{ fontSize: '12px', color: '#64748B', margin: '0 0 6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>En retard</p>
                    <p style={{ fontSize: '28px', fontWeight: '700', color: '#991B1B', margin: 0 }}>{stats.late}</p>
                </div>
                <div style={{ background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.07)', borderLeft: '4px solid #6366F1' }}>
                    <p style={{ fontSize: '12px', color: '#64748B', margin: '0 0 6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Montant total reçu</p>
                    <p style={{ fontSize: '18px', fontWeight: '700', color: '#1E1B4B', margin: 0 }}>{formatFCFA(stats.totalReceived)}</p>
                </div>
            </div>

            {/* Filter buttons */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
                {filterButtons.map((btn) => (
                    <button
                        key={btn.value}
                        onClick={() => setFilter(btn.value)}
                        style={{
                            padding: '8px 20px',
                            borderRadius: '8px',
                            border: filter === btn.value ? 'none' : '1px solid #E2E8F0',
                            background: filter === btn.value ? btn.color : 'white',
                            color: filter === btn.value ? 'white' : '#374151',
                            fontWeight: filter === btn.value ? '600' : '400',
                            fontSize: '14px',
                            cursor: 'pointer',
                            transition: 'all 0.15s',
                        }}
                    >
                        {btn.label}
                        {btn.value !== 'ALL' && (
                            <span style={{
                                marginLeft: '8px',
                                background: filter === btn.value ? 'rgba(255,255,255,0.25)' : '#F1F5F9',
                                color: filter === btn.value ? 'white' : '#64748B',
                                borderRadius: '10px',
                                padding: '1px 7px',
                                fontSize: '12px',
                                fontWeight: '600',
                            }}>
                                {btn.value === 'PENDING' ? stats.pending : btn.value === 'COMPLETED' ? stats.completed : stats.late}
                            </span>
                        )}
                    </button>
                ))}
            </div>

            {/* Loading state */}
            {loading && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 0', flexDirection: 'column', gap: '16px' }}>
                    <div style={{
                        width: '44px', height: '44px',
                        border: '4px solid #E2E8F0',
                        borderTop: '4px solid #3B82F6',
                        borderRadius: '50%',
                        animation: 'spin 0.8s linear infinite',
                    }} />
                    <p style={{ color: '#64748B', fontSize: '15px' }}>Chargement des paiements...</p>
                    <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
                </div>
            )}

            {/* Error state */}
            {!loading && error && (
                <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '12px', padding: '24px', textAlign: 'center', color: '#991B1B' }}>
                    <p style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 6px' }}>Erreur de chargement</p>
                    <p style={{ fontSize: '14px', margin: 0, color: '#B91C1C' }}>{error}</p>
                </div>
            )}

            {/* Empty state */}
            {!loading && !error && filtered.length === 0 && (
                <div style={{ background: 'white', borderRadius: '16px', padding: '64px 24px', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.07)' }}>
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>💳</div>
                    <p style={{ fontSize: '18px', fontWeight: '600', color: '#0F172A', margin: '0 0 8px' }}>
                        Aucun paiement trouvé
                    </p>
                    <p style={{ color: '#64748B', fontSize: '14px', margin: 0 }}>
                        {filter === 'ALL'
                            ? 'Aucun paiement enregistré pour le moment.'
                            : `Aucun paiement avec le statut « ${STATUS_LABELS[filter]} ».`}
                    </p>
                </div>
            )}

            {/* Payments table */}
            {!loading && !error && filtered.length > 0 && (
                <div style={{ background: 'white', borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.07)', overflow: 'hidden' }}>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                                    {['Réservation', 'Client', 'Parcelle', 'Projet', 'Montant', 'Méthode', 'Statut', 'Échéance', 'Actions'].map((h) => (
                                        <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((payment, idx) => {
                                    const res = payment.reservation;
                                    const clientName = res
                                        ? `${res.clientFirstName || ''} ${res.clientLastName || ''}`.trim()
                                        : '—';
                                    const reservationNumber = res?.reservationNumber || res?.id || '—';
                                    const plotNumber = res?.plot?.plotNumber || '—';
                                    const projectName = res?.project?.name || '—';
                                    const sc = STATUS_COLORS[payment.status] || { bg: '#F3F4F6', color: '#374151' };

                                    return (
                                        <tr
                                            key={payment.id}
                                            style={{
                                                borderBottom: idx < filtered.length - 1 ? '1px solid #F1F5F9' : 'none',
                                                transition: 'background 0.1s',
                                            }}
                                            onMouseEnter={(e) => (e.currentTarget.style.background = '#F8FAFC')}
                                            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                                        >
                                            <td style={{ padding: '14px 16px', fontSize: '13px', color: '#1E40AF', fontWeight: '600', whiteSpace: 'nowrap' }}>
                                                #{reservationNumber}
                                            </td>
                                            <td style={{ padding: '14px 16px', fontSize: '14px', fontWeight: '500', color: '#0F172A', whiteSpace: 'nowrap' }}>
                                                {clientName}
                                            </td>
                                            <td style={{ padding: '14px 16px', fontSize: '13px', color: '#475569', whiteSpace: 'nowrap' }}>
                                                {plotNumber}
                                            </td>
                                            <td style={{ padding: '14px 16px', fontSize: '13px', color: '#475569', maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                {projectName}
                                            </td>
                                            <td style={{ padding: '14px 16px', fontSize: '14px', fontWeight: '600', color: '#0F172A', whiteSpace: 'nowrap' }}>
                                                {formatFCFA(payment.amount || 0)}
                                            </td>
                                            <td style={{ padding: '14px 16px', fontSize: '13px', color: '#475569', whiteSpace: 'nowrap' }}>
                                                {METHOD_LABELS[payment.paymentMethod] || payment.paymentMethod || '—'}
                                            </td>
                                            <td style={{ padding: '14px 16px', whiteSpace: 'nowrap' }}>
                                                <span style={{
                                                    display: 'inline-block',
                                                    padding: '4px 10px',
                                                    borderRadius: '20px',
                                                    fontSize: '12px',
                                                    fontWeight: '600',
                                                    background: sc.bg,
                                                    color: sc.color,
                                                }}>
                                                    {STATUS_LABELS[payment.status] || payment.status}
                                                </span>
                                            </td>
                                            <td style={{ padding: '14px 16px', fontSize: '13px', color: '#475569', whiteSpace: 'nowrap' }}>
                                                {formatDate(payment.dueDate)}
                                            </td>
                                            <td style={{ padding: '14px 16px', whiteSpace: 'nowrap' }}>
                                                <button
                                                    onClick={() => generateReceipt(payment)}
                                                    title="Générer quittance PDF"
                                                    style={{
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        gap: '6px',
                                                        padding: '7px 14px',
                                                        borderRadius: '8px',
                                                        border: '1px solid #DBEAFE',
                                                        background: '#EFF6FF',
                                                        color: '#1D4ED8',
                                                        fontSize: '12px',
                                                        fontWeight: '600',
                                                        cursor: 'pointer',
                                                        transition: 'all 0.15s',
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.background = '#DBEAFE';
                                                        e.currentTarget.style.borderColor = '#93C5FD';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.background = '#EFF6FF';
                                                        e.currentTarget.style.borderColor = '#DBEAFE';
                                                    }}
                                                >
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                                        <polyline points="14 2 14 8 20 8" />
                                                        <line x1="12" y1="18" x2="12" y2="12" />
                                                        <line x1="9" y1="15" x2="15" y2="15" />
                                                    </svg>
                                                    Générer quittance PDF
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Table footer count */}
                    <div style={{ padding: '12px 16px', borderTop: '1px solid #F1F5F9', fontSize: '13px', color: '#94A3B8' }}>
                        {filtered.length} paiement{filtered.length > 1 ? 's' : ''} affiché{filtered.length > 1 ? 's' : ''}
                        {filter !== 'ALL' ? ` (filtre : ${STATUS_LABELS[filter]})` : ''}
                    </div>
                </div>
            )}
        </div>
    );
}
