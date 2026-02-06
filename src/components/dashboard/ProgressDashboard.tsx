import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  Target,
  Clock,
  Zap,
  Calendar,
  BarChart3,
} from "lucide-react";

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
      { name: "Vision", level: 30 },
      { name: "LLM", level: 72 },
      { name: "Data", level: 60 },
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

const weeklyActivity = [
  { day: "Mon", problems: 2, hours: 3 },
  { day: "Tue", problems: 1, hours: 2 },
  { day: "Wed", problems: 3, hours: 4 },
  { day: "Thu", problems: 0, hours: 1 },
  { day: "Fri", problems: 2, hours: 3 },
  { day: "Sat", problems: 4, hours: 5 },
  { day: "Sun", problems: 1, hours: 2 },
];

const ProgressDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Target, label: "Problems Solved", value: "23", change: "+3 this week" },
          { icon: Clock, label: "Hours Invested", value: "156", change: "+12 this week" },
          { icon: Zap, label: "Current Streak", value: "7 days", change: "Best: 14 days" },
          { icon: TrendingUp, label: "Skill Growth", value: "+12%", change: "This month" },
        ].map((stat, i) => (
          <div key={i} className="glass-card rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
            <p className="text-xs text-primary mt-1">{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Skill Heatmap */}
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold">Skill Heatmap</h3>
            <Badge variant="outline" className="text-xs">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12% growth
            </Badge>
          </div>
          <div className="space-y-4">
            {skillCategories.map((category) => (
              <div key={category.name}>
                <p className="text-sm text-muted-foreground mb-2">{category.name}</p>
                <div className="grid grid-cols-4 gap-2">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="text-center group">
                      <div
                        className={`heatmap-cell h-10 ${getHeatmapColor(skill.level)} flex items-center justify-center`}
                      >
                        <span className="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                          {skill.level}%
                        </span>
                      </div>
                      <p className="text-xs mt-1 text-muted-foreground truncate">{skill.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Activity */}
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold">Weekly Activity</h3>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">This Week</span>
            </div>
          </div>
          <div className="space-y-4">
            {weeklyActivity.map((day) => (
              <div key={day.day} className="flex items-center gap-4">
                <span className="w-8 text-sm text-muted-foreground">{day.day}</span>
                <div className="flex-1 h-6 bg-secondary rounded-full overflow-hidden relative">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-accent rounded-full progress-animated"
                    style={{ width: `${(day.hours / 5) * 100}%` }}
                  />
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground w-24">
                  <span>{day.problems} problems</span>
                  <span>{day.hours}h</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Role Readiness */}
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <BarChart3 className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Role Readiness</h3>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { role: "Frontend Developer", match: 92, status: "Ready" },
            { role: "Full Stack Engineer", match: 75, status: "Almost Ready" },
            { role: "AI Engineer", match: 52, status: "In Progress" },
            { role: "DevOps Engineer", match: 48, status: "In Progress" },
          ].map((item) => (
            <div key={item.role} className="bg-secondary/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{item.role}</span>
              </div>
              <div className="h-2 bg-background rounded-full overflow-hidden mb-2">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                  style={{ width: `${item.match}%` }}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gradient">{item.match}%</span>
                <Badge
                  variant={item.status === "Ready" ? "success" : "warning"}
                  className="text-xs"
                >
                  {item.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressDashboard;
