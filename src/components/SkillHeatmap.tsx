import { Sparkles, TrendingUp, Award, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const skillCategories = [
  {
    name: "Frontend",
    skills: [
      { name: "React", level: 85 },
      { name: "TypeScript", level: 78 },
      { name: "CSS/Tailwind", level: 92 },
      { name: "Next.js", level: 65 },
    ],
  },
  {
    name: "Backend",
    skills: [
      { name: "Node.js", level: 70 },
      { name: "Python", level: 55 },
      { name: "Databases", level: 82 },
      { name: "APIs", level: 88 },
    ],
  },
  {
    name: "AI/ML",
    skills: [
      { name: "NLP", level: 45 },
      { name: "Computer Vision", level: 30 },
      { name: "LLM Integration", level: 72 },
      { name: "Data Analysis", level: 60 },
    ],
  },
  {
    name: "DevOps",
    skills: [
      { name: "Docker", level: 68 },
      { name: "CI/CD", level: 55 },
      { name: "AWS", level: 50 },
      { name: "Monitoring", level: 40 },
    ],
  },
];

const getHeatmapColor = (level: number) => {
  if (level >= 80) return "bg-primary";
  if (level >= 60) return "bg-primary/70";
  if (level >= 40) return "bg-primary/40";
  if (level >= 20) return "bg-primary/20";
  return "bg-primary/10";
};

const roleReadiness = [
  { role: "Frontend Developer", match: 92, status: "Ready" },
  { role: "Full Stack Developer", match: 75, status: "Almost Ready" },
  { role: "AI Engineer", match: 52, status: "In Progress" },
  { role: "DevOps Engineer", match: 48, status: "In Progress" },
];

const SkillHeatmap = () => {
  return (
    <section id="skills" className="py-24 relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-4">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">AI Skill Tracking Engine</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Your Skills, <span className="text-gradient">Visualized</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our AI analyzes your coding patterns, problem-solving approaches, and growth trajectory 
            to create a dynamic skill profile that evolves with you.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Skill Heatmap */}
          <div className="lg:col-span-2 glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-lg">Skill Heatmap</h3>
              <Badge variant="outline" className="text-xs">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12% this month
              </Badge>
            </div>
            
            <div className="space-y-6">
              {skillCategories.map((category) => (
                <div key={category.name}>
                  <p className="text-sm text-muted-foreground mb-2">{category.name}</p>
                  <div className="grid grid-cols-4 gap-2">
                    {category.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="relative group"
                      >
                        <div
                          className={`heatmap-cell h-12 ${getHeatmapColor(skill.level)} flex items-center justify-center`}
                        >
                          <span className="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                            {skill.level}%
                          </span>
                        </div>
                        <p className="text-xs text-center mt-1 text-muted-foreground truncate">
                          {skill.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-4 mt-6 pt-4 border-t border-border/50">
              <span className="text-xs text-muted-foreground">Proficiency:</span>
              {[20, 40, 60, 80, 100].map((level) => (
                <div key={level} className="flex items-center gap-1">
                  <div className={`w-4 h-4 rounded ${getHeatmapColor(level)}`} />
                  <span className="text-xs text-muted-foreground">{level}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Role Readiness */}
          <div className="space-y-4">
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Target className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Role Readiness</h3>
              </div>
              
              <div className="space-y-4">
                {roleReadiness.map((item) => (
                  <div key={item.role} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{item.role}</span>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          item.status === "Ready" 
                            ? "bg-success/20 text-success border-success/30" 
                            : "bg-warning/20 text-warning border-warning/30"
                        }`}
                      >
                        {item.match}%
                      </Badge>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-accent rounded-full progress-animated"
                        style={{ width: `${item.match}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Latest Badges */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Award className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Recent Badges</h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {["React Pro", "API Master", "Clean Code", "Problem Solver"].map((badge) => (
                  <div
                    key={badge}
                    className="badge-glow px-3 py-2 rounded-lg bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30"
                  >
                    <span className="text-xs font-medium">{badge}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillHeatmap;
