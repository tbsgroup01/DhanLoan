import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { getSiteSettings } from "../services/siteService";

interface SiteSettings {
  site_title?: string;
  logo?: string;
}

const SiteContext = createContext<SiteSettings | null>(null);

interface Props {
  children: ReactNode;
}

export const SiteProvider = ({ children }: Props) => {

  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {

    const loadSettings = async () => {
      try {
        const data = await getSiteSettings();
        setSettings(data);
      } catch (error) {
        console.error("Failed to load site settings:", error);
      }
    };

    loadSettings();

  }, []);

  return (
    <SiteContext.Provider value={settings}>
      {children}
    </SiteContext.Provider>
  );
};

export const useSiteSettings = () => {
  return useContext(SiteContext);
};