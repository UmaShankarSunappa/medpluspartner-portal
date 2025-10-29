
"use client";

import { useState, useEffect, useMemo } from "react";
import { Download, File as FileIcon, Sheet as ExcelIcon } from "lucide-react";
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
import { monthlyReports as allReportsData, type MonthlyReport } from "@/lib/data";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronsUpDown } from "lucide-react";

// --- Helper Functions ---
const financialYearMonths = [
  "April", "May", "June", "July", "August", "September",
  "October", "November", "December", "January", "February", "March",
];

const getFinancialYears = (reports: MonthlyReport[]): string[] => {
  const years = new Set(reports.map(report => report.financialYear));
  return Array.from(years).sort((a, b) => b.localeCompare(a));
};

const getReportTypes = (reports: MonthlyReport[]): string[] => {
  const types = new Set(reports.map(report => report.name));
  return Array.from(types).sort();
};

const getCurrentFinancialYear = () => {
    const today = new Date();
    const currentMonth = today.getMonth(); // 0-11
    const currentYear = today.getFullYear();
    // Financial year starts in April (month index 3)
    if (currentMonth >= 3) {
        return `FY ${currentYear}-${(currentYear + 1).toString().slice(-2)}`;
    } else {
        return `FY ${currentYear - 1}-${currentYear.toString().slice(-2)}`;
    }
};


export default function ReportsPage() {
  const allFinancialYears = useMemo(() => getFinancialYears(allReportsData), []);
  const allReportTypes = useMemo(() => getReportTypes(allReportsData), []);
  
  const [filteredReports, setFilteredReports] = useState<MonthlyReport[]>(allReportsData);
  
  // Filter States
  const [selectedYear, setSelectedYear] = useState<string>(getCurrentFinancialYear());
  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);
  const [selectedReportTypes, setSelectedReportTypes] = useState<string[]>([]);

  useEffect(() => {
    let reports = allReportsData;

    // 1. Filter by Financial Year
    reports = reports.filter(report => report.financialYear === selectedYear);

    // 2. Filter by Month(s)
    if (selectedMonths.length > 0) {
      reports = reports.filter(report => selectedMonths.includes(report.month));
    }

    // 3. Filter by Report Type(s)
    if (selectedReportTypes.length > 0) {
      reports = reports.filter(report => selectedReportTypes.includes(report.name));
    }

    setFilteredReports(reports);
  }, [selectedYear, selectedMonths, selectedReportTypes]);

  const handleMonthToggle = (month: string) => {
    setSelectedMonths(prev =>
      prev.includes(month)
        ? prev.filter(m => m !== month)
        : [...prev, month]
    );
  };
  
  const handleReportTypeToggle = (type: string) => {
    setSelectedReportTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

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
          <CardTitle>Filter Reports</CardTitle>
          <CardDescription>
            Select a financial year, month(s), and report type to refine your results.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            {/* Financial Year Filter */}
            <div className="grid gap-2 w-full md:w-48">
              <Label htmlFor="year">Financial Year</Label>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger id="year">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  {allFinancialYears.map(year => (
                    <SelectItem key={year} value={year}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Month Filter */}
            <div className="grid gap-2 w-full md:w-56">
                <Label>Month(s)</Label>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                         <Button variant="outline" className="w-full justify-between">
                            <span>{selectedMonths.length > 0 ? `${selectedMonths.length} selected` : "All Months"}</span>
                            <ChevronsUpDown className="h-4 w-4 opacity-50" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Select Months</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {financialYearMonths.map(month => (
                            <DropdownMenuCheckboxItem
                                key={month}
                                checked={selectedMonths.includes(month)}
                                onSelect={(e) => e.preventDefault()}
                                onCheckedChange={() => handleMonthToggle(month)}
                            >
                                {month}
                            </DropdownMenuCheckboxItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Report Type Filter */}
            <div className="grid gap-2 w-full md:w-64">
                <Label>Report Type</Label>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                         <Button variant="outline" className="w-full justify-between text-left">
                            <span className="truncate">{selectedReportTypes.length > 0 ? `${selectedReportTypes.length} selected` : "All Report Types"}</span>
                            <ChevronsUpDown className="h-4 w-4 opacity-50 shrink-0" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-64">
                        <DropdownMenuLabel>Select Report Types</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {allReportTypes.map(type => (
                            <DropdownMenuCheckboxItem
                                key={type}
                                checked={selectedReportTypes.includes(type)}
                                onSelect={(e) => e.preventDefault()}
                                onCheckedChange={() => handleReportTypeToggle(type)}
                            >
                                {type}
                            </DropdownMenuCheckboxItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>


      <Card>
        <CardHeader>
          <CardTitle>Available Reports</CardTitle>
          <CardDescription>
            Showing {filteredReports.length} report(s) based on your filters.
          </CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
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
              {filteredReports.length > 0 ? (
                filteredReports.map((report) => (
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
                        <span>-</span>
                    </TableCell>
                    <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Download</span>
                        </Button>
                    </TableCell>
                    </TableRow>
                ))
              ) : (
                <TableRow>
                    <TableCell colSpan={5} className="text-center h-24">
                        No reports found for the selected filters.
                    </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
