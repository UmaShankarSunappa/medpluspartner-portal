
"use client";

import { useState, useEffect, useMemo } from "react";
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
import { ordersData, type Order, orderSummaryData } from "@/lib/data";
import { Eye, RefreshCw, Truck, CheckCircle, Package, Download, TrendingUp, Filter } from "lucide-react";
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
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DateRange } from "react-day-picker";
import { subDays } from "date-fns";

const statusVariant: { [key: string]: "default" | "secondary" | "destructive" | "outline" | "success" | "warning" | "info" } = {
    "Order Replenished": "success",
    "Order Delivered": "success",
    "Order Dispatched": "info",
    "Order Picked": "info",
    "Order Received": "secondary",
    "Order Created": "secondary",
    "Cancelled": "destructive",
};

const ALL_TYPES = ["Auto", "Indent", "Web Order", "Sale Order"];
const ALL_STATUSES = ["Order Created", "Order Picked", "Order Dispatched", "Order Delivered", "Order Replenished", "Cancelled"];

export default function OrdersPage() {
    const [filteredOrders, setFilteredOrders] = useState<Order[]>(ordersData);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);
    const [isReorderAlertOpen, setIsReorderAlertOpen] = useState(false);
    
    // State for filters
    const [orderIdFilter, setOrderIdFilter] = useState("");
    const [dateRange, setDateRange] = useState<DateRange | undefined>({ from: subDays(new Date(), 14), to: new Date() });
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

    useEffect(() => {
        let newFilteredOrders = ordersData;

        // Date Range filter (always applied)
        if (dateRange?.from && dateRange?.to) {
            newFilteredOrders = newFilteredOrders.filter(order => {
                const orderDate = new Date(order.date);
                return orderDate >= dateRange.from! && orderDate <= dateRange.to!;
            });
        }

        // Order ID filter (overrides others if present)
        if (orderIdFilter.trim()) {
            newFilteredOrders = newFilteredOrders.filter(order => order.orderId.toLowerCase().includes(orderIdFilter.toLowerCase()));
        } else {
            // Type filter
            if (selectedTypes.length > 0) {
                newFilteredOrders = newFilteredOrders.filter(order => selectedTypes.includes(order.type));
            }
            // Status filter
            if (selectedStatuses.length > 0) {
                newFilteredOrders = newFilteredOrders.filter(order => selectedStatuses.includes(order.status));
            }
        }
        
        setFilteredOrders(newFilteredOrders);

    }, [orderIdFilter, dateRange, selectedTypes, selectedStatuses]);

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

    const handleTypeToggle = (type: string) => {
        setSelectedTypes(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]);
    };
    
    const handleStatusToggle = (status: string) => {
        setSelectedStatuses(prev => prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]);
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
                <CardTitle className="flex items-center gap-2 text-xl font-bold">
                    <TrendingUp className="h-5 w-5" />
                    Order Summary (Last 15 Days)
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order Type</TableHead>
                            <TableHead>Total Orders</TableHead>
                            <TableHead>Delivered</TableHead>
                            <TableHead>In Transit</TableHead>
                            <TableHead>Cancelled</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orderSummaryData.map((summary, index) => (
                            <TableRow key={summary.orderType} className={summary.orderType === 'All Orders' ? 'bg-muted/50' : ''}>
                                <TableCell className={summary.orderType === 'All Orders' ? 'font-bold' : ''}>{summary.orderType}</TableCell>
                                <TableCell className={summary.orderType === 'All Orders' ? 'font-bold' : ''}>{summary.totalOrders}</TableCell>
                                <TableCell className={summary.orderType === 'All Orders' ? 'font-bold' : ''}>{summary.delivered}</TableCell>
                                <TableCell className={summary.orderType === 'All Orders' ? 'font-bold' : ''}>{summary.inTransit}</TableCell>
                                <TableCell className={summary.orderType === 'All Orders' ? 'font-bold' : ''}>{summary.cancelled}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Search Orders</CardTitle>
                <CardDescription>Filter orders by date range, type, and status.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col md:flex-row gap-2 items-end justify-between">
                     <div className="grid gap-2">
                        <Label>Date Range</Label>
                        <DateRangePicker max={15} />
                    </div>
                     <div className="flex flex-col md:flex-row gap-2 items-end flex-grow md:flex-grow-0">
                         <div className="grid gap-2 flex-grow">
                            <Label>Order ID</Label>
                            <Input placeholder="Search by Order ID..." value={orderIdFilter} onChange={(e) => setOrderIdFilter(e.target.value)} />
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">
                                    <Filter className="mr-2 h-4 w-4" />
                                    Filter
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>Filter by Type</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                {ALL_TYPES.map(type => (
                                    <DropdownMenuCheckboxItem
                                        key={type}
                                        checked={selectedTypes.includes(type)}
                                        onSelect={(e) => e.preventDefault()}
                                        onCheckedChange={() => handleTypeToggle(type)}
                                    >
                                        {type}
                                    </DropdownMenuCheckboxItem>
                                ))}

                                <DropdownMenuSeparator />
                                <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                {ALL_STATUSES.map(status => (
                                    <DropdownMenuCheckboxItem
                                        key={status}
                                        checked={selectedStatuses.includes(status)}
                                        onSelect={(e) => e.preventDefault()}
                                        onCheckedChange={() => handleStatusToggle(status)}
                                    >
                                        {status}
                                    </DropdownMenuCheckboxItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
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
                {filteredOrders.map((order) => (
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
                        <div className="flex gap-1 justify-center">
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
                             <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <Download className="h-4 w-4" />
                                        <span className="sr-only">Download Invoice</span>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Download Invoice</p>
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
