import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Introduction from "@/components/sections/Introduction";
import Factors from "@/components/sections/Factors";
import StrategyMatrix from "@/components/sections/StrategyMatrix";
import Process from "@/components/sections/Process";
import Simulator from "@/components/sections/Simulator";
import Example from "@/components/sections/Example";
import Quiz from "@/components/sections/Quiz";
import Discussion from "@/components/sections/Discussion";
import Footer from "@/components/layout/Footer";
import MobileTabBar from "@/components/layout/MobileTabBar";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans app-background pb-14 md:pb-0">
      <Navbar />
      <main className="flex-1 space-y-4">
        <Hero />
        <Introduction />
        <Factors />
        <StrategyMatrix />
        <Process />
        <Example />
        <Simulator />
        <Quiz />
        <Discussion />
      </main>
      <Footer />
      <MobileTabBar />
    </div>
  );
}
