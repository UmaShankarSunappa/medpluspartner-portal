
"use client";

import { useState, useMemo, useEffect } from "react";
import { PlusCircle, Search, Download, Landmark, CreditCard, Signal, IndianRupee, BotMessageSquare, Eye, ChevronDown } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { paymentsData, accountProfile, stores as mockStores } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { DateRange } from "react-day-picker";

const statusVariant: { [key: string]: "success" | "destructive" | "secondary" } = {
    "Successful": "success",
    "Failed": "destructive",
    "Pending": "secondary",
};

type ApplicationRatios = {
    minMax: { ratio: number; amount: number };
    sale: { ratio: number; amount: number };
    web: { ratio: number; amount: number };
};

type StoreAllocationState = {
    id: string;
    name: string;
    storeRatio: number;
    allocatedAmount: number;
    applicationRatios: ApplicationRatios;
    isExpanded: boolean;
};

const initialApplicationRatios = (): ApplicationRatios => ({
    minMax: { ratio: 1, amount: 0 },
    sale: { ratio: 1, amount: 0 },
    web: { ratio: 1, amount: 0 },
});

export default function PaymentsPage() {
    const [isCreatePaymentOpen, setIsCreatePaymentOpen] = useState(false);
    const [isViewDetailsOpen, setIsViewDetailsOpen] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState<typeof paymentsData[0] | null>(null);
    const [dateRange, setDateRange] = useState<DateRange | undefined>();

    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
    const [storeAllocations, setStoreAllocations] = useState<StoreAllocationState[]>([]);
    const [isCalculating, setIsCalculating] = useState(false);


    useEffect(() => {
        if (isCreatePaymentOpen) {
            const initialAllocations = mockStores.map(store => ({
                id: store.id,
                name: store.name,
                storeRatio: mockStores.length > 1 ? 1 : 1,
                allocatedAmount: 0,
                applicationRatios: initialApplicationRatios(),
                isExpanded: true,
            }));
            setStoreAllocations(initialAllocations);
            setTotalAmount(0);
            setSelectedPaymentMethod(null);
        }
    }, [isCreatePaymentOpen]);

    // Top-down calculation: Recalculate all amounts when totalAmount or ratios change
    useEffect(() => {
        if (isCalculating) return;
        setIsCalculating(true);

        const totalStoreRatio = storeAllocations.reduce((sum, s) => sum + s.storeRatio, 0);

        setStoreAllocations(prevAllocations => {
            return prevAllocations.map(store => {
                const newAllocatedAmount = totalStoreRatio > 0
                    ? (store.storeRatio / totalStoreRatio) * totalAmount
                    : (mockStores.length === 1 ? totalAmount : 0);

                const totalAppRatio = store.applicationRatios.minMax.ratio + store.applicationRatios.sale.ratio + store.applicationRatios.web.ratio;
                
                let newMinMaxAmount = 0;
                let newSaleAmount = 0;
                let newWebAmount = 0;
                
                if (totalAppRatio > 0) {
                    newMinMaxAmount = (store.applicationRatios.minMax.ratio / totalAppRatio) * newAllocatedAmount;
                    newSaleAmount = (store.applicationRatios.sale.ratio / totalAppRatio) * newAllocatedAmount;
                    newWebAmount = newAllocatedAmount - newMinMaxAmount - newSaleAmount;
                }

                return {
                    ...store,
                    allocatedAmount: newAllocatedAmount,
                    applicationRatios: {
                        minMax: { ...store.applicationRatios.minMax, amount: newMinMaxAmount },
                        sale: { ...store.applicationRatios.sale, amount: newSaleAmount },
                        web: { ...store.applicationRatios.web, amount: newWebAmount },
                    }
                };
            });
        });
        
        setIsCalculating(false);

    }, [totalAmount, storeAllocations.map(s => s.storeRatio).join(), storeAllocations.map(s => `${s.applicationRatios.minMax.ratio}-${s.applicationRatios.sale.ratio}-${s.applicationRatios.web.ratio}`).join()]);


    const handleStoreRatioChange = (storeId: string, newRatioStr: string) => {
        if (isCalculating) return;
        const newRatio = parseFloat(newRatioStr) || 0;
        setStoreAllocations(prev =>
            prev.map(s => s.id === storeId ? { ...s, storeRatio: newRatio } : s)
        );
    };

    const handleAppRatioChange = (storeId: string, key: keyof ApplicationRatios, newRatioStr: string) => {
         if (isCalculating) return;
        const newRatio = parseFloat(newRatioStr) || 0;
        setStoreAllocations(prev =>
            prev.map(s =>
                s.id === storeId
                    ? {
                        ...s,
                        applicationRatios: {
                            ...s.applicationRatios,
                            [key]: { ...s.applicationRatios[key], ratio: newRatio },
                        },
                      }
                    : s
            )
        );
    };
    
    const handleStoreAmountChange = (storeId: string, newAmountStr: string) => {
        if (isCalculating) return;
        setIsCalculating(true);
        const newAmount = parseFloat(newAmountStr) || 0;

        setStoreAllocations(prev => {
            // Find the current and updated stores
            const updatedStore = prev.find(s => s.id === storeId);
            if (!updatedStore) return prev;

            // Calculate the new ratio for the updated store based on the total amount
            const newRatio = totalAmount > 0 ? (newAmount / totalAmount) * prev.reduce((sum, s) => sum + s.storeRatio, 0) : 1;
            
            return prev.map(s => s.id === storeId ? { ...s, storeRatio: newRatio, allocatedAmount: newAmount } : s);
        });
        setIsCalculating(false);
    };
    
    const handleAppAmountChange = (storeId: string, key: keyof ApplicationRatios, newAmountStr: string) => {
        if (isCalculating) return;
        setIsCalculating(true);
        const newAmount = parseFloat(newAmountStr) || 0;

        setStoreAllocations(prev => {
            return prev.map(store => {
                if (store.id !== storeId) return store;

                // Calculate new ratio based on this store's allocated amount
                const newRatio = store.allocatedAmount > 0 ? (newAmount / store.allocatedAmount) * (store.applicationRatios.minMax.ratio + store.applicationRatios.sale.ratio + store.applicationRatios.web.ratio) : 1;

                const updatedAppRatios = {
                    ...store.applicationRatios,
                    [key]: { ratio: newRatio, amount: newAmount },
                };

                return { ...store, applicationRatios: updatedAppRatios };
            });
        });
        setIsCalculating(false);
    };


    const toggleStoreExpansion = (storeId: string) => {
        setStoreAllocations(prev => 
            prev.map(s => s.id === storeId ? { ...s, isExpanded: !s.isExpanded } : s)
        );
    };

    const handleViewDetails = (payment: typeof paymentsData[0]) => {
        setSelectedPayment(payment);
        setIsViewDetailsOpen(true);
    };
    
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


    const isProceedDisabled = totalAmount <= 0 || !selectedPaymentMethod;

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
                        
                        {mockStores.length > 1 && (
                            <div className="space-y-3">
                                <h4 className="font-medium">Store Ratio Configuration</h4>
                                <div className="space-y-2 rounded-lg border p-4">
                                    {storeAllocations.map(store => (
                                        <Collapsible key={store.id} open={store.isExpanded} onOpenChange={() => toggleStoreExpansion(store.id)}>
                                            <div className="flex items-center justify-between gap-2">
                                                <CollapsibleTrigger asChild>
                                                    <Button variant="ghost" size="sm" className="flex items-center gap-2 flex-1 justify-start p-2">
                                                        <ChevronDown className={cn("h-4 w-4 transition-transform", store.isExpanded && "rotate-180")} />
                                                        <Label htmlFor={`ratio-${store.id}`} className="cursor-pointer">{store.name}</Label>
                                                    </Button>
                                                </CollapsibleTrigger>
                                                <Input
                                                    id={`ratio-${store.id}`}
                                                    type="number"
                                                    min="0"
                                                    placeholder="Ratio"
                                                    className="w-20 text-center h-8"
                                                    value={store.storeRatio}
                                                    onChange={(e) => handleStoreRatioChange(store.id, e.target.value)}
                                                />
                                                <Input
                                                    type="number"
                                                    min="0"
                                                    placeholder="Amount"
                                                    className="w-28 text-right h-8 font-semibold"
                                                    value={store.allocatedAmount > 0 ? store.allocatedAmount.toFixed(2) : ''}
                                                    onChange={(e) => handleStoreAmountChange(store.id, e.target.value)}
                                                />
                                            </div>
                                            <CollapsibleContent className="p-4 bg-muted/50 rounded-md mt-2">
                                                 <div className="space-y-3">
                                                     <h4 className="font-medium">Application Ratio Configuration</h4>
                                                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                         {Object.keys(store.applicationRatios).map(key => {
                                                            const appRatioKey = key as keyof ApplicationRatios;
                                                            return (
                                                             <div key={key} className="space-y-2">
                                                                 <Label htmlFor={`app-ratio-${store.id}-${key}`} className="capitalize text-xs">{key.replace(/([A-Z])/g, ' $1')} Orders</Label>
                                                                 <div className="flex items-center gap-2">
                                                                    <Input
                                                                        id={`app-ratio-${store.id}-${key}`}
                                                                        type="number"
                                                                        min="0"
                                                                        placeholder="Ratio"
                                                                        className="w-16 h-8 text-sm"
                                                                        value={store.applicationRatios[appRatioKey].ratio}
                                                                        onChange={(e) => handleAppRatioChange(store.id, appRatioKey, e.target.value)}
                                                                    />
                                                                    <Input
                                                                        type="number"
                                                                        min="0"
                                                                        placeholder="Amount"
                                                                        className="flex-1 h-8 text-right text-sm font-medium"
                                                                        value={store.applicationRatios[appRatioKey].amount > 0 ? store.applicationRatios[appRatioKey].amount.toFixed(2) : ''}
                                                                        onChange={(e) => handleAppAmountChange(store.id, appRatioKey, e.target.value)}
                                                                    />
                                                                 </div>
                                                             </div>
                                                         )})}
                                                     </div>
                                                 </div>
                                            </CollapsibleContent>
                                        </Collapsible>
                                    ))}
                                </div>
                            </div>
                        )}
                        
                        {mockStores.length === 1 && storeAllocations.length > 0 && (
                            <div className="space-y-3">
                                <h4 className="font-medium">Application Ratio Configuration</h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 rounded-lg border p-4">
                                    {Object.keys(storeAllocations[0].applicationRatios).map(key => {
                                        const appRatioKey = key as keyof ApplicationRatios;
                                        return (
                                        <div key={key} className="space-y-2">
                                            <Label htmlFor={`app-ratio-${key}`} className="capitalize text-xs">{key.replace(/([A-Z])/g, ' $1')} Orders</Label>
                                            <div className="flex items-center gap-2">
                                                <Input
                                                    id={`app-ratio-${key}`}
                                                    type="number"
                                                    min="0"
                                                    placeholder="Ratio"
                                                    className="w-16 h-8 text-sm"
                                                    value={storeAllocations[0].applicationRatios[appRatioKey].ratio}
                                                    onChange={(e) => handleAppRatioChange(storeAllocations[0].id, appRatioKey, e.target.value)}
                                                />
                                                <Input
                                                    type="number"
                                                    min="0"
                                                    placeholder="Amount"
                                                    className="flex-1 h-8 text-right text-sm font-medium"
                                                    value={storeAllocations[0].applicationRatios[appRatioKey].amount > 0 ? storeAllocations[0].applicationRatios[appRatioKey].amount.toFixed(2) : ''}
                                                    onChange={(e) => handleAppAmountChange(storeAllocations[0].id, appRatioKey, e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    )})}
                                </div>
                            </div>
                        )}
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
                        <DateRangePicker value={dateRange} onSelect={setDateRange} />
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

    