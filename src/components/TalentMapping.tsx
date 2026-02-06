import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  Building2, 
  MapPin, 
  Briefcase, 
  ArrowRight,
  CheckCircle2,
  Users,
  FileCheck
} from "lucide-react";

const companies = [
  {
    name: "TechCorp",
    role: "Frontend Developer",
    match: 95,
    location: "Remote",
    skills: ["React", "TypeScript", "CSS"],
    verified: true,
  },
  {
    name: "DataFlow Inc",
    role: "Full Stack Engineer",
    match: 87,
    location: "Bangalore",
    skills: ["Node.js", "React", "MongoDB"],
    verified: true,
  },
  {
    name: "AI Solutions",
    role: "AI Integration Specialist",
    match: 72,
    location: "Hybrid",
    skills: ["Python", "LLM", "APIs"],
    verified: false,
  },
];

const features = [
  {
    icon: FileCheck,
    title: "Proof-Based Profiles",
    description: "Recruiters see actual solutions you've built, not just self-reported skills",
  },
  {
    icon: CheckCircle2,
    title: "AI-Verified Skills",
    description: "Each skill is validated through your problem-solving patterns and code quality",
  },
  {
    icon: Users,
    title: "Direct Connections",
    description: "Get matched with recruiters actively looking for your specific skill set",
  },
];

const TalentMapping = () => {
  return (
    <section id="recruiters" className="py-24 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-4">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">Talent Mapping Engine</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Get <span className="text-gradient">Discovered</span> by 
              <br />Top Recruiters
            </h2>
            
            <p className="text-muted-foreground mb-8 text-lg">
              Say goodbye to resume screening. Our AI matches your proven skills with companies 
              that value real-world problem-solving ability over certifications.
            </p>

            {/* Features */}
            <div className="space-y-6 mb-8">
              {features.map((feature) => (
                <div key={feature.title} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <Button variant="hero" size="lg" className="gap-2">
                View Opportunities
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg">
                For Recruiters
              </Button>
            </div>
          </div>

          {/* Right - Match Cards */}
          <div className="space-y-4">
            {companies.map((company, index) => (
              <div
                key={company.name}
                className="glass-card-hover rounded-xl p-5 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <Building2 className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{company.name}</h4>
                        {company.verified && (
                          <CheckCircle2 className="h-4 w-4 text-success" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Briefcase className="h-3 w-3" />
                        <span>{company.role}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gradient">{company.match}%</div>
                    <span className="text-xs text-muted-foreground">match</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {company.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {company.location}
                  </div>
                </div>
              </div>
            ))}

            {/* More Matches Indicator */}
            <div className="glass-card rounded-xl p-4 text-center">
              <p className="text-sm text-muted-foreground">
                <span className="text-primary font-semibold">+47</span> more companies match your profile
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TalentMapping;
