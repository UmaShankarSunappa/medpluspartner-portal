
"use client";

import { useState } from "react";
import { Download, Pen, Eye } from "lucide-react";
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
import { invoicesData, type MembershipInvoice } from "@/lib/data";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

const statusVariant: { [key: string]: "default" | "secondary" | "destructive" | "outline" | "success" | "warning" | "info" } = {
    "Pending Signature": "warning",
    "Generated": "info",
    "Paid": "success",
    "Rejected": "destructive",
};

export default function InvoicesPage() {
    const { toast } = useToast();
    const [invoices, setInvoices] = useState<MembershipInvoice[]>(invoicesData.membership);
    const [selectedInvoice, setSelectedInvoice] = useState<MembershipInvoice | null>(null);
    const [isSignModalOpen, setIsSignModalOpen] = useState(false);
    const [isReasonModalOpen, setIsReasonModalOpen] = useState(false);
    const [signatureFile, setSignatureFile] = useState<File | null>(null);

    const handleSignClick = (invoice: MembershipInvoice) => {
        setSelectedInvoice(invoice);
        setIsSignModalOpen(true);
    };
    
    const handleViewReasonClick = (invoice: MembershipInvoice) => {
        setSelectedInvoice(invoice);
        setIsReasonModalOpen(true);
    };

    const handleSignatureSubmit = () => {
        if (!selectedInvoice) return;
        if (!signatureFile) {
            toast({
                variant: "destructive",
                title: "Signature Required",
                description: "Please upload your digital signature to proceed.",
            });
            return;
        }

        setInvoices(prev => 
            prev.map(inv => 
                inv.invoiceId === selectedInvoice.invoiceId ? { ...inv, status: "Generated" } : inv
            )
        );

        toast({
            title: "Invoice Signed",
            description: `Invoice ${selectedInvoice.invoiceId} has been successfully signed and submitted.`,
        });

        setIsSignModalOpen(false);
        setSignatureFile(null);
    };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-headline text-3xl font-bold">Membership Fee Invoices</h1>
        <p className="text-muted-foreground">
          Manage your membership fee invoices.
        </p>
      </div>
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Membership Agent Fee Invoices (To Franchisor)</CardTitle>
            <CardDescription>
              Review and accept your commission invoices.
            </CardDescription>
          </div>
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
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.invoiceId}>
                  <TableCell className="font-medium">{invoice.invoiceId}</TableCell>
                  <TableCell>{invoice.period}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[invoice.status]}>
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">₹{invoice.amount.toLocaleString('en-IN')}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center gap-2">
                        {(invoice.status === 'Pending Signature' || invoice.status === 'Rejected') && (
                             <Button variant="outline" size="icon" onClick={() => handleSignClick(invoice)}>
                                <Pen className="h-4 w-4" />
                                <span className="sr-only">Sign Invoice</span>
                            </Button>
                        )}
                         {invoice.status === 'Rejected' && (
                             <Button variant="destructive" size="icon" onClick={() => handleViewReasonClick(invoice)}>
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">View Reason</span>
                            </Button>
                        )}
                        <Button variant="outline" size="icon">
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Download</span>
                        </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Sign Invoice Modal */}
       <Dialog open={isSignModalOpen} onOpenChange={setIsSignModalOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center">TAX INVOICE PREVIEW</DialogTitle>
              <DialogDescription className="text-center">Review the invoice details before signing and submitting.</DialogDescription>
            </DialogHeader>
            <ScrollArea className="max-h-[60vh] p-2">
              <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold">Medinova Healthcare Solutions</h3>
                    <p className="text-sm text-muted-foreground">Vasavi Nagar, Alwal, Secunderabad, Telangana, 500010</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">Invoice #: <span className="font-normal">{selectedInvoice?.invoiceId}</span></p>
                    <p className="font-semibold">Date: <span className="font-normal">{selectedInvoice?.date}</span></p>
                  </div>
                </div>
                <Separator />
                 <div className="grid grid-cols-2 gap-8">
                    <div>
                        <h4 className="font-semibold mb-2">FROM</h4>
                        <p className="font-bold">Medinova Healthcare Solutions</p>
                        <p className="text-sm text-muted-foreground">Vasavi Nagar, Alwal</p>
                        <p className="text-sm text-muted-foreground">Secunderabad, Telangana, 500010</p>
                        <p className="text-sm text-muted-foreground">PAN: ABCDE1234F</p>
                        <p className="text-sm text-muted-foreground">GSTIN: 29ABCDE1234F1Z5</p>
                    </div>
                     <div className="text-right">
                        <h4 className="font-semibold mb-2">TO</h4>
                        <p className="font-bold">Optival Health Solutions Private Limited</p>
                        <p className="text-sm text-muted-foreground">#101, 1st Floor, SDE Serene, Gachibowli</p>
                        <p className="text-sm text-muted-foreground">Hyderabad, Telangana, 500032</p>
                         <p className="text-sm text-muted-foreground">PAN: FGHJI5678K</p>
                        <p className="text-sm text-muted-foreground">GSTIN: 36FGHJI5678K1Z9</p>
                    </div>
                 </div>
                <Separator />
                 <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Particulars</TableHead>
                            <TableHead>HSN/SAC</TableHead>
                            <TableHead className="text-right">Taxable Amt</TableHead>
                             <TableHead className="text-right">CGST (9%)</TableHead>
                            <TableHead className="text-right">SGST (9%)</TableHead>
                            <TableHead className="text-right">Invoice Value</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>Membership Fee - {selectedInvoice?.period}</TableCell>
                            <TableCell>999799</TableCell>
                            <TableCell className="text-right">₹{((selectedInvoice?.amount || 0) / 1.18).toFixed(2)}</TableCell>
                            <TableCell className="text-right">₹{(((selectedInvoice?.amount || 0) / 1.18) * 0.09).toFixed(2)}</TableCell>
                            <TableCell className="text-right">₹{(((selectedInvoice?.amount || 0) / 1.18) * 0.09).toFixed(2)}</TableCell>
                            <TableCell className="text-right">₹{selectedInvoice?.amount.toFixed(2)}</TableCell>
                        </TableRow>
                    </TableBody>
                 </Table>
                  <div className="text-right font-bold text-lg pr-4">Total: ₹{selectedInvoice?.amount.toFixed(2)}</div>
              </div>
            </ScrollArea>
            <DialogFooter className="pt-4 flex-col sm:flex-row gap-4 items-center">
               <div className="flex-1 space-y-2">
                <Label htmlFor="signature">Upload Digital Signature</Label>
                <Input id="signature" type="file" accept="image/*" onChange={(e) => setSignatureFile(e.target.files ? e.target.files[0] : null)} />
               </div>
               <div className="flex gap-2">
                <Button variant="outline" onClick={() => setIsSignModalOpen(false)}>Cancel</Button>
                <Button onClick={handleSignatureSubmit}>Submit</Button>
               </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* View Reason Modal */}
        <Dialog open={isReasonModalOpen} onOpenChange={setIsReasonModalOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Reason for Rejection</DialogTitle>
                    <DialogDescription>
                        Invoice {selectedInvoice?.invoiceId} was rejected by the accounts team.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <p className="font-semibold">Rejection Reason:</p>
                    <p className="text-muted-foreground p-3 bg-muted rounded-md mt-2">{selectedInvoice?.rejectionReason || "No reason provided."}</p>
                </div>
                 <DialogFooter>
                    <Button onClick={() => setIsReasonModalOpen(false)}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
  );
}


    