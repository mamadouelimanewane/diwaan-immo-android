'use client';

import { useEffect, useState } from 'react';

interface Message {
  id: string;
  senderName: string;
  senderEmail: string;
  subject: string;
  content: string;
  isRead: boolean;
  createdAt: string;
}

function formatDate(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit' }).format(date);
    }
    if (diffDays === 1) return 'Hier';
    if (diffDays < 7) return `Il y a ${diffDays} jours`;
    return new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: 'short' }).format(date);
  } catch {
    return dateStr;
  }
}

function truncate(text: string, max: number): string {
  if (!text) return '';
  return text.length > max ? text.slice(0, max) + '...' : text;
}

export default function InboxPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchMessages() {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      const res = await fetch('/api/rent/manager/inbox', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Erreur lors du chargement des messages');
      const data = await res.json();
      setMessages(data.messages ?? data ?? []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMessages();
  }, []);

  const unreadCount = messages.filter((m) => !m.isRead).length;

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
          onClick={fetchMessages}
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
    <div style={{ maxWidth: '860px', margin: '0 auto', padding: '40px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: 0 }}>Messagerie</h1>
        {unreadCount > 0 && (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: '28px',
              height: '28px',
              padding: '0 10px',
              background: '#ef4444',
              color: '#fff',
              borderRadius: '999px',
              fontSize: '13px',
              fontWeight: 700,
            }}
          >
            {unreadCount} non lu{unreadCount > 1 ? 's' : ''}
          </span>
        )}
      </div>

      {messages.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '60px',
            background: '#f8fafc',
            borderRadius: '12px',
            border: '1px dashed #cbd5e1',
          }}
        >
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>💬</div>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px', color: '#1e293b' }}>
            Aucun message
          </h2>
          <p style={{ color: '#64748b' }}>
            Vos messages apparaîtront ici lorsque des locataires vous contacteront.
          </p>
        </div>
      ) : (
        <div
          style={{
            background: '#fff',
            borderRadius: '12px',
            boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
            border: '1px solid #e2e8f0',
            overflow: 'hidden',
          }}
        >
          {messages.map((msg, idx) => (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px',
                padding: '18px 24px',
                borderBottom: idx < messages.length - 1 ? '1px solid #f1f5f9' : 'none',
                background: msg.isRead ? '#fff' : '#eff6ff',
                cursor: 'pointer',
                transition: 'background 0.15s',
              }}
            >
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: '#dbeafe',
                  color: '#2563eb',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '16px',
                  flexShrink: 0,
                }}
              >
                {msg.senderName ? msg.senderName.charAt(0).toUpperCase() : '?'}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '8px' }}>
                  <div>
                    <span
                      style={{
                        fontWeight: msg.isRead ? 500 : 700,
                        color: '#1e293b',
                        fontSize: '15px',
                      }}
                    >
                      {msg.senderName}
                    </span>
                    <span style={{ marginLeft: '8px', fontSize: '13px', color: '#94a3b8' }}>
                      {msg.senderEmail}
                    </span>
                  </div>
                  <span style={{ fontSize: '12px', color: '#94a3b8', flexShrink: 0 }}>
                    {formatDate(msg.createdAt)}
                  </span>
                </div>

                <div
                  style={{
                    fontWeight: msg.isRead ? 400 : 600,
                    color: msg.isRead ? '#475569' : '#1e293b',
                    fontSize: '14px',
                    marginTop: '2px',
                  }}
                >
                  {msg.subject}
                </div>

                <div
                  style={{
                    fontSize: '13px',
                    color: '#94a3b8',
                    marginTop: '2px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {truncate(msg.content, 80)}
                </div>
              </div>

              {!msg.isRead && (
                <div
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: '#2563eb',
                    flexShrink: 0,
                    marginTop: '6px',
                  }}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
