
"use client";

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
import { Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DateRangePicker } from "@/components/ui/date-range-picker";

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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-headline text-3xl font-bold">Account Balance</h1>
        <p className="text-muted-foreground">
          View your credit summary and transaction history.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
         <Card>
          <CardHeader className="pb-2">
            <CardDescription>Account Name</CardDescription>
            <CardTitle className="text-2xl truncate">{financialSummary.storeName}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Credit Limit</CardDescription>
            <CardTitle className="text-2xl">₹{financialSummary.creditLimit.toLocaleString('en-IN')}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Available Credit</CardDescription>
            <CardTitle className="text-2xl">₹{availableCredit.toLocaleString('en-IN')}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Current Outstanding</CardDescription>
            <CardTitle className="text-2xl text-destructive">₹{financialSummary.outstanding.toLocaleString('en-IN')}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="lg:col-span-1 xl:col-auto">
          <CardHeader className="pb-2">
            <CardDescription>Credit Period</CardDescription>
            <CardTitle className="text-2xl">{financialSummary.creditPeriod} Days</CardTitle>
          </CardHeader>
        </Card>
      </div>

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
