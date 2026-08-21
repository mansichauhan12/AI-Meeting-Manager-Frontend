// import Nav from "./components/Nav";
import "../../home.css";
import Nav from "../../components/Home/Nav";
import Hero from "../../components/Home/Hero";
import LogoStrip from "../../components/Home/LogoStrip";
import Problem from "../../components/Home/Problem";
import HowItWorks from "../../components/Home/HowItWorks";
import Features from "../../components/Home/Features";
import Showcase from "../../components/Home/Showcase";
import AISearch from "../../components/Home/AISearch";
import Testimonials from "../../components/Home/Testimonials";
import Pricing from "../../components/Home/Pricing";
import CTA from "../../components/Home/CTA";
import Footer from "../../components/Home/Footer";

function Home() {
    return (
        <div className="site-shell">
            <Nav />

            <main>
                <Hero />
                <LogoStrip />
                <Problem />
                <HowItWorks />
                <Features />
                <Showcase />
                <AISearch />
                <Testimonials />
                <Pricing />
                <CTA />
            </main>

            <Footer />
        </div>
    );
}

export default Home;