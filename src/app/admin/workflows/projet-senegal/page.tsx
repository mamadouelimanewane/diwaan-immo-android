'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ProjetSenegalRoadmapPage() {
    const [expandedPhase, setExpandedPhase] = useState<number>(1);
    const [tasks, setTasks] = useState<{ [key: string]: boolean }>({
        '1-1-1': true,
        '1-1-2': false,
    });

    const toggleTask = (taskId: string) => {
        setTasks(prev => ({ ...prev, [taskId]: !prev[taskId] }));
    };

    const calculateProgress = (phaseTasksIds: string[]) => {
        if (phaseTasksIds.length === 0) return 0;
        const completed = phaseTasksIds.filter(id => tasks[id]).length;
        return Math.round((completed / phaseTasksIds.length) * 100);
    };

    const phases = [
        {
            id: 1,
            title: "PHASE 1 : INITIATION & SÉCURISATION FONCIÈRE",
            duration: "3 à 6 mois",
            status: "En cours",
            tasks: [
                { id: '1-1-1', title: 'Signature du Mémorandum d\'Entente (MoU) avec la Mairie' },
                { id: '1-1-2', title: 'Désaffectation / Avis CCOD et Arrêté Préfectoral' },
                { id: '1-1-3', title: 'Transformation du Bail en Titre Foncier (DGID)' },
                { id: '1-1-4', title: 'Création de la SPV / SCI Notariée' },
            ]
        },
        {
            id: 2,
            title: "PHASE 2 : INGÉNIERIE & AUTORISATIONS",
            duration: "4 à 8 mois",
            status: "À faire",
            tasks: [
                { id: '2-1-1', title: 'Levés Topographiques & Attribution NICAD' },
                { id: '2-1-2', title: 'Études Géotechniques des Sols' },
                { id: '2-1-3', title: 'Étude d\'Impact Environnemental (DEEC)' },
                { id: '2-1-4', title: 'Plan de Masse Définitif & Servitudes' },
                { id: '2-1-5', title: 'Permis de Construire / Autorisation de Lotir' },
            ]
        },
        {
            id: 3,
            title: "PHASE 3 : STRUCTURATION FINANCIÈRE",
            duration: "2 à 4 mois",
            status: "À faire",
            tasks: [
                { id: '3-1-1', title: 'Calcul des Capex, Opex et Fiscalité' },
                { id: '3-1-2', title: 'Modélisation Excel (TIR, VAN)' },
                { id: '3-1-3', title: 'Convention Bancaire (Emprunt)' },
                { id: '3-1-4', title: 'Création du Compte Séquestre VEFA' },
            ]
        },
        {
            id: 4,
            title: "PHASE 4 : COMMERCIALISATION & VEFA",
            duration: "Continue",
            status: "À faire",
            tasks: [
                { id: '4-1-1', title: 'Mise en ligne DIWAAN & Plaquettes 3D' },
                { id: '4-1-2', title: 'Contrats Courtiers & Agences' },
                { id: '4-1-3', title: 'KYC Clients & Contrats de Réservation' },
                { id: '4-1-4', title: 'Actes Authentiques VEFA' },
                { id: '4-1-5', title: 'Appels de fonds' },
            ]
        },
        {
            id: 5,
            title: "PHASE 5 : CONSTRUCTION & VIABILISATION (VRD)",
            duration: "12 à 24 mois",
            status: "À faire",
            tasks: [
                { id: '5-1-1', title: 'Appels d\'offres BTP' },
                { id: '5-1-2', title: 'Voiries / Assainissement ONAS' },
                { id: '5-1-3', title: 'Électricité SENELEC / Eau SONES' },
                { id: '5-1-4', title: 'Construction Bâtiments & Suivi B.Contrôle' },
            ]
        },
        {
            id: 6,
            title: "PHASE 6 : LIVRAISON, MUTATION & SAV",
            duration: "3 à 6 mois",
            status: "À faire",
            tasks: [
                { id: '6-1-1', title: 'Réception Technique Provisoire' },
                { id: '6-1-2', title: 'Certificat de Conformité Urbanisme' },
                { id: '6-1-3', title: 'Démembrement TF Mère en TF Enfants' },
                { id: '6-1-4', title: 'Signatures Actes Définitifs' },
                { id: '6-1-5', title: 'Création de l\'ASL / Syndic' },
            ]
        }
    ];

    const overallProgress = Math.round(
        (Object.values(tasks).filter(Boolean).length / phases.reduce((acc, phase) => acc + phase.tasks.length, 0)) * 100
    );

    const [activeTab, setActiveTab] = useState<'roadmap' | 'carto' | 'archives' | 'reporting'>('roadmap');

    const tabs = [
        { id: 'roadmap', label: '📋 Roadmap', description: 'Suivi WBS' },
        { id: 'carto', label: '🗺️ Carto & Foncier', description: 'NICAD & Plans' },
        { id: 'ia_prediction', label: '🤖 IA & Jumeau 3D', description: 'Prix Prédictif & Twin' },
        { id: 'archives', label: '📚 Vault Légal', description: 'Base Juridique' },
        { id: 'reporting', label: '📊 Finance', description: 'États & KPIs' },
        { id: 'mairie_live', label: '🏛️ Impact Mairie', description: 'Portail Collectivité' }
    ];

    return (
        <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                <div>
                    <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1B254B', marginBottom: '8px' }}>Roadmap de Déploiement : Promoteur (Sénégal)</h1>
                    <p style={{ color: '#A3AED0', fontSize: '15px' }}>Hub Central de Pilotage : Exécution, Cartographie Foncière, Juridique et Financier.</p>
                </div>
                {activeTab === 'roadmap' && (
                    <div style={{ textAlign: 'right', background: 'white', padding: '12px 20px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
                        <div style={{ fontSize: '12px', color: '#A3AED0', marginBottom: '4px', textTransform: 'uppercase', fontWeight: 'bold' }}>Avancement Global du Chantier</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ width: '150px', height: '10px', background: '#E2E8F0', borderRadius: '5px', overflow: 'hidden' }}>
                                <div style={{ width: `${overallProgress}%`, height: '100%', background: '#05CD99', transition: 'width 0.3s' }} />
                            </div>
                            <span style={{ fontWeight: 'bold', fontSize: '18px', color: '#1B254B' }}>{overallProgress}%</span>
                        </div>
                    </div>
                )}
            </div>

            {/* TABS NAVIGATION */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', background: 'white', padding: '8px', borderRadius: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                {tabs.map(tab => (
                    <div 
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        style={{ 
                            flex: 1, 
                            padding: '16px', 
                            borderRadius: '16px', 
                            cursor: 'pointer',
                            textAlign: 'center',
                            background: activeTab === tab.id ? '#006AFF' : 'transparent',
                            color: activeTab === tab.id ? 'white' : '#707EAE',
                            transition: 'all 0.2s',
                            border: activeTab === tab.id ? 'none' : '1px solid transparent'
                        }}
                    >
                        <div style={{ fontWeight: 'bold', fontSize: '15px', marginBottom: '4px' }}>{tab.label}</div>
                        <div style={{ fontSize: '12px', opacity: activeTab === tab.id ? 0.8 : 0.6 }}>{tab.description}</div>
                    </div>
                ))}
            </div>

            {/* TAB CONTENT: ROADMAP */}
            {activeTab === 'roadmap' && (
                <div style={{ display: 'flex', gap: '24px' }}>
                    {/* Phases List */}
                <div style={{ flex: '0 0 350px' }}>
                    {phases.map((phase, index) => {
                        const phaseTasksIds = phase.tasks.map(t => t.id);
                        const progress = calculateProgress(phaseTasksIds);
                        
                        return (
                            <div 
                                key={phase.id}
                                onClick={() => setExpandedPhase(phase.id)}
                                style={{ 
                                    padding: '20px', 
                                    background: expandedPhase === phase.id ? '#006AFF' : 'white', 
                                    color: expandedPhase === phase.id ? 'white' : '#1B254B',
                                    borderRadius: '16px', 
                                    marginBottom: '16px',
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                                    transition: 'all 0.2s',
                                    border: expandedPhase !== phase.id ? '1px solid #E2E8F0' : 'none'
                                }}
                            >
                                <div style={{ fontSize: '12px', fontWeight: 'bold', opacity: expandedPhase === phase.id ? 0.8 : 0.5, marginBottom: '8px' }}>
                                    PHASE {index + 1} • {phase.duration}
                                </div>
                                <h3 style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '16px', lineHeight: 1.4 }}>
                                    {phase.title.replace(`PHASE ${phase.id} : `, '')}
                                </h3>
                                
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{ flex: 1, height: '6px', background: expandedPhase === phase.id ? 'rgba(255,255,255,0.2)' : '#E2E8F0', borderRadius: '3px' }}>
                                        <div style={{ width: `${progress}%`, height: '100%', background: expandedPhase === phase.id ? 'white' : '#006AFF', borderRadius: '3px' }} />
                                    </div>
                                    <span style={{ fontSize: '12px', fontWeight: 'bold' }}>{progress}%</span>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Tasks Detail View */}
                <div style={{ flex: 1, background: 'white', borderRadius: '20px', padding: '32px', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
                    {phases.filter(p => p.id === expandedPhase).map(phase => (
                        <div key={`detail-${phase.id}`}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid #F4F7FE' }}>
                                <div>
                                    <span style={{ background: '#E6F8F1', color: '#05CD99', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>
                                        {phase.status}
                                    </span>
                                    <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1B254B', marginTop: '12px' }}>{phase.title}</h2>
                                </div>
                                <span style={{ fontSize: '14px', color: '#A3AED0', fontWeight: '500' }}>⏱️ {phase.duration}</span>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {phase.tasks.map(task => (
                                    <div 
                                        key={task.id}
                                        onClick={() => toggleTask(task.id)}
                                        style={{ 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            padding: '20px', 
                                            border: `2px solid ${tasks[task.id] ? '#05CD99' : '#F4F7FE'}`, 
                                            borderRadius: '16px',
                                            cursor: 'pointer',
                                            background: tasks[task.id] ? '#F2FFF9' : 'white',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        <div style={{ 
                                            width: '24px', 
                                            height: '24px', 
                                            borderRadius: '6px', 
                                            border: `2px solid ${tasks[task.id] ? '#05CD99' : '#A3AED0'}`,
                                            background: tasks[task.id] ? '#05CD99' : 'transparent',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginRight: '16px'
                                        }}>
                                            {tasks[task.id] && <span style={{ color: 'white', fontSize: '14px' }}>✓</span>}
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '16px', fontWeight: '600', color: tasks[task.id] ? '#028E69' : '#1B254B', textDecoration: tasks[task.id] ? 'line-through' : 'none' }}>
                                                {task.title}
                                            </div>
                                        </div>
                                        <div style={{ marginLeft: 'auto' }}>
                                            <button style={{ background: '#F4F7FE', color: '#4318FF', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold' }}>
                                                Détails / Fichiers
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <div style={{ marginTop: '32px', background: '#F4F7FE', padding: '24px', borderRadius: '16px' }}>
                                <h4 style={{ fontSize: '14px', fontWeight: 'bold', color: '#1B254B', marginBottom: '12px' }}>Veuillez noter :</h4>
                                <p style={{ fontSize: '14px', color: '#707EAE', lineHeight: 1.6 }}>
                                    Pour passer à la phase suivante, assurez-vous de valider les documents obligatoires (D.O.E, Appels de fonds légalisés, Certificat environnemental). Les validations du <strong>Notaire</strong> et de l'<strong>Urbanisme</strong> agiront comme bloqueurs système si non cochées.
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            )}

            {/* TAB CONTENT: CARTOGRAPHIE */}
            {activeTab === 'carto' && (
                <div style={{ background: 'white', borderRadius: '20px', padding: '32px', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1B254B' }}>Plan de Masse & Morcellement (NICAD)</h2>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button style={{ background: '#F4F7FE', color: '#4318FF', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}>+ Importer Topographie (DXF/DWG)</button>
                            <button style={{ background: '#006AFF', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}>Sauvegarder les limites</button>
                        </div>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '24px' }}>
                        {/* Fake Map Container */}
                        <div style={{ height: '600px', background: '#e5e7eb', borderRadius: '16px', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                           <div style={{ position: 'absolute', top: '16px', left: '16px', background: 'white', padding: '12px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', zIndex: 10 }}>
                                <div style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '8px' }}>Légende d'Occupation</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', marginBottom: '4px' }}><span style={{ display: 'inline-block', width: '12px', height: '12px', background: '#05CD99', borderRadius: '2px' }}></span> Libres (34%)</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', marginBottom: '4px' }}><span style={{ display: 'inline-block', width: '12px', height: '12px', background: '#FFB547', borderRadius: '2px' }}></span> Réservés (20%)</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', marginBottom: '4px' }}><span style={{ display: 'inline-block', width: '12px', height: '12px', background: '#EE5D50', borderRadius: '2px' }}></span> Vendus VEFA (36%)</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}><span style={{ display: 'inline-block', width: '12px', height: '12px', background: '#4318FF', borderRadius: '2px' }}></span> Rétrocession Mairie (10%)</div>
                           </div>
                           
                           {/* Placeholder Graphic for Map */}
                           <div style={{ textAlign: 'center', color: '#A3AED0' }}>
                               <div style={{ fontSize: '48px', marginBottom: '16px' }}>🗺️</div>
                               <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>Intégration SIG / Leaflet</h3>
                               <p style={{ fontSize: '14px', maxWidth: '300px', margin: '0 auto' }}>Superposition du calque cadastral avec les coordonnées géoréférencées.</p>
                           </div>
                        </div>

                        {/* Propriétés Extract */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div style={{ background: '#F4F7FE', padding: '20px', borderRadius: '16px' }}>
                                <h4 style={{ fontSize: '14px', fontWeight: 'bold', color: '#1B254B', marginBottom: '12px' }}>Attributs de l'Assiette Foncier</h4>
                                <div style={{ fontSize: '13px', color: '#707EAE', marginBottom: '8px' }}><strong>Superficie Totale :</strong> 10.5 Hectares</div>
                                <div style={{ fontSize: '13px', color: '#707EAE', marginBottom: '8px' }}><strong>NICAD Mère :</strong> 142-DKR-2026</div>
                                <div style={{ fontSize: '13px', color: '#707EAE', marginBottom: '8px' }}><strong>Statut Actuel :</strong> Titre Foncier en division</div>
                            </div>
                            
                            <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1B254B', marginTop: '8px' }}>Lots Récents</h4>
                            {[1, 2, 3].map(i => (
                                <div key={i} style={{ padding: '16px', border: '1px solid #E2E8F0', borderRadius: '12px', background: 'white' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                        <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#1B254B' }}>Lot N°0{i} (Villa)</div>
                                        <div style={{ fontSize: '12px', background: '#E6F8F1', color: '#05CD99', padding: '2px 8px', borderRadius: '10px', fontWeight: 'bold' }}>Libre</div>
                                    </div>
                                    <div style={{ fontSize: '12px', color: '#A3AED0' }}>Surface : 150 m² | 25,000,000 FCFA</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* TAB CONTENT: ARCHIVES ET REGLEMENTS */}
            {activeTab === 'archives' && (
                <div style={{ background: 'white', borderRadius: '20px', padding: '32px', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                        <div>
                            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1B254B' }}>Vault & Documentation Légale (Sénégal)</h2>
                            <p style={{ color: '#A3AED0', fontSize: '14px', marginTop: '4px' }}>Centralisation des Codes, Lois et Procédures utiles au marché local.</p>
                        </div>
                        <button style={{ background: '#006AFF', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}>+ Uploader un Document</button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                        {/* Section Lois */}
                        <div style={{ border: '1px solid #E2E8F0', borderRadius: '16px', overflow: 'hidden' }}>
                            <div style={{ background: '#F8FAFC', padding: '16px 20px', borderBottom: '1px solid #E2E8F0', fontWeight: 'bold', color: '#1B254B', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span>⚖️</span> Textes Règlementaires Socles
                            </div>
                            <div style={{ padding: '0 20px' }}>
                                {[
                                    { title: 'Code de l\'Urbanisme (Sénégal)', desc: 'Règles de lotissement, servitudes d\'utilité publique, et coefficients d\'occupation des sols (COS).' },
                                    { title: 'Loi sur le Domaine National', desc: 'Distinction juridique entre zone des terroirs, zone pionnière et procédure de déclassement.' },
                                    { title: 'Code Général des Impôts (DGID)', desc: 'TVA Immobilière, Droits d’enregistrement pour la VEFA et mutations de Titres Fonciers.' },
                                    { title: 'Code de l\'Environnement', desc: 'Exigences pour l\'Étude d\'Impact Environnemental et Social (EIES).' },
                                ].map((doc, idx) => (
                                    <div key={idx} style={{ padding: '20px 0', borderBottom: idx !== 3 ? '1px solid #F4F7FE' : 'none', display: 'flex', gap: '16px' }}>
                                        <div style={{ fontSize: '32px', color: '#4318FF' }}>📄</div>
                                        <div>
                                            <div style={{ fontWeight: 'bold', fontSize: '15px', color: '#1B254B', marginBottom: '4px' }}>{doc.title}</div>
                                            <div style={{ fontSize: '13px', color: '#707EAE', lineHeight: 1.5 }}>{doc.desc}</div>
                                        </div>
                                        <div style={{ marginLeft: 'auto', alignSelf: 'center' }}>
                                            <button style={{ background: '#F4F7FE', color: '#4318FF', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' }}>Lire</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Section Archives Projet */}
                        <div style={{ border: '1px solid #E2E8F0', borderRadius: '16px', overflow: 'hidden' }}>
                            <div style={{ background: '#F8FAFC', padding: '16px 20px', borderBottom: '1px solid #E2E8F0', fontWeight: 'bold', color: '#1B254B', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span>📁</span> Archives Actives du Projet
                            </div>
                            <div style={{ padding: '20px' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                    {[
                                        { name: 'Convention PPP Signée.pdf', type: 'Protocole' },
                                        { name: 'Rapport_Geotech_G2_Sols.pdf', type: 'Technique' },
                                        { name: 'Arrete_Prefectoral_Desaffectation.pdf', type: 'Arrêté' },
                                        { name: 'Notice_Environnementale_DEEC.pdf', type: 'Certificat' },
                                        { name: 'Plan_de_Masse_Architecte_V2.dwg', type: 'Plans' },
                                        { name: 'Grille_Pricing_Promoteur.xlsx', type: 'Finance' }
                                    ].map((archive, idx) => (
                                        <div key={idx} style={{ padding: '16px', border: '1px solid #E2E8F0', borderRadius: '12px', background: 'white', display: 'flex', flexDirection: 'column' }}>
                                            <div style={{ fontSize: '11px', background: '#F4F7FE', color: '#A3AED0', padding: '4px 8px', borderRadius: '4px', alignSelf: 'flex-start', marginBottom: '12px', fontWeight: 'bold', textTransform: 'uppercase' }}>
                                                {archive.type}
                                            </div>
                                            <div style={{ fontWeight: 'bold', fontSize: '13px', color: '#1B254B', lineHeight: 1.4, wordBreak: 'break-word', marginBottom: '8px' }}>{archive.name}</div>
                                            <div style={{ fontSize: '11px', color: '#707EAE', marginTop: 'auto' }}>Il y a 3 jours • 2.4 MB</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB CONTENT: REPORTING ET ETATS */}
            {activeTab === 'reporting' && (
                <div style={{ display: 'grid', gap: '24px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
                        {/* KPI Cards */}
                        <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
                            <div style={{ fontSize: '13px', color: '#A3AED0', fontWeight: 'bold', marginBottom: '8px' }}>LOTS VENDUS (VEFA)</div>
                            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#1B254B' }}>64 <span style={{ fontSize: '14px', color: '#05CD99', fontWeight: 'normal' }}>/ 200</span></div>
                            <div style={{ fontSize: '12px', color: '#05CD99', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '8px', background: '#E6F8F1', padding: '4px 8px', borderRadius: '4px', width: 'fit-content' }}>
                                <span>↑</span> 12 ce mois
                            </div>
                        </div>
                        <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
                            <div style={{ fontSize: '13px', color: '#A3AED0', fontWeight: 'bold', marginBottom: '8px' }}>CALLS DE FONDS (INSTALLMENTS)</div>
                            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#1B254B' }}>1.2M <span style={{ fontSize: '14px', color: '#A3AED0', fontWeight: 'normal' }}>FCFA</span></div>
                            <div style={{ fontSize: '12px', color: '#FFB547', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '8px', background: '#FFF7E6', padding: '4px 8px', borderRadius: '4px', width: 'fit-content' }}>
                                145M d'impayés
                            </div>
                        </div>
                        <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
                            <div style={{ fontSize: '13px', color: '#A3AED0', fontWeight: 'bold', marginBottom: '8px' }}>BUDGET VRD DÉCAISSÉ</div>
                            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#1B254B' }}>35%</div>
                            <div style={{ fontSize: '12px', color: '#05CD99', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '8px' }}>
                                Sur enveloppe SENELEC/SONES
                            </div>
                        </div>
                        <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
                            <div style={{ fontSize: '13px', color: '#A3AED0', fontWeight: 'bold', marginBottom: '8px' }}>TAUX COMMISSION AGENCES</div>
                            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#1B254B' }}>8.5M <span style={{ fontSize: '14px', color: '#A3AED0', fontWeight: 'normal' }}>FCFA</span></div>
                            <div style={{ fontSize: '12px', color: '#A3AED0', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '8px' }}>
                                Partagée avec 4 agences
                            </div>
                        </div>
                    </div>

                    <div style={{ background: 'white', borderRadius: '20px', padding: '32px', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1B254B' }}>Génération de Reporting Financier et Opérationnel</h2>
                            <button style={{ background: '#006AFF', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span>↓</span> Exporter PDF (Comité de Dir.)
                            </button>
                        </div>

                        <div style={{ border: '1px solid #E2E8F0', borderRadius: '12px', overflow: 'hidden' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ background: '#F8FAFC', color: '#A3AED0', fontSize: '12px', textAlign: 'left' }}>
                                        <th style={{ padding: '16px 24px', fontWeight: 'bold' }}>TYPOLOGIE DE RAPPORT</th>
                                        <th style={{ padding: '16px 24px', fontWeight: 'bold' }}>OBJECTIF</th>
                                        <th style={{ padding: '16px 24px', fontWeight: 'bold' }}>FRÉQUENCE</th>
                                        <th style={{ padding: '16px 24px', fontWeight: 'bold' }}>ACTION</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { type: 'État d\'Avancement des Ventes VEFA', obj: 'Ventes consolidées par lots, encaissements et soldes restants.', freq: 'Hebdomadaire' },
                                        { type: 'Bilan Technique de Chantier (VRD)', obj: 'État d\'avancement des travaux de terrassement, voirie et électricité.', freq: 'Bimensuel' },
                                        { type: 'Calculateur ROI / Modèle Financier', obj: 'Delta entre le prévisionnel et l\'exécution (TIR temporel).', freq: 'Mensuel' },
                                        { type: 'État Récapitulatif T.V.A (DGID)', obj: 'TVA collectée sur acquéreurs vs déductible sur BTP pour fiscalité.', freq: 'Mensuel' },
                                    ].map((row, i) => (
                                        <tr key={i} style={{ borderTop: '1px solid #F4F7FE' }}>
                                            <td style={{ padding: '20px 24px', fontWeight: 'bold', color: '#1B254B', fontSize: '14px' }}>{row.type}</td>
                                            <td style={{ padding: '20px 24px', color: '#707EAE', fontSize: '13px' }}>{row.obj}</td>
                                            <td style={{ padding: '20px 24px' }}>
                                                <span style={{ background: '#F4F7FE', color: '#4318FF', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>{row.freq}</span>
                                            </td>
                                            <td style={{ padding: '20px 24px' }}>
                                                <button style={{ background: 'white', color: '#1B254B', border: '1px solid #E2E8F0', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px', transition: 'all 0.2s' }}>Générer</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB CONTENT: IA PREDICTION & DIGITAL TWIN */}
            {activeTab === 'ia_prediction' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                    {/* IA Pricing Simulator */}
                    <div style={{ background: 'linear-gradient(145deg, #1B254B 0%, #111A3A 100%)', borderRadius: '20px', padding: '32px', color: 'white', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}>
                        <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(67,24,255,0.4) 0%, rgba(0,0,0,0) 70%)', borderRadius: '50%' }}></div>
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                    <span style={{ fontSize: '24px' }}>🧠</span>
                                    <h2 style={{ fontSize: '22px', fontWeight: 'bold', margin: 0, background: 'linear-gradient(to right, #05CD99, #4318FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>LexAI Pricing Predictor</h2>
                                </div>
                                <p style={{ color: '#A3AED0', fontSize: '13px', margin: 0 }}>Modèle Machine Learning entraîné sur les données foncières (Dakar, Diamniadio, Saly).</p>
                            </div>
                        </div>

                        <div style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', padding: '24px', borderRadius: '16px', marginBottom: '24px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                                <span style={{ fontSize: '14px', color: '#A3AED0' }}>Test de Sensibilité : Densification vs Villas</span>
                                <span style={{ background: 'rgba(5, 205, 153, 0.2)', color: '#05CD99', padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold' }}>Simulation Active</span>
                            </div>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '8px' }}>
                                        <span>Mix : 30% Appartements / 70% Villas</span>
                                        <span style={{ color: '#05CD99', fontWeight: 'bold' }}>+12.4% ROI</span>
                                    </div>
                                    <div style={{ width: '100%', background: 'rgba(255,255,255,0.1)', height: '8px', borderRadius: '4px' }}>
                                        <div style={{ width: '70%', background: 'linear-gradient(90deg, #05CD99 0%, #4318FF 100%)', height: '100%', borderRadius: '4px' }}></div>
                                    </div>
                                </div>
                                
                                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '12px', fontSize: '13px', lineHeight: 1.5, color: '#E2E8F0', borderLeft: '3px solid #05CD99' }}>
                                    <strong>💡 Suggestion de l\'IA :</strong> Sur cette zone de Diamniadio, la demande pour des studios premium (Diaspora) est en hausse de 18% ce trimestre. Substituer 4 Villas par 1 immeuble R+4 augmenterait le NPV net de <strong>140 Millions FCFA</strong>.
                                </div>
                            </div>
                        </div>
                        <button style={{ width: '100%', padding: '14px', background: 'white', color: '#1B254B', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s' }}>
                            Générer le rapport d'optimisation
                        </button>
                    </div>

                    {/* Jumeau Numérique / Drone */}
                    <div style={{ background: 'white', borderRadius: '20px', padding: '32px', boxShadow: '0 10px 40px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                            <div>
                                <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#1B254B', margin: 0 }}>Jumeau Numérique & Drone 3D</h2>
                                <p style={{ color: '#A3AED0', fontSize: '13px', margin: 0, marginTop: '4px' }}>Survol prédictif du lotissement pour les clients VEFA.</p>
                            </div>
                            <button style={{ background: '#F4F7FE', color: '#4318FF', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' }}>
                                🕶️ Lancer VR
                            </button>
                        </div>

                        <div style={{ flex: 1, background: '#111827', borderRadius: '16px', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {/* Fake 3D Environment render placeholder */}
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'linear-gradient(45deg, #1e293b 25%, #0f172a 25%, #0f172a 50%, #1e293b 50%, #1e293b 75%, #0f172a 75%, #0f172a 100%)', backgroundSize: '40px 40px', opacity: 0.5 }}></div>
                            
                            <div style={{ zIndex: 10, textAlign: 'center' }}>
                                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(5px)', border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', cursor: 'pointer', boxShadow: '0 0 20px rgba(255,255,255,0.2)' }}>
                                    <span style={{ fontSize: '24px', marginLeft: '4px' }}>▶</span>
                                </div>
                                <div style={{ color: 'white', fontWeight: 'bold', fontSize: '16px', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>WebGL Render Engine Active</div>
                                <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px', marginTop: '4px' }}>Rendu en Temps-Réel (LOD 4)</div>
                            </div>

                            <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px', display: 'flex', gap: '8px' }}>
                                <div style={{ background: 'rgba(0,0,0,0.6)', padding: '8px 12px', borderRadius: '8px', color: 'white', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px', backdropFilter: 'blur(4px)' }}>
                                    <span style={{ color: '#05CD99' }}>●</span> Phase 1 : Voirie
                                </div>
                                <div style={{ background: 'rgba(0,0,0,0.6)', padding: '8px 12px', borderRadius: '8px', color: 'white', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px', backdropFilter: 'blur(4px)' }}>
                                    <span style={{ color: '#E2E8F0' }}>●</span> Villas Témoins View
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB CONTENT: IMPACT MAIRIE */}
            {activeTab === 'mairie_live' && (
                <div style={{ background: 'white', borderRadius: '20px', padding: '32px', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
                        <div>
                            <span style={{ background: '#FFF1E6', color: '#FF7D00', padding: '6px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '8px', display: 'inline-block' }}>Accès Édile / Maire</span>
                            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1B254B', margin: 0 }}>Extranet "Transparence Collectivité"</h2>
                            <p style={{ color: '#A3AED0', fontSize: '14px', marginTop: '4px' }}>Un accès en lecture-seule remis au Maire. Renforce la confiance politique totale.</p>
                        </div>
                        <button style={{ background: '#1B254B', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span>🔗</span> Générer le lien Mairie temporaire
                        </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '32px' }}>
                        <div style={{ padding: '24px', borderRadius: '16px', background: '#F4F7FE', border: '1px solid #E2E8F0' }}>
                            <div style={{ fontSize: '32px', marginBottom: '12px' }}>🏫</div>
                            <div style={{ fontSize: '13px', color: '#A3AED0', fontWeight: 'bold', marginBottom: '4px', textTransform: 'uppercase' }}>Cession Rétrocession</div>
                            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1B254B' }}>2 Hectares</div>
                            <div style={{ fontSize: '13px', color: '#707EAE', marginTop: '8px' }}>Soit 15% du foncier valorisé titré au nom de la Commune pour les écoles.</div>
                        </div>
                        <div style={{ padding: '24px', borderRadius: '16px', background: '#F4F7FE', border: '1px solid #E2E8F0' }}>
                            <div style={{ fontSize: '32px', marginBottom: '12px' }}>💼</div>
                            <div style={{ fontSize: '13px', color: '#A3AED0', fontWeight: 'bold', marginBottom: '4px', textTransform: 'uppercase' }}>Emplois Locaux BTP</div>
                            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1B254B' }}>145 <span style={{ fontSize: '14px', color: '#05CD99' }}>Jeunes</span></div>
                            <div style={{ fontSize: '13px', color: '#707EAE', marginTop: '8px' }}>Quota de recrutement de la main d'œuvre de la commune respecté à 90%.</div>
                        </div>
                        <div style={{ padding: '24px', borderRadius: '16px', background: '#F4F7FE', border: '1px solid #E2E8F0' }}>
                            <div style={{ fontSize: '32px', marginBottom: '12px' }}>⚖️</div>
                            <div style={{ fontSize: '13px', color: '#A3AED0', fontWeight: 'bold', marginBottom: '4px', textTransform: 'uppercase' }}>Recettes Fiscales Perçues</div>
                            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1B254B' }}>+124M <span style={{ fontSize: '14px', color: '#A3AED0' }}>FCFA</span></div>
                            <div style={{ fontSize: '13px', color: '#707EAE', marginTop: '8px' }}>Taxes d'urbanismes, morcellements et bornages versés dans les caisses.</div>
                        </div>
                    </div>

                    <div style={{ border: '1px solid #E2E8F0', borderRadius: '16px', overflow: 'hidden' }}>
                        <div style={{ background: '#F8FAFC', padding: '16px 20px', borderBottom: '1px solid #E2E8F0', fontWeight: 'bold', color: '#1B254B', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            Dans la transparence absolue : Blockchain Trust
                            <span style={{ fontSize: '11px', background: '#05CD99', color: 'white', padding: '4px 8px', borderRadius: '4px' }}>Certifié Hash</span>
                        </div>
                        <div style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '24px' }}>
                            <div style={{ flex: 1, color: '#707EAE', fontSize: '14px', lineHeight: 1.6 }}>
                                Grâce à notre système de <strong>Registre Distribué Digital</strong> (Traceabilité des mutations par blockchain privée), il est impossible de procéder à une "Double Vente" d'un terrain. La Mairie peut vérifier l'historique inaltérable de chaque lot, évitant ainsi tous les litiges fonciers classiques de la zone.
                            </div>
                            <div style={{ width: '250px', background: '#1B254B', padding: '20px', borderRadius: '12px', color: 'white', fontFamily: 'monospace', fontSize: '10px', wordBreak: 'break-all', opacity: 0.8 }}>
                                &gt; Block: #459281<br/>
                                &gt; Hash: 0x8f2a99c9...<br/>
                                &gt; Validation Mutuelle: OK<br/>
                                &gt; Status: Titre Protégé
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
