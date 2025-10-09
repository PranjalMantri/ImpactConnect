import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Search, Users, Globe } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import heroBackground from "../assets/hero-background.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative h-[600px] flex items-center justify-center text-center overflow-hidden mt-16"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto px-4 z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Connect, Contribute, Change the World
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            ImpactConnect bridges the gap between non-profit organizations and
            individuals eager to make a difference. Whether you're looking to
            donate, volunteer your time, or find a cause that resonates, we're
            here to help you create a meaningful impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              asChild
              className="bg-primary hover:bg-primary-hover text-primary-foreground"
            >
              <Link to="/projects">Explore Projects</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link to="/register">Sign Up</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How ImpactConnect Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform simplifies the process of connecting with non-profit
              organizations, ensuring your contributions directly support
              impactful projects.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 bg-secondary rounded-lg flex items-center justify-center mb-6">
                <Search className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Find Your Cause</h3>
              <p className="text-muted-foreground">
                Browse a diverse range of projects and organizations aligned
                with your interests and values.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 bg-secondary rounded-lg flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Connect with NGOs</h3>
              <p className="text-muted-foreground">
                Directly engage with non-profit organizations, understand their
                needs, and offer your support.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 bg-secondary rounded-lg flex items-center justify-center mb-6">
                <Globe className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Make a Difference</h3>
              <p className="text-muted-foreground">
                Contribute your time, skills, or resources to projects that
                create real, positive change in communities worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* <Footer /> */}
    </div>
  );
};

export default Index;
