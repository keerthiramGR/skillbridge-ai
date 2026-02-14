import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Search,
  Filter,
  Home,
  Users,
  BookmarkCheck,
  Settings,
  ChevronLeft,
  ChevronRight,
  Building2,
  LogOut,
  Bell,
} from "lucide-react";
import RecruiterStudentCard from "@/components/recruiter/RecruiterStudentCard";
import RecruiterFilters from "@/components/recruiter/RecruiterFilters";

const allStudents = [
  {
    id: 1,
    name: "Priya Sharma",
    college: "IIT Bombay",
    level: 15,
    matchScore: 95,
    skills: ["React", "TypeScript", "Node.js", "System Design"],
    domain: "Web",
    badges: 8,
    problemsSolved: 24,
    topStrength: "Frontend Architecture",
    available: true,
  },
  {
    id: 2,
    name: "Arjun Patel",
    college: "BITS Pilani",
    level: 12,
    matchScore: 87,
    skills: ["Python", "TensorFlow", "NLP", "RAG"],
    domain: "AI",
    badges: 6,
    problemsSolved: 18,
    topStrength: "Machine Learning",
    available: true,
  },
  {
    id: 3,
    name: "Sneha Reddy",
    college: "NIT Trichy",
    level: 14,
    matchScore: 82,
    skills: ["AWS", "Docker", "Kubernetes", "Terraform"],
    domain: "Cloud",
    badges: 7,
    problemsSolved: 21,
    topStrength: "Cloud Infrastructure",
    available: false,
  },
  {
    id: 4,
    name: "Rahul Verma",
    college: "IIIT Hyderabad",
    level: 11,
    matchScore: 78,
    skills: ["SQL", "Python", "Spark", "Tableau"],
    domain: "Data",
    badges: 5,
    problemsSolved: 15,
    topStrength: "Data Engineering",
    available: true,
  },
  {
    id: 5,
    name: "Ananya Gupta",
    college: "DTU Delhi",
    level: 16,
    matchScore: 91,
    skills: ["React", "Go", "PostgreSQL", "GraphQL"],
    domain: "Web",
    badges: 9,
    problemsSolved: 28,
    topStrength: "Full Stack Development",
    available: true,
  },
  {
    id: 6,
    name: "Karthik Nair",
    college: "VIT Vellore",
    level: 10,
    matchScore: 74,
    skills: ["Java", "Spring Boot", "Microservices", "Redis"],
    domain: "Web",
    badges: 4,
    problemsSolved: 12,
    topStrength: "Backend Systems",
    available: true,
  },
];

const domains = ["All", "AI", "Web", "Data", "Cloud"];

const RecruiterDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("browse");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [minMatch, setMinMatch] = useState(0);
  const [shortlisted, setShortlisted] = useState<number[]>([]);

  const filteredStudents = allStudents.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.college.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.skills.some((sk) => sk.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesDomain = selectedDomain === "All" || s.domain === selectedDomain;
    const matchesSkills =
      selectedSkills.length === 0 || selectedSkills.some((sk) => s.skills.includes(sk));
    const matchesScore = s.matchScore >= minMatch;

    if (activeTab === "shortlisted") return shortlisted.includes(s.id) && matchesSearch;
    return matchesSearch && matchesDomain && matchesSkills && matchesScore;
  });

  const toggleShortlist = (id: number) => {
    setShortlisted((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const sidebarItems = [
    { id: "browse", label: "Browse Talent", icon: Users },
    { id: "shortlisted", label: "Shortlisted", icon: BookmarkCheck, count: shortlisted.length },
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
                <span className="text-gradient">SkillBridge
</span>
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
              {!collapsed && (
                <span className="flex-1 text-left flex items-center justify-between">
                  {item.label}
                  {item.count !== undefined && item.count > 0 && (
                    <Badge variant="ai" className="text-xs ml-2">
                      {item.count}
                    </Badge>
                  )}
                </span>
              )}
            </Button>
          ))}
        </nav>

        <div className="p-3 border-t border-sidebar-border">
          <div className={`flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
              <Building2 className="h-4 w-4 text-primary-foreground" />
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">TechCorp</p>
                <p className="text-xs text-muted-foreground truncate">Recruiter</p>
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
          <h1 className="text-lg font-semibold capitalize">
            {activeTab === "browse" ? "Browse Talent" : activeTab === "shortlisted" ? "Shortlisted" : "Settings"}
          </h1>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-destructive rounded-full" />
            </Button>
            <Badge variant="ai" className="gap-1">
              <Sparkles className="h-3 w-3" />
              AI Matching Active
            </Badge>
          </div>
        </header>

        <div className="flex-1 p-6 overflow-auto custom-scrollbar">
          {activeTab === "settings" ? (
            <div className="glass-card rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Recruiter Settings</h2>
              <p className="text-muted-foreground">Settings panel coming soon...</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Search & Filter Bar */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, college, or skill..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-card border-border/50"
                  />
                </div>
                <div className="flex gap-2">
                  {domains.map((d) => (
                    <Button
                      key={d}
                      variant={selectedDomain === d ? "hero" : "outline"}
                      size="sm"
                      onClick={() => setSelectedDomain(d)}
                    >
                      {d}
                    </Button>
                  ))}
                  <Button
                    variant={showFilters ? "secondary" : "outline"}
                    size="sm"
                    className="gap-2"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter className="h-4 w-4" />
                    Filters
                  </Button>
                </div>
              </div>

              {showFilters && (
                <RecruiterFilters
                  selectedSkills={selectedSkills}
                  onSkillsChange={setSelectedSkills}
                  minMatch={minMatch}
                  onMinMatchChange={setMinMatch}
                />
              )}

              {/* Results */}
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  <span className="text-foreground font-semibold">{filteredStudents.length}</span>{" "}
                  {activeTab === "shortlisted" ? "shortlisted" : "matching"} profiles
                </p>
              </div>

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredStudents.map((student) => (
                  <RecruiterStudentCard
                    key={student.id}
                    student={student}
                    isShortlisted={shortlisted.includes(student.id)}
                    onToggleShortlist={() => toggleShortlist(student.id)}
                  />
                ))}
              </div>

              {filteredStudents.length === 0 && (
                <div className="glass-card rounded-2xl p-12 text-center">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No profiles found</h3>
                  <p className="text-muted-foreground text-sm">
                    Try adjusting your filters or search query.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default RecruiterDashboard;
