import { useTheme } from "@/components/theme-provider";
import { useSettings } from "@/context/SettingsContext";

const BASE_URL = "https://loanapi.towsindia.com";

function ThemeLogo() {

  const { theme } = useTheme();
  const { settings } = useSettings();

  if (!theme || !settings) return null;

  return (
    <img
      src={`${BASE_URL}${settings.logo}`}
      alt="Logo"
      width={168}
      height={10}
      className="object-contain h-10 w-auto"
    />
  );
}

export default ThemeLogo;