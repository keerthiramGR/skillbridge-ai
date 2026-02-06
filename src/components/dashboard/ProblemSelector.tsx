import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Brain,
  Cloud,
  Database,
  Globe,
  Building2,
  Clock,
  Users,
  ArrowRight,
  Search,
  Filter,
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
    description: "Create a chatbot that can handle customer queries using natural language processing.",
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
    description: "Design and implement a microservices architecture for high availability.",
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
    description: "Build a real-time dashboard for streaming IoT sensor data.",
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
    description: "Create a mobile-first PWA with offline capabilities.",
  },
];

interface ProblemSelectorProps {
  onSelect: (problem: typeof problems[0]) => void;
}

const ProblemSelector = ({ onSelect }: ProblemSelectorProps) => {
  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search problems..."
            className="w-full bg-secondary rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Domain Badges */}
      <div className="flex flex-wrap gap-2">
        {["All", "AI", "Web", "Data", "Cloud"].map((domain) => (
          <Badge
            key={domain}
            variant={domain === "All" ? "default" : "outline"}
            className="cursor-pointer hover:bg-primary/20"
          >
            {domain}
          </Badge>
        ))}
      </div>

      {/* Problems Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {problems.map((problem) => {
          const DomainIcon = domainIcons[problem.domain] || Globe;
          return (
            <div
              key={problem.id}
              onClick={() => onSelect(problem)}
              className="glass-card-hover rounded-xl p-5 cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-3">
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

              <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                {problem.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {problem.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {problem.skills.slice(0, 3).map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-2 py-0.5 rounded bg-secondary text-secondary-foreground"
                  >
                    {skill}
                  </span>
                ))}
                {problem.skills.length > 3 && (
                  <span className="text-xs px-2 py-0.5 text-muted-foreground">
                    +{problem.skills.length - 3}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border/50">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {problem.students}
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
    </div>
  );
};

export default ProblemSelector;
