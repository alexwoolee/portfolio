// Components
import Gallery from "./Gallery";
import Footer from "@/components/shared/Footer";
import LiquidWavyStripe from "@/components/blog/LiquidWavyStripe.jsx";
// Data
import { paragraphs } from "./about-data";


const AboutCard = ({ text }) => {
  return <p className="mb-6">{text}</p>
};


const About = () => {
  return (
    <>
      <LiquidWavyStripe />
      <div className="wrapper">
        <div className="p-16">
          <div className="w-full max-w-3xl mx-auto flex flex-col justify-start items-center gap-6">
            <h1 className="text-6xl w-full">About Me</h1>
            <h2 className="text-3xl w-full">Hi, I'm Alex!</h2>
            {paragraphs.slice(0,2).map((item) => (
              <AboutCard key={item.id} text={item.text} />
            ))}
            <Gallery />
            {paragraphs.slice(2).map((item) => (
              <AboutCard key={item.id} text={item.text} />
            ))}
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default About;