import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { 
  LayoutDashboard, 
  Calendar, 
  Car, 
  User, 
  LogOut, 
  Plus,
  Bell,
  Moon,
  Sun
} from "lucide-react";
import { useState } from "react";

export function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
    : "";
  
  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    // Mock logout
    navigate("/");
  };

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Car className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl text-primary hidden sm:inline">RentRide</span>
            </Link>

            <div className="flex items-center gap-2 sm:gap-4">
              <button className="relative p-2 hover:bg-accent rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-muted-foreground" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-secondary rounded-full"></span>
              </button>
              
              <button 
                onClick={toggleDarkMode}
                className="p-2 hover:bg-accent rounded-lg transition-colors"
              >
                {isDark ? (
                  <Sun className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <Moon className="w-5 h-5 text-muted-foreground" />
                )}
              </button>

              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-semibold">
                {initials || "?"}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-card rounded-xl border border-border p-4 sticky top-24">
              <nav className="space-y-1">
                <SidebarLink 
                  to="/dashboard" 
                  icon={<LayoutDashboard className="w-5 h-5" />}
                  active={isActive("/dashboard")}
                >
                  Dashboard
                </SidebarLink>
                
                <SidebarLink 
                  to="/dashboard/my-bookings" 
                  icon={<Calendar className="w-5 h-5" />}
                  active={isActive("/dashboard/my-bookings")}
                >
                  My Bookings
                </SidebarLink>
                
                <SidebarLink 
                  to="/dashboard/my-vehicles" 
                  icon={<Car className="w-5 h-5" />}
                  active={isActive("/dashboard/my-vehicles")}
                >
                  My Vehicles
                </SidebarLink>
                
                <SidebarLink 
                  to="/dashboard/profile" 
                  icon={<User className="w-5 h-5" />}
                  active={isActive("/dashboard/profile")}
                >
                  Profile
                </SidebarLink>
                {user?.isAdmin && (
                  <SidebarLink
                    to="/dashboard/admin"
                    icon={<LayoutDashboard className="w-5 h-5" />}
                    active={isActive("/dashboard/admin")}
                  >
                    Admin
                  </SidebarLink>
                )}
                <div className="pt-4">
                  <Link
                    to="/dashboard/list-vehicle"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg bg-secondary text-white hover:bg-secondary/90 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                    <span>List Vehicle</span>
                  </Link>
                </div>

                <div className="pt-4 border-t border-border mt-4">
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg w-full text-left text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </div>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

function SidebarLink({ 
  to, 
  icon, 
  active, 
  children 
}: { 
  to: string; 
  icon: React.ReactNode; 
  active: boolean; 
  children: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
        active
          ? "bg-primary text-white"
          : "text-muted-foreground hover:bg-accent hover:text-foreground"
      }`}
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
}
