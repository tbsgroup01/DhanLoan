import { Card, CardContent } from "@/components/ui/card";
import {
  UsersRound,
  Medal,
  Wallet,
  FileText
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { getDashboardStats } from "@/services/dashboardService";

interface DashboardStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  processingFeesPaid: number;
}

const StatCard = () => {

  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {

    const fetchStats = async () => {

      const data = await getDashboardStats();

      setStats(data);

    };

    fetchStats();

  }, []);

  if (!stats) return null;

  const cardsDatas = [

    {
      title: "Total Applications",
      value: stats.total,
      icon: UsersRound,
      iconBg: "bg-cyan-600",
      gradientFrom: "from-cyan-600/10",
      description: "Total loan applications"
    },

    {
      title: "Pending Applications",
      value: stats.pending,
      icon: Medal,
      iconBg: "bg-yellow-600",
      gradientFrom: "from-yellow-600/10",
      description: "Waiting for admin review"
    },

    {
      title: "Approved Loans",
      value: stats.approved,
      icon: Wallet,
      iconBg: "bg-green-600",
      gradientFrom: "from-green-600/10",
      description: "Loans approved"
    },

    {
      title: "Rejected Loans",
      value: stats.rejected,
      icon: FileText,
      iconBg: "bg-red-600",
      gradientFrom: "from-red-600/10",
      description: "Rejected applications"
    },

  ];

  return (

    <>
      {cardsDatas.map((card, index) => (

        <Card
          key={index}
          className={`bg-gradient-to-r ${card.gradientFrom} to-white dark:to-slate-700 p-0 border border-gray-200 dark:border-slate-700 rounded-md shadow-none`}
        >

          <CardContent className="p-4">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm font-medium text-neutral-600 dark:text-neutral-300">
                  {card.title}
                </p>

                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mt-1">
                  {card.value}
                </h3>

              </div>

              <div className={`w-12 h-12 ${card.iconBg} rounded-full flex items-center justify-center`}>

                <card.icon className="text-white" size={24} />

              </div>

            </div>

            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-4">

              {card.description}

            </p>

          </CardContent>

        </Card>

      ))}
    </>

  );

};

export default StatCard;