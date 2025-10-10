
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { returnsData, type Return } from "@/lib/data";
import { Eye, Search, Truck, CheckCircle, Package } from "lucide-react";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

const statusVariant: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
    "Approved": "default",
    "Pending": "secondary",
    "Rejected": "destructive",
};

export default function ReturnsPage() {
    const [selectedReturn, setSelectedReturn] = useState<Return | null>(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);

    const handleViewClick = (ret: Return) => {
        setSelectedReturn(ret);
        setIsViewModalOpen(true);
    };

    const handleTrackClick = (ret: Return) => {
        setSelectedReturn(ret);
        setIsTrackModalOpen(true);
    };

  return (
    <TooltipProvider>
        <div className="space-y-6">
        <div>
            <h1 className="font-headline text-3xl font-bold">Returns Management</h1>
            <p className="text-muted-foreground">
            Track and manage your product return requests.
            </p>
        </div>

        <Card>
                <CardHeader>
                    <CardTitle>Filter Returns</CardTitle>
                    <CardDescription>Filter returns by date range or search by ID.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col md:flex-row gap-4 items-end">
                        <div className="grid gap-2 w-full md:w-auto">
                            <Label htmlFor="date-range">Date Range</Label>
                            <DateRangePicker />
                        </div>
                        <div className="grid gap-2 w-full md:w-auto">
                            <Label htmlFor="search-return-id">Return ID</Label>
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Search..." id="search-return-id" className="pl-8" />
                            </div>
                        </div>
                        <Button>Search</Button>
                    </div>
                </CardContent>
            </Card>

        <Card>
            <CardHeader>
            <CardTitle>Return History</CardTitle>
            <CardDescription>
                A list of your recent return requests.
            </CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-auto">
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Return ID</TableHead>
                    <TableHead>Tax Invoice</TableHead>
                    <TableHead>Created By</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead>Received Date</TableHead>
                    <TableHead>Return Note ID</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-center">Action</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {returnsData.map((ret) => (
                    <TableRow key={ret.returnId}>
                    <TableCell className="font-medium">{ret.returnId}</TableCell>
                    <TableCell>{ret.taxInvoice}</TableCell>
                    <TableCell>{ret.createdBy}</TableCell>
                    <TableCell className="text-right">
                        ₹{ret.total.toLocaleString('en-IN')}
                    </TableCell>
                    <TableCell>{ret.receivedDate}</TableCell>
                    <TableCell>{ret.returnNoteId || 'N/A'}</TableCell>
                    <TableCell>
                        <Badge variant={statusVariant[ret.status] || 'secondary'}>
                        {ret.status}
                        </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                       <div className="flex gap-2 justify-center">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" onClick={() => handleViewClick(ret)}>
                                        <Eye className="h-4 w-4" />
                                        <span className="sr-only">View Details</span>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent><p>View Details</p></TooltipContent>
                            </Tooltip>
                             <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" onClick={() => handleTrackClick(ret)}>
                                        <Truck className="h-4 w-4" />
                                        <span className="sr-only">Track Return</span>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent><p>Track Return</p></TooltipContent>
                            </Tooltip>
                        </div>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </CardContent>
        </Card>

            {/* View Return Modal */}
            <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
                <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Return Details</DialogTitle>
                    <DialogDescription>
                    Products in return request <span className="font-medium">{selectedReturn?.returnId}</span>
                    </DialogDescription>
                </DialogHeader>
                <div className="max-h-[60vh] overflow-y-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Product</TableHead>
                                <TableHead>SKU</TableHead>
                                <TableHead>Batch</TableHead>
                                <TableHead className="text-center">Quantity</TableHead>
                                <TableHead className="text-right">Value</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {selectedReturn?.products?.map(product => (
                                <TableRow key={product.sku}>
                                    <TableCell className="font-medium">{product.name}</TableCell>
                                    <TableCell>{product.sku}</TableCell>
                                    <TableCell>{product.batch}</TableCell>
                                    <TableCell className="text-center">{product.quantity}</TableCell>
                                    <TableCell className="text-right">₹{product.value.toLocaleString('en-IN')}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                </DialogContent>
            </Dialog>

            {/* Track Return Modal */}
            <Dialog open={isTrackModalOpen} onOpenChange={setIsTrackModalOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Track Return</DialogTitle>
                        <DialogDescription>
                        Shipping status for return <span className="font-medium">{selectedReturn?.returnId}</span>
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
