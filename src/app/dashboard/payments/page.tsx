
"use client";

import { useState, useMemo, useEffect } from "react";
import { PlusCircle, Search, Download, Landmark, CreditCard, Signal, IndianRupee, BotMessageSquare } from "lucide-react";
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
import { paymentsData, accountProfile, stores as mockStores } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

const statusVariant: { [key: string]: "default" | "secondary" } = {
    "Approved": "default",
    "Pending": "secondary",
};

type StoreAllocation = { [storeId: string]: { ratio: number; amount: number } };
type ApplicationRatio = { [key: string]: number };

export default function PaymentsPage() {
    const [isCreatePaymentOpen, setIsCreatePaymentOpen] = useState(false);
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
    const [storeAllocations, setStoreAllocations] = useState<StoreAllocation>(
      mockStores.reduce((acc, store) => ({ ...acc, [store.id]: { ratio: 1, amount: 0 } }), {})
    );
    const [applicationRatios, setApplicationRatios] = useState<ApplicationRatio>({
        'minMax': 1,
        'sale': 1,
        'web': 1,
    });

    useEffect(() => {
        const totalRatio = Object.values(storeAllocations).reduce((sum, { ratio }) => sum + ratio, 0);
        if (totalRatio === 0) return;

        const newAllocations: StoreAllocation = {};
        let allocatedSum = 0;
        const storeIds = Object.keys(storeAllocations);

        storeIds.forEach((storeId, index) => {
            if (index === storeIds.length - 1) {
                 newAllocations[storeId] = {
                    ...storeAllocations[storeId],
                    amount: totalAmount - allocatedSum,
                };
            } else {
                const allocatedAmount = (storeAllocations[storeId].ratio / totalRatio) * totalAmount;
                newAllocations[storeId] = {
                    ...storeAllocations[storeId],
                    amount: allocatedAmount
                };
                allocatedSum += allocatedAmount;
            }
        });
        setStoreAllocations(newAllocations);
    }, [totalAmount]);

    const handleStoreRatioChange = (storeId: string, newRatio: number) => {
        const updatedAllocations = {
            ...storeAllocations,
            [storeId]: { ...storeAllocations[storeId], ratio: newRatio },
        };
        
        const totalRatio = Object.values(updatedAllocations).reduce((sum, { ratio }) => sum + ratio, 0);
        if (totalRatio > 0) {
             let allocatedSum = 0;
             const storeIds = Object.keys(updatedAllocations);
             storeIds.forEach((id, index) => {
                 const store = updatedAllocations[id];
                 if (index === storeIds.length - 1) {
                     store.amount = totalAmount - allocatedSum;
                 } else {
                    store.amount = (store.ratio / totalRatio) * totalAmount;
                    allocatedSum += store.amount;
                 }
             });
        }

        setStoreAllocations(updatedAllocations);
    };

    const isProceedDisabled = totalAmount <= 0 || !selectedPaymentMethod;

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
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Create New Payment</DialogTitle>
                    <DialogDescription>
                        A guided process to submit and allocate your payments.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-6 py-4 max-h-[80vh] overflow-y-auto pr-4">
                    {/* Step 1: Payment Details */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg flex items-center gap-2"><span className="flex items-center justify-center h-6 w-6 rounded-full bg-primary text-primary-foreground text-sm">1</span>Payment Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-lg border p-4">
                            <div><Label>Customer ID:</Label><p className="text-sm font-medium">{accountProfile.licenseDetails.storeId}</p></div>
                            <div><Label>Customer Name:</Label><p className="text-sm font-medium">{accountProfile.personalDetails.businessName}</p></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="amount">Total Amount (INR)</Label>
                                <Input id="amount" type="number" placeholder="e.g., 60000" onChange={(e) => setTotalAmount(parseFloat(e.target.value) || 0)} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="remarks">Remarks</Label>
                            <Textarea id="remarks" placeholder="Add any relevant notes here..."/>
                        </div>
                    </div>
                    <Separator />
                    {/* Step 2: Payment Allocation */}
                     <div className="space-y-4">
                        <h3 className="font-semibold text-lg flex items-center gap-2"><span className="flex items-center justify-center h-6 w-6 rounded-full bg-primary text-primary-foreground text-sm">2</span>Payment Allocation</h3>
                        {/* Part A: Store Ratio */}
                        <div className="space-y-3">
                            <h4 className="font-medium">Store Ratio Configuration</h4>
                            <div className="space-y-2 rounded-lg border p-4">
                                {mockStores.map(store => (
                                    <div key={store.id} className="flex items-center justify-between gap-4">
                                        <Label htmlFor={`ratio-${store.id}`} className="flex-1">{store.name}</Label>
                                        <Input
                                            id={`ratio-${store.id}`}
                                            type="number"
                                            min="0"
                                            placeholder="Ratio"
                                            className="w-24 text-center"
                                            value={storeAllocations[store.id]?.ratio || ''}
                                            onChange={(e) => handleStoreRatioChange(store.id, parseFloat(e.target.value) || 0)}
                                        />
                                        <div className="w-32 text-right font-semibold">
                                            ₹ {storeAllocations[store.id]?.amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                         {/* Part B: Application Ratio */}
                         <div className="space-y-3">
                             <h4 className="font-medium">Application Ratio Configuration</h4>
                             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 rounded-lg border p-4">
                                 {Object.keys(applicationRatios).map(key => (
                                     <div key={key} className="space-y-2">
                                         <Label htmlFor={`app-ratio-${key}`} className="capitalize">{key.replace(/([A-Z])/g, ' $1')} Orders</Label>
                                         <Input
                                            id={`app-ratio-${key}`}
                                            type="number"
                                            min="0"
                                            placeholder="Ratio"
                                            value={applicationRatios[key]}
                                            onChange={(e) => setApplicationRatios(prev => ({...prev, [key]: parseFloat(e.target.value) || 0}))}
                                         />
                                     </div>
                                 ))}
                             </div>
                         </div>
                    </div>
                     <Separator />
                    {/* Step 3: Payment Method */}
                     <div className="space-y-4">
                         <h3 className="font-semibold text-lg flex items-center gap-2"><span className="flex items-center justify-center h-6 w-6 rounded-full bg-primary text-primary-foreground text-sm">3</span>Select Payment Method</h3>
                         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                             {['UPI', 'Credit Card', 'Debit Card', 'Net Banking'].map(method => (
                                <Button key={method} variant={selectedPaymentMethod === method ? "default" : "outline"} className="h-20 flex-col gap-2" onClick={() => setSelectedPaymentMethod(method)}>
                                    {method === 'UPI' && <Signal />}
                                    {method === 'Credit Card' && <CreditCard />}
                                    {method === 'Debit Card' && <Landmark />}
                                    {method === 'Net Banking' && <BotMessageSquare />}
                                    {method}
                                </Button>
                             ))}
                         </div>
                         {selectedPaymentMethod === 'UPI' && (
                             <div className="p-4 bg-muted/50 rounded-lg">
                                 <h4 className="font-medium mb-4 text-center">Pay with UPI App</h4>
                                  <div className="flex justify-center gap-4">
                                    <Button variant="outline" size="icon" className="h-16 w-16 rounded-full"><IndianRupee className="h-8 w-8" /></Button>
                                    <Button variant="outline" size="icon" className="h-16 w-16 rounded-full"><CreditCard className="h-8 w-8" /></Button>
                                    <Button variant="outline" size="icon" className="h-16 w-16 rounded-full"><Landmark className="h-8 w-8" /></Button>
                                </div>
                             </div>
                         )}
                    </div>

                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsCreatePaymentOpen(false)}>Cancel</Button>
                    <Button disabled={isProceedDisabled} onClick={() => setIsCreatePaymentOpen(false)}>
                        Proceed to Pay (₹{totalAmount.toLocaleString('en-IN')})
                    </Button>
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
