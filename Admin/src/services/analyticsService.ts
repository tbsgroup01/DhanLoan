const API = "https://loanapi.towsindia.com/api";

export const getLoanAnalytics = async (): Promise<{ date: string; applications: number }[]> => {
  try {
    const res = await fetch(`${API}/admin/loans`);
    const loans = await res.json();

    // Grouping by date
    const groupedData: Record<string, number> = {};

    loans.forEach((loan: any) => {
      // Convert "2026-03-17T09:19:04.000Z" to "17 Mar"
      const dateLabel = new Date(loan.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
      });

      groupedData[dateLabel] = (groupedData[dateLabel] || 0) + 1;
    });

    // Convert object to array sorted by date (optional)
    return Object.entries(groupedData).map(([date, count]) => ({
      date,
      applications: count,
    }));
  } catch (error) {
    console.error("Error fetching loan data:", error);
    return [];
  }
};