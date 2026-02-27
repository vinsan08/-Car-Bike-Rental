import { Link, useNavigate } from "react-router";
import { Car, Menu } from "lucide-react";
import { useState, useEffect } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Car className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl text-primary">RentRide</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-600 hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/search" className="text-gray-600 hover:text-primary transition-colors">
              Browse Vehicles
            </Link>
            <Link to="/dashboard/list-vehicle" className="text-gray-600 hover:text-primary transition-colors">
              Become a Host
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                {user.isAdmin && (
                  <Link to="/dashboard/admin" className="text-primary font-medium hover:underline mr-4">
                    Admin Dashboard
                  </Link>
                )}
                <span className="text-gray-600">Welcome, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-primary hover:bg-gray-50 rounded-lg transition-colors ml-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-primary hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col gap-4">
              <Link to="/" className="text-gray-600 hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/search" className="text-gray-600 hover:text-primary transition-colors">
                Browse Vehicles
              </Link>
              <Link to="/dashboard/list-vehicle" className="text-gray-600 hover:text-primary transition-colors">
                Become a Host
              </Link>

              <div className="flex flex-col gap-2 pt-2 border-t">
                {user ? (
                  <>
                    {user.isAdmin && (
                      <Link to="/dashboard/admin" className="px-4 py-2 text-center text-primary hover:bg-gray-50 rounded-lg font-medium">
                        Admin Dashboard
                      </Link>
                    )}
                    <span className="text-center text-gray-600 py-2">Welcome, {user.name}</span>
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 text-center text-primary bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="px-4 py-2 text-center text-primary hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="px-4 py-2 text-center bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
