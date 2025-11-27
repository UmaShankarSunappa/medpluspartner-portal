
"use client";

import React from "react";
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
import { financialSummary, transactions, emergencyBalance, emergencyTransactions } from "@/lib/data";
import { Download, Landmark, Wallet, CalendarDays, TrendingUp, TrendingDown, IndianRupee } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function FinancialsPage() {

    const availableCredit = financialSummary.creditLimit - financialSummary.outstanding;
    const emergencyAvailable = emergencyBalance.depositLimit - emergencyBalance.advanceAmount;

    const handleExport = () => {
        const headers = ["Date & Time", "Bill ID", "Bill Type", "Description", "Billing Place", "Dr/Cr", "Amount"];
        const csvRows = [
            headers.join(','),
            ...transactions.map(tx => 
                [
                    `"${tx.dateTime}"`,
                    `"${tx.billId}"`,
                    `"${tx.billType}"`,
                    `"${tx.description}"`,
                    `"${tx.billingPlace}"`,
                    `"${tx.transactionType}"`,
                    tx.amount
                ].join(',')
            )
        ];
        
        const csvContent = csvRows.join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'transaction-statement.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    
    const summaryItems = [
        { icon: Landmark, label: "Account Name", value: financialSummary.storeName, color: "" },
        { icon: Wallet, label: "Credit Limit", value: `₹${financialSummary.creditLimit.toLocaleString('en-IN')}`, color: "" },
        { icon: TrendingUp, label: "Available Credit", value: `₹${availableCredit.toLocaleString('en-IN')}`, color: "text-green-600" },
        { icon: TrendingDown, label: "Current Outstanding", value: `₹${financialSummary.outstanding.toLocaleString('en-IN')}`, color: "text-red-600" },
        { icon: CalendarDays, label: "Credit Period", value: `${financialSummary.creditPeriod} Days`, color: "" },
    ];
    
    const emergencySummaryItems = [
        { icon: Landmark, label: "Account Name", value: emergencyBalance.storeName, color: "" },
        { icon: IndianRupee, label: "Deposit Limit", value: `₹${emergencyBalance.depositLimit.toLocaleString('en-IN')}`, color: "" },
        { icon: TrendingUp, label: "Available Balance", value: `₹${emergencyAvailable.toLocaleString('en-IN')}`, color: "text-green-600" },
        { icon: TrendingDown, label: "Advance Amount", value: `₹${emergencyBalance.advanceAmount.toLocaleString('en-IN')}`, color: "text-red-600" },
    ];


  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-headline text-3xl font-bold">Financials</h1>
        <p className="text-muted-foreground">
          View your credit summary and transaction history.
        </p>
      </div>
      
      <Tabs defaultValue="account-balance">
        <TabsList className="grid w-full grid-cols-2 max-w-sm">
          <TabsTrigger value="account-balance">Store level Balance</TabsTrigger>
          <TabsTrigger value="emergency-balance">Account level Balance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="account-balance" className="space-y-6">
            <Card className="shadow-md mt-4">
                <CardContent className="p-4">
                    <div className="flex flex-col lg:flex-row lg:flex-nowrap items-center justify-between gap-y-4">
                        {summaryItems.map((item, index) => (
                            <React.Fragment key={item.label}>
                                <div className="flex items-center gap-3 w-full lg:w-auto">
                                    <div className="flex-shrink-0">
                                        <item.icon className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">{item.label}</p>
                                        <p className={`text-base font-bold truncate ${item.color}`}>
                                            {item.value}
                                        </p>
                                    </div>
                                </div>
                                {index < summaryItems.length - 1 && (
                                    <Separator orientation="vertical" className="h-8 mx-4 hidden lg:block" />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <CardTitle>Transaction Statement</CardTitle>
                    <CardDescription>
                    Showing transactions for the last 90 days.
                    </CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                    <DateRangePicker />
                    <Button onClick={handleExport}>
                    <Download className="mr-2 h-4 w-4" />
                    Export
                    </Button>
                </div>
                </CardHeader>
                <CardContent className="overflow-x-auto">
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Bill ID</TableHead>
                        <TableHead>Bill Type</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Billing Place</TableHead>
                        <TableHead>Dr/Cr</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {transactions.map((tx) => (
                        <TableRow key={tx.billId}>
                        <TableCell>{tx.dateTime}</TableCell>
                        <TableCell className="font-medium">{tx.billId}</TableCell>
                        <TableCell>
                            <Badge variant="outline">{tx.billType}</Badge>
                        </TableCell>
                        <TableCell>{tx.description}</TableCell>
                        <TableCell>{tx.billingPlace}</TableCell>
                        <TableCell>
                            <span className={tx.transactionType === 'Cr' ? 'text-green-600' : 'text-red-600'}>
                                {tx.transactionType}
                            </span>
                        </TableCell>
                        <TableCell className="text-right">₹{tx.amount.toLocaleString('en-IN')}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </CardContent>
            </Card>
        </TabsContent>
        
        <TabsContent value="emergency-balance" className="space-y-6">
            <Card className="shadow-md mt-4">
                <CardContent className="p-4">
                    <div className="flex flex-col lg:flex-row lg:flex-nowrap items-center justify-between gap-y-4">
                        {emergencySummaryItems.map((item, index) => (
                            <React.Fragment key={item.label}>
                                <div className="flex items-center gap-3 w-full lg:w-auto">
                                    <div className="flex-shrink-0">
                                        <item.icon className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">{item.label}</p>
                                        <p className={`text-base font-bold truncate ${item.color}`}>
                                            {item.value}
                                        </p>
                                    </div>
                                </div>
                                {index < emergencySummaryItems.length - 1 && (
                                    <Separator orientation="vertical" className="h-8 mx-4 hidden lg:block" />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <CardTitle>Emergency Transaction History</CardTitle>
                    <CardDescription>
                    Statement for Sale Orders and Web Orders.
                    </CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                    <DateRangePicker />
                </div>
                </CardHeader>
                <CardContent className="overflow-x-auto">
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Bill ID</TableHead>
                        <TableHead>Bill Type</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Dr/Cr</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {emergencyTransactions.map((tx) => (
                        <TableRow key={tx.billId}>
                        <TableCell>{tx.dateTime}</TableCell>
                        <TableCell className="font-medium">{tx.billId}</TableCell>
                        <TableCell>
                            <Badge variant={tx.billType === 'Web Order' ? 'info' : 'secondary'}>{tx.billType}</Badge>
                        </TableCell>
                        <TableCell>{tx.description}</TableCell>
                        <TableCell>
                            <span className={tx.transactionType === 'Cr' ? 'text-green-600' : 'text-red-600'}>
                                {tx.transactionType}
                            </span>
                        </TableCell>
                        <TableCell className="text-right">₹{tx.amount.toLocaleString('en-IN')}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
