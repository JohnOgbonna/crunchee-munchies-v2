export const metadata = {
    title: 'Admin | Crunchee Munchies',
    description: 'Admin Dashboard',
  };
  
  export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
      <main className="min-h-screen bg-[#f5e3c5] text-slate-800">
        <div className="max-w-7xl mx-auto px-2 py-6">
          {children}
        </div>
      </main>
    );
  }
  