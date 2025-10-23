
"use client";

import { useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import { purchaseReturnsData, type PurchaseReturn } from "@/lib/data";
import { Eye, Printer, Search, Truck, CheckCircle, Package, Download } from "lucide-react";
import { Label } from "@/components/ui/label";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const statusVariant: { [key: string]: "success" | "info" | "warning" } = {
    "Received": "success",
    "In Transit": "info",
    "Pending": "warning",
};

export default function PurchaseReturnPage() {
    const [selectedReturn, setSelectedReturn] = useState<PurchaseReturn | null>(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);

    const handleViewClick = (pr: PurchaseReturn) => {
        setSelectedReturn(pr);
        setIsViewModalOpen(true);
    };

    const handleTrackClick = (pr: PurchaseReturn) => {
        setSelectedReturn(pr);
        setIsTrackModalOpen(true);
    };
    
    const handlePrint = () => {
        window.print();
    }

  return (
    <TooltipProvider>
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Purchase Return</h1>
                <p className="text-muted-foreground">View and manage purchase return transactions.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Filters</CardTitle>
                    <CardDescription>Filter returns by date range or search by Return ID.</CardDescription>
                </CardHeader>
                <CardContent>
                <div className="flex flex-col md:flex-row gap-4 items-end">
                    <div className="grid gap-2">
                        <Label htmlFor="date-range">Date Range</Label>
                        <DateRangePicker />
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="return-id">Return ID</Label>
                        <Input id="return-id" placeholder="Search by Return ID..." />
                    </div>
                    <Button>
                        <Search className="mr-2 h-4 w-4" />
                        Search
                    </Button>
                </div>
                </CardContent>
            </Card>


            <Card>
                <CardHeader>
                    <CardTitle>Purchase Return List</CardTitle>
                    <CardDescription>A list of your purchase return transactions.</CardDescription>
                </CardHeader>
                <CardContent className="overflow-x-auto">
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>ReturnId</TableHead>
                        <TableHead>FromStoreId</TableHead>
                        <TableHead>ToStoreId</TableHead>
                        <TableHead>TotalCost</TableHead>
                        <TableHead>CreatedBy</TableHead>
                        <TableHead>DateCreated</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {purchaseReturnsData.map((pr) => (
                        <TableRow key={pr.returnId}>
                        <TableCell className="font-medium">{pr.returnId}</TableCell>
                        <TableCell>{pr.fromStoreId}</TableCell>
                        <TableCell>{pr.toStoreId}</TableCell>
                        <TableCell>₹{pr.totalCost.toLocaleString('en-IN')}</TableCell>
                        <TableCell>{pr.createdBy}</TableCell>
                        <TableCell>{pr.dateCreated}</TableCell>
                        <TableCell className="text-center">
                            <div className="flex gap-1 justify-center">
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="ghost" size="icon" onClick={() => handleViewClick(pr)}>
                                            <Eye className="h-4 w-4" />
                                            <span className="sr-only">View Details</span>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent><p>View Details</p></TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="ghost" size="icon" onClick={handlePrint}>
                                            <Printer className="h-4 w-4" />
                                            <span className="sr-only">Print</span>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent><p>Print</p></TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="ghost" size="icon" onClick={() => handleTrackClick(pr)}>
                                            <Truck className="h-4 w-4" />
                                            <span className="sr-only">Track</span>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent><p>Track</p></TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                            <Download className="h-4 w-4" />
                                            <span className="sr-only">Download Invoice</span>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent><p>Download Invoice</p></TooltipContent>
                                </Tooltip>
                            </div>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </CardContent>
            </Card>

            {/* View Modal */}
            <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
                <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>Purchase Return Details</DialogTitle>
                    <DialogDescription>
                        Items in Return ID <span className="font-medium">{selectedReturn?.returnId}</span>
                    </DialogDescription>
                </DialogHeader>
                <div className="max-h-[60vh] overflow-y-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>SKU</TableHead>
                                <TableHead>Product Name</TableHead>
                                <TableHead className="text-center">Quantity</TableHead>
                                <TableHead className="text-right">Cost</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {selectedReturn?.products?.map(product => (
                                <TableRow key={product.sku}>
                                    <TableCell>{product.sku}</TableCell>
                                    <TableCell className="font-medium">{product.name}</TableCell>
                                    <TableCell className="text-center">{product.quantity}</TableCell>
                                    <TableCell className="text-right">₹{product.cost.toLocaleString('en-IN')}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                </DialogContent>
            </Dialog>
            
            {/* Track Modal */}
            <Dialog open={isTrackModalOpen} onOpenChange={setIsTrackModalOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Track Return</DialogTitle>
                        <DialogDescription>
                        Shipping status for Return ID <span className="font-medium">{selectedReturn?.returnId}</span>
                        </DialogDescription>
                    </DialogHeader>
                    <div className="relative pl-6 py-4">
                        <div className="absolute left-9 top-6 h-full w-0.5 bg-border -translate-x-1/2"></div>
                        {selectedReturn?.trackingHistory?.map((event, index) => (
                            <div key={index} className="relative flex items-start gap-4 mb-6">
                                <div className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                    {event.status === 'Received' ? <CheckCircle className="h-5 w-5" /> : <Package className="h-5 w-5" />}
                                </div>
                                <div className="mt-1">
                                    <p className="font-semibold">{event.status}</p>
                                    <p className="text-sm text-muted-foreground">{event.location}</p>
                                    <time className="text-xs text-muted-foreground">{event.date}</time>
                                </div>
                            </div>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>

        </div>
    </TooltipProvider>
  );
}

  

    