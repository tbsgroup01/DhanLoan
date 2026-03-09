import { useEffect, useState } from "react";
import { getSettings } from "../services/settingsService";
import { SiteSettings } from "../types/siteSettings";

export const useSiteSettings = () => {

  const [settings, setSettings] =
    useState<SiteSettings | null>(null);

  useEffect(() => {

    getSettings().then((data) => {
      setSettings(data);
    });

  }, []);

  return { settings, setSettings };

};