import { useState } from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import ProblemHeader from "@/components/dashboard/ProblemHeader";
import WorkspaceEditor from "@/components/dashboard/WorkspaceEditor";
import AIAssistantPanel from "@/components/dashboard/AIAssistantPanel";
import ProblemSelector from "@/components/dashboard/ProblemSelector";
import ProgressDashboard from "@/components/dashboard/ProgressDashboard";
import BadgesPanel from "@/components/dashboard/BadgesPanel";

const currentProblem = {
  id: 1,
  title: "Build an AI-Powered Customer Support Chatbot",
  company: "TechCorp Solutions",
  domain: "AI",
  difficulty: "Intermediate",
  students: 234,
  timeEstimate: "2-3 weeks",
  skills: ["NLP", "Python", "API Integration", "RAG"],
  description: "Create a chatbot that can handle customer queries using natural language processing and integrate with existing CRM systems.",
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("workspace");
  const [selectedProblem, setSelectedProblem] = useState<typeof currentProblem | null>(null);

  const renderContent = () => {
    switch (activeTab) {
      case "workspace":
        if (!selectedProblem) {
          return <ProblemSelector onSelect={setSelectedProblem} />;
        }
        return (
          <div className="flex flex-col h-full gap-4">
            <ProblemHeader problem={selectedProblem} onBack={() => setSelectedProblem(null)} />
            <div className="flex-1 grid lg:grid-cols-3 gap-4 min-h-0">
              <div className="lg:col-span-2 min-h-0">
                <WorkspaceEditor problem={selectedProblem} />
              </div>
              <div className="min-h-0">
                <AIAssistantPanel />
              </div>
            </div>
          </div>
        );
      case "progress":
        return <ProgressDashboard />;
      case "badges":
        return <BadgesPanel />;
      case "settings":
        return (
          <div className="glass-card rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Settings</h2>
            <p className="text-muted-foreground">Settings panel coming soon...</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-screen flex bg-background">
      <DashboardSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 border-b border-border/50 flex items-center justify-between px-6">
          <h1 className="text-lg font-semibold capitalize">{activeTab}</h1>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium">Level 12</p>
              <p className="text-xs text-muted-foreground">1,240 XP to next level</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold">
              12
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-6 overflow-auto custom-scrollbar">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
