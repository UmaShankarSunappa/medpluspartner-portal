
"use client";

import { Download, CheckCircle, File as FileIcon, Sheet as ExcelIcon } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { monthlyReports } from "@/lib/data";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";

export default function ReportsPage() {
  const [currentYear, setCurrentYear] = useState('');
  const [availableMonths, setAvailableMonths] = useState<string[]>([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  
  useEffect(() => {
    const now = new Date();
    const currentMonthIndex = now.getMonth(); // 0-11
    const currentDay = now.getDate();
    const year = now.getFullYear();

    // Financial year in India starts from April
    const financialYear = currentMonthIndex >= 3 ? year : year - 1;
    setCurrentYear(financialYear.toString());

    const allMonths = [
      "April", "May", "June", "July", "August", "September",
      "October", "November", "December", "January", "February", "March"
    ];

    let monthsInFinancialYear: string[];

    if (financialYear < year) { // Case for Jan, Feb, March
        monthsInFinancialYear = allMonths.slice(0, 9 + currentMonthIndex + 1);
    } else { // Case for April to Dec
        monthsInFinancialYear = allMonths.slice(0, currentMonthIndex - 3 + 1);
    }
    
    setAvailableMonths(monthsInFinancialYear);
    
    // Set default selected month
    if (monthsInFinancialYear.length > 0) {
        const currentMonthName = now.toLocaleString('default', { month: 'long' });
        if (monthsInFinancialYear.includes(currentMonthName)) {
            setSelectedMonth(currentMonthName);
        } else {
            setSelectedMonth(monthsInFinancialYear[monthsInFinancialYear.length-1]);
        }
    }
  }, []);
  

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-headline text-3xl font-bold">Monthly Reports</h1>
        <p className="text-muted-foreground">
          Access and download your monthly statements and reports.
        </p>
      </div>

       <Card>
        <CardHeader>
          <CardTitle>Select Period</CardTitle>
          <CardDescription>Filter reports by year and month. (only current financial year reports will be visible)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="grid gap-2 w-full md:w-48">
              <Label htmlFor="year">Year</Label>
              <Select value={currentYear} disabled>
                <SelectTrigger id="year">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  {currentYear && <SelectItem value={currentYear}>{`${currentYear}-${(parseInt(currentYear, 10)+1).toString().slice(-2)}`}</SelectItem>}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2 w-full md:w-48">
              <Label htmlFor="month">Month</Label>
               <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger id="month">
                  <SelectValue placeholder="Select month" />
                </SelectTrigger>
                <SelectContent>
                  {availableMonths.map((month) => (
                    <SelectItem key={month} value={month}>{month}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>


      <Card>
        <CardHeader>
          <CardTitle>Available Reports</CardTitle>
          <CardDescription>
            Download reports and complete required actions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report Name</TableHead>
                <TableHead>Month/Year</TableHead>
                <TableHead>File Type</TableHead>
                <TableHead>Status / Action</TableHead>
                <TableHead className="text-right">Download</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {monthlyReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">{report.name}</TableCell>
                  <TableCell>{report.period}</TableCell>
                  <TableCell className="flex items-center gap-2">
                    {report.fileType === 'Excel' ? 
                        <ExcelIcon className="h-4 w-4 text-green-600"/> : 
                        <FileIcon className="h-4 w-4 text-red-600"/>
                    }
                    {report.fileType}
                  </TableCell>
                  <TableCell>
                    {report.actionRequired ? (
                        <div className="flex items-center gap-2">
                            <Badge variant="warning">Awaiting Confirmation</Badge>
                             <Button variant="outline" size="sm">
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Confirm Return
                            </Button>
                        </div>
                    ) : (
                      <span>-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                     <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
