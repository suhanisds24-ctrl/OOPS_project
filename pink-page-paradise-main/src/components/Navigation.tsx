import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  return (
    <nav className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <NavLink 
              to="/" 
              className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors"
            >
              📚 BookHaven
            </NavLink>
            <div className="hidden md:flex space-x-6">
              <NavLink 
                to="/" 
                className="text-foreground hover:text-primary transition-colors"
                activeClassName="text-primary font-semibold"
              >
                Home
              </NavLink>
              <NavLink 
                to="/books" 
                className="text-foreground hover:text-primary transition-colors"
                activeClassName="text-primary font-semibold"
              >
                Books
              </NavLink>
              <NavLink 
                to="/ebooks" 
                className="text-foreground hover:text-primary transition-colors"
                activeClassName="text-primary font-semibold"
              >
                eBooks
              </NavLink>
              <NavLink 
                to="/knowledge" 
                className="text-foreground hover:text-primary transition-colors"
                activeClassName="text-primary font-semibold"
              >
                Knowledge
              </NavLink>
              <NavLink 
                to="/donate" 
                className="text-foreground hover:text-primary transition-colors"
                activeClassName="text-primary font-semibold"
              >
                Donate
              </NavLink>
            </div>
          </div>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            Sign Up
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
