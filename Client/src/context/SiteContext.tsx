import { createContext, useContext, useEffect, useState } from "react";
import { getSiteSettings } from "../services/siteService";

const SiteContext = createContext<any>(null);

export const SiteProvider = ({ children }: any) => {

  const [settings, setSettings] = useState(null);

  useEffect(() => {

    getSiteSettings().then((data) => {
      setSettings(data);
    });

  }, []);

  return (
    <SiteContext.Provider value={settings}>
      {children}
    </SiteContext.Provider>
  );
};

export const useSiteSettings = () => useContext(SiteContext);