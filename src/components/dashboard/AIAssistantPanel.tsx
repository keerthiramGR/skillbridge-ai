import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Send,
  Sparkles,
  Lightbulb,
  Bug,
  Code,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Bot,
} from "lucide-react";

const quickActions = [
  { icon: Lightbulb, label: "Get Hint", prompt: "Give me a hint for my current approach" },
  { icon: Bug, label: "Debug Help", prompt: "Help me debug this issue" },
  { icon: Code, label: "Code Review", prompt: "Review my code structure" },
  { icon: HelpCircle, label: "Clarify Problem", prompt: "Help me understand the problem better" },
];

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const AIAssistantPanel = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content: "Hi! I'm your AI learning companion. I'm here to guide you through this problem—not give you answers, but help you discover them. What would you like to explore?",
      timestamp: new Date(),
    },
  ]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    const assistantMessage: Message = {
      id: messages.length + 2,
      role: "assistant",
      content: "That's a great question! Let me guide you through a thinking process. Have you considered breaking down the problem into smaller components first? What's the core functionality you need to implement?",
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage, assistantMessage]);
    setInput("");
  };

  const handleQuickAction = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <div className="glass-card rounded-2xl flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div
        className="flex items-center justify-between p-4 border-b border-border/50 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Bot className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">AI Learning Assistant</h3>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              <span className="text-xs text-muted-foreground">Ready to guide</span>
            </div>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
        </Button>
      </div>

      {isExpanded && (
        <>
          {/* Quick Actions */}
          <div className="p-3 border-b border-border/50">
            <p className="text-xs text-muted-foreground mb-2">Quick Actions</p>
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((action) => (
                <Button
                  key={action.label}
                  variant="outline"
                  size="sm"
                  className="text-xs justify-start gap-2 h-8"
                  onClick={() => handleQuickAction(action.prompt)}
                >
                  <action.icon className="h-3 w-3" />
                  {action.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-xl p-3 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary"
                  }`}
                >
                  {message.role === "assistant" && (
                    <div className="flex items-center gap-1 mb-1">
                      <Sparkles className="h-3 w-3 text-primary" />
                      <span className="text-xs font-medium text-primary">AI Mentor</span>
                    </div>
                  )}
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-border/50">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask for guidance..."
                className="flex-1 bg-secondary rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <Button size="icon" onClick={handleSend} disabled={!input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              AI guides your learning—it won't give direct answers
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default AIAssistantPanel;
