'use client';

import { useState } from 'react';
import { jsPDF } from 'jspdf';
import { FileText, Download, Send, AlertCircle } from 'lucide-react';

export default function PaymentsPage() {
    const [tenants, setTenants] = useState([
        { id: 1, name: "Amadou Diallo", property: "Appartement F4 Mermoz", rent: 500000, due: "05/12/2025", status: "LATE" },
        { id: 2, name: "Sophie Ndiaye", property: "Villa R+1 Saly", rent: 350000, due: "01/12/2025", status: "PAID" },
        { id: 3, name: "Moussa Sow", property: "Studio Plateau", rent: 150000, due: "05/12/2025", status: "PENDING" },
    ]);

    const generateReceipt = (tenant: any) => {
        const doc = new jsPDF();

        // Header
        doc.setFontSize(22);
        doc.setTextColor(0, 106, 255); // Diwaan Blue
        doc.text("Diwaan Immobilier", 20, 20);

        doc.setFontSize(16);
        doc.setTextColor(0, 0, 0);
        doc.text("QUITTANCE DE LOYER", 105, 40, { align: 'center' });

        // Info
        doc.setFontSize(12);
        doc.text(`Période : Décembre 2024`, 20, 60);
        doc.text(`Date de paiement : ${new Date().toLocaleDateString('fr-FR')}`, 20, 70);

        // Box Tenant
        doc.setDrawColor(200);
        doc.rect(20, 80, 170, 40);
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text("LOCATAIRE", 25, 88);
        doc.setFontSize(14);
        doc.setTextColor(0);
        doc.text(tenant.name, 25, 100);
        doc.setFontSize(12);
        doc.text(tenant.property, 25, 110);

        // Amount
        doc.setFontSize(14);
        doc.text(`Pour un montant de :`, 20, 140);
        doc.setFontSize(18);
        doc.setFont("helvetica", "bold");
        doc.text(`${tenant.rent.toLocaleString()} FCFA`, 80, 140);

        // Footer
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.text("Ce document est généré électroniquement par Diwaan Gestion.", 105, 280, { align: 'center' });

        doc.save(`Quittance_${tenant.name}_Dec2024.pdf`);
    };

    const sendWhatsAppReminder = (tenant: any) => {
        const message = `Bonjour ${tenant.name}, ceci est un rappel pour le loyer de ${tenant.property} d'un montant de ${tenant.rent.toLocaleString()} FCFA. Merci de procéder au paiement.`;
        const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [selectedTenant, setSelectedTenant] = useState<any>(null);
    const [paymentStep, setPaymentStep] = useState(1); // 1: Select Method, 2: Processing, 3: Success

    const openPaymentModal = (tenant: any) => {
        setSelectedTenant(tenant);
        setPaymentStep(1);
        setShowPaymentModal(true);
    };

    const processPayment = (method: 'WAVE' | 'OM') => {
        setPaymentStep(2);
        setTimeout(() => {
            setPaymentStep(3);

            // Update local state to show paid
            setTenants(prev => prev.map(t =>
                t.id === selectedTenant.id ? { ...t, status: 'PAID' } : t
            ));
        }, 3000);
    };

    return (
        <div className="container" style={{ padding: '40px 24px' }}>
            {/* Modal */}
            {showPaymentModal && selectedTenant && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div style={{ background: 'white', padding: '32px', borderRadius: '16px', width: '400px', maxWidth: '90%', boxShadow: '0 20px 50px rgba(0,0,0,0.2)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                            <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>Paiement Loyer</h3>
                            <button onClick={() => setShowPaymentModal(false)} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}>&times;</button>
                        </div>

                        {paymentStep === 1 && (
                            <>
                                <p style={{ marginBottom: '24px', color: '#666' }}>
                                    Paiement pour <strong>{selectedTenant.name}</strong><br />
                                    Montant: <strong>{selectedTenant.rent.toLocaleString()} FCFA</strong>
                                </p>
                                <div style={{ display: 'grid', gap: '16px' }}>
                                    <button
                                        onClick={() => processPayment('WAVE')}
                                        style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0', background: '#E6F6FF', cursor: 'pointer', fontWeight: 'bold', color: '#003366' }}
                                    >
                                        <div style={{ width: '40px', height: '40px', background: '#1DC4FF', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>W</div>
                                        Payer avec Wave
                                    </button>
                                    <button
                                        onClick={() => processPayment('OM')}
                                        style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0', background: '#FFF5EB', cursor: 'pointer', fontWeight: 'bold', color: '#C05621' }}
                                    >
                                        <div style={{ width: '40px', height: '40px', background: '#FF7900', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>OM</div>
                                        Payer avec Orange Money
                                    </button>
                                </div>
                            </>
                        )}

                        {paymentStep === 2 && (
                            <div style={{ textAlign: 'center', padding: '40px 0' }}>
                                <div className="spinner" style={{ width: '40px', height: '40px', border: '4px solid #F3F3F3', borderTop: '4px solid #006AFF', borderRadius: '50%', margin: '0 auto 24px', animation: 'spin 1s linear infinite' }}></div>
                                <p style={{ fontWeight: 'bold' }}>Traitement en cours...</p>
                                <p style={{ fontSize: '14px', color: '#666' }}>Veuillez valider sur votre téléphone.</p>
                            </div>
                        )}

                        {paymentStep === 3 && (
                            <div style={{ textAlign: 'center', padding: '20px 0' }}>
                                <div style={{ width: '60px', height: '60px', background: '#C6F6D5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#22543D', fontSize: '30px', margin: '0 auto 24px' }}>✓</div>
                                <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px', color: '#22543D' }}>Paiement Réussi !</h4>
                                <p style={{ color: '#666', marginBottom: '24px' }}>La quittance a été générée automatiquement.</p>
                                <button
                                    onClick={() => { setShowPaymentModal(false); generateReceipt(selectedTenant); }}
                                    className="btn btn-primary"
                                    style={{ width: '100%' }}
                                >
                                    Fermer et télécharger quittance
                                </button>
                            </div>
                        )}

                        {/* Inline Style for Spinner */}
                        <style jsx>{`
                            @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                        `}</style>
                    </div>
                </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                <h1 style={{ fontSize: '32px', fontWeight: 'bold' }}>Suivi des Loyers</h1>
                <button className="btn btn-primary" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <FileText size={18} /> Configurer les quittances
                </button>
            </div>

            <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #E2E8F0', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ background: '#F7FAFC' }}>
                        <tr>
                            <th style={{ padding: '16px', textAlign: 'left', borderBottom: '1px solid #E2E8F0', color: '#4A5568' }}>Locataire</th>
                            <th style={{ padding: '16px', textAlign: 'left', borderBottom: '1px solid #E2E8F0', color: '#4A5568' }}>Bien loué</th>
                            <th style={{ padding: '16px', textAlign: 'left', borderBottom: '1px solid #E2E8F0', color: '#4A5568' }}>Montant</th>
                            <th style={{ padding: '16px', textAlign: 'left', borderBottom: '1px solid #E2E8F0', color: '#4A5568' }}>Échéance</th>
                            <th style={{ padding: '16px', textAlign: 'left', borderBottom: '1px solid #E2E8F0', color: '#4A5568' }}>Statut</th>
                            <th style={{ padding: '16px', textAlign: 'right', borderBottom: '1px solid #E2E8F0', color: '#4A5568' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tenants.map(tenant => (
                            <tr key={tenant.id} style={{ borderBottom: '1px solid #EDF2F7' }}>
                                <td style={{ padding: '16px', fontWeight: 'bold' }}>{tenant.name}</td>
                                <td style={{ padding: '16px', color: '#718096' }}>{tenant.property}</td>
                                <td style={{ padding: '16px', fontWeight: 'bold' }}>{tenant.rent.toLocaleString()} FCFA</td>
                                <td style={{ padding: '16px' }}>{tenant.due}</td>
                                <td style={{ padding: '16px' }}>
                                    <span style={{
                                        padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold',
                                        background: tenant.status === 'PAID' ? '#C6F6D5' : tenant.status === 'LATE' ? '#FED7D7' : '#FEFCBF',
                                        color: tenant.status === 'PAID' ? '#22543D' : tenant.status === 'LATE' ? '#C53030' : '#744210'
                                    }}>
                                        {tenant.status === 'PAID' ? 'PAYÉ' : tenant.status === 'LATE' ? 'RETARD' : 'EN ATTENTE'}
                                    </span>
                                </td>
                                <td style={{ padding: '16px', textAlign: 'right' }}>

                                    {tenant.status === 'PAID' ? (
                                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                            <button
                                                onClick={() => generateReceipt(tenant)}
                                                style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '8px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', background: 'white', cursor: 'pointer', color: '#006AFF' }}
                                                title="Télécharger Quittance"
                                            >
                                                <Download size={16} /> Quittance
                                            </button>
                                        </div>
                                    ) : (
                                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                            <button
                                                onClick={() => openPaymentModal(tenant)}
                                                style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '8px 12px', borderRadius: '8px', border: 'none', background: '#006AFF', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}
                                                title="Saisir un paiement"
                                            >
                                                Payer (Wave/OM)
                                            </button>
                                            <button
                                                onClick={() => sendWhatsAppReminder(tenant)}
                                                style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '8px 12px', borderRadius: '8px', border: 'none', background: '#25D366', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}
                                                title="Relance WhatsApp"
                                            >
                                                <Send size={16} /> Relancer
                                            </button>
                                        </div>
                                    )}

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div style={{ marginTop: '24px', padding: '16px', background: '#EBF8FF', borderRadius: '8px', display: 'flex', gap: '12px', color: '#2C5282' }}>
                <AlertCircle size={24} />
                <div>
                    <strong>Conseil Diwaan :</strong> Les quittances sont générées automatiquement dès que vous marquez un paiement comme reçu.
                    En cas de retard de plus de 5 jours, une relance WhatsApp est recommandée.
                </div>
            </div>
        </div>
    );
}
