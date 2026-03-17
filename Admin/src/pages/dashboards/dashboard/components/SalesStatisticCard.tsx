import SalesStaticChart from "@/components/charts/SalesStaticChart";
import CustomSelect from "@/components/shared/CustomSelect";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { getLoanAnalytics } from "@/services/analyticsService";

interface AnalyticsData {
  date: string;
  applications: number;
}

const SalesStatisticCard = () => {
  const [data, setData] = useState<AnalyticsData[]>([]);
  const [totalApplications, setTotalApplications] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await getLoanAnalytics();
      
      setData(result);

      const total = result.reduce(
        (sum: number, item: AnalyticsData) => sum + item.applications,
        0
      );

      setTotalApplications(total);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <Card className="card shadow-sm border-slate-200">
      <CardContent className="p-6">
        <div className="flex flex-wrap items-center justify-between mb-6">
          <h6 className="mb-0 font-bold text-slate-800 text-lg">
            Loan Applications Analytics
          </h6>

          <CustomSelect
            placeholder="Monthly"
            options={["Yearly", "Monthly", "Weekly", "Today"]}
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 mt-2">
          <h6 className="mb-0 text-3xl font-black text-slate-900">
            {loading ? "..." : totalApplications}
          </h6>

          <span className="text-sm font-bold rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 px-3 py-1 flex items-center gap-1">
            Active <ArrowUp width={14} height={14} />
          </span>

          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Total Submissions
          </span>
        </div>

        <div className="mt-8 min-h-[320px] flex items-center justify-center">
          {loading ? (
            <div className="flex flex-col items-center gap-2">
               <Loader2 className="animate-spin text-blue-600" size={32} />
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Retrieving Records...</p>
            </div>
          ) : (
            <div className="w-full">
              {/* Data Injected into Chart Component */}
              <SalesStaticChart data={data} />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesStatisticCard;