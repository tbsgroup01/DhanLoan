import DonutThreeSeriesChart from '@/components/charts/DonutThreeSeriesChart';
import CustomSelect from '@/components/shared/CustomSelect';
import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useState } from "react";
import { getDashboardStats } from "@/services/dashboardService";

interface Stats {
    pending: number;
    approved: number;
    rejected: number;
}

const UserOverviewCard = () => {

    const [stats, setStats] = useState<Stats | null>(null);

    useEffect(() => {

        const fetchStats = async () => {

            const data = await getDashboardStats();

            setStats(data);

        };

        fetchStats();

    }, []);

    if (!stats) return null;

    const series = [
        stats.pending,
        stats.approved,
        stats.rejected
    ];

    return (

        <Card className="card">

            <CardContent className="card-body p-0">

                <div className="flex items-center justify-between">

                    <h6 className="mb-0 font-semibold text-lg">
                        Loan Applications Overview
                    </h6>

                    <CustomSelect
                        placeholder="Today"
                        options={["Yearly", "Monthly", "Weekly", "Today"]}
                    />

                </div>

                <div className="apexcharts-tooltip-z-none mt-2">

                    <DonutThreeSeriesChart
                        onChartHeight={270}
                        chartSeries={series}
                        chartColors={[
                            "#F59E0B", // pending
                            "#3B82F6", // approved
                            "#e4f1ff"  // rejected
                        ]}
                    />

                </div>

                <ul className="flex flex-wrap items-center justify-between mt-4 gap-3">

                    <li className="flex items-center gap-2">

                        <span className="w-3 h-3 rounded-[2px] bg-yellow-500"></span>

                        <span className="text-sm">
                            Pending:
                            <span className="font-semibold ml-1">
                                {stats.pending}
                            </span>
                        </span>

                    </li>

                    <li className="flex items-center gap-2">

                        <span className="w-3 h-3 rounded-[2px] bg-blue-500"></span>

                        <span className="text-sm">
                            Approved:
                            <span className="font-semibold ml-1">
                                {stats.approved}
                            </span>
                        </span>

                    </li>

                    <li className="flex items-center gap-2">

                        <span className="w-3 h-3 rounded-[2px] bg-gray-400"></span>

                        <span className="text-sm">
                            Rejected:
                            <span className="font-semibold ml-1">
                                {stats.rejected}
                            </span>
                        </span>

                    </li>

                </ul>

            </CardContent>

        </Card>

    );

};

export default UserOverviewCard;