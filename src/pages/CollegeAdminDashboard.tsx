import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Sparkles,
  Home,
  BarChart3,
  Users,
  GraduationCap,
  TrendingUp,
  Award,
  Settings,
  ChevronLeft,
  ChevronRight,
  Building2,
  LogOut,
  Bell,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  BookOpen,
  Briefcase,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
} from "recharts";

const placementData = [
  { year: "2021", placed: 72, total: 100 },
  { year: "2022", placed: 78, total: 100 },
  { year: "2023", placed: 85, total: 100 },
  { year: "2024", placed: 88, total: 100 },
  { year: "2025", placed: 93, total: 100 },
];

const departmentSkills = [
  { department: "CSE", AI: 85, Web: 90, Cloud: 70, Data: 75, Cyber: 60 },
  { department: "IT", AI: 65, Web: 80, Cloud: 75, Data: 70, Cyber: 55 },
  { department: "ECE", AI: 55, Web: 45, Cloud: 50, Data: 60, Cyber: 40 },
  { department: "Mech", AI: 30, Web: 25, Cloud: 35, Data: 45, Cyber: 20 },
  { department: "Civil", AI: 20, Web: 20, Cloud: 25, Data: 35, Cyber: 15 },
];

const domainDistribution = [
  { name: "Web Dev", value: 35, color: "hsl(var(--primary))" },
  { name: "AI/ML", value: 28, color: "hsl(var(--accent))" },
  { name: "Cloud", value: 18, color: "hsl(190, 80%, 50%)" },
  { name: "Data", value: 12, color: "hsl(280, 70%, 60%)" },
  { name: "Cyber", value: 7, color: "hsl(340, 70%, 55%)" },
];

const monthlyActivity = [
  { month: "Aug", submissions: 120, active: 85 },
  { month: "Sep", submissions: 180, active: 110 },
  { month: "Oct", submissions: 240, active: 145 },
  { month: "Nov", submissions: 310, active: 190 },
  { month: "Dec", submissions: 280, active: 170 },
  { month: "Jan", submissions: 350, active: 210 },
  { month: "Feb", submissions: 420, active: 250 },
];

const radarData = [
  { skill: "Problem Solving", CSE: 88, IT: 75, ECE: 65 },
  { skill: "System Design", CSE: 82, IT: 70, ECE: 55 },
  { skill: "Algorithms", CSE: 90, IT: 72, ECE: 60 },
  { skill: "Communication", CSE: 65, IT: 68, ECE: 70 },
  { skill: "Teamwork", CSE: 70, IT: 75, ECE: 78 },
  { skill: "Innovation", CSE: 78, IT: 72, ECE: 68 },
];

const topStudents = [
  { name: "Priya Sharma", dept: "CSE", level: 15, badges: 8, score: 95 },
  { name: "Ananya Gupta", dept: "CSE", level: 16, badges: 9, score: 91 },
  { name: "Arjun Patel", dept: "IT", level: 12, badges: 6, score: 87 },
  { name: "Sneha Reddy", dept: "ECE", level: 14, badges: 7, score: 82 },
  { name: "Rahul Verma", dept: "IT", level: 11, badges: 5, score: 78 },
];

const statsCards = [
  { label: "Total Students", value: "2,847", change: "+12%", up: true, icon: Users },
  { label: "Active Learners", value: "1,523", change: "+8%", up: true, icon: BookOpen },
  { label: "Placement Rate", value: "93%", change: "+5%", up: true, icon: Briefcase },
  { label: "Avg Skill Score", value: "74.2", change: "-2.1", up: false, icon: Target },
];

const CollegeAdminDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const sidebarItems = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "departments", label: "Departments", icon: Building2 },
    { id: "students", label: "Students", icon: Users },
    { id: "placements", label: "Placements", icon: Briefcase },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="h-screen flex bg-background">
      {/* Sidebar */}
      <aside
        className={`${
          collapsed ? "w-16" : "w-64"
        } bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300`}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
          {!collapsed && (
            <Link to="/" className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="font-bold text-sm">
                <span className="text-gradient">Edugram</span>
                <span className="text-muted-foreground"> AI</span>
              </span>
            </Link>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-md hover:bg-sidebar-accent transition-colors"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          <Link to="/">
            <Button variant="ghost" className={`w-full justify-start gap-3 ${collapsed ? "px-2" : ""}`}>
              <Home className="h-4 w-4" />
              {!collapsed && <span>Home</span>}
            </Button>
          </Link>
          <div className="py-2">
            <div className={`h-px bg-sidebar-border ${collapsed ? "mx-1" : "mx-2"}`} />
          </div>
          {sidebarItems.map((item) => (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "secondary" : "ghost"}
              className={`w-full justify-start gap-3 ${collapsed ? "px-2" : ""} ${
                activeTab === item.id ? "bg-sidebar-accent" : ""
              }`}
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon className="h-4 w-4" />
              {!collapsed && <span>{item.label}</span>}
            </Button>
          ))}
        </nav>

        <div className="p-3 border-t border-sidebar-border">
          <div className={`flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <GraduationCap className="h-4 w-4 text-primary-foreground" />
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">IIT Bombay</p>
                <p className="text-xs text-muted-foreground truncate">College Admin</p>
              </div>
            )}
          </div>
          {!collapsed && (
            <Button variant="ghost" size="sm" className="w-full mt-2 gap-2">
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          )}
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-border/50 flex items-center justify-between px-6">
          <h1 className="text-lg font-semibold">
            {sidebarItems.find((i) => i.id === activeTab)?.label || "Overview"}
          </h1>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-destructive rounded-full" />
            </Button>
            <Badge variant="ai" className="gap-1">
              <Sparkles className="h-3 w-3" />
              Analytics Live
            </Badge>
          </div>
        </header>

        <div className="flex-1 p-6 overflow-auto custom-scrollbar">
          {activeTab === "settings" ? (
            <div className="glass-card rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Admin Settings</h2>
              <p className="text-muted-foreground">Settings panel coming soon...</p>
            </div>
          ) : activeTab === "students" ? (
            <StudentsTab />
          ) : activeTab === "departments" ? (
            <DepartmentsTab />
          ) : activeTab === "placements" ? (
            <PlacementsTab />
          ) : (
            <OverviewTab />
          )}
        </div>
      </main>
    </div>
  );
};

const OverviewTab = () => (
  <div className="space-y-6 stagger-children">
    {/* Stats Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {statsCards.map((stat) => (
        <Card key={stat.label} className="glass-card border-border/30">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
              <span
                className={`flex items-center gap-1 text-xs font-medium ${
                  stat.up ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {stat.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
          </CardContent>
        </Card>
      ))}
    </div>

    <div className="grid lg:grid-cols-2 gap-6">
      {/* Placement Trend */}
      <Card className="glass-card border-border/30">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            Placement Rate Trend
          </CardTitle>
          <CardDescription>Year-over-year placement percentages</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={placementData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Bar dataKey="placed" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Domain Distribution */}
      <Card className="glass-card border-border/30">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Target className="h-4 w-4 text-accent" />
            Student Domain Distribution
          </CardTitle>
          <CardDescription>Skill domains pursued by students</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-6">
          <ResponsiveContainer width="50%" height={220}>
            <PieChart>
              <Pie
                data={domainDistribution}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
              >
                {domainDistribution.map((entry, idx) => (
                  <Cell key={idx} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex-1 space-y-3">
            {domainDistribution.map((d) => (
              <div key={d.name} className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }} />
                <span className="text-sm flex-1">{d.name}</span>
                <span className="text-sm font-semibold">{d.value}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>

    {/* Monthly Activity */}
    <Card className="glass-card border-border/30">
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-primary" />
          Monthly Activity
        </CardTitle>
        <CardDescription>Submissions & active learners over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={monthlyActivity}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                fontSize: "12px",
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="submissions" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="active" stroke="hsl(var(--accent))" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  </div>
);

const DepartmentsTab = () => (
  <div className="space-y-6">
    {/* Department Skill Comparison */}
    <Card className="glass-card border-border/30">
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Building2 className="h-4 w-4 text-primary" />
          Department Skill Proficiency
        </CardTitle>
        <CardDescription>Average skill scores across departments</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={departmentSkills} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[0, 100]} />
            <YAxis dataKey="department" type="category" stroke="hsl(var(--muted-foreground))" fontSize={12} width={50} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                fontSize: "12px",
              }}
            />
            <Legend />
            <Bar dataKey="AI" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
            <Bar dataKey="Web" fill="hsl(var(--accent))" radius={[0, 4, 4, 0]} />
            <Bar dataKey="Cloud" fill="hsl(190, 80%, 50%)" radius={[0, 4, 4, 0]} />
            <Bar dataKey="Data" fill="hsl(280, 70%, 60%)" radius={[0, 4, 4, 0]} />
            <Bar dataKey="Cyber" fill="hsl(340, 70%, 55%)" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>

    {/* Radar Comparison */}
    <Card className="glass-card border-border/30">
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Award className="h-4 w-4 text-accent" />
          Soft Skills Comparison (Top Departments)
        </CardTitle>
        <CardDescription>CSE vs IT vs ECE across key competencies</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="hsl(var(--border))" />
            <PolarAngleAxis dataKey="skill" stroke="hsl(var(--muted-foreground))" fontSize={11} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="hsl(var(--muted-foreground))" fontSize={10} />
            <Radar name="CSE" dataKey="CSE" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.2} />
            <Radar name="IT" dataKey="IT" stroke="hsl(var(--accent))" fill="hsl(var(--accent))" fillOpacity={0.2} />
            <Radar name="ECE" dataKey="ECE" stroke="hsl(280, 70%, 60%)" fill="hsl(280, 70%, 60%)" fillOpacity={0.2} />
            <Legend />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                fontSize: "12px",
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  </div>
);

