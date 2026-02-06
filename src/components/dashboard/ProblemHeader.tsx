import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Brain,
  Building2,
  Clock,
  Users,
  ArrowLeft,
  Bookmark,
  Share2,
} from "lucide-react";

interface ProblemHeaderProps {
  problem: {
    title: string;
    company: string;
    domain: string;
    difficulty: string;
    description: string;
    skills: string[];
    students: number;
    timeEstimate: string;
  };
  onBack: () => void;
}

const difficultyColors: Record<string, string> = {
  Beginner: "bg-success/20 text-success border-success/30",
  Intermediate: "bg-warning/20 text-warning border-warning/30",
  Advanced: "bg-destructive/20 text-destructive border-destructive/30",
};

const ProblemHeader = ({ problem, onBack }: ProblemHeaderProps) => {
  return (
    <div className="glass-card rounded-2xl p-4">
      <div className="flex items-start justify-between mb-3">
        <Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Problems
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Bookmark className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Brain className="h-4 w-4 text-primary" />
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Building2 className="h-3 w-3" />
              {problem.company}
            </div>
            <Badge variant="secondary">{problem.domain}</Badge>
            <Badge variant="outline" className={difficultyColors[problem.difficulty]}>
              {problem.difficulty}
            </Badge>
          </div>
          <h1 className="text-xl font-bold">{problem.title}</h1>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {problem.students} solving
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {problem.timeEstimate}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {problem.skills.map((skill) => (
          <Badge key={skill} variant="secondary" className="text-xs">
            {skill}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default ProblemHeader;
