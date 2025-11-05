import { Link, useLocation } from "react-router-dom";
import { Leaf } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b border-border bg-card shadow-soft sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center transition-smooth group-hover:scale-110">
              <Leaf className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">Ecoscan</span>
          </Link>

          <div className="flex gap-2 md:gap-4">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg transition-smooth font-medium ${
                isActive("/")
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-accent"
              }`}
            >
              Home
            </Link>
            <Link
              to="/log-activity"
              className={`px-4 py-2 rounded-lg transition-smooth font-medium ${
                isActive("/log-activity")
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-accent"
              }`}
            >
              Log Activity
            </Link>
            <Link
              to="/dashboard"
              className={`px-4 py-2 rounded-lg transition-smooth font-medium ${
                isActive("/dashboard")
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-accent"
              }`}
            >
              Dashboard
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border bg-card mt-auto">
        <div className="container mx-auto px-4 py-6 text-center text-muted-foreground">
          <p>Ecoscan © 2025 - Track and reduce your carbon footprint</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
