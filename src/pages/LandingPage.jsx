import Header from "../components/Landing/Header";
import Hero from "../components/Landing/Hero";
import HowItWorks from "../components/Landing/HowItWorks";
import Footer from "../components/Landing/Footer";

function LandingPage() {
  return (
    <div className="bg-white font-sans">
      <Header />
      <main>
        <Hero />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
}

export default LandingPage;
