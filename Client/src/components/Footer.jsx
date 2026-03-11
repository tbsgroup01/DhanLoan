import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useSiteSettings } from "../context/SiteContext";

export default function Footer() {
  const settings = useSiteSettings();
  
  // Same links as your Navbar for consistency
  const navLinks = [
    { name: 'HOME', href: '/' },
    { name: 'ABOUT', href: '/about' },
    { name: 'SERVICES', href: '/services' },
    { name: 'FAQ', href: '/faq' },
    { name: 'BLOGS', href: '/blogs' },
    { name: 'CONTACT', href: '/contact' },
  ];

  if (!settings) return null;

  return (
    <footer className="bg-[#050b15] pt-20 pb-10 relative overflow-hidden text-white">
      {/* Background Cinematic Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/">
              <img 
                src={`http://localhost:3000${settings.logo}`} 
                alt="Kisshtmin" 
                className="h-14 w-auto object-contain brightness-110"
              />
            </Link>
            <p className="text-gray-400 font-medium leading-relaxed">
              Your trusted partner for instant financial solutions. We simplify lending with technology that puts you first.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-600 hover:border-blue-500 transition-all group">
                  <Icon size={18} className="text-gray-400 group-hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Column (Using your Nav Array) */}
          <div className="space-y-6">
            <h4 className="text-sm font-black tracking-[0.2em] text-blue-500 uppercase">Quick Navigation</h4>
            <ul className="grid grid-cols-1 gap-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="text-gray-400 hover:text-white font-bold text-sm transition-all flex items-center gap-2 group"
                  >
                    <span className="w-0 h-[2px] bg-blue-600 group-hover:w-4 transition-all duration-300"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-6">
            <h4 className="text-sm font-black tracking-[0.2em] text-blue-500 uppercase">Get In Touch</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-4 group">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:bg-blue-600/20 transition-colors">
                  <Phone size={18} className="text-blue-500" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Call Us</p>
                  <p className="text-sm font-bold text-gray-200">+91 1800-123-4567</p>
                </div>
              </div>
              <div className="flex items-start gap-4 group">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:bg-blue-600/20 transition-colors">
                  <Mail size={18} className="text-blue-500" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email Us</p>
                  <p className="text-sm font-bold text-gray-200">support@kisshtmin.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter / Trust Badge */}
          <div className="space-y-6">
            <h4 className="text-sm font-black tracking-[0.2em] text-blue-500 uppercase">Newsletter</h4>
            <div className="relative group">
              <input 
                type="email" 
                placeholder="Email address" 
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 outline-none focus:border-blue-600 focus:bg-white/10 transition-all text-sm"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-blue-600 hover:bg-blue-500 px-4 rounded-xl transition-all active:scale-95">
                <ArrowRight size={18} />
              </button>
            </div>
            <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-600/20 to-transparent border border-blue-500/20 flex items-center gap-3">
              <ShieldCheck className="text-blue-500" size={24} />
              <p className="text-[10px] font-bold text-blue-100 uppercase tracking-widest leading-tight">
                PCI-DSS Secured <br /> Payment Gateway
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-xs font-bold tracking-wide">
            © {new Date().getFullYear()} KISSHTMIN. ALL RIGHTS RESERVED.
          </p>
          <p className="text-gray-500 text-xs font-bold">
            CRAFTED BY <span className="text-blue-500 italic tracking-widest hover:text-blue-400 transition-colors cursor-pointer">INDIAN WIZARD</span>
          </p>
          <div className="flex gap-6">
            {['Privacy', 'Terms', 'Cookies'].map((item) => (
              <a key={item} href="#" className="text-xs font-black text-gray-600 hover:text-white transition-colors uppercase tracking-widest">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}