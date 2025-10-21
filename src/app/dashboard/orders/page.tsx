
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
import { ordersData, type Order } from "@/lib/data";
import { Eye, RefreshCw, Search, Truck, CheckCircle, Package } from "lucide-react";
import { Label } from "@/components/ui/label";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";

const statusVariant: { [key: string]: "default" | "secondary" | "destructive" | "outline" | "success" | "warning" | "info" } = {
    "Order Replenished": "success",
    "Order Delivered": "success",
    "Order Dispatched": "info",
    "Order Picked": "info",
    "Order Received": "secondary",
    "Order Created": "secondary",
    "Cancelled": "destructive",
};

export default function OrdersPage() {
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);
    const [isReorderAlertOpen, setIsReorderAlertOpen] = useState(false);

    const handleViewClick = (order: Order) => {
        setSelectedOrder(order);
        setIsViewModalOpen(true);
    };

    const handleTrackClick = (order: Order) => {
        setSelectedOrder(order);
        setIsTrackModalOpen(true);
    };

    const handleReorderClick = (order: Order) => {
        setSelectedOrder(order);
        setIsReorderAlertOpen(true);
    };


  return (
    <TooltipProvider>
        <div className="space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
            <h1 className="text-2xl font-bold tracking-tight">Order History</h1>
            <p className="text-muted-foreground">View and track all your orders</p>
            </div>
        </div>

        <Card>
            <CardHeader>
            <CardTitle>Search Orders</CardTitle>
            <CardDescription>Filter orders by date range (maximum 7 days)</CardDescription>
            </CardHeader>
            <CardContent>
            <div className="flex flex-col md:flex-row gap-4 items-end">
                <div className="grid gap-2">
                    <Label htmlFor="order-id">Order ID</Label>
                    <Input id="order-id" placeholder="Search by Order ID..."/>
                </div>
                <div className="grid gap-2">
                <Label htmlFor="date-range">Date Range</Label>
                <DateRangePicker max={7} />
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
            <CardTitle>Orders</CardTitle>
            <CardDescription>Your order history and details (by default last 15 days orders will appear here)</CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-auto">
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Web Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {ordersData.map((order) => (
                    <TableRow key={order.orderId}>
                    <TableCell className="font-medium">{order.orderId}</TableCell>
                    <TableCell>WEB-{order.orderId.split('-')[1]}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>₹{order.total.toLocaleString('en-IN')}</TableCell>
                    <TableCell>
                        <Badge variant={statusVariant[order.status] || 'secondary'}>{order.status}</Badge>
                    </TableCell>
                    <TableCell>{order.type}</TableCell>
                    <TableCell className="text-center">
                        <div className="flex gap-2 justify-center">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" onClick={() => handleViewClick(order)}>
                                        <Eye className="h-4 w-4" />
                                        <span className="sr-only">View Order</span>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>View Order</p>
                                </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" onClick={() => handleReorderClick(order)}>
                                        <RefreshCw className="h-4 w-4" />
                                        <span className="sr-only">Re-order</span>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Re-order</p>
                                </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" onClick={() => handleTrackClick(order)}>
                                        <Truck className="h-4 w-4" />
                                        <span className="sr-only">Track Order</span>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Track Order</p>
                                </TooltipContent>
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
            <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
                <DialogTitle>Order Details</DialogTitle>
                <DialogDescription>
                Products in order <span className="font-medium">{selectedOrder?.orderId}</span>
                </DialogDescription>
            </DialogHeader>
            <div className="max-h-[60vh] overflow-y-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Product</TableHead>
                            <TableHead>SKU</TableHead>
                            <TableHead className="text-center">Quantity</TableHead>
                            <TableHead className="text-right">Price</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {selectedOrder?.products?.map(product => (
                            <TableRow key={product.sku}>
                                <TableCell className="font-medium">{product.name}</TableCell>
                                <TableCell>{product.sku}</TableCell>
                                <TableCell className="text-center">{product.quantity}</TableCell>
                                <TableCell className="text-right">₹{product.price.toLocaleString('en-IN')}</TableCell>
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
                                {event.status === 'Order Replenished' || event.status === 'Order Delivered' ? <CheckCircle className="h-5 w-5" /> : <Package className="h-5 w-5" />}
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


        {/* Re-order Alert */}
        <AlertDialog open={isReorderAlertOpen} onOpenChange={setIsReorderAlertOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to re-order?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This will create a new order with the exact same items and quantities as order <span className="font-medium">{selectedOrder?.orderId}</span>. This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => { /* Reorder logic goes here */ }}>Confirm Re-order</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

        </div>
    </TooltipProvider>
  );
}
