
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
import { Download, Calendar as CalendarIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function FinancialsPage() {

    const availableCredit = financialSummary.creditLimit - financialSummary.outstanding;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-headline text-3xl font-bold">Account Balance</h1>
        <p className="text-muted-foreground">
          View your credit summary and transaction history.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
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
            <CardDescription>Available Credit Limit</CardDescription>
            <CardTitle className="text-2xl">₹{availableCredit.toLocaleString('en-IN')}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Current Outstanding</CardDescription>
            <CardTitle className="text-2xl text-destructive">₹{financialSummary.outstanding.toLocaleString('en-IN')}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Credit Period</CardDescription>
            <CardTitle className="text-2xl">{financialSummary.creditPeriod} Days</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Transaction Statement</CardTitle>
            <CardDescription>
              Showing transactions for the last 90 days.
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
                <CalendarIcon className="mr-2 h-4 w-4" />
                Select Date Range
            </Button>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
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
