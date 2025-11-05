import { Link } from "react-router-dom";
import { Leaf, BarChart3, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Home = () => {
  return (
    <div className="min-h-[calc(100vh-180px)]">
      {/* Hero Section */}
      <section className="gradient-eco py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Leaf className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Track and Reduce Your Carbon Footprint
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
            Ecoscan helps you monitor your daily activities and understand their environmental impact
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/log-activity">
              <Button size="lg" variant="secondary" className="text-lg px-8 hover:scale-105 transition-smooth">
                Start Logging
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" variant="outline" className="text-lg px-8 bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20 hover:scale-105 transition-smooth">
                View Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            How Ecoscan Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="shadow-card border-border hover:shadow-lg transition-smooth">
              <CardContent className="pt-6">
                <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center mb-4">
                  <Leaf className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Log Activities</h3>
                <p className="text-muted-foreground">
                  Record your daily activities from transport to food choices and energy consumption
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card border-border hover:shadow-lg transition-smooth">
              <CardContent className="pt-6">
                <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center mb-4">
                  <BarChart3 className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Track Impact</h3>
                <p className="text-muted-foreground">
                  View your estimated carbon footprint and understand which activities have the biggest impact
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card border-border hover:shadow-lg transition-smooth">
              <CardContent className="pt-6">
                <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center mb-4">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Make Changes</h3>
                <p className="text-muted-foreground">
                  Use insights to make eco-friendly choices and reduce your environmental footprint
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Start tracking your carbon footprint today and join the movement towards a sustainable future
          </p>
          <Link to="/log-activity">
            <Button size="lg" className="px-8 hover:scale-105 transition-smooth">
              Get Started
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
