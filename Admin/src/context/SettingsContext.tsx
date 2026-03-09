import { createContext, useContext, useEffect, useState } from "react";
import { getSettings } from "../services/settingsService";

interface SiteSettings {
  site_title: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  copyright: string;
  logo: string;
  favicon: string;
}

interface SettingsContextType {
  settings: SiteSettings | null;
  loading: boolean;
}

const SettingsContext = createContext<SettingsContextType>({
  settings: null,
  loading: true,
});

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {

  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const loadSettings = async () => {

      try {
        const data = await getSettings();
        setSettings(data);
      } catch (error) {
        console.error("Settings load error", error);
      }

      setLoading(false);
    };

    loadSettings();

  }, []);

  return (
    <SettingsContext.Provider value={{ settings, loading }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);