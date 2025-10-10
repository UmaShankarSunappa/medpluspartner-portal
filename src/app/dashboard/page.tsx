
"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";
import { kpiData, salesData } from "@/lib/data";
import { CreditCard, Package, DollarSign, TrendingUp } from "lucide-react";

const chartConfig = {
  sales: {
    label: "Sales",
    color: "hsl(var(--primary))",
  },
  margin: {
    label: "Margin",
    color: "hsl(var(--accent))",
  },
} satisfies ChartConfig;

export default function DashboardPage() {
  const storeKpis = kpiData["store-01"];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-headline text-3xl font-bold">Welcome Back, Anand!</h1>
        <p className="text-muted-foreground">Here's a snapshot of your business today.</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{storeKpis.activeOrders}</div>
            <p className="text-xs text-muted-foreground">Orders currently being processed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Credit</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{storeKpis.availableCredit.toLocaleString('en-IN')}</div>
            <p className="text-xs text-muted-foreground">Your current credit balance</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Daily Sales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{storeKpis.averageDailySales.toLocaleString('en-IN')}</div>
            <p className="text-xs text-muted-foreground">
                {storeKpis.avgSalesTrend > 0 ? '↑' : '↓'} {Math.abs(storeKpis.avgSalesTrend)}% vs last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">MTD Sales</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{storeKpis.mtdSales.toLocaleString('en-IN')}</div>
            <p className="text-xs text-muted-foreground">
                {storeKpis.mtdSalesTrend > 0 ? '+' : ''}{storeKpis.mtdSalesTrend}% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Sales & Margin Overview (Last 6 Months)</CardTitle>
            <CardDescription>A summary of your store's financial performance.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[350px] w-full">
              <BarChart accessibilityLayer data={salesData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                 <YAxis 
                    tickFormatter={(value) => `₹${Number(value) / 1000}k`}
                />
                <ChartTooltip
                  content={<ChartTooltipContent 
                    formatter={(value, name) => `₹${(Number(value)).toLocaleString('en-IN')}`}
                  />}
                />
                <Bar dataKey="sales" fill="var(--color-sales)" radius={4} />
                <Bar dataKey="margin" fill="var(--color-margin)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
