import { Sparkles, Github, Twitter, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const footerLinks = {
  Platform: [
    { label: "Problem Statements", href: "#problems" },
    { label: "Student Dashboard", href: "/dashboard" },
    { label: "Skill Mapping", href: "#skills" },
    { label: "For Recruiters", href: "#recruiters" },
  ],
  Resources: [
    { label: "Documentation", href: "#" },
    { label: "API Reference", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Community", href: "#" },
  ],
  Company: [
    { label: "About Us", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
};

const socialLinks = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Mail, href: "#", label: "Email" },
];

const Footer = () => {
  return (
    <footer className="relative border-t border-border/50 bg-card/30">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="relative">
                <Sparkles className="h-8 w-8 text-primary" />
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
              </div>
              <span className="text-xl font-bold">
                <span className="text-gradient">SkillBridge</span>
                <span className="text-muted-foreground"> AI</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs mb-6">
              Bridging the gap between learning, skill development, and hiring through 
              AI-powered real-world problem solving.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} SkillBridge AI. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Built with <span className="text-primary"></span> for the future of education
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
