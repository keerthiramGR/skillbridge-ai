import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  GraduationCap,
  Award,
  BookmarkPlus,
  BookmarkCheck,
  CheckCircle2,
  TrendingUp,
  Code2,
} from "lucide-react";

interface Student {
  id: number;
  name: string;
  college: string;
  level: number;
  matchScore: number;
  skills: string[];
  domain: string;
  badges: number;
  problemsSolved: number;
  topStrength: string;
  available: boolean;
}

interface Props {
  student: Student;
  isShortlisted: boolean;
  onToggleShortlist: () => void;
}

const RecruiterStudentCard = ({ student, isShortlisted, onToggleShortlist }: Props) => {
  const matchColor =
    student.matchScore >= 90
      ? "text-success"
      : student.matchScore >= 75
      ? "text-primary"
      : "text-warning";

  return (
    <div className="glass-card-hover rounded-xl p-5 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-sm">
            {student.name.split(" ").map((n) => n[0]).join("")}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-sm">{student.name}</h4>
              {student.available && (
                <span className="w-2 h-2 rounded-full bg-success" title="Available" />
              )}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <GraduationCap className="h-3 w-3" />
              {student.college}
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className={`text-xl font-bold ${matchColor}`}>{student.matchScore}%</p>
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">match</span>
        </div>
      </div>

      {/* Match Progress */}
      <Progress value={student.matchScore} className="h-1.5" />

      {/* Skills */}
      <div className="flex flex-wrap gap-1.5">
        {student.skills.map((skill) => (
          <Badge key={skill} variant="secondary" className="text-[11px] px-2 py-0.5">
            {skill}
          </Badge>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="glass-card rounded-lg p-2">
          <div className="flex items-center justify-center gap-1 text-primary mb-0.5">
            <TrendingUp className="h-3 w-3" />
            <span className="text-sm font-bold">{student.level}</span>
          </div>
          <span className="text-[10px] text-muted-foreground">Level</span>
        </div>
        <div className="glass-card rounded-lg p-2">
          <div className="flex items-center justify-center gap-1 text-accent mb-0.5">
            <Award className="h-3 w-3" />
            <span className="text-sm font-bold">{student.badges}</span>
          </div>
          <span className="text-[10px] text-muted-foreground">Badges</span>
        </div>
        <div className="glass-card rounded-lg p-2">
          <div className="flex items-center justify-center gap-1 text-foreground mb-0.5">
            <Code2 className="h-3 w-3" />
            <span className="text-sm font-bold">{student.problemsSolved}</span>
          </div>
          <span className="text-[10px] text-muted-foreground">Solved</span>
        </div>
      </div>

      {/* Top Strength */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <CheckCircle2 className="h-3.5 w-3.5 text-success" />
        <span>
          Top Strength: <span className="text-foreground font-medium">{student.topStrength}</span>
        </span>
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-auto">
        <Button variant="hero" size="sm" className="flex-1 text-xs">
          View Profile
        </Button>
        <Button
          variant={isShortlisted ? "secondary" : "outline"}
          size="sm"
          className="gap-1.5"
          onClick={onToggleShortlist}
        >
          {isShortlisted ? (
            <BookmarkCheck className="h-3.5 w-3.5 text-primary" />
          ) : (
            <BookmarkPlus className="h-3.5 w-3.5" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default RecruiterStudentCard;
