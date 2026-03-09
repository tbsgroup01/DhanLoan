import LazyWrapper from "@/components/LazyWrapper";
import Breadcrumb from "@/layouts/Breadcrumb";
import { lazy } from "react";

const SalesStatisticCard = lazy(() => import("./components/SalesStatisticCard"));
const StatCard = lazy(() => import("./components/StatCard"));
const UserOverviewCard = lazy(() => import("./components/UserOverviewCard"));

const AiDashboard = () => {
  return (
    <div className="space-y-6">

      {/* Breadcrumb */}
      <Breadcrumb title="AI Dashboard" text="AI" />

      {/* Top Stats */}
      <LazyWrapper>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard />
        </div>
      </LazyWrapper>

      {/* Main Dashboard Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Sales Statistics */}
        <div className="xl:col-span-2">
          <LazyWrapper>
            <SalesStatisticCard />
          </LazyWrapper>
        </div>

        {/* User Overview */}
        <div className="xl:col-span-1">
          <LazyWrapper>
            <UserOverviewCard />
          </LazyWrapper>
        </div>

      </div>

    </div>
  );
};

export default AiDashboard;