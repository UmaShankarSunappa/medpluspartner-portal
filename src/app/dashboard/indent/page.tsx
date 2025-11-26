
"use client";

import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Trash2, Image as ImageIcon, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { products as mockProducts, type Product } from "@/lib/indent-data";
import { useIndent } from "@/context/IndentContext";
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
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function IndentPage() {
  const { toast } = useToast();
  const { orderItems, addToIndent, removeFromIndent, updateQuantity, clearIndent } = useIndent();
  const [open, setOpen] = useState(false);
  const [searchQuantities, setSearchQuantities] = useState<{ [key: string]: number }>({});

  const handleSearchQuantityChange = (productId: string, quantity: number) => {
    setSearchQuantities(prev => ({...prev, [productId]: Math.max(1, quantity)}));
  }

  const handleAddProduct = (product: Product) => {
    const quantity = searchQuantities[product.id] || 1;

    if (orderItems.some((item) => item.id === product.id)) {
      toast({
        variant: "destructive",
        title: "Product Already Added",
        description: `${product.name} is already in your order. You can adjust the quantity in the table below.`,
      });
      return;
    }
    addToIndent({ ...product, ordQty: quantity });
    setOpen(false); // Close the popover
    toast({
      title: "Product Added",
      description: `${quantity} x ${product.name} has been added to your indent.`,
    });
  };

  const grandTotal = useMemo(() => {
    return orderItems.reduce((total, item) => {
      const itemTotal = item.price * item.ordQty;
      const gstAmount = itemTotal * item.gstRate;
      return total + itemTotal + gstAmount;
    }, 0);
  }, [orderItems]);

  const handlePlaceOrder = () => {
    toast({
        title: "Order Placed Successfully!",
        description: "Your indent has been submitted."
    });
    clearIndent();
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div>
          <h1 className="font-headline text-3xl font-bold">Manual Indent</h1>
          <p className="text-muted-foreground">
            Create a new order by searching for products and adding them to your
            list.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Product Search</CardTitle>
            <CardDescription>
              Click the search bar to see all available products and add them to your order.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-start">
                    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                    Search for a product...
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                  <Command>
                    <CommandInput placeholder="Search by product name or ID..." />
                    <CommandList>
                      <CommandEmpty>No product found.</CommandEmpty>
                      <CommandGroup>
                        {mockProducts.map((product) => (
                          <CommandItem
                            key={product.id}
                            value={`${product.name} ${product.id}`}
                            onSelect={(currentValue) => {
                              // This onSelect is for filtering, we handle adding with our button
                              // setOpen(false) might be useful here if selection closes popover
                            }}
                            className="flex items-center justify-between p-3 border-b last:border-b-0"
                          >
                              <span className="flex-1 font-medium">{product.name}</span>
                              <div className="flex items-center gap-2">
                                  <Input
                                      type="number"
                                      min="1"
                                      placeholder="1"
                                      className="h-8 w-20 text-center"
                                      value={searchQuantities[product.id] || ''}
                                      onChange={(e) => handleSearchQuantityChange(product.id, parseInt(e.target.value))}
                                      onClick={(e) => e.stopPropagation()} // Prevent CommandItem from closing
                                  />
                                  <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={(e) => {
                                          e.stopPropagation();
                                          handleAddProduct(product);
                                      }}
                                  >
                                      Add
                                  </Button>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                                        <Heart className="h-5 w-5 text-destructive" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Add to Frequent Order List</p>
                                    </TooltipContent>
                                  </Tooltip>
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
            <CardTitle>Order Details</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">Type</TableHead>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Pack size</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">GST Amt</TableHead>
                  <TableHead className="w-[100px] text-center">Ord Qty</TableHead>
                  <TableHead className="text-center">Avail Qty</TableHead>
                  <TableHead className="text-center">Billed Qty</TableHead>
                  <TableHead className="text-center">Free Qty</TableHead>
                  <TableHead className="text-right">Tot GST Amt</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orderItems.length > 0 ? (
                  orderItems.map((item) => {
                    const itemTotal = item.price * item.ordQty;
                    const gstAmount = item.price * item.gstRate;
                    const totalGstAmount = gstAmount * item.ordQty;
                    const total = itemTotal + totalGstAmount;

                    return (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
                          <ImageIcon className="h-5 w-5 text-muted-foreground" />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.packSize}</TableCell>
                      <TableCell className="text-right">₹{item.price.toFixed(2)}</TableCell>
                      <TableCell className="text-right">₹{gstAmount.toFixed(2)}</TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          min="1"
                          value={item.ordQty}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                          className="text-center"
                        />
                      </TableCell>
                      <TableCell className="text-center">{item.availQty}</TableCell>
                      <TableCell className="text-center">{item.ordQty}</TableCell>
                      <TableCell className="text-center">0</TableCell>
                      <TableCell className="text-right">₹{totalGstAmount.toFixed(2)}</TableCell>
                      <TableCell className="text-right font-bold">₹{total.toFixed(2)}</TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => removeFromIndent(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  )})
                ) : (
                  <TableRow>
                    <TableCell colSpan={12} className="text-center h-24">
                      No products added to the order yet.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="flex justify-end items-center gap-4 p-4 border-t bg-card rounded-b-lg">
          <div className="text-right">
            <p className="text-muted-foreground">Grand Total</p>
            <p className="text-2xl font-bold">₹{grandTotal.toFixed(2)}</p>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                size="lg"
                disabled={orderItems.length === 0}
              >
                Place Order
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action will submit your indent. You cannot undo this action.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handlePlaceOrder}>Confirm Order</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </TooltipProvider>
  );
}
