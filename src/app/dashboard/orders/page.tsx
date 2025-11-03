
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
import { ordersData, type Order } from "@/lib/data";
import { Eye, RefreshCw, Truck, CheckCircle, Package, Download, TrendingUp, Filter, XCircle, PackageCheck, PackageSearch } from "lucide-react";
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
    const [dateRange, setDateRange] = useState<DateRange | undefined>();
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

    useEffect(() => {
        let newFilteredOrders = ordersData;

        // Date Range filter
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
    
    const dynamicOrderSummary = useMemo(() => {
        const summary: { [key: string]: { orderType: string; totalOrders: number; delivered: number; inTransit: number; cancelled: number; } } = {};

        const initializeSummary = (type: string) => {
            if (!summary[type]) {
                summary[type] = { orderType: type, totalOrders: 0, delivered: 0, inTransit: 0, cancelled: 0 };
            }
        };

        ALL_TYPES.forEach(type => initializeSummary(type));

        filteredOrders.forEach(order => {
            initializeSummary(order.type);
            summary[order.type].totalOrders++;

            if (order.status === "Order Replenished" || order.status === "Order Delivered") {
                summary[order.type].delivered++;
            } else if (order.status === "Cancelled") {
                summary[order.type].cancelled++;
            } else { // In Transit includes created, picked, dispatched
                summary[order.type].inTransit++;
            }
        });

        const allOrdersSummary = Object.values(summary).reduce((acc, curr) => {
            acc.totalOrders += curr.totalOrders;
            acc.delivered += curr.delivered;
            acc.inTransit += curr.inTransit;
            acc.cancelled += curr.cancelled;
            return acc;
        }, { orderType: "All Orders", totalOrders: 0, delivered: 0, inTransit: 0, cancelled: 0 });

        return [...Object.values(summary).filter(s => s.totalOrders > 0), allOrdersSummary];

    }, [filteredOrders]);


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
        setSelectedStatuses(prev => prev.includes(status) ? prev.filter(s => s !== status) : [...prev, s]);
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
                <CardDescription>Filter orders by date range, type, and status.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col md:flex-row gap-2 items-end justify-between">
                     <div className="grid gap-2">
                        <Label>Date Range</Label>
                        <DateRangePicker onSelect={setDateRange} value={dateRange} max={15} />
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
                <CardTitle className="flex items-center gap-2 text-xl font-bold">
                    <TrendingUp className="h-5 w-5" />
                    Order Summary
                </CardTitle>
                 <CardDescription>This summary reflects the currently filtered orders below.</CardDescription>
            </CardHeader>
            <CardContent>
                 <div className="grid grid-cols-5 gap-4 bg-muted/50 p-4 rounded-t-lg font-semibold text-muted-foreground">
                    <div className="col-span-1">Order Type</div>
                    <div className="text-center flex items-center justify-center gap-1"><Package className="h-4 w-4" />Total</div>
                    <div className="text-center flex items-center justify-center gap-1"><PackageCheck className="h-4 w-4" />Delivered</div>
                    <div className="text-center flex items-center justify-center gap-1"><PackageSearch className="h-4 w-4" />In Transit</div>
                    <div className="text-center flex items-center justify-center gap-1"><XCircle className="h-4 w-4" />Cancelled</div>
                </div>
                <div className="divide-y divide-border">
                    {dynamicOrderSummary.map((summary) => (
                        <div key={summary.orderType} className={`grid grid-cols-5 gap-4 p-4 items-center transition-colors duration-200 hover:bg-muted/30 ${summary.orderType === 'All Orders' ? 'bg-primary/10 font-bold' : ''}`}>
                            <div className="col-span-1">{summary.orderType}</div>
                            <div className="text-center text-base">{summary.totalOrders}</div>
                            <div className="text-center text-base">{summary.delivered}</div>
                            <div className="text-center text-base">{summary.inTransit}</div>
                            <div className="text-center text-base">{summary.cancelled}</div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>


        <Card>
            <CardHeader>
            <CardTitle>Orders</CardTitle>
            <CardDescription>Your order history and details</CardDescription>
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
                {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
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
                ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                            No orders found for the selected filters.
                        </TableCell>
                    </TableRow>
                )}
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
