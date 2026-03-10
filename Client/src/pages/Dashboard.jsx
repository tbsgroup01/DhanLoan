import { useEffect, useState } from "react";
import { getUserDashboard } from "../services/loanService";
import chipImg from "../../assets/chip.png";

import {
  FaSignOutAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaWallet,
  FaShieldAlt,
  FaChartLine,
  FaUser,
  FaMapMarkerAlt,
  FaHeadset,
  FaCommentDots,
} from "react-icons/fa";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getUserDashboard();
        setData(res);
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen bg-[#05070a] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0b0e14] text-slate-300 p-4 md:p-8 lg:p-12 font-sans relative overflow-hidden">
      {/* BACKGROUND GLOWS (Matching the reference image) */}
      <div className="absolute top-[10%] left-[-5%] w-[400px] h-[400px] bg-yellow-200/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-600/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[10%] w-[450px] h-[450px] bg-purple-600/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-6 relative z-10">
        {/* HEADER */}
        <header className="flex justify-between items-center mb-12 px-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-tr from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
              <FaShieldAlt className="text-white text-lg" />
            </div>
            <h1 className="text-lg font-black tracking-tighter text-white uppercase italic">
              Fin<span className="text-purple-500">Portal</span>
            </h1>
          </div>
          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/auth";
            }}
            className="cursor-pointer bg-white/10 border border-white/20 text-red-400 hover:bg-white/20 transition-all px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-1"
          >
            Logout <FaSignOutAlt className="inline-block ml-1" />
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* GLASSMORPHISM CARD (The Requested UI) */}
          <div className="lg:col-span-7 relative group">
            {/* The Card Container */}
            <div className="relative w-full min-h-[340px] rounded-[40px] border border-white/20 bg-white/5 backdrop-blur-2xl p-10 flex flex-col justify-between shadow-2xl overflow-hidden">
              {/* Master Card Brand Area */}
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    <div className="w-10 h-10 rounded-full bg-[#eb001b] mix-blend-screen" />
                    <div className="w-10 h-10 rounded-full bg-[#ff5f00] opacity-80" />
                  </div>
                  <span className="text-xl font-medium text-white/90 tracking-tight">
                    Master Card
                  </span>
                </div>
                <div className=" p-2 rounded-lg shadow-inner">
                  <img src={chipImg} alt="chip" className="w-15 opacity-90" />
                </div>
              </div>

              {/* Card Number */}
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-white/50 uppercase tracking-[0.2em]">
                  Card Number
                </p>
                <p className="text-2xl md:text-3xl font-medium tracking-[0.15em] text-white drop-shadow-md">
                  {data?.loan_id?.replace(/(.{4})/g, "$1 ") ||
                    "8050 2020 1050 4060"}
                </p>
              </div>

              {/* Footer Info */}
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <p className="text-lg font-medium text-white/90 capitalize">
                    {data?.name || "Prajwal Sunil Dhande"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest">
                    Valid Till
                  </p>
                  <p className="text-xl font-medium text-white">07/25</p>
                </div>
              </div>
            </div>
          </div>

          {/* STATS AREA */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="flex-1 bg-white/5 border border-white/10 backdrop-blur-xl p-8 rounded-[32px] flex flex-col justify-center shadow-xl">
              <div className="flex items-center gap-3 mb-3 text-white/50">
                <FaWallet size={16} />
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  Total Balance
                </span>
              </div>
              <p className="text-4xl font-bold text-white">
                ₹{Number(data?.amount || 200000).toLocaleString()}
              </p>
            </div>

            <div className="flex-1 bg-white/5 border border-white/10 backdrop-blur-xl p-8 rounded-[32px] flex flex-col justify-center shadow-xl">
              <div className="flex items-center gap-3 mb-3 text-white/50">
                <FaChartLine size={16} />
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  Status
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_15px_rgba(163,230,53,0.5)] animate-pulse" />
                <p className="text-3xl font-bold text-green-400">Active</p>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
          <div className="lg:col-span-7 bg-white/5 border border-white/10 backdrop-blur-xl rounded-[32px] p-10">
            <h3 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mb-8">
              Applicant Dossier
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <InfoItem
                icon={<FaUser />}
                label="Legal Name"
                value={data?.name || "Prajwal Sunil Dhande"}
              />
              <InfoItem
                icon={<FaEnvelope />}
                label="Email"
                value={data?.email || "prajwal@example.com"}
              />
              <InfoItem
                icon={<FaPhoneAlt />}
                label="Contact"
                value={data?.mobile || "+91 98765 43210"}
              />
              <InfoItem
                icon={<FaMapMarkerAlt />}
                label="Location"
                value={data?.address || "Mumbai, India"}
              />
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-white/10 backdrop-blur-xl rounded-[32px] p-8 flex flex-col justify-between">
            <div>
              <p className="text-white font-bold text-xl mb-1">
                24/7 Priority Support
              </p>
              <p className="text-white/50 text-[10px] uppercase tracking-widest">
                Instant Resolution
              </p>
            </div>
            this button redirect to whats app
            <div className="mt-6">
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className=" bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <FaHeadset /> Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ icon, label, value }) {
  return (
    <div className="flex gap-4">
      <div className="mt-1 text-white/30 text-lg">{icon}</div>
      <div>
        <p className="text-[9px] text-white/40 font-bold uppercase tracking-widest mb-1">
          {label}
        </p>
        <p className="text-sm font-semibold text-white/90">{value}</p>
      </div>
    </div>
  );
}
