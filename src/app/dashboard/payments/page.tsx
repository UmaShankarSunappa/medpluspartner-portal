
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
    
    // State to hold string values of inputs for better UX
    const [inputValues, setInputValues] = useState<Record<string, string>>({});

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
            
            const newInputs: Record<string, string> = {};
            initialAllocations.forEach(store => {
                newInputs[`ratio-${store.id}`] = String(store.storeRatio);
                newInputs[`amount-${store.id}`] = '0.00';
                 Object.keys(store.applicationRatios).forEach(key => {
                    const appKey = key as keyof ApplicationRatios;
                    newInputs[`app-ratio-${store.id}-${appKey}`] = String(store.applicationRatios[appKey].ratio);
                    newInputs[`app-amount-${store.id}-${appKey}`] = '0.00';
                });
            });
            setInputValues(newInputs);

        }
    }, [isCreatePaymentOpen]);

    useEffect(() => {
        recalculateAll(totalAmount, storeAllocations);
    }, [totalAmount, storeAllocations.map(s => s.storeRatio).join(), storeAllocations.map(s => Object.values(s.applicationRatios).map(r => r.ratio).join('-')).join()]);

    const recalculateAll = (currentTotal: number, currentAllocations: StoreAllocationState[]) => {
        const totalStoreRatio = currentAllocations.reduce((sum, s) => sum + s.storeRatio, 0);

        const newAllocations = currentAllocations.map(store => {
            const newAllocatedAmount = totalStoreRatio > 0
                ? (store.storeRatio / totalStoreRatio) * currentTotal
                : (currentAllocations.length === 1 ? currentTotal : 0);
            
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

        setStoreAllocations(newAllocations);
        
        const newInputs: Record<string, string> = {};
        newAllocations.forEach(store => {
            newInputs[`ratio-${store.id}`] = String(store.storeRatio);
            newInputs[`amount-${store.id}`] = store.allocatedAmount.toFixed(2);
            Object.keys(store.applicationRatios).forEach(key => {
                const appKey = key as keyof ApplicationRatios;
                newInputs[`app-ratio-${store.id}-${appKey}`] = String(store.applicationRatios[appKey].ratio);
                newInputs[`app-amount-${store.id}-${appKey}`] = store.applicationRatios[appKey].amount.toFixed(2);
            });
        });
        setInputValues(prev => ({ ...prev, ...newInputs }));
    };

    const handleInputChange = (key: string, value: string) => {
        setInputValues(prev => ({...prev, [key]: value}));
    };
    
    const handleRatioBlur = (key: string, storeId: string, appKey?: keyof ApplicationRatios) => {
        const newValue = parseFloat(inputValues[key]) || 0;
        
        if (appKey) { // It's an application ratio
            setStoreAllocations(prev => prev.map(s => 
                s.id === storeId ? {
                    ...s,
                    applicationRatios: {
                        ...s.applicationRatios,
                        [appKey]: { ...s.applicationRatios[appKey], ratio: newValue }
                    }
                } : s
            ));
        } else { // It's a store ratio
            setStoreAllocations(prev => prev.map(s => s.id === storeId ? { ...s, storeRatio: newValue } : s));
        }
    };
    
    const handleAmountBlur = (key: string, storeId: string, appKey?: keyof ApplicationRatios) => {
        const newAmount = parseFloat(inputValues[key]) || 0;
        
        if (appKey) { // App amount changed
            setStoreAllocations(prev => {
                return prev.map(store => {
                    if (store.id !== storeId) return store;
                    const totalAppRatio = store.applicationRatios.minMax.ratio + store.applicationRatios.sale.ratio + store.applicationRatios.web.ratio;
                    const newRatio = store.allocatedAmount > 0 ? (newAmount / store.allocatedAmount) * totalAppRatio : 1;

                    return {
                        ...store,
                        applicationRatios: {
                            ...store.applicationRatios,
                            [appKey]: { ratio: newRatio, amount: newAmount }
                        }
                    };
                });
            });
        } else { // Store amount changed
            setStoreAllocations(prev => {
                 const totalStoreRatio = prev.reduce((sum, s) => sum + s.storeRatio, 0);
                 const newRatio = totalAmount > 0 ? (newAmount / totalAmount) * totalStoreRatio : 1;
                 return prev.map(s => s.id === storeId ? { ...s, storeRatio: newRatio, allocatedAmount: newAmount } : s);
            });
        }
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
                        
                        {mockStores.length > 1 ? (
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
                                                    value={inputValues[`ratio-${store.id}`] || ''}
                                                    onChange={(e) => handleInputChange(`ratio-${store.id}`, e.target.value)}
                                                    onBlur={() => handleRatioBlur(`ratio-${store.id}`, store.id)}
                                                />
                                                <Input
                                                    type="number"
                                                    min="0"
                                                    placeholder="Amount"
                                                    className="w-28 text-right h-8 font-semibold"
                                                    value={inputValues[`amount-${store.id}`] || ''}
                                                    onChange={(e) => handleInputChange(`amount-${store.id}`, e.target.value)}
                                                    onBlur={() => handleAmountBlur(`amount-${store.id}`, store.id)}
                                                />
                                            </div>
                                            <CollapsibleContent className="p-4 bg-muted/50 rounded-md mt-2">
                                                 <div className="space-y-3">
                                                     <h4 className="font-medium">Application Ratio Configuration</h4>
                                                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                         {Object.keys(store.applicationRatios).map(key => {
                                                            const appKey = key as keyof ApplicationRatios;
                                                            const ratioId = `app-ratio-${store.id}-${appKey}`;
                                                            const amountId = `app-amount-${store.id}-${appKey}`;
                                                            return (
                                                             <div key={key} className="space-y-2">
                                                                 <Label htmlFor={ratioId} className="capitalize text-xs">{key.replace(/([A-Z])/g, ' $1')} Orders</Label>
                                                                 <div className="flex items-center gap-2">
                                                                    <Input
                                                                        id={ratioId}
                                                                        type="number"
                                                                        min="0"
                                                                        placeholder="Ratio"
                                                                        className="w-16 h-8 text-sm"
                                                                        value={inputValues[ratioId] || ''}
                                                                        onChange={(e) => handleInputChange(ratioId, e.target.value)}
                                                                        onBlur={() => handleRatioBlur(ratioId, store.id, appKey)}
                                                                    />
                                                                    <Input
                                                                        type="number"
                                                                        min="0"
                                                                        placeholder="Amount"
                                                                        className="flex-1 h-8 text-right text-sm font-medium"
                                                                        value={inputValues[amountId] || ''}
                                                                        onChange={(e) => handleInputChange(amountId, e.target.value)}
                                                                        onBlur={() => handleAmountBlur(amountId, store.id, appKey)}
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
                        ) : storeAllocations.length > 0 && (
                             <div className="space-y-3">
                                <h4 className="font-medium">Application Ratio Configuration</h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 rounded-lg border p-4">
                                    {Object.keys(storeAllocations[0].applicationRatios).map(key => {
                                        const appKey = key as keyof ApplicationRatios;
                                        const store = storeAllocations[0];
                                        const ratioId = `app-ratio-${store.id}-${appKey}`;
                                        const amountId = `app-amount-${store.id}-${appKey}`;
                                        return (
                                        <div key={key} className="space-y-2">
                                            <Label htmlFor={ratioId} className="capitalize text-xs">{key.replace(/([A-Z])/g, ' $1')} Orders</Label>
                                            <div className="flex items-center gap-2">
                                                <Input
                                                    id={ratioId}
                                                    type="number"
                                                    min="0"
                                                    placeholder="Ratio"
                                                    className="w-16 h-8 text-sm"
                                                    value={inputValues[ratioId] || ''}
                                                    onChange={(e) => handleInputChange(ratioId, e.target.value)}
                                                    onBlur={() => handleRatioBlur(ratioId, store.id, appKey)}
                                                />
                                                <Input
                                                    type="number"
                                                    min="0"
                                                    placeholder="Amount"
                                                    className="flex-1 h-8 text-right text-sm font-medium"
                                                    value={inputValues[amountId] || ''}
                                                    onChange={(e) => handleInputChange(amountId, e.target.value)}
                                                    onBlur={() => handleAmountBlur(amountId, store.id, appKey)}
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

    

    