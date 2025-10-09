import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Progress } from "../components/ui/progress";
import { FileText } from "lucide-react";
import Navbar from "../components/Navbar";

const ProjectDetail = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-5xl mx-auto">
          <Badge className="mb-4">EDUCATION</Badge>
          <h1 className="text-4xl font-bold mb-4">
            Empowering Youth Through Education
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Support our initiative to provide quality education and resources to
            underprivileged youth in rural communities.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="md:col-span-2">
              <img
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800"
                alt="Education project"
                className="w-full rounded-lg mb-8"
              />

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
                <p className="text-muted-foreground mb-4">
                  This project aims to improve educational outcomes for children
                  aged 6-16 in underserved areas. We provide access to learning
                  materials, teacher training, and infrastructure improvements
                  to create a conducive learning environment. Our approach is
                  holistic, ensuring that every child has the opportunity to
                  reach their full potential.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Skill-Based Needs</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-secondary rounded-lg">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <span className="text-primary font-bold">T</span>
                    </div>
                    <span className="font-medium">Teaching</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-secondary rounded-lg">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <span className="text-primary font-bold">C</span>
                    </div>
                    <span className="font-medium">Curriculum Development</span>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Impact Reports</h2>
                <div className="bg-card border border-border rounded-lg p-6 flex items-start gap-6">
                  <div className="w-24 h-32 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-12 h-12 text-primary" />
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-semibold text-primary uppercase">
                      REPORT
                    </span>
                    <h3 className="text-xl font-bold mb-2">
                      2023 Annual Report
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Read our comprehensive report on the project's
                      achievements and impact in the past year.
                    </p>
                    <Button variant="link" className="p-0 h-auto">
                      View Report →
                    </Button>
                  </div>
                </div>
              </section>
            </div>

            <div>
              <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
                <h3 className="text-xl font-bold mb-6">Financial Needs</h3>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Raised</span>
                    <span className="font-bold text-primary">$60,000</span>
                  </div>
                  <Progress value={60} className="mb-1" />
                  <p className="text-xs text-muted-foreground">
                    of $100,000 goal
                  </p>
                </div>

                <div className="space-y-3 mb-6 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Budget</span>
                    <span className="font-semibold">$100,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Funds Raised</span>
                    <span className="font-semibold">$60,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Remaining</span>
                    <span className="font-semibold">$40,000</span>
                  </div>
                </div>

                <Button className="w-full mb-3" asChild>
                  <Link to="/donate">Donate Now</Link>
                </Button>
                <Button variant="secondary" className="w-full" asChild>
                  <Link to="/volunteer">Volunteer</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProjectDetail;
