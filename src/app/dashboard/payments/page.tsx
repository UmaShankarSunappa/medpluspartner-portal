
"use client";

import { useState } from "react";
import { PlusCircle, Search, Download } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { paymentsData, accountProfile } from "@/lib/data";

const statusVariant: { [key: string]: "default" | "secondary" } = {
    "Approved": "default",
    "Pending": "secondary",
};

export default function PaymentsPage() {
    const [isCreatePaymentOpen, setIsCreatePaymentOpen] = useState(false);

    const handleExport = () => {
        const headers = ["Payment ID", "Name", "Created Date", "Approved Date", "Status", "Amount", "Mode of Payment"];
        const csvRows = [
            headers.join(','),
            ...paymentsData.map(p => 
                [
                    `"${p.paymentId}"`,
                    `"${p.name}"`,
                    `"${p.createdDate}"`,
                    `"${p.approvedDate || 'N/A'}"`,
                    `"${p.status}"`,
                    p.amount,
                    `"${p.mode}"`
                ].join(',')
            )
        ];
        
        const csvContent = csvRows.join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'payment-history.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };


  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="font-headline text-3xl font-bold">Payments</h1>
          <p className="text-muted-foreground">
            View payment history and submit new payments.
          </p>
        </div>
        <Dialog open={isCreatePaymentOpen} onOpenChange={setIsCreatePaymentOpen}>
            <DialogTrigger asChild>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create Payment
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                <DialogTitle>Create New Payment</DialogTitle>
                <DialogDescription>
                    Fill out the form to submit a new payment.
                </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                             <Label htmlFor="paymentType">Payment Type</Label>
                            <Select>
                                <SelectTrigger id="paymentType">
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="advance">Advance Payment</SelectItem>
                                    <SelectItem value="due">Due Payment</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                             <Label htmlFor="paymentName">Payment Name</Label>
                            <Input id="paymentName" placeholder="e.g. Monthly Dues"/>
                        </div>
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="customerId">Customer ID</Label>
                            <Input id="customerId" defaultValue={accountProfile.licenseDetails.storeId} readOnly />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="customerName">Customer Name</Label>
                            <Input id="customerName" defaultValue={accountProfile.personalDetails.businessName} readOnly />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="amount">Total Amount</Label>
                        <Input id="amount" type="number" placeholder="Enter amount in INR" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="remarks">Remarks</Label>
                        <Textarea id="remarks" placeholder="Add any relevant notes here..."/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="paymentMode">Payment Mode</Label>
                        <Select>
                            <SelectTrigger id="paymentMode">
                                <SelectValue placeholder="Select payment mode" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="neft">NEFT</SelectItem>
                                <SelectItem value="rtgs">RTGS</SelectItem>
                                <SelectItem value="upi">UPI</SelectItem>
                                <SelectItem value="cheque">Cheque</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsCreatePaymentOpen(false)}>Cancel</Button>
                    <Button type="submit" onClick={() => setIsCreatePaymentOpen(false)}>Submit Payment</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
      </div>

       <Card>
            <CardHeader>
                <CardTitle>Search Payments</CardTitle>
                <CardDescription>Filter payments by date range.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col md:flex-row gap-4 items-end">
                    <div className="grid gap-2 w-full md:w-auto">
                        <Label htmlFor="date-range">Date Range</Label>
                        <DateRangePicker />
                    </div>
                    <Button><Search className="mr-2 h-4 w-4" />Search</Button>
                </div>
            </CardContent>
        </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>Last 30 days of payments</CardDescription>
          </div>
          <Button variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Payment ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Created Date</TableHead>
                <TableHead>Approved Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Mode of Payment</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paymentsData.map((payment) => (
                <TableRow key={payment.paymentId}>
                  <TableCell className="font-medium">{payment.paymentId}</TableCell>
                  <TableCell>{payment.name}</TableCell>
                  <TableCell>{payment.createdDate}</TableCell>
                  <TableCell>{payment.approvedDate || '–'}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[payment.status] || 'secondary'}>
                      {payment.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">₹{payment.amount.toLocaleString('en-IN')}</TableCell>
                  <TableCell>{payment.mode}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
