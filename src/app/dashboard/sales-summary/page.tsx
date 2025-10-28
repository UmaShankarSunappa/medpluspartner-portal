
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
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
import { format, parseISO } from 'date-fns';

export default function SalesSummaryPage() {
  const [lastUpdated, setLastUpdated] = useState(
    "2025-10-18 17:00:00"
  );

  const handleRefresh = () => {
    setLastUpdated(new Date().toLocaleString('sv-SE'));
  }

  const currentDayData = salesSummaryData.currentDay;
  const monthTillDateData = salesSummaryData.monthTillDate;
  
  const renderCell = (metric: {value: number, percentage?: number, growth: string}, isAmountOnly = false) => (
    <TableCell>
      <div className={cn("p-2 rounded-md", metric.growth === 'de' ? 'bg-red-100' : metric.growth === 'gr' ? 'bg-green-100' : '')}>
        {metric.value.toFixed(2)}
        {!isAmountOnly && metric.percentage !== undefined && (
          <span className="text-muted-foreground ml-1">({metric.percentage.toFixed(1)}%)</span>
        )}
      </div>
    </TableCell>
  )

  const CurrentDayTable = ({ data }: { data: typeof currentDayData }) => (
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>Dates</TableHead>
                <TableHead>Total Sales (Rs)</TableHead>
                <TableHead>Pharma Sales (Rs)</TableHead>
                <TableHead>Non Pharma Sales (Rs)</TableHead>
                <TableHead>PL Pharma (Rs)</TableHead>
                <TableHead>PL Non Pharma (Rs)</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {data.map((row) => (
                <TableRow key={row.date}>
                    <TableCell>{format(parseISO(row.date), "MMM dd, yyyy (E)")}</TableCell>
                    {renderCell(row.totalSales, true)}
                    {renderCell(row.pharmaSales)}
                    {renderCell(row.nonPharmaSales)}
                    {renderCell(row.plPharmaSales)}
                    {renderCell(row.plNonPharmaSales)}
                </TableRow>
            ))}
        </TableBody>
    </Table>
  );

  const MtdTable = ({ data }: { data: typeof monthTillDateData }) => (
     <Table>
        <TableHeader>
            <TableRow>
                <TableHead>Dates</TableHead>
                <TableHead>Total Sales (Rs)</TableHead>
                <TableHead>Avg Sales (Rs)</TableHead>
                <TableHead>Pharma Sales (Rs)</TableHead>
                <TableHead>Non Pharma Sales (Rs)</TableHead>
                <TableHead>PL Pharma (Rs)</TableHead>
                <TableHead>PL Non Pharma (Rs)</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {data.map((row) => (
                <TableRow key={row.date}>
                    <TableCell>{row.date}</TableCell>
                    {renderCell(row.totalSales, true)}
                    {renderCell(row.avgSales, true)}
                    {renderCell(row.pharmaSales)}
                    {renderCell(row.nonPharmaSales)}
                    {renderCell(row.plPharmaSales)}
                    {renderCell(row.plNonPharmaSales)}
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
                    <CurrentDayTable data={currentDayData} />
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
                    <MtdTable data={monthTillDateData} />
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
