import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import Login from "@/pages/auth/login/Login";
import ForgotPassword from "@/pages/auth/forgot-password/ForgotPassword";
import ResetPassword from "@/pages/auth/reset-password/ResetPassword";

import MainLayout from "@/layouts/MainLayout";
import GuestRoutes from "./GuestRoutes";
import ProtectedRoutes from "./ProtectedRoutes";

import NotFound from "@/error/404";
import RouteErrorBoundary from "@/error/RouteErrorBoundary";
import AllApplications from "@/pages/AllApplications";
import SiteSettings from "@/pages/Settings/SiteSettings";
import PaymentSettings from "@/pages/admin/PaymentSettings";
import TagsPage from "@/pages/admin/TagsPage";
import ApplicationDetails from "@/pages/ApplicationDetails";
import LoanRecovery from "@/pages/LoanRecovery";

const AiDashboard = lazy(() => import("@/pages/dashboards/dashboard/AiDashboard"));
const Crm = lazy(() => import("@/pages/dashboards/crm/Crm"));
const Finance = lazy(() => import("@/pages/dashboards/finance/Finance"));

export const router = createBrowserRouter(
  [
    // Guest Routes
    {
      element: <GuestRoutes />,
      errorElement: <RouteErrorBoundary />,
      children: [
        { path: "/auth/login", element: <Login /> },
        { path: "/auth/forgot-password", element: <ForgotPassword /> },
        { path: "/auth/reset-password/:token", element: <ResetPassword /> },
      ],
    },

    // Protected Routes
    {
      element: <ProtectedRoutes />,
      children: [
        {
          path: "/",
          element: <MainLayout />,
          errorElement: <RouteErrorBoundary />,
          children: [
            {
              index: true,
              element: <Navigate to="dashboard" replace />, // ✅ FIXED
            },

            { path: "dashboard", element: <AiDashboard /> },
            { path: "crm", element: <Crm /> },
            { path: "finance", element: <Finance /> },

            // ✅ FIXED (NO /)
            { path: "all-applications", element: <AllApplications /> },
            { path: "loan-recovery", element: <LoanRecovery /> },
            { path: "application/:id", element: <ApplicationDetails /> },
            { path: "settings", element: <SiteSettings /> },
            { path: "payment-settings", element: <PaymentSettings /> },
            { path: "tags", element: <TagsPage /> },
          ],
        },
      ],
    },

    // 404
    {
      path: "*",
      element: <NotFound />,
      errorElement: <RouteErrorBoundary />,
    },
  ],
  {
    basename: "/DhanLoanAdmin", // 🔥 MUST ADD THIS
  }
);