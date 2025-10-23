
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { salesSummaryData } from "@/lib/sales-summary-data";
import { cn } from "@/lib/utils";

export default function SalesSummaryPage() {
  const [lastUpdated, setLastUpdated] = useState(
    "2025-10-18 17:00:00"
  );

  const handleRefresh = () => {
    setLastUpdated(new Date().toLocaleString('sv-SE'));
  }

  const currentDayData = salesSummaryData.currentDay;
  const monthTillDateData = salesSummaryData.monthTillDate;

  const SalesTable = ({ data }: { data: typeof currentDayData }) => (
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>Dates</TableHead>
                <TableHead>Total Sales (Rs)</TableHead>
                <TableHead>PL + SIP Sales (Rs)</TableHead>
                <TableHead>PL + SIP Pharma Sales (Rs)</TableHead>
                <TableHead>PL + SIP Others Sales (Rs)</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {data.map((row) => (
                <TableRow key={row.date}>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>
                        <div className={cn("p-2 rounded-md", row.totalSales.growth === 'de' ? 'bg-red-100' : row.totalSales.growth === 'gr' ? 'bg-green-100' : '')}>
                            {row.totalSales.value.toFixed(2)}
                        </div>
                    </TableCell>
                    <TableCell>
                        <div className={cn("p-2 rounded-md", row.plSipSales.growth === 'de' ? 'bg-red-100' : row.plSipSales.growth === 'gr' ? 'bg-green-100' : '')}>
                            {row.plSipSales.value.toFixed(2)}
                        </div>
                    </TableCell>
                    <TableCell>
                        <div className={cn("p-2 rounded-md", row.plSipPharmaSales.growth === 'de' ? 'bg-red-100' : row.plSipPharmaSales.growth === 'gr' ? 'bg-green-100' : '')}>
                            {row.plSipPharmaSales.value.toFixed(2)}
                        </div>
                    </TableCell>
                    <TableCell>
                         <div className={cn("p-2 rounded-md", row.plSipOthersSales.growth === 'de' ? 'bg-red-100' : row.plSipOthersSales.growth === 'gr' ? 'bg-green-100' : '')}>
                            {row.plSipOthersSales.value.toFixed(2)}
                        </div>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1">
            <h1 className="font-headline text-3xl font-bold">Store Sales Summary</h1>
            <p className="text-muted-foreground">Store ID: INTGHYD50085</p>
        </div>
        <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Last updated: {lastUpdated}</span>
            <Button variant="outline" onClick={handleRefresh}>Refresh</Button>
        </div>
      </div>
      
      <Tabs defaultValue="current_day">
        <TabsList>
            <TabsTrigger value="current_day">Current Day</TabsTrigger>
            <TabsTrigger value="month_till_date">Month Till Date</TabsTrigger>
        </TabsList>
        <TabsContent value="current_day">
            <Card>
                <CardContent className="pt-6">
                    <SalesTable data={currentDayData} />
                     <div className="flex items-center gap-6 mt-4">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-green-100 rounded-sm border border-green-200"></div>
                            <span className="text-sm">Growth</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-red-100 rounded-sm border border-red-200"></div>
                            <span className="text-sm">Degrowth</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </TabsContent>
         <TabsContent value="month_till_date">
            <Card>
                <CardContent className="pt-6">
                    <SalesTable data={monthTillDateData} />
                     <div className="flex items-center gap-6 mt-4">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-green-100 rounded-sm border border-green-200"></div>
                            <span className="text-sm">Growth</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-red-100 rounded-sm border border-red-200"></div>
                            <span className="text-sm">Degrowth</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
