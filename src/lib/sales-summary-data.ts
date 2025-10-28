
type SalesMetric = {
  value: number;
  percentage?: number;
  growth: 'gr' | 'de' | 'none';
};

type CurrentDayRow = {
  date: string;
  totalSales: SalesMetric;
  pharmaSales: SalesMetric;
  nonPharmaSales: SalesMetric;
  plPharmaSales: SalesMetric;
  plNonPharmaSales: SalesMetric;
};

type MtdRow = {
  date: string;
  totalSales: SalesMetric;
  avgSales: SalesMetric;
  pharmaSales: SalesMetric;
  nonPharmaSales: SalesMetric;
  plPharmaSales: SalesMetric;
  plNonPharmaSales: SalesMetric;
};

// Logic:
// Total Sales = Pharma Sales + Non Pharma Sales
// Pharma/Non-Pharma % is share of Total Sales
// PL Pharma % is margin against Pharma Sales
// PL Non-Pharma % is margin against Non Pharma Sales

export const salesSummaryData: {
  currentDay: CurrentDayRow[];
  monthTillDate: MtdRow[];
} = {
  currentDay: [
    {
      date: "2025-10-18",
      totalSales: { value: 20953.51, growth: 'de' },
      pharmaSales: { value: 15000.00, percentage: (15000.00 / 20953.51) * 100, growth: 'de' },
      nonPharmaSales: { value: 5953.51, percentage: (5953.51 / 20953.51) * 100, growth: 'gr' },
      plPharmaSales: { value: 2250.00, percentage: (2250.00 / 15000.00) * 100, growth: 'de' },
      plNonPharmaSales: { value: 1190.70, percentage: (1190.70 / 5953.51) * 100, growth: 'gr' },
    },
    {
      date: "2025-09-18",
      totalSales: { value: 38810.63, growth: 'none' },
      pharmaSales: { value: 29000.00, percentage: (29000.00 / 38810.63) * 100, growth: 'none' },
      nonPharmaSales: { value: 9810.63, percentage: (9810.63 / 38810.63) * 100, growth: 'none' },
      plPharmaSales: { value: 4350.00, percentage: (4350.00 / 29000.00) * 100, growth: 'none' },
      plNonPharmaSales: { value: 1962.13, percentage: (1962.13 / 9810.63) * 100, growth: 'none' },
    },
    {
      date: "2025-10-17",
      totalSales: { value: 19737.19, growth: 'none' },
      pharmaSales: { value: 14000.00, percentage: (14000.00 / 19737.19) * 100, growth: 'none' },
      nonPharmaSales: { value: 5737.19, percentage: (5737.19 / 19737.19) * 100, growth: 'none' },
      plPharmaSales: { value: 2100.00, percentage: (2100.00 / 14000.00) * 100, growth: 'none' },
      plNonPharmaSales: { value: 1147.44, percentage: (1147.44 / 5737.19) * 100, growth: 'none' },
    },
  ],
  monthTillDate: [
    {
        date: "Oct 2025 MTD",
        totalSales: { value: 43210.88, growth: 'gr' },
        avgSales: { value: 21605.44, growth: 'gr' },
        pharmaSales: { value: 31000.00, percentage: (31000.00 / 43210.88) * 100, growth: 'gr' },
        nonPharmaSales: { value: 12210.88, percentage: (12210.88 / 43210.88) * 100, growth: 'gr' },
        plPharmaSales: { value: 4650.00, percentage: (4650.00 / 31000.00) * 100, growth: 'gr' },
        plNonPharmaSales: { value: 2442.18, percentage: (2442.18 / 12210.88) * 100, growth: 'gr' },
    },
    {
        date: "Sep 2025 MTD",
        totalSales: { value: 41500.20, growth: 'none' },
        avgSales: { value: 20750.10, growth: 'none' },
        pharmaSales: { value: 30000.00, percentage: (30000.00 / 41500.20) * 100, growth: 'none' },
        nonPharmaSales: { value: 11500.20, percentage: (11500.20 / 41500.20) * 100, growth: 'none' },
        plPharmaSales: { value: 4500.00, percentage: (4500.00 / 30000.00) * 100, growth: 'none' },
        plNonPharmaSales: { value: 2300.04, percentage: (2300.04 / 11500.20) * 100, growth: 'none' },
    },
    {
        date: "Aug 2025 MTD",
        totalSales: { value: 39800.00, growth: 'none' },
        avgSales: { value: 19900.00, growth: 'none' },
        pharmaSales: { value: 28000.00, percentage: (28000.00 / 39800.00) * 100, growth: 'none' },
        nonPharmaSales: { value: 11800.00, percentage: (11800.00 / 39800.00) * 100, growth: 'none' },
        plPharmaSales: { value: 4200.00, percentage: (4200.00 / 28000.00) * 100, growth: 'none' },
        plNonPharmaSales: { value: 2360.00, percentage: (2360.00 / 11800.00) * 100, growth: 'none' },
    },
  ]
};
