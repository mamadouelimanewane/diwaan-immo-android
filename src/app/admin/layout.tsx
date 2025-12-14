import AdminNav from '@/components/admin/AdminNav';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-100" style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
      <AdminNav />
      <main className="ml-64 flex-1 p-8" style={{ marginLeft: '256px', flex: 1, padding: '2rem' }}>
        {children}
      </main>
    </div>
  );
}
