import { useEffect, useState } from "react";
import {
  FaImage,
  FaSave,
  FaGlobe,
  FaTag,
  FaSearch,
  FaKey,
  FaRegCopyright,
  FaCloudUploadAlt,
  FaInfoCircle,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { getSettings, updateSettings } from "../../services/settingsService";

interface SiteSettings {
  site_title: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  copyright: string;
  logo: string | File;
  favicon: string | File;
}

const BASE_URL = "http://localhost:3000";

export default function SiteSettings() {
  const initialState: SiteSettings = {
    site_title: "",
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
    copyright: "",
    logo: "",
    favicon: "",
  };

  const [settings, setSettings] = useState<SiteSettings>(initialState);
  const [logoPreview, setLogoPreview] = useState<string>("");
  const [faviconPreview, setFaviconPreview] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadSettings = async () => {
      const data = await getSettings();
      if (!data) return;
      setSettings(data as SiteSettings);
      if (data.logo) setLogoPreview(`${BASE_URL}${data.logo}`);
      if (data.favicon) setFaviconPreview(`${BASE_URL}${data.favicon}`);
    };
    loadSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const name = e.target.name as "logo" | "favicon";
    if (!file) return;
    const preview = URL.createObjectURL(file);
    if (name === "logo") setLogoPreview(preview);
    if (name === "favicon") setFaviconPreview(preview);
    setSettings((prev) => ({ ...prev, [name]: file }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    Object.entries(settings).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, (value as string) ?? "");
      }
    });

    try {
      const res = await updateSettings(formData);
      if (res.success) {
        toast.success("Settings updated successfully ✔");
      } else {
        toast.error("Failed to update settings");
      }
    } catch (error) {
      toast.error("Server connection error");
    } finally {
      setLoading(false);
    }
    alert("Settings have been updated!");
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] p-4 md:p-10 antialiased">
      <div className="max-w-5xl mx-auto">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-3">
              <span className="p-3 bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-200">
                <FaGlobe size={24} />
              </span>
              Site Configuration
            </h1>
            <p className="text-slate-500 mt-2 font-medium">Manage your website's identity and SEO settings</p>
          </div>
          
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-400 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-indigo-100 active:scale-95"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <FaSave />
            )}
            {loading ? "Saving Changes..." : "Save Settings"}
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* LEFT: ASSETS MANAGEMENT */}
          <div className="lg:col-span-1 space-y-6">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] px-1">Brand Assets</h3>
            
            {/* LOGO UPLOAD */}
            <AssetCard 
              label="Company Logo" 
              sub="Recommended: 512x512px (PNG/SVG)"
              preview={logoPreview} 
              id="logoUpload" 
              name="logo" 
              onChange={handleFile} 
            />

            {/* FAVICON UPLOAD */}
            <AssetCard 
              label="Site Favicon" 
              sub="Recommended: 32x32px (ICO/PNG)"
              preview={faviconPreview} 
              id="faviconUpload" 
              name="favicon" 
              onChange={handleFile} 
              isSmall
            />
          </div>

          {/* RIGHT: CONTENT & SEO */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-slate-100">
              <h3 className="text-xl font-black text-slate-800 mb-8 flex items-center gap-3">
                <FaSearch className="text-indigo-600" /> SEO & Meta Data
              </h3>

              <div className="grid gap-6">
                <InputGroup 
                  label="Site Display Title" 
                  icon={<FaTag />} 
                  name="site_title" 
                  value={settings.site_title} 
                  onChange={handleChange} 
                  placeholder="e.g. My Awesome Startup"
                />

                <InputGroup 
                  label="SEO Meta Title" 
                  icon={<FaSearch />} 
                  name="meta_title" 
                  value={settings.meta_title} 
                  onChange={handleChange} 
                  placeholder="The title that appears in Google search"
                />

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Meta Description</label>
                  <textarea
                    name="meta_description"
                    value={settings.meta_description}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Short summary of your website for search engines..."
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 outline-none focus:border-indigo-600 focus:bg-white transition-all text-sm font-medium leading-relaxed"
                  />
                </div>

                <InputGroup 
                  label="Keywords (Comma separated)" 
                  icon={<FaKey />} 
                  name="meta_keywords" 
                  value={settings.meta_keywords} 
                  onChange={handleChange} 
                  placeholder="loan, finance, credit, money"
                />

                <InputGroup 
                  label="Footer Copyright Text" 
                  icon={<FaRegCopyright />} 
                  name="copyright" 
                  value={settings.copyright} 
                  onChange={handleChange} 
                  placeholder="© 2026 Company Name. All Rights Reserved."
                />
              </div>
            </div>

            {/* INFO BOX */}
            <div className="bg-blue-50 rounded-3xl p-6 border border-blue-100 flex gap-4">
              <FaInfoCircle className="text-blue-500 mt-1 flex-shrink-0" />
              <div>
                <p className="text-blue-900 font-bold text-sm">Pro Tip!</p>
                <p className="text-blue-700/70 text-xs font-medium leading-relaxed">
                  Keeping your meta description under 160 characters helps your site look better in Google Search Results.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

/* ================= UI SUB-COMPONENTS ================= */

function AssetCard({ label, sub, preview, id, name, onChange, isSmall = false }: any) {
  return (
    <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 group transition-all hover:shadow-md">
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">{label}</p>
      
      <div className={`relative ${isSmall ? 'w-24 h-24' : 'w-full h-40'} mx-auto mb-4 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[1.5rem] flex items-center justify-center overflow-hidden transition-all group-hover:border-indigo-300`}>
        {preview ? (
          <img src={preview} alt="Preview" className="max-h-[80%] max-w-[80%] object-contain drop-shadow-md" />
        ) : (
          <div className="text-center p-4">
            <FaCloudUploadAlt className="text-slate-300 mx-auto text-3xl mb-1" />
            <p className="text-[9px] font-bold text-slate-400">No Image</p>
          </div>
        )}
        
        <label htmlFor={id} className="absolute inset-0 bg-indigo-600/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-all font-black text-xs uppercase tracking-tighter">
          Update File
        </label>
        <input id={id} type="file" name={name} hidden onChange={onChange} accept="image/*" />
      </div>
      
      <p className="text-[9px] text-center text-slate-400 font-medium leading-tight px-4">{sub}</p>
    </div>
  );
}

function InputGroup({ label, icon, name, value, onChange, placeholder }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">{label}</label>
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
          {icon}
        </div>
        <input
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-indigo-600 focus:bg-white transition-all text-sm font-semibold text-slate-700"
        />
      </div>
    </div>
  );
}