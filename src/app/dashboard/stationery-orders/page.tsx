
"use client";

import { useState } from "react";
import Link from "next/link";
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
import { stationeryOrdersData, type StationeryOrder } from "@/lib/data";
import { Eye, Search, PlusCircle, Package, CheckCircle, Truck } from "lucide-react";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

const statusVariant: { [key: string]: "default" | "secondary" | "destructive" | "outline" | "success" | "warning" | "info" } = {
    "Completed": "success",
    "Dispatched": "info",
    "Approved": "default",
    "Pending": "warning",
    "Cancelled": "destructive",
};

export default function StationeryOrdersPage() {
    const [selectedOrder, setSelectedOrder] = useState<StationeryOrder | null>(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);

    const handleViewClick = (order: StationeryOrder) => {
        setSelectedOrder(order);
        setIsViewModalOpen(true);
    };

    const handleTrackClick = (order: StationeryOrder) => {
        setSelectedOrder(order);
        setIsTrackModalOpen(true);
    };

  return (
    <TooltipProvider>
        <div className="space-y-6">
        <div>
            <h1 className="font-headline text-3xl font-bold">Stationery Order Management</h1>
            <p className="text-muted-foreground">
                View and track your stationery orders or create a new one.
            </p>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Filters & Actions</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col md:flex-row gap-4 items-end">
                    <div className="flex flex-grow items-end gap-4">
                        <div className="grid gap-2 w-full md:w-auto">
                            <Label htmlFor="search-order-id">Order ID</Label>
                             <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Search by Order ID..." id="search-order-id" className="pl-8" />
                            </div>
                        </div>
                        <div className="grid gap-2 w-full md:w-auto">
                            <Label htmlFor="date-range">Date Range</Label>
                            <DateRangePicker />
                        </div>
                        <Button>Search</Button>
                    </div>
                    <Button asChild>
                        <Link href="/dashboard/stationery-orders/create">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Create New Order
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
            <CardTitle>Order History</CardTitle>
            <CardDescription>
                A list of your recent stationery orders.
            </CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-auto">
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Order Date</TableHead>
                    <TableHead>Total Items</TableHead>
                    <TableHead className="text-right">Total Cost</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-center">Action</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {stationeryOrdersData.map((order) => (
                    <TableRow key={order.orderId}>
                        <TableCell className="font-medium">{order.orderId}</TableCell>
                        <TableCell>{order.orderDate}</TableCell>
                        <TableCell>{order.totalItems}</TableCell>
                        <TableCell className="text-right">₹{order.totalCost.toLocaleString('en-IN')}</TableCell>
                        <TableCell>
                            <Badge variant={statusVariant[order.status] || 'secondary'}>
                                {order.status}
                            </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                           <div className="flex gap-2 justify-center">
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="ghost" size="icon" onClick={() => handleTrackClick(order)}>
                                            <Truck className="h-4 w-4" />
                                            <span className="sr-only">Track Order</span>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent><p>Track Order</p></TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="ghost" size="icon" onClick={() => handleViewClick(order)}>
                                            <Eye className="h-4 w-4" />
                                            <span className="sr-only">View Details</span>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent><p>View Details</p></TooltipContent>
                                </Tooltip>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </CardContent>
        </Card>

        {/* View Order Modal */}
        <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
            <DialogContent className="sm:max-w-xl">
            <DialogHeader>
                <DialogTitle>Order Details</DialogTitle>
                <DialogDescription>
                Items in order <span className="font-medium">{selectedOrder?.orderId}</span>
                </DialogDescription>
            </DialogHeader>
            <div className="max-h-[60vh] overflow-y-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Code</TableHead>
                            <TableHead>Product Name</TableHead>
                            <TableHead>UoM</TableHead>
                            <TableHead className="text-center">Quantity</TableHead>
                            <TableHead className="text-right">Cost</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {selectedOrder?.items?.map(item => (
                            <TableRow key={item.code}>
                                <TableCell>{item.code}</TableCell>
                                <TableCell className="font-medium">{item.name}</TableCell>
                                <TableCell>{item.uom}</TableCell>
                                <TableCell className="text-center">{item.quantity}</TableCell>
                                <TableCell className="text-right">₹{item.cost.toLocaleString('en-IN')}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            </DialogContent>
        </Dialog>
        
        {/* Track Order Modal */}
        <Dialog open={isTrackModalOpen} onOpenChange={setIsTrackModalOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Track Order</DialogTitle>
                    <DialogDescription>
                    Shipping status for order <span className="font-medium">{selectedOrder?.orderId}</span>
                    </DialogDescription>
                </DialogHeader>
                <div className="relative pl-6 py-4">
                    <div className="absolute left-9 top-6 h-full w-0.5 bg-border -translate-x-1/2"></div>
                    {selectedOrder?.trackingHistory?.map((event, index) => (
                        <div key={index} className="relative flex items-start gap-4 mb-6">
                            <div className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                {event.status === 'Completed' ? <CheckCircle className="h-5 w-5" /> : <Package className="h-5 w-5" />}
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
