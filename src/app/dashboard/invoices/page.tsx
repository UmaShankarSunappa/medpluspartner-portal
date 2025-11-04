
"use client";

import { useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import { invoicesData } from "@/lib/data";
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
import { Separator } from "@/components/ui/separator";
import { DatePicker } from "@/components/ui/date-picker";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";

export default function InvoicesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-headline text-3xl font-bold">Membership Fee Invoices</h1>
        <p className="text-muted-foreground">
          Manage your membership fee invoices.
        </p>
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Membership Agent Fee Invoices (To Franchisor)</CardTitle>
            <CardDescription>
              Review and accept your commission invoices.
            </CardDescription>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Generate Invoice
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-center">TAX INVOICE</DialogTitle>
              </DialogHeader>
              <ScrollArea className="max-h-[75vh] p-2">
                <div className="space-y-4 p-4 border rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="storeName">Store Name</Label>
                      <Input id="storeName" placeholder="e.g., Medinova Healthcare Solutions" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="storeAddress">Address</Label>
                      <Input id="storeAddress" placeholder="Enter store address" />
                    </div>
                     <div className="space-y-2">
                      <Label htmlFor="invoiceNumber">Invoice Number</Label>
                      <Input id="invoiceNumber" placeholder="Enter invoice number" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="invoiceDate">Invoice Date</Label>
                        <DatePicker placeholder="Select invoice date" />
                    </div>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg border-b pb-1">From</h3>
                       <div className="space-y-2">
                        <Label>Name</Label>
                        <Input placeholder="e.g., Medinova Healthcare Solutions" />
                      </div>
                      <div className="space-y-2">
                        <Label>Address</Label>
                        <Input placeholder="e.g., Vasavi Nagar, Alwal" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                         <div className="space-y-2">
                          <Label>Pincode</Label>
                          <Input placeholder="e.g., 500010" />
                        </div>
                        <div className="space-y-2">
                          <Label>State</Label>
                          <Input placeholder="e.g., Telangana" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>PAN</Label>
                        <Input placeholder="Enter PAN" />
                      </div>
                      <div className="space-y-2">
                        <Label>GSTIN</Label>
                        <Input placeholder="Enter GSTIN" />
                      </div>
                    </div>
                    <div className="space-y-4">
                       <h3 className="font-semibold text-lg border-b pb-1">To</h3>
                       <div className="space-y-2">
                        <Label>Name</Label>
                        <Input placeholder="e.g., Optival Health Solutions Private Limited" />
                      </div>
                      <div className="space-y-2">
                        <Label>Address</Label>
                        <Input placeholder="Enter address" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                         <div className="space-y-2">
                          <Label>Pincode</Label>
                          <Input placeholder="Enter pincode" />
                        </div>
                        <div className="space-y-2">
                          <Label>State</Label>
                          <Input placeholder="e.g., Telangana" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>PAN</Label>
                        <Input placeholder="Enter PAN" />
                      </div>
                       <div className="space-y-2">
                        <Label>GSTIN</Label>
                        <Input placeholder="Enter GSTIN" />
                      </div>
                    </div>
                  </div>
                  <Separator />
                   <div>
                    <h3 className="font-semibold text-lg mb-2">Particulars</h3>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Sl.No.</TableHead>
                                    <TableHead>Particulars</TableHead>
                                    <TableHead>HSN/SAC</TableHead>
                                    <TableHead>Tax Rate</TableHead>
                                    <TableHead>Taxable Amount</TableHead>
                                    <TableHead>CGST</TableHead>
                                    <TableHead>SGST</TableHead>
                                    <TableHead className="text-right">Invoice Value</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell>1</TableCell>
                                    <TableCell><Input defaultValue="Membership Fee" /></TableCell>
                                    <TableCell><Input defaultValue="999799" /></TableCell>
                                    <TableCell><Input defaultValue="9%" /></TableCell>
                                    <TableCell><Input type="number" placeholder="e.g., 495" /></TableCell>
                                    <TableCell><Input type="number" placeholder="e.g., 44.55" /></TableCell>
                                    <TableCell><Input type="number" placeholder="e.g., 44.55" /></TableCell>
                                    <TableCell className="text-right"><Input type="number" placeholder="e.g., 584.10" /></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                     <div className="flex justify-end mt-4">
                        <div className="flex items-center gap-4">
                            <Label className="font-bold">Total Invoice Value</Label>
                            <Input className="w-32 text-right font-bold" type="number" placeholder="e.g., 584.10" />
                        </div>
                    </div>
                   </div>
                   <Separator />
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                      <div className="space-y-2">
                        <Label>For [Your Company Name]</Label>
                        <div className="h-24 w-full rounded-md border-dashed border-2 flex items-center justify-center">
                            <p className="text-muted-foreground text-sm">Upload Digital Signature</p>
                        </div>
                         <Input type="file" className="text-sm" />
                      </div>
                      <div className="flex flex-col justify-end items-center">
                         <div className="border-t w-full pt-2">
                            <p className="text-center text-sm font-semibold">Authorised Signatory</p>
                            <p className="text-center text-xs text-muted-foreground">Managing Partner</p>
                        </div>
                      </div>
                   </div>

                </div>
              </ScrollArea>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Generate & Download</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent className="overflow-x-auto">
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
                    <Badge variant={invoice.status === 'Paid' ? 'default' : invoice.status === 'Generated' ? 'warning' : 'secondary'}>
                      {invoice.status}
                    </Badge>
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
    </div>
  );
}
