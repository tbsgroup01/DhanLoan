import { useEffect, useState } from "react";
import {
  FaSave,
  FaImage,
  FaUniversity,
  FaMoneyBillWave,
  FaKey,
  FaShieldAlt,
  FaCloudUploadAlt
} from "react-icons/fa";
import { getPaymentSettings, updatePaymentSettings } from "@/services/paymentService";

interface PaymentSettingsType {
  processing_fee: number | string;
  razorpay_key_id: string;
  razorpay_secret: string;
  account_name: string;
  account_number: string;
  ifsc: string;
  bank_name: string;
  qr_image: File | string;
}

export default function PaymentSettings() {
  const [settings, setSettings] = useState<PaymentSettingsType>({
    processing_fee: "",
    razorpay_key_id: "",
    razorpay_secret: "",
    account_name: "",
    account_number: "",
    ifsc: "",
    bank_name: "",
    qr_image: "",
  });

  const [qrPreview, setQrPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("api");

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await getPaymentSettings();
        setSettings({ ...data });
        if (data.qr_image) {
          const baseURL = import.meta.env.VITE_API_BASE_URL.replace("/api", "");
          setQrPreview(`${baseURL}${data.qr_image}`);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    loadSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  // Fixed QR Upload Logic
  const handleQRUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSettings({ ...settings, qr_image: file });
      setQrPreview(URL.createObjectURL(file)); // Fast preview
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    Object.entries(settings).forEach(([key, value]) => {
      formData.append(key, value);
    });
    
    const data = await updatePaymentSettings(formData);
    if (data.success) alert("Configuration Published Successfully! 🚀");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex items-center justify-center p-6 antialiased">
      <div className="w-full max-w-5xl bg-white rounded-[2.5rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] border border-slate-200/60 overflow-hidden">
        
        <div className="flex flex-col md:flex-row min-h-[700px]">
          
          {/* SIDEBAR */}
          <div className="w-full md:w-72 bg-slate-900 p-10 text-white flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-14">
                <div className="w-10 h-10 bg-indigo-500 rounded-2xl flex items-center justify-center">
                  <FaShieldAlt size={20} />
                </div>
                <h2 className="text-xl font-bold tracking-tight">PayNexus</h2>
              </div>

              <nav className="space-y-3">
                {[
                  { id: 'api', label: 'API Keys', icon: <FaKey /> },
                  { id: 'bank', label: 'Settlement', icon: <FaUniversity /> },
                  { id: 'fee', label: 'Fees & QR', icon: <FaMoneyBillWave /> },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${
                      activeTab === item.id 
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.icon}
                    <span className="font-semibold text-sm">{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>

          </div>

              {/* MAIN CONTENT */}

          <div className="flex-1 p-10 md:p-14 flex flex-col">
            <header className="flex justify-between items-center mb-12">
              <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight capitalize">
                  {activeTab} Settings
                </h1>
                <p className="text-slate-500 text-sm mt-1">Configure your gateway environment.</p>
              </div>
              
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-8 py-3.5 rounded-2xl font-bold transition-all transform active:scale-95 disabled:opacity-50"
              >
                {loading ? <div className="animate-spin h-4 w-4 border-2 border-white/20 border-t-white rounded-full" /> : <FaSave size={14}/>}
                <span>Update</span>
              </button>
            </header>

            <div className="flex-1 transition-all duration-500">
              {/* API TAB */}
              {activeTab === 'api' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Razorpay Key ID</label>
                    <input name="razorpay_key_id" value={settings.razorpay_key_id} onChange={handleChange} className="w-full bg-slate-50 border-2 border-slate-100 focus:border-indigo-500 focus:bg-white rounded-2xl p-4 outline-none transition-all font-medium" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Razorpay Secret</label>
                    <input type="password" name="razorpay_secret" value={settings.razorpay_secret} onChange={handleChange} className="w-full bg-slate-50 border-2 border-slate-100 focus:border-indigo-500 focus:bg-white rounded-2xl p-4 outline-none transition-all font-medium" />
                  </div>
                </div>
              )}

              {/* BANK TAB */}
              {activeTab === 'bank' && (
                <div className="grid grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4">
                  <div className="col-span-2 space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Account Holder</label>
                    <input name="account_name" value={settings.account_name} onChange={handleChange} className="w-full bg-slate-50 border-2 border-slate-100 focus:border-indigo-500 focus:bg-white rounded-2xl p-4 outline-none transition-all font-medium" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Bank Name</label>
                    <input name="bank_name" value={settings.bank_name} onChange={handleChange} className="w-full bg-slate-50 border-2 border-slate-100 focus:border-indigo-500 focus:bg-white rounded-2xl p-4 outline-none transition-all font-medium" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">IFSC</label>
                    <input name="ifsc" value={settings.ifsc} onChange={handleChange} className="w-full bg-slate-50 border-2 border-slate-100 focus:border-indigo-500 focus:bg-white rounded-2xl p-4 outline-none transition-all font-medium" />
                  </div>
                </div>
              )}

              {/* FEE & QR TAB */}
              {activeTab === 'fee' && (
                <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4">
                  <div className="p-8 bg-indigo-50/50 rounded-[2rem] border-2 border-indigo-100/50 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900">Platform Service Fee</h4>
                      <p className="text-sm text-slate-500">Global transaction processing rate.</p>
                    </div>
                    <div className="relative">
                      <span className="absolute right-5 top-1/2 -translate-y-1/2 text-indigo-600 font-black"></span>
                      <input name="processing_fee" type="number" value={settings.processing_fee} onChange={handleChange} className="w-28 bg-white border-2 border-indigo-100 rounded-2xl p-4 outline-none focus:border-indigo-500 font-bold text-xl text-indigo-600 shadow-inner" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Merchant QR Code</label>
                    <div className="flex flex-col items-center justify-center border-3 border-dashed border-slate-200 rounded-[2rem] p-10 hover:border-indigo-400 transition-colors bg-slate-50/50 group">
                      {qrPreview ? (
                        <div className="relative group">
                          <img src={qrPreview} className="w-44 h-44 object-contain rounded-2xl shadow-2xl bg-white p-2" />
                          <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center">
                             <label className="cursor-pointer text-white text-xs font-bold flex items-center gap-2 underline uppercase tracking-tighter">
                               <FaCloudUploadAlt size={18}/> Replace QR
                               <input type="file" className="hidden" onChange={handleQRUpload} accept="image/*" />
                             </label>
                          </div>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center cursor-pointer">
                          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg mb-4 text-slate-300 group-hover:text-indigo-500 transition-colors">
                            <FaCloudUploadAlt size={32} />
                          </div>
                          <span className="text-sm font-bold text-slate-600 group-hover:text-indigo-600 transition-colors">Select QR Asset</span>
                          <input type="file" className="hidden" onChange={handleQRUpload} accept="image/*" />
                        </label>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}