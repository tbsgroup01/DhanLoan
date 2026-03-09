import AuthImage from "@/assets/images/auth/auth-img.png";
import ThemeLogo from "@/components/shared/ThemeLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {  FieldGroup } from "@/components/ui/field";

import { Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { resetPassword } from "@/services/authService";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!password) {
      toast.error("Password is required");
      return;
    }

    try {
      setLoading(true);

      await resetPassword(token!, password);

      toast.success("Password reset successfully");

      navigate("/auth/login");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white dark:bg-slate-900 lg:flex flex-wrap min-h-[100vh]">
      
      {/* Left Image */}
      <div className="lg:w-1/2 lg:block hidden">
        <div className="flex items-center flex-col h-full justify-center">
          <img src={AuthImage} alt="Reset Password" />
        </div>
      </div>

      {/* Right Form */}
      <div className="lg:w-1/2 py-8 px-6 flex flex-col justify-center">
        <div className="lg:max-w-[464px] mx-auto w-full">

          <div>
            <ThemeLogo />
            <h4 className="mb-3 mt-6">Reset Your Password</h4>
            <p className="mb-8 text-neutral-600 dark:text-neutral-200 text-lg">
              Enter your new password below to regain access to your account.
            </p>
          </div>

          <FieldGroup className="mb-4">
            <div className="icon-field relative">
              <Lock className="absolute start-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-700 dark:text-neutral-200" />

              <Input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="ps-13 pe-12 h-14 rounded-xl bg-neutral-100 dark:bg-slate-800 border border-neutral-300 dark:border-slate-700 focus:border-primary"
              />

              <Button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 !p-0 bg-transparent hover:bg-transparent text-muted-foreground h-[unset]"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </Button>
            </div>
          </FieldGroup>

          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full rounded-lg h-[52px] text-sm mt-4"
          >
            {loading && <Loader2 className="animate-spin h-4.5 w-4.5 mr-2" />}
            {loading ? "Resetting Password..." : "Reset Password"}
          </Button>

        </div>
      </div>

    </section>
  );
};

export default ResetPassword;