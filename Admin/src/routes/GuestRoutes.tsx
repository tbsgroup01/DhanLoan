import { Loader2 } from "lucide-react";
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const GuestRoutes = () => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get("admin_token");

    if (token) {
      setAuthenticated(true);
    }

    setLoading(false);
  }, []);

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

  if (authenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default GuestRoutes;