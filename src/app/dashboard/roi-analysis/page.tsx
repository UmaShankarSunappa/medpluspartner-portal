
"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const fixedExpenseCategories = [
  "Rent", "Salaries", "Infra Rent", "Electricity",
  "Communication", "Stationery", "Card Commission",
  "Insurance", "Bank Charges", "R&M", "Rates & Taxes",
  "Adjustment/Misc",
];

// Mock function to simulate fetching sales data for a given period
const fetchSalesData = (month: string, year: number) => {
  // In a real app, this would be an API call.
  // Here, we generate some mock data based on the period.
  const seed = month.length + year;
  const mockNetSales = 500000 + (seed % 10) * 10000;
  const mockNetMargin = mockNetSales * (0.15 + (seed % 5) / 100); // Margin between 15-20%
  return {
    netSales: mockNetSales,
    netMargin: mockNetMargin,
  };
};

export default function RoiAnalysisPage() {
  const [month, setMonth] = useState<string>(new Date().toLocaleString("default", { month: "long" }));
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [salesData, setSalesData] = useState({ netSales: 550000, netMargin: 95000 });
  const [fixedExpenses, setFixedExpenses] = useState<Record<string, number>>({});

  useEffect(() => {
    // Simulate fetching data when month or year changes
    const data = fetchSalesData(month, year);
    setSalesData(data);
  }, [month, year]);

  useEffect(() => {
    // Load fixed expenses from localStorage on initial render
    try {
      const storedExpenses = localStorage.getItem("franchiseeFixedExpenses");
      if (storedExpenses) {
        setFixedExpenses(JSON.parse(storedExpenses));
      }
    } catch (error) {
      console.error("Failed to parse fixed expenses from localStorage:", error);
    }
  }, []);

  const { netMarginPercentage, totalFixedExpenses, netProfit } = useMemo(() => {
    const percentage = salesData.netSales > 0 ? (salesData.netMargin / salesData.netSales) * 100 : 0;
    const total = Object.values(fixedExpenses).reduce((acc, val) => acc + (val || 0), 0);
    const profit = salesData.netMargin - total;
    return {
      netMarginPercentage: percentage.toFixed(2) + "%",
      totalFixedExpenses: total,
      netProfit: profit,
    };
  }, [salesData, fixedExpenses]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-headline text-3xl font-bold">Monthly ROI Analysis</h1>
        <p className="text-muted-foreground">
          Estimate your monthly performance based on sales data and fixed expenses.
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Select Analysis Period</CardTitle>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <div className="grid gap-2 w-full sm:w-48">
                <Label htmlFor="month">Month</Label>
                <Select value={month} onValueChange={setMonth}>
                  <SelectTrigger id="month">
                    <SelectValue placeholder="Select month" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }, (_, i) =>
                      new Date(0, i).toLocaleString("default", { month: "long" })
                    ).map((m) => (
                      <SelectItem key={m} value={m}>{m}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2 w-full sm:w-48">
                <Label htmlFor="year">Year</Label>
                <Select value={String(year)} onValueChange={(val) => setYear(Number(val))}>
                    <SelectTrigger id="year">
                        <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                        {[2025, 2024, 2023].map(y => <SelectItem key={y} value={String(y)}>{y}</SelectItem>)}
                    </SelectContent>
                </Select>
              </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
            {/* Auto-Populated Data */}
            <div className="space-y-4">
                <h3 className="font-semibold text-lg border-b pb-2">Auto-Populated Data</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                     <div className="space-y-2">
                        <Label>Net Sales (NSV)</Label>
                        <Input readOnly value={`₹${salesData.netSales.toLocaleString("en-IN")}`} />
                    </div>
                    <div className="space-y-2">
                        <Label>Net Margin Value</Label>
                        <Input readOnly value={`₹${salesData.netMargin.toLocaleString("en-IN")}`} />
                    </div>
                     <div className="space-y-2">
                        <Label>Net Margin Percentage</Label>
                        <Input readOnly value={netMarginPercentage} />
                    </div>
                </div>
            </div>

            {/* Fixed Expenses */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg border-b pb-2">Fixed Expenses</h3>
                    <Button variant="outline" size="sm">Configure Fixed Expenses</Button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-4 p-4 border rounded-lg">
                    {fixedExpenseCategories.map(category => (
                        <div key={category} className="space-y-1">
                            <Label className="text-muted-foreground">{category}</Label>
                            <p className="font-medium">₹{(fixedExpenses[category] || 0).toLocaleString("en-IN")}</p>
                        </div>
                    ))}
                </div>
            </div>
        </CardContent>
         <CardFooter className="bg-muted/50 p-4 flex flex-col sm:flex-row items-stretch sm:items-center sm:justify-between gap-4 rounded-b-lg">
            <div className="flex justify-between items-center text-lg w-full">
                <span className="text-muted-foreground">Total Fixed Expenses</span>
                <span className="font-bold text-red-600">- ₹{totalFixedExpenses.toLocaleString("en-IN")}</span>
            </div>
             <div className="w-full sm:w-px bg-border h-px sm:h-auto"></div>
             <div className="flex justify-between items-center text-xl font-bold w-full">
                <span>Approximate Net Profit</span>
                <span className={cn(netProfit >= 0 ? "text-green-600" : "text-destructive")}>
                    ₹{netProfit.toLocaleString("en-IN")}
                </span>
            </div>
        </CardFooter>
      </Card>
    </div>
  );
}
