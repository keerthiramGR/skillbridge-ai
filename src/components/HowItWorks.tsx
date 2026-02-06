import { Sparkles, Code, Brain, Award, Briefcase, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Code,
    title: "Choose a Problem",
    description: "Browse real industry challenges posted by companies. Each problem is AI-processed into clear, achievable learning objectives.",
    color: "from-primary to-info",
  },
  {
    number: "02",
    icon: Brain,
    title: "Build with AI Guidance",
    description: "Work in your development workspace with an AI mentor that guides without giving answers. Learn through discovery.",
    color: "from-info to-accent",
  },
  {
    number: "03",
    icon: Award,
    title: "Earn Skill Badges",
    description: "Your approach, code quality, and problem-solving skills are analyzed by AI to issue verifiable skill badges.",
    color: "from-accent to-primary",
  },
  {
    number: "04",
    icon: Briefcase,
    title: "Get Discovered",
    description: "Your proof-based profile matches you with recruiters who value demonstrated ability over traditional resumes.",
    color: "from-primary to-success",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-4">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">How It Works</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            From <span className="text-gradient">Learning</span> to <span className="text-gradient">Hiring</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A complete ecosystem that transforms how students learn, demonstrate skills, and connect with employers.
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="relative group"
              >
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-border to-transparent z-0" />
                )}
                
                <div className="glass-card-hover rounded-2xl p-6 h-full relative z-10">
                  {/* Number Badge */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <step.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  
                  <span className="text-xs font-mono text-muted-foreground">Step {step.number}</span>
                  <h3 className="text-lg font-semibold mt-1 mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Arrow indicator */}
          <div className="flex justify-center mt-8">
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="text-sm">Complete learning journey</span>
              <ArrowRight className="h-4 w-4 text-primary animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
