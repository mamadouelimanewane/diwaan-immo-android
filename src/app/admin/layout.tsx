import AdminNav from '@/components/admin/AdminNav';

export default function AdminLayout({
  children,
}: {
  children: React.Node;
}) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminNav />
      <main className="ml-64 flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
