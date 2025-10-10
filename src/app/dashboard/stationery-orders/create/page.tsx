
"use client";

import { useState } from "react";
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
import { Label } from "@/components/ui/label";
import { stationeryItemsData, accountProfile } from "@/lib/data";
import { ArrowLeft, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function CreateStationeryOrderPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [orderQuantities, setOrderQuantities] = useState<{ [key: string]: number }>({});
    const currentDate = new Date().toLocaleDateString('en-CA');

    const handleQuantityChange = (code: string, value: string) => {
        const quantity = parseInt(value, 10);
        setOrderQuantities(prev => ({ ...prev, [code]: isNaN(quantity) ? 0 : quantity }));
    };

    const handleSubmit = () => {
        // Basic validation
        const itemsOrdered = Object.values(orderQuantities).some(qty => qty > 0);
        if (!itemsOrdered) {
            toast({
                variant: "destructive",
                title: "No Items Selected",
                description: "Please enter a quantity for at least one item.",
            });
            return;
        }

        toast({
            title: "Order Submitted",
            description: "Your stationery order has been submitted for approval.",
        });
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
                    <CardTitle>Order Details & Search</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label>Franchise Store ID</Label>
                            <Input value={accountProfile.licenseDetails.storeId} readOnly />
                        </div>
                         <div className="space-y-2">
                            <Label>Store Name</Label>
                            <Input value={accountProfile.personalDetails.businessName} readOnly />
                        </div>
                         <div className="space-y-2">
                            <Label>Order Date</Label>
                            <Input value={currentDate} readOnly />
                        </div>
                    </div>
                     <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search by Product Code or Name..." className="pl-8" />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Stationery Items</CardTitle>
                    <CardDescription>Enter the quantity for each item you want to order.</CardDescription>
                </CardHeader>
                <CardContent className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Code</TableHead>
                                <TableHead>Product Name</TableHead>
                                <TableHead>UoM</TableHead>
                                <TableHead className="text-center">Example Qty</TableHead>
                                <TableHead className="w-[150px] text-center">Order Quantity</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {stationeryItemsData.map((item) => (
                                <TableRow key={item.code}>
                                    <TableCell>{item.code}</TableCell>
                                    <TableCell className="font-medium">{item.name}</TableCell>
                                    <TableCell>{item.uom}</TableCell>
                                    <TableCell className="text-center">{item.example}</TableCell>
                                    <TableCell className="text-center">
                                        <Input 
                                            type="number" 
                                            min="0"
                                            className="text-center"
                                            placeholder="0"
                                            value={orderQuantities[item.code] || ''}
                                            onChange={(e) => handleQuantityChange(item.code, e.target.value)}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <div className="flex justify-end gap-2">
                 <Button variant="outline" asChild>
                    <Link href="/dashboard/stationery-orders">Cancel</Link>
                </Button>
                <Button onClick={handleSubmit}>Submit Order</Button>
            </div>
        </div>
    );
}
