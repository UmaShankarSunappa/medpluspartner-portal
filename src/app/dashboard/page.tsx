
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { kpiData, cashDepositReportData } from "@/lib/data";
import { CreditCard, Package, IndianRupee, TrendingUp, TrendingDown } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const storeKpis = kpiData["store-01"];

  const renderTrend = (trendValue: number) => {
    const isPositive = trendValue > 0;
    const TrendIcon = isPositive ? TrendingUp : TrendingDown;
    return (
      <p className={cn("text-xs text-muted-foreground flex items-center gap-1", isPositive ? "text-green-600" : "text-red-600")}>
        <TrendIcon className="h-4 w-4" />
        {Math.abs(trendValue)}% {isPositive ? "increase" : "decrease"} vs last month
      </p>
    );
  };

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
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{storeKpis.averageDailySales.toLocaleString('en-IN')}</div>
            {renderTrend(storeKpis.avgSalesTrend)}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">MTD Sales</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{storeKpis.mtdSales.toLocaleString('en-IN')}</div>
            {renderTrend(storeKpis.mtdSalesTrend)}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Sales vs Cash deposit (Tentative)</CardTitle>
             <div className="flex items-center gap-4 pt-4">
                <Select defaultValue="oct-2025">
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="oct-2025">October 2025</SelectItem>
                        <SelectItem value="sep-2025">September 2025</SelectItem>
                        <SelectItem value="aug-2025">August 2025</SelectItem>
                    </SelectContent>
                </Select>
                <Button>Search</Button>
                <Button variant="outline">Reset</Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-center">Date</TableHead>
                        <TableHead className="text-center">Net Sales</TableHead>
                        <TableHead className="text-center">Cash to be deposited</TableHead>
                        <TableHead className="text-center">Tentative Margin</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {cashDepositReportData.map((row) => (
                        <TableRow key={row.date}>
                            <TableCell className="text-center">{row.date}</TableCell>
                            <TableCell className="text-center">₹{row.netSales.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                            <TableCell className="text-center">₹{row.cashToBeDeposited.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                            <TableCell className="text-center font-medium">₹{(row.netSales - row.cashToBeDeposited).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
