import LazyWrapper from "@/components/LazyWrapper";
import Breadcrumb from "@/layouts/Breadcrumb";
import { lazy } from "react";

const StateCards = lazy(() => import("./components/StatisticsCard"));
const EarningCategories = lazy(() => import("./components/EarningCategories"));
const PaymentHistory = lazy(() => import("./components/PaymentHistory"));
const MonthlyExpenseBreakdown = lazy(() => import("./components/MonthlyExpenseBreakdown"));

const Finance = () => {
  return (
    <>
      <Breadcrumb title="Finance" text="Finance" />

      {/* Stats Cards (unchanged) */}
      <LazyWrapper>
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6">
          <StateCards />
        </div>
      </LazyWrapper>

      {/* Charts Row */}
      <div className="mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6">

          <div className="col-span-12 lg:col-span-4">
            <LazyWrapper>
              <EarningCategories />
            </LazyWrapper>
          </div>

          <div className="col-span-12 lg:col-span-4">
            <LazyWrapper>
              <PaymentHistory />
            </LazyWrapper>
          </div>

          <div className="col-span-12 lg:col-span-4">
            <LazyWrapper>
              <MonthlyExpenseBreakdown />
            </LazyWrapper>
          </div>

        </div>
      </div>
    </>
  );
};

export default Finance;