import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { cn } from "@/lib/utils";
import Cookies from "js-cookie";
import { Loader2, LogOutIcon, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface UserProfile {
  username?: string;
  email?: string;
}

const ProfileDropdown = () => {
  const navigate = useNavigate();

  const [loggingOut, setLoggingOut] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const clearAuth = () => {
    Cookies.remove("admin_token");
    Cookies.remove("adminToken");
  };
  // Load admin profile
  useEffect(() => {
    const storedUser = localStorage.getItem("admin_user");

    if (storedUser) {
      setProfile(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  const handleLogout = () => {
    setLoggingOut(true);

    setTimeout(() => {
      clearAuth();
      localStorage.removeItem("admin_user");
      toast.success("Logged out successfully");
      navigate("/auth/login", { replace: true });
    }, 400);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-background z-50">
        <Loader2 className="h-11 w-11 animate-spin text-neutral-900" />
        <p className="mt-4 text-neutral-900 font-semibold animate-pulse text-xl">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={cn(
            "rounded-full sm:w-10 sm:h-10 w-8 h-8 bg-gray-200/75 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 border-0 cursor-pointer text-primary font-bold",
          )}
        >
          {profile?.username?.[0]?.toUpperCase() ||
            profile?.email?.[0]?.toUpperCase() ||
            "A"}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="sm:w-[300px] min-w-[250px] right-[40px] absolute p-4 rounded-2xl overflow-hidden shadow-lg"
        side="bottom"
        align="end"
      >
        <div className="py-3 px-4 rounded-lg bg-primary/10 flex items-center justify-between">
          <div>
            <h6 className="text-lg text-neutral-900 dark:text-white font-semibold mb-0">
              {profile?.username || "Admin"}
            </h6>
            <span className="text-sm text-neutral-500 dark:text-neutral-300">
              {profile?.email}
            </span>
          </div>
        </div>

        <div className="max-h-[400px] overflow-y-auto scroll-sm pt-4">
          <ul className="flex flex-col gap-3">
            {/* <li className="flex">
              <Link
                to="/view-profile"
                className="text-black dark:text-white hover:text-primary flex items-center gap-3 w-full"
              >
                <User className="w-5 h-5" />
                My Profile
              </Link>
            </li> */}

            <li className="flex ms-[2px]">
              <Button
                variant="ghost"
                className={`!p-0 h-auto w-full justify-start font-normal cursor-pointer flex items-center gap-3 text-[16px] hover:text-red-600 ${
                  loggingOut ? "text-red-600" : "text-black"
                }`}
                onClick={handleLogout}
              >
                <LogOutIcon className="size-5" />
                {loggingOut ? "Logging out..." : "Logout"}
              </Button>
            </li>
          </ul>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
