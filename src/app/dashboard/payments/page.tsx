
"use client";

import { useState, useMemo, useEffect } from "react";
import { PlusCircle, Search, Download, Landmark, CreditCard, Signal, IndianRupee, BotMessageSquare, Eye, ChevronDown, Info } from "lucide-react";
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
import { paymentsData, accountProfile, stores as mockStores, kpiData } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { DateRange } from "react-day-picker";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";


const statusVariant: { [key: string]: "success" | "destructive" | "secondary" } = {
    "Successful": "success",
    "Failed": "destructive",
    "Pending": "secondary",
};

type ApplicationRatios = {
    accountBalance: { ratio: number; amount: number };
    emergencyBalance: { ratio: number; amount: number };
};

type AllocationMode = "ratio" | "amount";

type StoreAllocationState = {
    id: string;
    name: string;
    storeRatio: number;
    allocatedAmount: number;
    applicationRatios: ApplicationRatios;
    isExpanded: boolean;
    applicationAllocationMode: AllocationMode;
};

const initialApplicationRatios = (): ApplicationRatios => ({
    accountBalance: { ratio: 1, amount: 0 },
    emergencyBalance: { ratio: 1, amount: 0 },
});

export default function PaymentsPage() {
    const [isCreatePaymentOpen, setIsCreatePaymentOpen] = useState(false);
    const [isViewDetailsOpen, setIsViewDetailsOpen] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState<typeof paymentsData[0] | null>(null);
    const [dateRange, setDateRange] = useState<DateRange | undefined>();

    // Main payment state
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [storeAllocations, setStoreAllocations] = useState<StoreAllocationState[]>([]);
    const [storeAllocationMode, setStoreAllocationMode] = useState<AllocationMode>("ratio");
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
    
    // Derived states for validation and display
    const { totalAllocated, remaining, isStoreAllocationValid, applicationAllocationErrors } = useMemo(() => {
        const totalAllocated = storeAllocations.reduce((sum, s) => sum + s.allocatedAmount, 0);
        const remaining = totalAmount - totalAllocated;
        const isStoreAllocationValid = storeAllocationMode === 'ratio' || Math.abs(remaining) < 0.01;
        
        const errors: Record<string, string> = {};
        storeAllocations.forEach(store => {
            if (store.applicationAllocationMode === 'amount') {
                const appTotal = store.applicationRatios.accountBalance.amount + store.applicationRatios.emergencyBalance.amount;
                if (Math.abs(appTotal - store.allocatedAmount) > 0.01) {
                    errors[store.id] = `The allocated amounts (₹${appTotal.toFixed(2)}) do not add up to the total for this store (₹${store.allocatedAmount.toFixed(2)}).`;
                }
            }
        });

        return { totalAllocated, remaining, isStoreAllocationValid, applicationAllocationErrors: errors };
    }, [storeAllocations, totalAmount, storeAllocationMode]);

    useEffect(() => {
        if (isCreatePaymentOpen) {
            const initialAllocations = mockStores.map(store => ({
                id: store.id,
                name: store.name,
                storeRatio: 1,
                allocatedAmount: 0,
                applicationRatios: initialApplicationRatios(),
                isExpanded: true,
                applicationAllocationMode: "ratio" as AllocationMode,
            }));
            setStoreAllocations(initialAllocations);
            setTotalAmount(0);
            setSelectedPaymentMethod(null);
            setStoreAllocationMode("ratio");
        }
    }, [isCreatePaymentOpen]);

    useEffect(() => {
        if (storeAllocationMode === 'ratio') {
            recalculateStoreAmounts();
        }
    }, [totalAmount, storeAllocationMode, storeAllocations.map(s => s.storeRatio).join(',')]);
    
    useEffect(() => {
        const newAllocations = storeAllocations.map(store => {
            if (store.applicationAllocationMode === 'ratio') {
                return { ...store, applicationRatios: calculateApplicationAmounts(store) };
            }
            return store;
        });
        if (JSON.stringify(newAllocations) !== JSON.stringify(storeAllocations)) {
            setStoreAllocations(newAllocations);
        }
    }, [storeAllocations.map(s => s.allocatedAmount).join(',')]);


    const recalculateStoreAmounts = () => {
        const totalStoreRatio = storeAllocations.reduce((sum, s) => sum + s.storeRatio, 0);
        setStoreAllocations(prev => prev.map(store => {
            const newAllocatedAmount = totalStoreRatio > 0 ? (store.storeRatio / totalStoreRatio) * totalAmount : (prev.length === 1 ? totalAmount : 0);
            return {
                ...store,
                allocatedAmount: newAllocatedAmount,
                applicationRatios: calculateApplicationAmounts({ ...store, allocatedAmount: newAllocatedAmount }),
            };
        }));
    };
    
    const recalculateStoreRatios = () => {
        if (totalAmount > 0) {
            setStoreAllocations(prev => prev.map(store => ({
                ...store,
                storeRatio: store.allocatedAmount / totalAmount,
            })));
        }
    };
    
    const calculateApplicationAmounts = (store: StoreAllocationState): ApplicationRatios => {
        const totalAppRatio = store.applicationRatios.accountBalance.ratio + store.applicationRatios.emergencyBalance.ratio;
        let newAccountBalanceAmount = 0, newEmergencyBalanceAmount = 0;

        if (totalAppRatio > 0) {
            newAccountBalanceAmount = (store.applicationRatios.accountBalance.ratio / totalAppRatio) * store.allocatedAmount;
            newEmergencyBalanceAmount = store.allocatedAmount - newAccountBalanceAmount;
        }
        return {
            accountBalance: { ...store.applicationRatios.accountBalance, amount: newAccountBalanceAmount },
            emergencyBalance: { ...store.applicationRatios.emergencyBalance, amount: newEmergencyBalanceAmount },
        };
    };

    const handleStoreRatioChange = (storeId: string, newRatio: number) => {
        setStoreAllocations(prev => prev.map(s => s.id === storeId ? { ...s, storeRatio: newRatio } : s));
    };

    const handleStoreAmountChange = (storeId: string, newAmount: number) => {
        setStoreAllocations(prev => prev.map(s => s.id === storeId ? { ...s, allocatedAmount: newAmount } : s));
        if (storeAllocationMode === 'amount') {
            // No need to recalculate ratios on every keystroke, do it on blur or after calculation
        }
    };

    const handleApplicationRatioChange = (storeId: string, appKey: keyof ApplicationRatios, newRatio: number) => {
        setStoreAllocations(prev => prev.map(s => {
            if (s.id !== storeId) return s;
            const newAppRatios = { ...s.applicationRatios, [appKey]: { ...s.applicationRatios[appKey], ratio: newRatio } };
            return { ...s, applicationRatios: calculateApplicationAmounts({ ...s, applicationRatios: newAppRatios }) };
        }));
    };

    const handleApplicationAmountChange = (storeId: string, appKey: keyof ApplicationRatios, newAmount: number) => {
        setStoreAllocations(prev => prev.map(s => {
            if (s.id !== storeId) return s;
            const newAppRatios = { ...s.applicationRatios, [appKey]: { ...s.applicationRatios[appKey], amount: newAmount } };
            
            if (s.applicationAllocationMode === 'amount') {
                 const totalAppRatio = newAppRatios.accountBalance.ratio + newAppRatios.emergencyBalance.ratio;
                 if (s.allocatedAmount > 0) {
                     const newRatioForField = (newAmount / s.allocatedAmount) * totalAppRatio;
                     newAppRatios[appKey].ratio = newRatioForField;
                 }
            }
            return { ...s, applicationRatios: newAppRatios };
        }));
    };

    const toggleStoreExpansion = (storeId: string) => {
        setStoreAllocations(prev => 
            prev.map(s => s.id === storeId ? { ...s, isExpanded: !s.isExpanded } : s)
        );
    };
    
    const setApplicationAllocationMode = (storeId: string, mode: AllocationMode) => {
        setStoreAllocations(prev => prev.map(s => s.id === storeId ? { ...s, applicationAllocationMode: mode } : s));
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

    const isProceedDisabled = totalAmount <= 0 || !selectedPaymentMethod || !isStoreAllocationValid || Object.keys(applicationAllocationErrors).length > 0;

  return (
    <TooltipProvider>
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
                <DialogContent className="max-w-3xl">
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
                                    <div className="flex justify-between items-center">
                                        <h4 className="font-medium">Store Allocation Mode</h4>
                                        <RadioGroup value={storeAllocationMode} onValueChange={(v) => setStoreAllocationMode(v as AllocationMode)} className="flex items-center space-x-4">
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="ratio" id="store-ratio" />
                                                <Label htmlFor="store-ratio">By Ratio</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="amount" id="store-amount" />
                                                <Label htmlFor="store-amount">By Amount</Label>
                                            </div>
                                        </RadioGroup>
                                    </div>
                                    <div className="space-y-2 rounded-lg border p-4">
                                        {storeAllocations.map(store => (
                                            <div key={store.id} className="flex items-center justify-between gap-2 p-2">
                                                <Label htmlFor={`ratio-${store.id}`} className="flex-1">{store.name}</Label>
                                                <Input
                                                    type="number"
                                                    min="0"
                                                    placeholder="Ratio"
                                                    className="w-20 text-center h-8"
                                                    value={store.storeRatio}
                                                    onChange={(e) => handleStoreRatioChange(store.id, parseFloat(e.target.value) || 0)}
                                                    readOnly={storeAllocationMode !== 'ratio'}
                                                    disabled={storeAllocationMode !== 'ratio'}
                                                />
                                                <Input
                                                    type="number"
                                                    min="0"
                                                    placeholder="Amount"
                                                    className="w-28 text-right h-8 font-semibold"
                                                    value={store.allocatedAmount.toFixed(2)}
                                                    onChange={(e) => handleStoreAmountChange(store.id, parseFloat(e.target.value) || 0)}
                                                    onBlur={recalculateStoreRatios}
                                                    readOnly={storeAllocationMode !== 'amount'}
                                                    disabled={storeAllocationMode !== 'amount'}
                                                />
                                            </div>
                                        ))}
                                         {storeAllocationMode === 'amount' && (
                                            <div className={cn("text-right text-sm font-medium mt-2", remaining < 0 ? 'text-destructive' : 'text-green-600')}>
                                                {remaining < -0.01 && `Over-allocated by: ₹${Math.abs(remaining).toFixed(2)}`}
                                                {remaining > 0.01 && `Remaining: ₹${remaining.toFixed(2)}`}
                                                {Math.abs(remaining) < 0.01 && `✓ Allocated`}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {storeAllocations.map(store => (
                                <Collapsible key={store.id} open={store.isExpanded} onOpenChange={() => toggleStoreExpansion(store.id)} className="space-y-2">
                                    <CollapsibleTrigger asChild>
                                        <Button variant="ghost" className="w-full flex items-center justify-between p-2">
                                            <span className="font-semibold">Application Ratios for {store.name}</span>
                                            <ChevronDown className={cn("h-4 w-4 transition-transform", store.isExpanded && "rotate-180")} />
                                        </Button>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent className="p-4 bg-muted/50 rounded-md mt-2 space-y-4">
                                        <div className="flex justify-between items-center">
                                            <h4 className="font-medium">Configuration Mode</h4>
                                            <RadioGroup value={store.applicationAllocationMode} onValueChange={(v) => setApplicationAllocationMode(store.id, v as AllocationMode)} className="flex items-center space-x-4">
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="ratio" id={`app-ratio-${store.id}`} />
                                                    <Label htmlFor={`app-ratio-${store.id}`}>By Ratio</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="amount" id={`app-amount-${store.id}`} />
                                                    <Label htmlFor={`app-amount-${store.id}`}>By Amount</Label>
                                                </div>
                                            </RadioGroup>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {(Object.keys(store.applicationRatios) as Array<keyof ApplicationRatios>).map(appKey => (
                                                <div key={appKey} className="space-y-2">
                                                    <Label htmlFor={`app-ratio-input-${store.id}-${appKey}`} className="capitalize text-sm flex items-center">
                                                        {appKey.replace(/([A-Z])/g, ' $1')}
                                                    </Label>
                                                    <div className="flex items-center gap-2">
                                                        <Input
                                                            id={`app-ratio-input-${store.id}-${appKey}`}
                                                            type="number" min="0" placeholder="Ratio" className="w-20 h-8 text-sm text-center"
                                                            value={store.applicationRatios[appKey].ratio}
                                                            onChange={(e) => handleApplicationRatioChange(store.id, appKey, parseFloat(e.target.value) || 0)}
                                                            readOnly={store.applicationAllocationMode !== 'ratio'}
                                                            disabled={store.applicationAllocationMode !== 'ratio'}
                                                        />
                                                        <Input
                                                            type="number" min="0" placeholder="Amount" className="flex-1 h-8 text-right text-sm font-medium"
                                                            value={store.applicationRatios[appKey].amount.toFixed(2)}
                                                            onChange={(e) => handleApplicationAmountChange(store.id, appKey, parseFloat(e.target.value) || 0)}
                                                            readOnly={store.applicationAllocationMode !== 'amount'}
                                                            disabled={store.applicationAllocationMode !== 'amount'}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        {applicationAllocationErrors[store.id] && (
                                             <p className="text-sm text-destructive font-medium text-center">{applicationAllocationErrors[store.id]}</p>
                                        )}
                                    </CollapsibleContent>
                                </Collapsible>
                            ))}
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
                                <p className="text-xs text-muted-foreground">Account Balance</p>
                                <p className="font-medium">{selectedPayment?.applicationRatios.accountBalance}</p>
                           </div>
                             <div>
                                <p className="text-xs text-muted-foreground">Emergency Balance</p>
                                <p className="font-medium">{selectedPayment?.applicationRatios.emergencyBalance}</p>
                           </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    </div>
  </TooltipProvider>
  );
}
