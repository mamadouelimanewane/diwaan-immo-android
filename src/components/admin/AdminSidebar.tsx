import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminSidebar() {
    return (
        <div style={{
            width: '260px',
            background: '#002B49',
            color: 'white',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '4px 0 10px rgba(0,0,0,0.1)',
            zIndex: 1000
        }}>
            {/* User Profile / Logout - NOW AT TOP */}
            <div style={{ padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#006AFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>AD</div>
                    <div>
                        <div style={{ fontSize: '14px', fontWeight: 'bold' }}>Administrateur</div>
                        <div style={{ fontSize: '11px', opacity: 0.6 }}>Super Admin</div>
                    </div>
                </div>
                <Link href="/" style={{ display: 'block', textAlign: 'center', fontSize: '13px', color: '#ccc', textDecoration: 'none', padding: '8px', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '4px' }}>
                    Retour au site
                </Link>
            </div>

            {/* Navigation */}
            <nav style={{ flex: 1, padding: '24px 0', overflowY: 'auto' }}>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {/* Dashboard */}
                    <NavItem href="/admin" icon="📊" label="Tableau de bord" />

                    {/* Gestion Core */}
                    <div style={{ padding: '8px 24px', fontSize: '11px', opacity: 0.5, fontWeight: 'bold', marginTop: '16px' }}>GESTION</div>
                    <NavItem href="/admin/properties" icon="🏠" label="Propriétés" />
                    <NavItem href="/admin/users" icon="👥" label="Utilisateurs" />
                    <NavItem href="/admin/agents" icon="👔" label="Agents & Pros" />
                    <NavItem href="/admin/verification" icon="🕵️" label="Vérification KYC" badge={3} />
                    <NavItem href="/admin/messages" icon="✉️" label="Messages" badge={3} />

                    {/* Juridique & Finance */}
                    <div style={{ padding: '8px 24px', fontSize: '11px', opacity: 0.5, fontWeight: 'bold', marginTop: '16px' }}>JURIDIQUE & FINANCE</div>
                    <NavItem href="/legal-documents" icon="📄" label="Contrats IA" />
                    <NavItem href="/invoicing" icon="💰" label="Facturation" />
                    <NavItem href="/accounting" icon="📊" label="Comptabilité OHADA" />
                    <NavItem href="/admin/legal" icon="⚖️" label="Gestion Juridique" />
                    <NavItem href="/admin/finance" icon="💳" label="Transactions" />

                    {/* Marketing & IA */}
                    <div style={{ padding: '8px 24px', fontSize: '11px', opacity: 0.5, fontWeight: 'bold', marginTop: '16px' }}>MARKETING & IA</div>
                    <NavItem href="/admin/ads" icon="📢" label="Publicité & Ads" />
                    <NavItem href="/admin/content" icon="📝" label="Blog & Contenu" />
                    <NavItem href="/admin/workflows" icon="⚡" label="Automatisations" />
                    <NavItem href="/admin/intelligence" icon="🧠" label="Intelligence IA" />

                    {/* Partenariat - NOUVEAU */}
                    <div style={{ padding: '8px 24px', fontSize: '11px', opacity: 0.5, fontWeight: 'bold', marginTop: '16px' }}>PARTENARIAT 🆕</div>
                    <NavItem href="/admin/partnership/developers" icon="🏗️" label="Promoteurs" />
                    <NavItem href="/admin/partnership/agencies" icon="🏢" label="Agences" />
                    <NavItem href="/admin/partnership/partnerships" icon="📄" label="Contrats" />
                    <NavItem href="/admin/partnership/projects" icon="🏗️" label="Projets" />
                    <NavItem href="/admin/partnership/plots" icon="📦" label="Parcelles" />
                    <NavItem href="/admin/partnership/reservations" icon="📋" label="Réservations" />

                    {/* Système */}
                    <div style={{ padding: '8px 24px', fontSize: '11px', opacity: 0.5, fontWeight: 'bold', marginTop: '16px' }}>SYSTÈME</div>
                    <NavItem href="/admin/security" icon="🔒" label="Sécurité & Logs" />
                    <NavItem href="/admin/system" icon="⚙️" label="Configuration" />
                </ul>
            </nav>

            {/* Logo Area - NOW AT BOTTOM */}
            <div style={{ padding: '24px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', letterSpacing: '1px' }}>Diwaan<span style={{ color: '#006AFF' }}>Admin</span></h1>
                <p style={{ fontSize: '12px', opacity: 0.6, marginTop: '4px' }}>Backoffice de gestion</p>
            </div>
        </div>
    );
}

function NavItem({ href, icon, label, badge }: { href: string; icon: string; label: string; badge?: number }) {
    return (
        <li>
            <Link href={href} style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px 24px',
                color: 'rgba(255,255,255,0.7)',
                textDecoration: 'none',
                transition: 'all 0.2s',
                borderLeft: '4px solid transparent',
            }}>
                <span style={{ marginRight: '16px', fontSize: '18px' }}>{icon}</span>
                <span style={{ flex: 1 }}>{label}</span>
                {badge && (
                    <span style={{ background: '#FF4444', color: 'white', padding: '2px 8px', borderRadius: '10px', fontSize: '11px', fontWeight: 'bold' }}>{badge}</span>
                )}
            </Link>
        </li>
    );
}