const StudentsTab = () => (
  <div className="space-y-6">
    <Card className="glass-card border-border/30">
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Users className="h-4 w-4 text-primary" />
          Top Performing Students
        </CardTitle>
        <CardDescription>Ranked by AI skill score</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topStudents.map((student, idx) => (
            <div
              key={student.name}
              className="flex items-center gap-4 p-3 rounded-xl bg-card/50 border border-border/20 hover:border-primary/30 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xs font-bold text-primary-foreground">
                {idx + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">{student.name}</p>
                <p className="text-xs text-muted-foreground">{student.dept} • Level {student.level}</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="ai" className="gap-1 text-xs">
                  <Award className="h-3 w-3" />
                  {student.badges}
                </Badge>
                <div className="text-right">
                  <p className="text-sm font-bold text-primary">{student.score}</p>
                  <p className="text-[10px] text-muted-foreground">AI Score</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>

    {/* Student Engagement */}
    <div className="grid md:grid-cols-3 gap-4">
      {[
        { label: "Avg Problems Solved", value: "12.4", desc: "Per student this semester" },
        { label: "Badge Completion", value: "68%", desc: "Students with ≥3 badges" },
        { label: "AI Mentor Usage", value: "4.2 hrs/wk", desc: "Average per active student" },
      ].map((metric) => (
        <Card key={metric.label} className="glass-card border-border/30">
          <CardContent className="p-5 text-center">
            <p className="text-3xl font-bold text-primary mb-1">{metric.value}</p>
            <p className="text-sm font-medium">{metric.label}</p>
            <p className="text-xs text-muted-foreground mt-1">{metric.desc}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

const PlacementsTab = () => (
  <div className="space-y-6">
    <div className="grid md:grid-cols-3 gap-4">
      {[
        { label: "Total Placed", value: "2,648", pct: "93%" },
        { label: "Avg Package", value: "₹12.4 LPA", pct: "+18%" },
        { label: "Top Recruiter", value: "TechCorp", pct: "142 hires" },
      ].map((s) => (
        <Card key={s.label} className="glass-card border-border/30">
          <CardContent className="p-5">
            <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
            <p className="text-2xl font-bold">{s.value}</p>
            <Badge variant="success" className="mt-2 text-xs">{s.pct}</Badge>
          </CardContent>
        </Card>
      ))}
    </div>

    <Card className="glass-card border-border/30">
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Briefcase className="h-4 w-4 text-primary" />
          Department-wise Placement Rates
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {[
          { dept: "CSE", rate: 97 },
          { dept: "IT", rate: 92 },
          { dept: "ECE", rate: 85 },
          { dept: "Mech", rate: 72 },
          { dept: "Civil", rate: 65 },
        ].map((d) => (
          <div key={d.dept} className="space-y-1.5">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{d.dept}</span>
              <span className="text-muted-foreground">{d.rate}%</span>
            </div>
            <Progress value={d.rate} className="h-2" />
          </div>
        ))}
      </CardContent>
    </Card>
  </div>
);

export default CollegeAdminDashboard;
