import { useSiteSettings } from "../context/SiteContext";

export default function Navbar() {

  const settings = useSiteSettings();
  // const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  if (!settings) return null;

  return (
    <nav className="flex items-center justify-between px-6 py-3 border-b bg-white shadow-sm">

      <div className="flex items-center gap-3">

        {settings.logo && (
          <img
            src={`http://localhost:3000${settings.logo}`}
            alt="logo"                                                                                                                                                                                                                                                                                                                                                                                                                                          
            className="h-10 w-auto object-contain"
          />
        )}

        <span className="font-semibold text-lg text-gray-800">
          {settings.site_title || "Client Portal"}
        </span>

      </div>

    </nav>
  );
}