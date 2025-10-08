
"use client";

import { useState, useMemo } from "react";
import { Download, Search, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { invoices as invoicesData } from "@/lib/data";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Label } from "@/components/ui/label";
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

export default function InvoicesPage() {
  const [isGenerateInvoiceOpen, setIsGenerateInvoiceOpen] = useState(false);
  const [membershipsSold, setMembershipsSold] = useState(0);

  const commissionPerMembership = 15;
  const totalCommission = useMemo(() => {
    return membershipsSold * commissionPerMembership;
  }, [membershipsSold]);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => (currentYear - i).toString());
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-headline text-3xl font-bold">Invoices</h1>
        <p className="text-muted-foreground">
          Manage your order and membership fee invoices.
        </p>
      </div>

      <Tabs defaultValue="order" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-sm">
          <TabsTrigger value="order">Order Invoices</TabsTrigger>
          <TabsTrigger value="membership">Membership Fee Invoices</TabsTrigger>
        </TabsList>
        <TabsContent value="order">
          <Card>
            <CardHeader>
              <CardTitle>Order Invoices (From Warehouse)</CardTitle>
              <CardDescription>
                Search and download invoices for your orders.
              </CardDescription>
              <div className="flex flex-col md:flex-row gap-4 items-end pt-4">
                  <div className="grid gap-2 w-full md:w-auto">
                      <Label htmlFor="date-range">Date Range</Label>
                      <DateRangePicker />
                  </div>
                  <div className="grid gap-2 w-full md:w-auto">
                      <Label htmlFor="search-invoice-id">Invoice ID</Label>
                      <div className="relative">
                          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="Search..." id="search-invoice-id" className="pl-8" />
                      </div>
                  </div>
                   <div className="grid gap-2 w-full md:w-auto">
                      <Label htmlFor="search-order-id">Order ID</Label>
                      <div className="relative">
                          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="Search..." id="search-order-id" className="pl-8" />
                      </div>
                  </div>
                  <Button>Search</Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoicesData.order.map((invoice) => (
                    <TableRow key={invoice.invoiceId}>
                      <TableCell className="font-medium">{invoice.invoiceId}</TableCell>
                      <TableCell>{invoice.orderId}</TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell className="text-right">₹{invoice.amount.toLocaleString('en-IN')}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="icon">
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
        </TabsContent>
        <TabsContent value="membership">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Membership Agent Fee Invoices (To Franchisor)</CardTitle>
                <CardDescription>
                  Review and accept your commission invoices, or generate one manually.
                </CardDescription>
              </div>
               <Dialog open={isGenerateInvoiceOpen} onOpenChange={setIsGenerateInvoiceOpen}>
                <DialogTrigger asChild>
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Generate Invoice
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                    <DialogTitle>Generate Manual Invoice</DialogTitle>
                    <DialogDescription>
                        Generate a commission invoice for memberships sold in a specific month.
                    </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                             <div className="space-y-2">
                                <Label htmlFor="year">Year</Label>
                                <Select>
                                    <SelectTrigger id="year">
                                        <SelectValue placeholder="Select year" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {years.map(year => <SelectItem key={year} value={year}>{year}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="month">Month</Label>
                                <Select>
                                    <SelectTrigger id="month">
                                        <SelectValue placeholder="Select month" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {months.map(month => <SelectItem key={month} value={month}>{month}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="memberships-sold">Number of Memberships Sold</Label>
                            <Input
                            id="memberships-sold"
                            type="number"
                            placeholder="e.g., 100"
                            value={membershipsSold}
                            onChange={(e) => setMembershipsSold(Number(e.target.value))}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="total-commission">Total Commission (₹{commissionPerMembership}/membership)</Label>
                            <Input
                            id="total-commission"
                            readOnly
                            value={`₹${totalCommission.toLocaleString('en-IN')}`}
                            className="font-bold"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                    <Button variant="outline" onClick={() => setIsGenerateInvoiceOpen(false)}>Cancel</Button>
                    <Button type="submit" onClick={() => setIsGenerateInvoiceOpen(false)}>Generate Invoice</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoicesData.membership.map((invoice) => (
                    <TableRow key={invoice.invoiceId}>
                      <TableCell className="font-medium">{invoice.invoiceId}</TableCell>
                      <TableCell>{invoice.period}</TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>
                        <Badge variant={invoice.status === 'Paid' ? 'default' : 'secondary'}>{invoice.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">₹{invoice.amount.toLocaleString('en-IN')}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="icon">
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
