
"use client";

import { useState, useMemo, useEffect } from "react";
import { PlusCircle, Search, Download, Landmark, CreditCard, Signal, IndianRupee, BotMessageSquare, Eye } from "lucide-react";
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

const statusVariant: { [key: string]: "success" | "destructive" | "secondary" } = {
    "Successful": "success",
    "Failed": "destructive",
    "Pending": "secondary",
};

type StoreAllocation = { [storeId: string]: { ratio: number; amount: number } };
type ApplicationRatio = { [key: string]: { ratio: number; amount: number } };

export default function PaymentsPage() {
    const [isCreatePaymentOpen, setIsCreatePaymentOpen] = useState(false);
    const [isViewDetailsOpen, setIsViewDetailsOpen] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState<typeof paymentsData[0] | null>(null);

    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
    
    const initialStoreAllocations = useMemo(() => 
        mockStores.reduce((acc, store) => ({ ...acc, [store.id]: { ratio: mockStores.length > 1 ? 0 : 1, amount: 0 } }), {}),
        []
    );

    const [storeAllocations, setStoreAllocations] = useState<StoreAllocation>(initialStoreAllocations);

    const [applicationRatios, setApplicationRatios] = useState<ApplicationRatio>({
        'minMax': { ratio: 1, amount: 0 },
        'sale': { ratio: 1, amount: 0 },
        'web': { ratio: 1, amount: 0 },
    });
    
    const storeRatios = useMemo(() => Object.values(storeAllocations).map(s => s.ratio), [storeAllocations]);

    // Recalculate store allocations when totalAmount or ratios change
    useEffect(() => {
        const totalRatio = storeRatios.reduce((sum, ratio) => sum + (ratio || 0), 0);
        
        if (totalRatio === 0 || totalAmount === 0) {
             setStoreAllocations(prev => {
                const newAllocations = {...prev};
                Object.keys(newAllocations).forEach(storeId => {
                    newAllocations[storeId].amount = 0;
                });
                return newAllocations;
            });
            return;
        }

        const newAllocations: StoreAllocation = {};
        let allocatedSum = 0;
        const storeIds = Object.keys(storeAllocations);

        storeIds.forEach((storeId, index) => {
            const store = storeAllocations[storeId];
            if (index === storeIds.length - 1) {
                 newAllocations[storeId] = {
                    ...store,
                    amount: totalAmount - allocatedSum,
                };
            } else {
                const allocatedAmount = (store.ratio / totalRatio) * totalAmount;
                newAllocations[storeId] = {
                    ...store,
                    amount: allocatedAmount
                };
                allocatedSum += allocatedAmount;
            }
        });
        setStoreAllocations(newAllocations);
    }, [totalAmount, ...storeRatios]);

    const appRatios = useMemo(() => Object.values(applicationRatios).map(a => a.ratio), [applicationRatios]);

    // Recalculate application allocations
    useEffect(() => {
        const totalRatio = appRatios.reduce((sum, ratio) => sum + (ratio || 0), 0);
        
        if (totalRatio === 0 || totalAmount === 0) {
            setApplicationRatios(prev => {
                const newRatios = {...prev};
                Object.keys(newRatios).forEach(key => { newRatios[key].amount = 0; });
                return newRatios;
            });
            return;
        }

        const newAppRatios: ApplicationRatio = {};
        let allocatedSum = 0;
        const ratioKeys = Object.keys(applicationRatios);

        ratioKeys.forEach((key, index) => {
            const ratioItem = applicationRatios[key];
             if (index === ratioKeys.length - 1) {
                newAppRatios[key] = { ...ratioItem, amount: totalAmount - allocatedSum };
            } else {
                const allocatedAmount = (ratioItem.ratio / totalRatio) * totalAmount;
                newAppRatios[key] = { ...ratioItem, amount: allocatedAmount };
                allocatedSum += allocatedAmount;
            }
        });
        setApplicationRatios(newAppRatios);

    }, [totalAmount, ...appRatios]);


    const handleStoreRatioChange = (storeId: string, newRatioStr: string) => {
        const newRatio = parseFloat(newRatioStr) || 0;
        setStoreAllocations(prev => ({
            ...prev,
            [storeId]: { ...prev[storeId], ratio: newRatio },
        }));
    };

     const handleAppRatioChange = (key: string, newRatioStr: string) => {
        const newRatio = parseFloat(newRatioStr) || 0;
        setApplicationRatios(prev => ({
            ...prev,
            [key]: { ...prev[key], ratio: newRatio },
        }));
    };
    
    const handleViewDetails = (payment: typeof paymentsData[0]) => {
        setSelectedPayment(payment);
        setIsViewDetailsOpen(true);
    };

    const isProceedDisabled = totalAmount <= 0 || !selectedPaymentMethod;

    const handleExport = () => {
        const headers = ["Date & Time", "Allocated Amount", "Payment Method", "Master Payment ID", "Status"];
        const csvRows = [
            headers.join(','),
            ...paymentsData.map(p => 
                [
                    `"${p.createdDate}"`,
                    p.amount,
                    `"${p.mode}"`,
                    `"${p.paymentId}"`,
                    `"${p.status}"`
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
                        
                        {/* Store Ratio Configuration */}
                        {mockStores.length > 1 && (
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
                                                onChange={(e) => handleStoreRatioChange(store.id, e.target.value)}
                                            />
                                            <div className="w-32 text-right font-semibold">
                                                ₹ {storeAllocations[store.id]?.amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                         {/* Application Ratio Configuration */}
                         <div className="space-y-3">
                             <h4 className="font-medium">Application Ratio Configuration</h4>
                             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 rounded-lg border p-4">
                                 {Object.keys(applicationRatios).map(key => (
                                     <div key={key} className="space-y-2">
                                         <Label htmlFor={`app-ratio-${key}`} className="capitalize">{key.replace(/([A-Z])/g, ' $1')} Orders</Label>
                                         <div className="flex items-center gap-2">
                                            <Input
                                                id={`app-ratio-${key}`}
                                                type="number"
                                                min="0"
                                                placeholder="Ratio"
                                                className="w-20"
                                                value={applicationRatios[key].ratio}
                                                onChange={(e) => handleAppRatioChange(key, e.target.value)}
                                            />
                                            <div className="text-sm font-semibold">
                                                ₹{applicationRatios[key].amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            </div>
                                         </div>
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
            <CardDescription>Allocation records for the selected store.</CardDescription>
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
                <TableHead>Date & Time</TableHead>
                <TableHead className="text-right">Allocated Amount</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Master Payment ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paymentsData.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>{payment.createdDate}</TableCell>
                  <TableCell className="text-right font-medium">₹{payment.amount.toLocaleString('en-IN')}</TableCell>
                  <TableCell>{payment.mode}</TableCell>
                  <TableCell>{payment.paymentId}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[payment.status] || 'secondary'}>
                      {payment.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleViewDetails(payment)}>
                        <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
       {/* View Details Modal */}
       <Dialog open={isViewDetailsOpen} onOpenChange={setIsViewDetailsOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Payment Details</DialogTitle>
                    <DialogDescription>
                        Summary for Master Payment ID: <span className="font-medium">{selectedPayment?.paymentId}</span>
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-1">
                        <Label>Gateway Transaction ID</Label>
                        <p className="text-sm text-muted-foreground">{selectedPayment?.gatewayTxId}</p>
                    </div>
                     <div className="space-y-1">
                        <Label>Remarks</Label>
                        <p className="text-sm text-muted-foreground">{selectedPayment?.remarks || "No remarks provided."}</p>
                    </div>
                    <div>
                        <Label>Application Ratio Used</Label>
                        <div className="grid grid-cols-3 gap-4 p-3 border rounded-md mt-1">
                           <div>
                                <p className="text-xs text-muted-foreground">Min Max Orders</p>
                                <p className="font-medium">{selectedPayment?.applicationRatios.minMax}</p>
                           </div>
                             <div>
                                <p className="text-xs text-muted-foreground">Sale Orders</p>
                                <p className="font-medium">{selectedPayment?.applicationRatios.sale}</p>
                           </div>
                            <div>
                                <p className="text-xs text-muted-foreground">Web Orders</p>
                                <p className="font-medium">{selectedPayment?.applicationRatios.web}</p>
                           </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    </div>
  );
}
