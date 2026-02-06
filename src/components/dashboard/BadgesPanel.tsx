import { Badge } from "@/components/ui/badge";
import {
  Award,
  Star,
  Zap,
  Code,
  Brain,
  Shield,
  Rocket,
  Trophy,
  Target,
  CheckCircle,
  Lock,
} from "lucide-react";

const earnedBadges = [
  {
    id: 1,
    name: "React Pro",
    description: "Demonstrated advanced React skills",
    icon: Code,
    color: "from-primary to-info",
    earnedAt: "2024-01-15",
    rarity: "Rare",
  },
  {
    id: 2,
    name: "API Master",
    description: "Built 5+ API integrations",
    icon: Zap,
    color: "from-info to-accent",
    earnedAt: "2024-01-10",
    rarity: "Epic",
  },
  {
    id: 3,
    name: "Clean Code",
    description: "Consistently writes maintainable code",
    icon: CheckCircle,
    color: "from-success to-primary",
    earnedAt: "2024-01-08",
    rarity: "Rare",
  },
  {
    id: 4,
    name: "Problem Solver",
    description: "Solved 20+ industry problems",
    icon: Brain,
    color: "from-accent to-primary",
    earnedAt: "2024-01-05",
    rarity: "Epic",
  },
  {
    id: 5,
    name: "Quick Learner",
    description: "Rapid skill acquisition",
    icon: Rocket,
    color: "from-warning to-destructive",
    earnedAt: "2023-12-28",
    rarity: "Common",
  },
  {
    id: 6,
    name: "Ethical AI User",
    description: "Uses AI assistance responsibly",
    icon: Shield,
    color: "from-primary to-success",
    earnedAt: "2023-12-20",
    rarity: "Legendary",
  },
];

const upcomingBadges = [
  {
    id: 7,
    name: "Full Stack Hero",
    description: "Complete 3 full-stack projects",
    icon: Trophy,
    progress: 67,
    remaining: "1 more project",
  },
  {
    id: 8,
    name: "Cloud Architect",
    description: "Master cloud deployment skills",
    icon: Target,
    progress: 45,
    remaining: "2 more cloud problems",
  },
  {
    id: 9,
    name: "7-Day Streak",
    description: "Code for 7 consecutive days",
    icon: Star,
    progress: 86,
    remaining: "1 more day",
  },
];

const rarityColors: Record<string, string> = {
  Common: "text-muted-foreground",
  Rare: "text-info",
  Epic: "text-accent",
  Legendary: "text-warning",
};

const BadgesPanel = () => {
  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="glass-card rounded-xl p-5 text-center">
          <Award className="h-8 w-8 text-primary mx-auto mb-2" />
          <p className="text-3xl font-bold">{earnedBadges.length}</p>
          <p className="text-sm text-muted-foreground">Badges Earned</p>
        </div>
        <div className="glass-card rounded-xl p-5 text-center">
          <Trophy className="h-8 w-8 text-warning mx-auto mb-2" />
          <p className="text-3xl font-bold">1</p>
          <p className="text-sm text-muted-foreground">Legendary Badges</p>
        </div>
        <div className="glass-card rounded-xl p-5 text-center">
          <Target className="h-8 w-8 text-accent mx-auto mb-2" />
          <p className="text-3xl font-bold">3</p>
          <p className="text-sm text-muted-foreground">In Progress</p>
        </div>
      </div>

      {/* Earned Badges */}
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Award className="h-5 w-5 text-primary" />
          Earned Badges
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {earnedBadges.map((badge) => (
            <div
              key={badge.id}
              className="glass-card-hover rounded-xl p-5 group cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${badge.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}
                >
                  <badge.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold truncate">{badge.name}</h4>
                    <span className={`text-xs ${rarityColors[badge.rarity]}`}>
                      {badge.rarity}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{badge.description}</p>
                  <p className="text-xs text-muted-foreground">
                    Earned {new Date(badge.earnedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Badges */}
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Lock className="h-5 w-5 text-muted-foreground" />
          In Progress
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {upcomingBadges.map((badge) => (
            <div
              key={badge.id}
              className="glass-card rounded-xl p-5 opacity-80"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                  <badge.icon className="h-7 w-7 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold truncate mb-1">{badge.name}</h4>
                  <p className="text-xs text-muted-foreground mb-3">{badge.description}</p>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden mb-2">
                    <div
                      className="h-full bg-gradient-to-r from-primary/50 to-accent/50 rounded-full"
                      style={{ width: `${badge.progress}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{badge.progress}%</span>
                    <span className="text-xs text-primary">{badge.remaining}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BadgesPanel;
