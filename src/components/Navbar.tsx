import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  GraduationCap, 
  Building2, 
  Briefcase, 
  Menu, 
  X,
  Sparkles
} from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Problem Statements", href: "#problems" },
    { label: "Student Dashboard", href: "/dashboard" },
    { label: "Skill Mapping", href: "#skills" },
    { label: "For Recruiters", href: "#recruiters" },
  ];

  const roles = [
    { label: "Student", icon: GraduationCap, href: "/dashboard" },
    { label: "College Admin", icon: Building2, href: "/admin" },
    { label: "Recruiter", icon: Briefcase, href: "/recruiter" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Sparkles className="h-8 w-8 text-primary ai-pulse" />
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
            </div>
            <span className="text-xl font-bold">
              <span className="text-gradient">SkillBridge</span>
              <span className="text-muted-foreground"> AI</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Role Buttons */}
          <div className="hidden md:flex items-center gap-2">
            {roles.map((role) => (
              <Link key={role.label} to={role.href}>
                <Button variant="ghost" size="sm" className="gap-2">
                  <role.icon className="h-4 w-4" />
                  {role.label}
                </Button>
              </Link>
            ))}
            <Button variant="hero" size="sm" className="ml-2">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border/50 animate-fade-in">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="flex flex-col gap-2 pt-4 border-t border-border/50">
                {roles.map((role) => (
                  <Link key={role.label} to={role.href} onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start gap-2">
                      <role.icon className="h-4 w-4" />
                      {role.label}
                    </Button>
                  </Link>
                ))}
                <Button variant="hero" className="mt-2">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
