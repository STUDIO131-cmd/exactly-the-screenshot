import { NavLink, Outlet } from "react-router-dom";
import { LayoutDashboard, Package, Layers, Shield, HelpCircle, Users, Bot, Database, CalendarDays, Info, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const navItems = [
  { to: "/admin", icon: LayoutDashboard, label: "Dashboard", end: true },
  { to: "/admin/agenda", icon: CalendarDays, label: "Agenda" },
  { to: "/admin/info", icon: Info, label: "Informações" },
  { to: "/admin/products", icon: Package, label: "Produtos" },
  { to: "/admin/variants", icon: Layers, label: "Variantes" },
  { to: "/admin/policies", icon: Shield, label: "Políticas" },
  { to: "/admin/faqs", icon: HelpCircle, label: "FAQs" },
  { to: "/admin/leads", icon: Users, label: "Leads" },
  { to: "/admin/simulator", icon: Bot, label: "Simulador" },
  { to: "/admin/knowledge", icon: Database, label: "Base de Dados" },
];

const AdminLayout = () => {
  const { user, signOut } = useAuth();
  return (
    <div className="flex min-h-screen bg-background">
      <aside className="w-56 border-r border-border bg-card flex flex-col py-6 px-3 shrink-0">
        <h1 className="text-lg font-semibold px-3 mb-6 font-epika">Studio 131</h1>
        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map(({ to, icon: Icon, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`
              }
            >
              <Icon className="h-4 w-4" />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-4 px-3 space-y-2 border-t border-border pt-4">
          {user?.email && (
            <p className="text-xs text-muted-foreground truncate" title={user.email}>
              {user.email}
            </p>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={signOut}
            className="w-full justify-start text-muted-foreground hover:text-foreground"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </Button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
