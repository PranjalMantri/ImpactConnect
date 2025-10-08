import { MapPin, Users, Globe } from "lucide-react";
import FeatureCard from "../Landing/FeatureCard";

const HowItWorks = () => (
  <section className="bg-gray-50 py-20">
    <div className="container mx-auto px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          How ImpactConnect Works
        </h2>
        <p className="max-w-2xl mx-auto text-gray-600 text-lg">
          Our platform simplifies the process of connecting with non-profit
          organizations, ensuring your contributions directly support impactful
          projects.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        <FeatureCard
          icon={<MapPin className="text-blue-500 w-12 h-12" />}
          title="Find Your Cause"
        >
          Browse a diverse range of projects and organizations aligned with your
          interests and values.
        </FeatureCard>
        <FeatureCard
          icon={<Users className="text-blue-500 w-12 h-12" />}
          title="Connect with NGOs"
        >
          Directly engage with non-profit organizations, understand their needs,
          and offer your support.
        </FeatureCard>
        <FeatureCard
          icon={<Globe className="text-blue-500 w-12 h-12" />}
          title="Make a Difference"
        >
          Contribute your time, skills, or resources to projects that create
          real, positive change in communities worldwide.
        </FeatureCard>
      </div>
    </div>
  </section>
);

export default HowItWorks;
