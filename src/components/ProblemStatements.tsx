import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  Cloud, 
  Database, 
  Globe, 
  ArrowRight,
  Building2,
  Clock,
  Users,
  Sparkles
} from "lucide-react";

const domainIcons: Record<string, React.ElementType> = {
  AI: Brain,
  Cloud: Cloud,
  Data: Database,
  Web: Globe,
};

const difficultyColors: Record<string, string> = {
  Beginner: "bg-success/20 text-success border-success/30",
  Intermediate: "bg-warning/20 text-warning border-warning/30",
  Advanced: "bg-destructive/20 text-destructive border-destructive/30",
};

const problems = [
  {
    id: 1,
    title: "Build an AI-Powered Customer Support Chatbot",
    company: "TechCorp Solutions",
    domain: "AI",
    difficulty: "Intermediate",
    students: 234,
    timeEstimate: "2-3 weeks",
    skills: ["NLP", "Python", "API Integration", "RAG"],
    description: "Create a chatbot that can handle customer queries using natural language processing and integrate with existing CRM systems.",
  },
  {
    id: 2,
    title: "Design a Scalable Microservices Architecture",
    company: "CloudFirst Inc",
    domain: "Cloud",
    difficulty: "Advanced",
    students: 156,
    timeEstimate: "3-4 weeks",
    skills: ["Docker", "Kubernetes", "AWS", "System Design"],
    description: "Design and implement a microservices architecture that can handle 1M+ daily active users with 99.9% uptime.",
  },
  {
    id: 3,
    title: "Real-time Analytics Dashboard",
    company: "DataViz Pro",
    domain: "Data",
    difficulty: "Intermediate",
    students: 312,
    timeEstimate: "2 weeks",
    skills: ["React", "D3.js", "WebSockets", "Data Visualization"],
    description: "Build a real-time dashboard that visualizes streaming data from IoT sensors with interactive charts.",
  },
  {
    id: 4,
    title: "Progressive Web App for E-commerce",
    company: "ShopSmart",
    domain: "Web",
    difficulty: "Beginner",
    students: 489,
    timeEstimate: "1-2 weeks",
    skills: ["React", "PWA", "Service Workers", "Responsive Design"],
    description: "Create a mobile-first PWA with offline capabilities, push notifications, and seamless checkout experience.",
  },
];

const ProblemStatements = () => {
  return (
    <section id="problems" className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-4">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">Industry Problem Statements</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Real Problems from <span className="text-gradient">Real Companies</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Companies post their actual challenges. Our AI transforms them into learning opportunities 
            with clear guidance, difficulty levels, and required skills.
          </p>
        </div>

        {/* Problems Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto stagger-children">
          {problems.map((problem) => {
            const DomainIcon = domainIcons[problem.domain] || Globe;
            return (
              <div
                key={problem.id}
                className="glass-card-hover rounded-2xl p-6 group cursor-pointer"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <DomainIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <Building2 className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{problem.company}</span>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`text-xs mt-1 ${difficultyColors[problem.difficulty]}`}
                      >
                        {problem.difficulty}
                      </Badge>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {problem.domain}
                  </Badge>
                </div>

                {/* Title & Description */}
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {problem.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {problem.description}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {problem.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs px-2 py-1 rounded-md bg-secondary text-secondary-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {problem.students} solving
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {problem.timeEstimate}
                    </span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="gap-2">
            View All Problems
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProblemStatements;
