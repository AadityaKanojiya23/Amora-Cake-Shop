import Link from "next/link";
import { LayoutDashboard, ShoppingBag, Users, Settings } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[calc(100vh-80px)]">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-card border-r hidden md:block">
        <div className="p-6">
          <h2 className="text-xl font-bold text-primary mb-8">Admin Panel</h2>
          <nav className="space-y-2">
            <Link href="/admin" className="flex items-center gap-3 p-3 rounded-lg bg-primary/10 text-primary font-medium">
              <LayoutDashboard className="w-5 h-5" /> Dashboard
            </Link>
            <Link href="/admin/products" className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
              <ShoppingBag className="w-5 h-5" /> Products
            </Link>
            <Link href="/admin/orders" className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
              <ShoppingBag className="w-5 h-5" /> Orders
            </Link>
            <Link href="/admin/users" className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
              <Users className="w-5 h-5" /> Users
            </Link>
            <Link href="/admin/settings" className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
              <Settings className="w-5 h-5" /> Settings
            </Link>
          </nav>
        </div>
      </aside>

      {/* Admin Content */}
      <main className="flex-1 p-6 lg:p-10 bg-muted/20">
        {children}
      </main>
    </div>
  );
}
