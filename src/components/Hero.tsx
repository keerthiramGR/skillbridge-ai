import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Brain, Target, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-30" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8 animate-fade-in">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">AI-Powered Learning Platform</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Learn by <span className="text-gradient">Solving</span>,
            <br />
            Not Just <span className="text-muted-foreground">Studying</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Tackle real industry problems, build proof-of-work portfolios, and let AI map your true skills. 
            Connect directly with recruiters who value what you can <strong className="text-foreground">do</strong>, not just what you've memorized.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Link to="/dashboard">
              <Button variant="hero" size="xl" className="gap-2">
                Start Learning
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: "0.4s" }}>
            {[
              { icon: Brain, label: "AI-Tracked Skills", value: "50+" },
              { icon: Target, label: "Industry Problems", value: "500+" },
              { icon: Users, label: "Students", value: "10K+" },
              { icon: Sparkles, label: "Hiring Partners", value: "200+" },
            ].map((stat, index) => (
              <div key={index} className="glass-card-hover p-4 rounded-xl">
                <stat.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gradient Overlay at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
