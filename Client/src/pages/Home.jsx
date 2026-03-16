import React from "react";
import HeroSection from "../components/HeroSection";
import WorkProcess from "../components/WorkProcess";
import FAQSection from "../components/FAQSection";
import TestimonialSection from "../components/TestimonialSection";
import PartnerMarquee from "../components/PartnerMarquee";

const Home = () => {
  return (
    <>
      <HeroSection />

      <PartnerMarquee />
      <WorkProcess />
      <TestimonialSection />
      <FAQSection />
    </>
  );
};

export default Home;
