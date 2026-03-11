import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate

import PersonalLoan from "../assets/pay.png";

gsap.registerPlugin(ScrollTrigger);

// --- Sub-Component: Hero Header ---
const HeroHeader = () => {
  const titleRef = useRef(null);
  const badgeRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    tl.fromTo(badgeRef.current, 
      { y: 20, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, delay: 0.5 }
    )
    .fromTo(titleRef.current.children, 
      { y: 60, opacity: 0, rotateX: -45 }, 
      { y: 0, opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.1 },
      "-=0.6"
    );
  }, []);

  return (
    <header className="relative pt-32 pb-20 text-center overflow-hidden bg-white">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-80 bg-gradient-to-b from-blue-50/80 to-transparent blur-3xl -z-10" />
      
      <div className="max-w-4xl mx-auto px-6">
        <div ref={badgeRef} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 mb-8 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">Financial Excellence</span>
        </div>

        <h1 ref={titleRef} className="text-6xl md:text-8xl font-black text-slate-900 tracking-tight leading-[0.95]">
          <span className="block italic font-light text-slate-400 text-3xl md:text-4xl mb-3">Professional &</span>
          <span className="block">Tailored</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Finance.</span>
        </h1>
        
        <p className="mt-8 text-lg md:text-xl text-slate-500 max-w-xl mx-auto leading-relaxed">
          Smart lending solutions designed to move at the speed of your ambition.
        </p>
      </div>
    </header>
  );
};

// --- Sub-Component: Service Section ---
const ServiceSection = ({ title, description, image, tag, isReversed, onGetStarted }) => { // 2. Add onGetStarted prop
  const sectionRef = useRef(null);
  const imageContainerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(imageContainerRef.current, 
        { clipPath: isReversed ? "inset(0% 0% 0% 100%)" : "inset(0% 100% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.6,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        }
      );

      gsap.fromTo(textRef.current.children,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isReversed]);

  return (
    <section ref={sectionRef} className="py-16 px-6 md:px-12 bg-white">
      <div className={`max-w-7xl mx-auto flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-stretch rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-2xl shadow-slate-200/50`}>
        
        <div className="w-full md:w-1/2 min-h-[450px]">
          <div ref={imageContainerRef} className="h-full w-full overflow-hidden">
            <img 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center p-12 md:p-20 bg-slate-50">
          <div ref={textRef} className="space-y-6">
            <span className="inline-block text-sm font-bold tracking-[0.2em] text-blue-600 uppercase">
              {tag}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
              {title}
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed font-medium">
              {description}
            </p>
            <div className="pt-6">
              {/* 3. Attach click handler */}
              <button 
                onClick={onGetStarted}
                className="group px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold transition-all hover:bg-blue-600 hover:shadow-xl hover:shadow-blue-200 flex items-center gap-3"
              >
                Get Started
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

// --- Main Page Component ---
const ServicesPage = () => {
  const navigate = useNavigate(); // 4. Initialize navigate hook

  // 5. Shared Click Handler Logic
  const handleScrollToApply = () => {
    const element = document.getElementById("apply-loan");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/#apply-loan");
    }
  };

  const services = [
    {
      title: "Home Loans",
      tag: "Mortgages",
      description: "Own your future with fixed-rate mortgages and flexible down-payment options designed for modern living.",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
    },
    {
      title: "Personal Loans",
      tag: "Flexible Credit",
      description: "Simple, transparent personal financing for the things that matter most. Approval in minutes, not days.",
      image: PersonalLoan
    },
    {
      title: "Vehicle Loans",
      tag: "Automotive",
      description: "Low-interest auto financing with direct dealership integration to get you on the road immediately.",
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80",
    }
  ];

  return (
    <main className="bg-white antialiased">
      <HeroHeader />
      
      <div className="pb-20">
        {services.map((service, index) => (
          <ServiceSection 
            key={index} 
            {...service} 
            isReversed={index % 2 !== 0} 
            onGetStarted={handleScrollToApply} // 6. Pass handler down
          />
        ))}
      </div>
    </main>
  );
};

export default ServicesPage;