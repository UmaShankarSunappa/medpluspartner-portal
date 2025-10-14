
"use client";

import { useState, useMemo } from "react";
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
import { Search, Trash2, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { products as mockProducts, type Product } from "@/lib/indent-data";

type OrderItem = Product & {
  ordQty: number;
};

export default function IndentPage() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [searchQuantities, setSearchQuantities] = useState<{ [key: string]: number }>({});

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }
    const results = mockProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
    // Reset quantities for new search
    setSearchQuantities({});
  };
  
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
    setOrderItems((prev) => [...prev, { ...product, ordQty: quantity }]);
    setSearchTerm("");
    setSearchResults([]);
    toast({
      title: "Product Added",
      description: `${quantity} x ${product.name} has been added to your indent.`,
    });
  };

  const handleRemoveItem = (productId: string) => {
    setOrderItems((prev) => prev.filter((item) => item.id !== productId));
  };
  
  const handleQuantityChange = (productId: string, newQty: number) => {
    setOrderItems(prev => prev.map(item => 
      item.id === productId ? { ...item, ordQty: Math.max(0, newQty) } : item
    ));
  };

  const grandTotal = useMemo(() => {
    return orderItems.reduce((total, item) => {
      const itemTotal = item.price * item.ordQty;
      const gstAmount = itemTotal * item.gstRate;
      return total + itemTotal + gstAmount;
    }, 0);
  }, [orderItems]);

  const handlePlaceOrder = () => {
    alert("Order Placed Successfully!");
    setOrderItems([]);
  };

  return (
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
            Search for products by name or ID to add them to your order.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Search by product name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button onClick={handleSearch}>
              <Search className="mr-2" /> Search
            </Button>
          </div>
          {searchResults.length > 0 && (
            <div className="mt-4 border rounded-md max-h-60 overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead className="w-[100px] text-center">Quantity</TableHead>
                    <TableHead className="w-[80px] text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {searchResults.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          min="1"
                          placeholder="1"
                          className="text-center"
                          value={searchQuantities[product.id] || ''}
                          onChange={(e) => handleSearchQuantityChange(product.id, parseInt(e.target.value))}
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleAddProduct(product)}
                        >
                          Add
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
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
                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
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
                        onClick={() => handleRemoveItem(item.id)}
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
        <Button
          size="lg"
          onClick={handlePlaceOrder}
          disabled={orderItems.length === 0}
        >
          Place Order
        </Button>
      </div>
    </div>
  );
}
