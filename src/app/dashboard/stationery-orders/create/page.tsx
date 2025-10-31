
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { Input } from "@/components/ui/input";
import { stationeryItemsData as mockItems, type StationeryItem } from "@/lib/data";
import { ArrowLeft, Search, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useStationeryOrder } from "@/context/StationeryOrderContext";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function CreateStationeryOrderPage() {
    const router = useRouter();
    const { toast } = useToast();
    const { orderItems, addToOrder, removeFromOrder, updateQuantity, clearOrder } = useStationeryOrder();
    
    const [openSearch, setOpenSearch] = useState(false);
    const [searchQuantities, setSearchQuantities] = useState<{ [key: string]: number }>({});

    const handleSearchQuantityChange = (itemCode: string, quantity: number) => {
        setSearchQuantities(prev => ({...prev, [itemCode]: Math.max(1, quantity)}));
    };

    const handleAddItem = (item: StationeryItem) => {
        const quantity = searchQuantities[item.code] || 1;

        if (orderItems.some(i => i.code === item.code)) {
            toast({
                variant: "destructive",
                title: "Item Already Added",
                description: `${item.name} is already in your order. You can adjust the quantity below.`,
            });
            return;
        }

        addToOrder({ ...item, quantity, cost: 0 }); // Cost will be calculated later or comes from a price list
        setOpenSearch(false);
        toast({
            title: "Item Added",
            description: `${quantity} x ${item.name} added to your order.`,
        });
    };

    const grandTotal = useMemo(() => {
        // Assuming a mock cost for now, as it's not in the base data.
        // In a real app, you'd fetch this or have it in your data.
        const mockPriceList: { [code: string]: number } = {
            "PRIN0040": 50, "BILL0009": 135, "PRIN0061": 240,
            "PRIN0062": 250, "REGI0022": 140, "STAT0034": 80, "STAT0035": 120
        };
        return orderItems.reduce((total, item) => {
            const price = mockPriceList[item.code] || 0;
            return total + (price * item.quantity);
        }, 0);
    }, [orderItems]);

    const handleSubmitOrder = () => {
        toast({
            title: "Order Submitted Successfully!",
            description: "Your stationery order has been submitted for approval.",
        });
        clearOrder();
        router.push("/dashboard/stationery-orders");
    };
    
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" asChild>
                    <Link href="/dashboard/stationery-orders">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Back</span>
                    </Link>
                </Button>
                <div>
                    <h1 className="font-headline text-3xl font-bold">Create New Stationery Order</h1>
                    <p className="text-muted-foreground">
                        Search for stationery items and add quantities to your order.
                    </p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Search Items</CardTitle>
                    <CardDescription>
                        Click the search bar to find and add stationery items to your order.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Popover open={openSearch} onOpenChange={setOpenSearch}>
                        <PopoverTrigger asChild>
                            <Button variant="outline" role="combobox" aria-expanded={openSearch} className="w-full justify-start">
                                <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                                Search for an item...
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                            <Command>
                                <CommandInput placeholder="Search by name or code..." />
                                <CommandList>
                                    <CommandEmpty>No item found.</CommandEmpty>
                                    <CommandGroup>
                                        {mockItems.map((item) => (
                                            <CommandItem
                                                key={item.code}
                                                value={`${item.name} ${item.code}`}
                                                className="flex items-center justify-between p-3 border-b"
                                            >
                                                <div className="flex-1">
                                                    <p className="font-medium">{item.name}</p>
                                                    <p className="text-xs text-muted-foreground">{item.code}</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Input
                                                        type="number"
                                                        min="1"
                                                        placeholder="1"
                                                        className="h-8 w-20 text-center"
                                                        value={searchQuantities[item.code] || ''}
                                                        onChange={(e) => handleSearchQuantityChange(item.code, parseInt(e.target.value))}
                                                        onClick={(e) => e.stopPropagation()}
                                                    />
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={(e) => { e.stopPropagation(); handleAddItem(item); }}
                                                    >
                                                        Add
                                                    </Button>
                                                </div>
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Order Items</CardTitle>
                    <CardDescription>Review the items in your order cart.</CardDescription>
                </CardHeader>
                <CardContent className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Code</TableHead>
                                <TableHead>Product Name</TableHead>
                                <TableHead>UoM</TableHead>
                                <TableHead className="w-[150px] text-center">Order Quantity</TableHead>
                                <TableHead className="text-center">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orderItems.length > 0 ? (
                                orderItems.map((item) => (
                                    <TableRow key={item.code}>
                                        <TableCell>{item.code}</TableCell>
                                        <TableCell className="font-medium">{item.name}</TableCell>
                                        <TableCell>{item.uom}</TableCell>
                                        <TableCell className="text-center">
                                            <Input 
                                                type="number" 
                                                min="1"
                                                className="text-center"
                                                value={item.quantity}
                                                onChange={(e) => updateQuantity(item.code, parseInt(e.target.value))}
                                            />
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Button variant="destructive" size="icon" onClick={() => removeFromOrder(item.code)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center h-24">
                                        No items added to the order yet.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <div className="flex justify-end items-center gap-4 p-4 border-t bg-card rounded-b-lg">
                 <Button variant="outline" asChild>
                    <Link href="/dashboard/stationery-orders">Cancel</Link>
                </Button>
                 <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button size="lg" disabled={orderItems.length === 0}>
                            Submit Order
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure you want to submit?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This will submit your stationery order for approval.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleSubmitOrder}>Confirm Submission</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    );
}
