
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
import { returns as returnsData, type Return } from "@/lib/data";
import { Eye, Search } from "lucide-react";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const statusVariant: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
    "Approved": "default",
    "Pending": "secondary",
    "Rejected": "destructive",
};

export default function ReturnsPage() {
    const [selectedReturn, setSelectedReturn] = useState<Return | null>(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);

    const handleViewClick = (ret: Return) => {
        setSelectedReturn(ret);
        setIsViewModalOpen(true);
    };

  return (
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
        <CardContent>
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
                <TableHead className="text-right">Action</TableHead>
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
                  <TableCell className="text-right">
                    <Button variant="outline" size="icon" onClick={() => handleViewClick(ret)}>
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View Details</span>
                    </Button>
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

    </div>
  );
}
