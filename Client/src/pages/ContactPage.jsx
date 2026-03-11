import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Mail, Phone, MapPin, Clock, Globe } from "lucide-react"; // Install lucide-react or use SVGs

const ContactPage = () => {
  const formRef = useRef(null);
  const infoRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "expo.out", duration: 1.2 } });

    tl.fromTo(
      ".contact-header",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, delay: 0.2 },
    )
      .fromTo(
        infoRef.current.children,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, stagger: 0.1 },
        "-=0.8",
      )
      .fromTo(
        formRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1 },
        "-=1",
      );
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100">
      {/* --- Header Section --- */}
      <div className="contact-header pt-32 pb-16 text-center px-6">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4">
          Let’s talk{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            Finance.
          </span>
        </h1>
        <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto">
          Whether you're scaling a business or buying a home, our experts are
          ready to guide your journey.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* --- Left Side: Contact Info & Location --- */}
          <div ref={infoRef} className="lg:col-span-5 space-y-12">
            <div>
              <h2 className="text-2xl font-bold mb-8">Contact Information</h2>
              <div className="space-y-8">
                <ContactMethod
                  icon={<Phone className="w-6 h-6 text-blue-600 hover:text-white" />}
                  title="Call Us"
                  detail="+1 (555) 000-1234"
                  sub="Mon-Fri, 9am - 6pm"
                />
                <ContactMethod
                  icon={<Mail className="w-6 h-6 text-blue-600 hover:text-white" />}
                  title="Email Support"
                  detail="hello@premiumfinance.com"
                  sub="Response within 24 hours"
                />
                <ContactMethod
                  icon={<MapPin className="w-6 h-6 text-blue-600 hover:text-white" />}
                  title="Headquarters"
                  detail="123 Financial District, Suite 500"
                  sub="New York, NY 10004"
                />
              </div>
            </div>
          </div>

          {/* --- Right Side: Contact Form --- */}
          <div className="lg:col-span-7">
            <form
              ref={formRef}
              className="bg-white border border-slate-100 p-8 md:p-12 rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)] space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <InputGroup
                  label="Full Name"
                  type="text"
                  placeholder="John Doe"
                />
                <InputGroup
                  label="Email Address"
                  type="email"
                  placeholder="john@example.com"
                />
              </div>

              <InputGroup
                label="Subject"
                type="text"
                placeholder="Inquiry about Home Loans"
              />

              {/* Message Textarea with same focus logic */}
              <div className="group space-y-2">
                <label className="text-sm font-bold text-slate-500 ml-1 group-focus-within:text-blue-600 group-focus-within:translate-x-1 transition-all duration-300 block">
                  Message
                </label>
                <textarea
                  rows="5"
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white focus:ring-[8px] focus:ring-blue-500/5 outline-none transition-all duration-300 resize-none placeholder:text-slate-300 shadow-sm"
                  placeholder="Tell us how we can help..."
                ></textarea>
              </div>

              <button onSubmit={()=>{alert("Thank You for your message!")}} className="relative overflow-hidden w-full py-5 bg-slate-900 hover:bg-blue-600 text-white font-bold rounded-2xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-200 active:scale-[0.98]">
                <span className="relative z-10">Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Helper Components ---

const ContactMethod = ({ icon, title, detail, sub }) => (
  <div className="group flex items-start gap-6 p-4 rounded-2xl transition-colors hover:bg-slate-50">
    <div className="p-4 rounded-xl bg-blue-50 group-hover:bg-blue-600 group-hover:text-white transition-all">
      {icon}
    </div>
    <div>
      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">
        {title}
      </h3>
      <p className="text-xl font-bold text-slate-900">{detail}</p>
      <p className="text-slate-500 font-medium">{sub}</p>
    </div>
  </div>
);

const InputGroup = ({ label, type, placeholder }) => (
  <div className="space-y-2">
    <label className="text-sm font-bold text-slate-700 ml-1">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
    />
  </div>
);

export default ContactPage;
