import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";

const allSkills = [
  "React", "TypeScript", "Node.js", "Python", "TensorFlow", "NLP",
  "AWS", "Docker", "Kubernetes", "SQL", "Go", "GraphQL",
  "System Design", "RAG", "Terraform", "Spark", "Redis", "Java",
];

interface Props {
  selectedSkills: string[];
  onSkillsChange: (skills: string[]) => void;
  minMatch: number;
  onMinMatchChange: (val: number) => void;
}

const RecruiterFilters = ({ selectedSkills, onSkillsChange, minMatch, onMinMatchChange }: Props) => {
  const toggleSkill = (skill: string) => {
    onSkillsChange(
      selectedSkills.includes(skill)
        ? selectedSkills.filter((s) => s !== skill)
        : [...selectedSkills, skill]
    );
  };

  return (
    <div className="glass-card rounded-xl p-5 space-y-5 animate-fade-in">
      {/* Skills */}
      <div>
        <h4 className="text-sm font-semibold mb-3">Filter by Skills</h4>
        <div className="flex flex-wrap gap-2">
          {allSkills.map((skill) => (
            <Badge
              key={skill}
              variant={selectedSkills.includes(skill) ? "default" : "outline"}
              className="cursor-pointer text-xs transition-colors"
              onClick={() => toggleSkill(skill)}
            >
              {skill}
            </Badge>
          ))}
        </div>
      </div>

      {/* Min Match Score */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold">Minimum Match Score</h4>
          <span className="text-sm text-primary font-bold">{minMatch}%</span>
        </div>
        <Slider
          value={[minMatch]}
          onValueChange={([val]) => onMinMatchChange(val)}
          max={100}
          step={5}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default RecruiterFilters;
