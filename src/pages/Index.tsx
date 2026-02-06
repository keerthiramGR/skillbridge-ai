import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProblemStatements from "@/components/ProblemStatements";
import SkillHeatmap from "@/components/SkillHeatmap";
import TalentMapping from "@/components/TalentMapping";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <HowItWorks />
      <ProblemStatements />
      <SkillHeatmap />
      <TalentMapping />
      <Footer />
    </div>
  );
};

export default Index;
