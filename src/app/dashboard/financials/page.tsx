
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
import { financialSummary, transactions } from "@/lib/data";
import { Download, Landmark, Wallet, CalendarDays, TrendingUp, TrendingDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Separator } from "@/components/ui/separator";

export default function FinancialsPage() {

    const availableCredit = financialSummary.creditLimit - financialSummary.outstanding;

    const handleExport = () => {
        const headers = ["Date & Time", "Bill ID", "Bill Type", "Billing Place", "Dr/Cr", "Amount"];
        const csvRows = [
            headers.join(','),
            ...transactions.map(tx => 
                [
                    `"${tx.dateTime}"`,
                    `"${tx.billId}"`,
                    `"${tx.billType}"`,
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


  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-headline text-3xl font-bold">Account Balance</h1>
        <p className="text-muted-foreground">
          View your credit summary and transaction history.
        </p>
      </div>

      <Card className="shadow-md">
        <CardContent className="p-4">
            <div className="flex flex-wrap items-center justify-between gap-y-4">
                {summaryItems.map((item, index) => (
                    <React.Fragment key={item.label}>
                        <div className="flex items-center gap-3">
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
    </div>
  );
}
