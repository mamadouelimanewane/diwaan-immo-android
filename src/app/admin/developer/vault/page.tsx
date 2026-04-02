'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

interface VaultDocument {
    id: string;
    title: string;
    category: 'JURIDIQUE' | 'TECHNIQUE' | 'ENVIRONNEMENTAL' | 'FINANCIER';
    status: 'VALIDÉ' | 'EN_ATTENTE' | 'EXPIRÉ' | 'REJETÉ';
    date: string;
    authority?: string;
    size: string;
}

export default function DeveloperVault() {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState<'JURIDIQUE' | 'TECHNIQUE' | 'ENVIRONNEMENTAL' | 'FINANCIER'>('JURIDIQUE');
    const [uploading, setUploading] = useState(false);

    // Mockup data for the Senegal specific workflow
    const documents: VaultDocument[] = [
        { id: '1', title: 'Titre Foncier Global', category: 'JURIDIQUE', status: 'VALIDÉ', date: '12/01/2026', authority: 'Domaines (DGID)', size: '2.4 MB' },
        { id: '2', title: 'Bail Emphytéotique (Mairie)', category: 'JURIDIQUE', status: 'VALIDÉ', date: '05/11/2025', authority: 'Commune', size: '1.8 MB' },
        { id: '3', title: 'Autorisation de Lotir', category: 'TECHNIQUE', status: 'EN_ATTENTE', date: '14/03/2026', authority: 'Urbanisme', size: '4.1 MB' },
        { id: '4', title: 'Plan de Masse Approuvé', category: 'TECHNIQUE', status: 'VALIDÉ', date: '22/02/2026', authority: 'Cadastre', size: '5.6 MB' },
        { id: '5', title: 'Certificat Conformité Environnementale', category: 'ENVIRONNEMENTAL', status: 'VALIDÉ', date: '01/03/2026', authority: 'DEEC', size: '3.2 MB' },
        { id: '6', title: 'Accord Syndication Bancaire (BNDE)', category: 'FINANCIER', status: 'EN_ATTENTE', date: '28/03/2026', authority: 'Banque', size: '1.1 MB' },
        { id: '7', title: 'Quitus SENELEC (Transformateurs)', category: 'TECHNIQUE', status: 'REJETÉ', date: '30/03/2026', authority: 'SENELEC', size: '0.8 MB' }
    ];

    const filteredDocs = documents.filter(doc => doc.category === activeTab);

    const handleUpload = () => {
        setUploading(true);
        setTimeout(() => {
            alert('✅ Document téléversé avec succès pour validation par le Bureau de Contrôle !');
            setUploading(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <Link href="/admin/developer/dashboard" className="text-slate-300 hover:text-white text-sm flex items-center mb-2">
                                ← Retour au Dashboard
                            </Link>
                            <h1 className="text-3xl font-bold flex items-center gap-3">
                                <span>🏛️</span> Vault Juridique & Chantier
                            </h1>
                            <p className="mt-2 text-slate-300">
                                Centralisation probatoire et conformité du projet immobilier
                            </p>
                        </div>
                        <div className="hidden md:block">
                            <div className="bg-slate-700/50 backdrop-blur rounded-lg p-4 border border-slate-600">
                                <p className="text-sm font-semibold text-slate-200 uppercase tracking-widest mb-1">Index de Conformité</p>
                                <div className="text-3xl font-bold text-emerald-400">85%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    
                    {/* Sidebar / Tabs */}
                    <div className="lg:col-span-1 space-y-2">
                        <TabButton 
                            label="Juridique & Foncier" 
                            icon="⚖️" 
                            active={activeTab === 'JURIDIQUE'} 
                            onClick={() => setActiveTab('JURIDIQUE')} 
                        />
                        <TabButton 
                            label="Ingénierie & VRD" 
                            icon="🏗️" 
                            active={activeTab === 'TECHNIQUE'} 
                            onClick={() => setActiveTab('TECHNIQUE')} 
                        />
                        <TabButton 
                            label="Environnemental" 
                            icon="🌿" 
                            active={activeTab === 'ENVIRONNEMENTAL'} 
                            onClick={() => setActiveTab('ENVIRONNEMENTAL')} 
                        />
                        <TabButton 
                            label="Financier & Assurances" 
                            icon="💰" 
                            active={activeTab === 'FINANCIER'} 
                            onClick={() => setActiveTab('FINANCIER')} 
                        />
                        
                        <div className="mt-8 pt-8 border-t border-gray-200">
                            <button 
                                onClick={handleUpload}
                                disabled={uploading}
                                className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition"
                            >
                                {uploading ? 'Téléversement...' : '📤 Uploader un document'}
                            </button>
                            <p className="text-xs text-gray-500 mt-3 text-center">
                                Formats acceptés : PDF sécurisé, DWG, BIM (Max 50MB)
                            </p>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="lg:col-span-3">
                        <div className="bg-white shadow rounded-xl p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-slate-800">
                                    Documents : {activeTab}
                                </h2>
                                <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm font-medium">
                                    {filteredDocs.length} fichiers
                                </span>
                            </div>

                            <div className="space-y-4">
                                {filteredDocs.length > 0 ? filteredDocs.map(doc => (
                                    <div key={doc.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition bg-gray-50/50">
                                        <div className="flex items-center gap-4 mb-3 sm:mb-0">
                                            <div className="text-3xl">📄</div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{doc.title}</h3>
                                                <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                                                    <span>{doc.date}</span>
                                                    <span>•</span>
                                                    <span>{doc.size}</span>
                                                    {doc.authority && (
                                                        <>
                                                            <span>•</span>
                                                            <span className="text-blue-600 truncate max-w-[120px]">{doc.authority}</span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                                doc.status === 'VALIDÉ' ? 'bg-green-100 text-green-700' :
                                                doc.status === 'EN_ATTENTE' ? 'bg-orange-100 text-orange-700' :
                                                'bg-red-100 text-red-700'
                                            }`}>
                                                {doc.status}
                                            </span>
                                            <button className="text-slate-400 hover:text-blue-600 transition">
                                                ⬇️
                                            </button>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="text-center py-12 bg-slate-50 rounded-lg border-2 border-dashed border-slate-200">
                                        <div className="text-4xl mb-3 opacity-50">📂</div>
                                        <p className="text-slate-500 font-medium">Aucun document dans cette catégorie</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function TabButton({ label, icon, active, onClick }: { label: string, icon: string, active: boolean, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left font-medium transition ${
                active 
                ? 'bg-slate-800 text-white shadow-md' 
                : 'text-slate-600 hover:bg-slate-100'
            }`}
        >
            <span className="text-xl">{icon}</span>
            {label}
        </button>
    );
}
