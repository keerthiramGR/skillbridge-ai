import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Play,
  Save,
  Upload,
  FileCode,
  FolderTree,
  Terminal,
  CheckCircle,
  AlertCircle,
  Clock,
} from "lucide-react";

interface WorkspaceEditorProps {
  problem: {
    title: string;
    company: string;
    difficulty: string;
    description: string;
    skills: string[];
  };
}

const WorkspaceEditor = ({ problem }: WorkspaceEditorProps) => {
  const [code, setCode] = useState(`// Solution for: ${problem.title}
// Company: ${problem.company}

function solve() {
  // Start implementing your solution here
  // The AI assistant can help guide your approach
  
  console.log("Let's build something great!");
}

solve();
`);

  const [activeFile, setActiveFile] = useState("main.ts");

  const files = [
    { name: "main.ts", icon: FileCode },
    { name: "helpers.ts", icon: FileCode },
    { name: "README.md", icon: FileCode },
  ];

  return (
    <div className="glass-card rounded-2xl flex flex-col h-full overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-3 border-b border-border/50">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1">
            <Clock className="h-3 w-3" />
            2h 15m
          </Badge>
          <Badge variant="success" className="gap-1">
            <CheckCircle className="h-3 w-3" />
            Auto-saved
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Play className="h-4 w-4" />
            Run
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Save className="h-4 w-4" />
            Save
          </Button>
          <Button variant="default" size="sm" className="gap-2">
            <Upload className="h-4 w-4" />
            Submit
          </Button>
        </div>
      </div>

      {/* Editor Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* File Explorer */}
        <div className="w-48 border-r border-border/50 p-2">
          <div className="flex items-center gap-2 px-2 py-1 text-xs text-muted-foreground mb-2">
            <FolderTree className="h-3 w-3" />
            Files
          </div>
          {files.map((file) => (
            <button
              key={file.name}
              onClick={() => setActiveFile(file.name)}
              className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-sm text-left transition-colors ${
                activeFile === file.name
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              <file.icon className="h-3 w-3" />
              {file.name}
            </button>
          ))}
        </div>

        {/* Code Editor */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center gap-2 px-4 py-2 border-b border-border/50 bg-background/50">
            <FileCode className="h-4 w-4 text-primary" />
            <span className="text-sm font-mono">{activeFile}</span>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 bg-transparent p-4 font-mono text-sm resize-none focus:outline-none custom-scrollbar"
            spellCheck={false}
          />
        </div>
      </div>

      {/* Terminal */}
      <div className="h-32 border-t border-border/50 bg-background/50">
        <div className="flex items-center gap-2 px-4 py-2 border-b border-border/50">
          <Terminal className="h-4 w-4" />
          <span className="text-xs text-muted-foreground">Console</span>
        </div>
        <div className="p-3 font-mono text-xs text-muted-foreground">
          <p className="text-success">$ Ready to run your code...</p>
          <p className="text-foreground">{'>'} Let's build something great!</p>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceEditor;
