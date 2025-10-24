
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Trash2, PlusCircle, Eye, Printer, PieChart as PieChartIcon } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

interface Expense {
  name: string;
  amount: number;
}

interface Report {
  id: string;
  month: string;
  year: number;
  totalNetMargin: number;
  expenses: Expense[];
  totalExpenses: number;
  netProfit: number;
}

const defaultExpenses: Expense[] = [
  { name: "Rent", amount: 0 },
  { name: "Power Bill", amount: 0 },
  { name: "Employee Salary", amount: 0 },
  { name: "Maintenance", amount: 0 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"];

export default function ProfitCalculatorPage() {
  const { toast } = useToast();
  const [month, setMonth] = useState<string>(
    new Date().toLocaleString("default", { month: "long" })
  );
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [totalNetMargin, setTotalNetMargin] = useState<number>(0);
  const [expenses, setExpenses] = useState<Expense[]>(defaultExpenses);
  const [savedReports, setSavedReports] = useState<Report[]>([]);
  const [viewedReport, setViewedReport] = useState<Report | null>(null);

  useEffect(() => {
    try {
      const storedReports = localStorage.getItem("franchiseeProfitReports");
      if (storedReports) {
        const parsedReports: Report[] = JSON.parse(storedReports);
        // Sort reports by date for consistent display
        const sortedReports = parsedReports.sort((a, b) => new Date(b.year, getMonthIndex(b.month)) - new Date(a.year, getMonthIndex(a.month)));
        setSavedReports(sortedReports);
      }
    } catch (error) {
      console.error("Failed to load or parse reports from localStorage:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not load saved reports from your browser's storage.",
      });
    }
  }, [toast]);

  const { totalExpenses, netProfit } = useMemo(() => {
    const totalExpenses = expenses.reduce((acc, exp) => acc + exp.amount, 0);
    const netProfit = totalNetMargin - totalExpenses;
    return { totalExpenses, netProfit };
  }, [totalNetMargin, expenses]);

  const handleExpenseChange = (index: number, value: string) => {
    const newExpenses = [...expenses];
    newExpenses[index].amount = parseFloat(value) || 0;
    setExpenses(newExpenses);
  };

  const handleAddExpense = () => {
    setExpenses([...expenses, { name: "New Expense", amount: 0 }]);
  };

  const handleRemoveExpense = (index: number) => {
    const newExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(newExpenses);
  };
    
  const handleExpenseNameChange = (index: number, newName: string) => {
    const newExpenses = [...expenses];
    newExpenses[index].name = newName;
    setExpenses(newExpenses);
  };

  const resetForm = () => {
    setMonth(new Date().toLocaleString("default", { month: "long" }));
    setYear(new Date().getFullYear());
    setTotalNetMargin(0);
    setExpenses(defaultExpenses);
  };
    
  const getMonthIndex = (monthName: string) => {
    return new Date(Date.parse(monthName +" 1, 2012")).getMonth();
  };


  const handleSaveReport = () => {
    if (totalNetMargin <= 0) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Please enter a valid Total Net Margin.",
      });
      return;
    }

    const newReport: Report = {
      id: `${month}-${year}-${Date.now()}`,
      month,
      year,
      totalNetMargin,
      expenses,
      totalExpenses,
      netProfit,
    };
    
    const updatedReports = [newReport, ...savedReports].sort((a, b) => new Date(b.year, getMonthIndex(b.month)) - new Date(a.year, getMonthIndex(a.month)));

    try {
      localStorage.setItem(
        "franchiseeProfitReports",
        JSON.stringify(updatedReports)
      );
      setSavedReports(updatedReports);
      toast({
        title: "Report Saved!",
        description: `Your profit report for ${month} ${year} has been saved.`,
      });
      resetForm();
    } catch (error) {
       console.error("Failed to save report to localStorage:", error);
       toast({
        variant: "destructive",
        title: "Save Failed",
        description: "Could not save the report to your browser's storage. It might be full.",
      });
    }
  };

  const handlePrint = () => {
      window.print();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-headline text-3xl font-bold">Profit Calculator</h1>
        <p className="text-muted-foreground">
          Calculate and track your monthly store profitability.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
            <Card>
            <CardHeader>
                <CardTitle>New Profit Report</CardTitle>
                <CardDescription>
                Enter your monthly margin and expenses to calculate profit.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="month">Month</Label>
                    <Select value={month} onValueChange={setMonth}>
                    <SelectTrigger id="month">
                        <SelectValue placeholder="Select month" />
                    </SelectTrigger>
                    <SelectContent>
                        {Array.from({ length: 12 }, (_, i) =>
                        new Date(0, i).toLocaleString("default", { month: "long" })
                        ).map((m) => (
                        <SelectItem key={m} value={m}>
                            {m}
                        </SelectItem>
                        ))}
                    </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="year">Year</Label>
                    <Input
                    id="year"
                    type="number"
                    value={year}
                    onChange={(e) => setYear(parseInt(e.target.value))}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="net-margin">Total Net Margin (₹)</Label>
                    <Input
                    id="net-margin"
                    type="number"
                    placeholder="e.g., 500000"
                    value={totalNetMargin || ""}
                    onChange={(e) => setTotalNetMargin(parseFloat(e.target.value))}
                    />
                </div>
                </div>

                <h3 className="font-medium text-lg pt-4 border-b pb-2">Expenses</h3>
                <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                {expenses.map((expense, index) => (
                    <div key={index} className="flex items-center gap-2">
                    <Input
                        value={expense.name}
                        onChange={(e) => handleExpenseNameChange(index, e.target.value)}
                        className="font-semibold"
                    />
                    <Input
                        type="number"
                        placeholder="Amount"
                        value={expense.amount || ""}
                        onChange={(e) => handleExpenseChange(index, e.target.value)}
                        className="w-40 text-right"
                    />
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveExpense(index)}
                    >
                        <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                    </div>
                ))}
                </div>
                <Button variant="outline" size="sm" onClick={handleAddExpense}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Expense
                </Button>
            </CardContent>
            </Card>
        </div>

        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Calculation Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="flex justify-between items-center text-lg">
                        <span className="text-muted-foreground">Total Net Margin</span>
                        <span className="font-bold">₹{totalNetMargin.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between items-center text-lg">
                        <span className="text-muted-foreground">Total Expenses</span>
                        <span className="font-bold text-red-600">- ₹{totalExpenses.toLocaleString("en-IN")}</span>
                    </div>
                </CardContent>
                 <CardFooter className="bg-muted/50 p-4 flex justify-between items-center rounded-b-lg">
                    <span className="text-xl font-bold">Net Profit</span>
                     <span className={`text-2xl font-extrabold ${netProfit >= 0 ? 'text-green-600' : 'text-destructive'}`}>
                        ₹{netProfit.toLocaleString("en-IN")}
                    </span>
                </CardFooter>
            </Card>
            <Button size="lg" className="w-full" onClick={handleSaveReport}>
              Calculate & Save Report
            </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Saved Reports History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Month</TableHead>
                <TableHead>Year</TableHead>
                <TableHead className="text-right">Total Net Margin</TableHead>
                <TableHead className="text-right">Total Expenses</TableHead>
                <TableHead className="text-right">Net Profit</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {savedReports.length > 0 ? (
                savedReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell>{report.month}</TableCell>
                    <TableCell>{report.year}</TableCell>
                    <TableCell className="text-right">
                      ₹{report.totalNetMargin.toLocaleString("en-IN")}
                    </TableCell>
                    <TableCell className="text-right text-red-600">
                      - ₹{report.totalExpenses.toLocaleString("en-IN")}
                    </TableCell>
                    <TableCell className={`text-right font-bold ${report.netProfit >= 0 ? 'text-green-600' : 'text-destructive'}`}>
                      ₹{report.netProfit.toLocaleString("en-IN")}
                    </TableCell>
                    <TableCell className="text-center">
                      <Button variant="ghost" size="icon" onClick={() => setViewedReport(report)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center h-24">
                    No saved reports yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
        
      {/* View/Download Modal */}
      <Dialog open={!!viewedReport} onOpenChange={(open) => !open && setViewedReport(null)}>
        <DialogContent className="sm:max-w-2xl print-container">
          {viewedReport && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">Profit Report - {viewedReport.month} {viewedReport.year}</DialogTitle>
                <DialogDescription>A detailed summary of your profit calculation.</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4 max-h-[70vh] overflow-y-auto">
                <div className="space-y-4">
                    <h3 className="font-semibold text-lg flex items-center gap-2"><PieChartIcon className="h-5 w-5" />Expense Breakdown</h3>
                    <div className="h-64">
                         <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={viewedReport.expenses.filter(e => e.amount > 0)}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="amount"
                                    nameKey="name"
                                    label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                                        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                                        const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                                        const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                                        return (
                                        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                                            {`${(percent * 100).toFixed(0)}%`}
                                        </text>
                                        );
                                    }}
                                >
                                    {viewedReport.expenses.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value: number) => `₹${value.toLocaleString('en-IN')}`} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                 <div className="space-y-4">
                     <h3 className="font-semibold text-lg">Financial Summary</h3>
                     <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium">Total Net Margin</TableCell>
                                <TableCell className="text-right">₹{viewedReport.totalNetMargin.toLocaleString('en-IN')}</TableCell>
                            </TableRow>
                             <TableRow>
                                <TableCell className="font-medium">Total Expenses</TableCell>
                                <TableCell className="text-right text-red-600">- ₹{viewedReport.totalExpenses.toLocaleString('en-IN')}</TableCell>
                            </TableRow>
                             <TableRow className="bg-muted/50">
                                <TableCell className="font-bold text-lg">Net Profit</TableCell>
                                <TableCell className={`text-right font-bold text-lg ${viewedReport.netProfit >= 0 ? 'text-green-600' : 'text-destructive'}`}>₹{viewedReport.netProfit.toLocaleString('en-IN')}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <h3 className="font-semibold text-lg pt-2">Itemized Expenses</h3>
                     <Table>
                         <TableHeader>
                             <TableRow>
                                 <TableHead>Expense</TableHead>
                                 <TableHead className="text-right">Amount</TableHead>
                             </TableRow>
                         </TableHeader>
                         <TableBody>
                             {viewedReport.expenses.map((exp, i) => (
                                 <TableRow key={i}>
                                     <TableCell>{exp.name}</TableCell>
                                     <TableCell className="text-right">₹{exp.amount.toLocaleString('en-IN')}</TableCell>
                                 </TableRow>
                             ))}
                         </TableBody>
                     </Table>
                </div>
              </div>
              <DialogFooter className="print-hide">
                <Button variant="outline" onClick={() => setViewedReport(null)}>
                  Close
                </Button>
                <Button onClick={handlePrint}>
                  <Printer className="mr-2 h-4 w-4" />
                  Print Report
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-container, .print-container * {
            visibility: visible;
          }
          .print-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .print-hide {
            display: none;
          }
        }
      `}</style>

    </div>
  );
}
