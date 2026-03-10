import AuthImage from "@/assets/images/auth/auth-img.png";
import ThemeLogo from "@/components/shared/ThemeLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useIsSubmitting } from "@/context/isSubmittingContext";

import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { cn } from "@/lib/utils";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { loginAdmin } from "@/services/authService";

import Cookies from "js-cookie";
import * as z from "zod";

const formSchema = z.object({
  email: z.string().email("Enter a valid email address."),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters.")
    .max(20, "Password must be at most 20 characters."),
});

const Login = () => {
  const navigate = useNavigate();
  const { isSubmitting, setIsSubmitting } = useIsSubmitting();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // auto redirect if already logged in
  useEffect(() => {
    const token = Cookies.get("admin_token");
    if (token) {
      navigate("/dashboard", { replace: true });
    }
  }, []);

  const handleLogin = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    setIsLoading(true);

    try {
      const res = await loginAdmin(data);

      const { token, admin } = res;

      // store token
      Cookies.set("admin_token", token, {
        expires: 7,
        sameSite: "strict",
        secure: false, // change to true in production HTTPS
        path: "/",
      });

      // store admin profile
      localStorage.setItem("admin_user", JSON.stringify(admin));

      toast.success("Login successful");

      navigate("/dashboard", { replace: true });
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setIsSubmitting(false);
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-white dark:bg-slate-900 lg:flex min-h-screen">
      {/* Left Image */}
      <div className="lg:w-1/2 hidden lg:flex items-center justify-center">
        <img src={AuthImage} alt="Auth" />
      </div>

      {/* Login Form */}
      <div className="lg:w-1/2 flex items-center border justify-center px-6 py-8">
        <div className="w-full max-w-[460px]">
          <Link to="/" className="mb-4 inline-block">
            <ThemeLogo />
          </Link>

          <h3 className="text-2xl font-semibold mb-2">
            Sign in to your account
          </h3>

          <p className="text-neutral-500 mb-8">
            Welcome back! Please enter your details.
          </p>

          <form onSubmit={form.handleSubmit(handleLogin)}>
            {/* Email */}
            <FieldGroup className="mb-4">
              <Controller
                name="email"
                control={form.control}
                render={({
                  field,
                  fieldState,
                }: {
                  field: any;
                  fieldState: any;
                }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className={cn("gap-1")}
                  >
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />

                      <Input
                        {...field}
                        type="email"
                        placeholder="Email"
                        disabled={isSubmitting}
                        className="pl-12 h-14 rounded-xl"
                      />
                    </div>

                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            {/* Password */}
            <FieldGroup className="mb-4">
              <Controller
                name="password"
                control={form.control}
                render={({
                  field,
                  fieldState,
                }: {
                  field: any;
                  fieldState: any;
                }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className={cn("gap-1")}
                  >
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />

                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        disabled={isSubmitting}
                        className="pl-12 pr-12 h-14 rounded-xl"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2"
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>

                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            {/* Remember + Forgot */}
            <div className="flex justify-between items-center mb-6">
              <Link
                to="/auth/forgot-password"
                className="text-primary text-sm hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* Login button */}
            <Button
              type="submit"
              className="w-full h-[52px] rounded-xl"
              disabled={isSubmitting}
            >
              {isLoading && <Loader2 className="animate-spin mr-2 h-4 w-4" />}
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
