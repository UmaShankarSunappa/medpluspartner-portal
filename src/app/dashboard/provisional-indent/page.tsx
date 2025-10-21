
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
import { provisionalIndentsData, type ProvisionalIndent } from "@/lib/data";
import { Eye, CheckCircle, Trash2, CreditCard } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
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
import { useToast } from "@/hooks/use-toast";

const availableCredit = 245000;
const totalIndentValue = provisionalIndentsData.reduce((acc, indent) => acc + indent.totalValue, 0);

export default function ProvisionalIndentPage() {
    const [selectedIndent, setSelectedIndent] = useState<ProvisionalIndent | null>(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isConfirmAlertOpen, setIsConfirmAlertOpen] = useState(false);
    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
    const { toast } = useToast();

    const handleViewClick = (indent: ProvisionalIndent) => {
        setSelectedIndent(indent);
        setIsViewModalOpen(true);
    };
    
    const handleConfirm = () => {
        toast({
            title: "Indent Confirmed",
            description: `Indent ${selectedIndent?.indentId} has been confirmed and converted to an order.`,
        });
        setIsViewModalOpen(false);
        setIsConfirmAlertOpen(false);
    };

    const handleDelete = () => {
        toast({
            variant: "destructive",
            title: "Indent Deleted",
            description: `Indent ${selectedIndent?.indentId} has been deleted.`,
        });
        setIsViewModalOpen(false);
        setIsDeleteAlertOpen(false);
    };


  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-headline text-3xl font-bold">Provisional Indent</h1>
        <p className="text-muted-foreground">
            Review and confirm automated draft orders based on your sales.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Credit Limit</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">₹{availableCredit.toLocaleString('en-IN')}</div>
            <p className="text-xs text-muted-foreground">Your current available credit</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Provisional Indent Value</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalIndentValue.toLocaleString('en-IN')}</div>
            <p className="text-xs text-muted-foreground">Combined value of all pending indents</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pending Indents</CardTitle>
          <CardDescription>
            Review and confirm your provisional indents.
          </CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Indent ID</TableHead>
                <TableHead>Date Created</TableHead>
                <TableHead>Store ID</TableHead>
                <TableHead className="text-right">Total Value</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {provisionalIndentsData.map((indent) => (
                <TableRow key={indent.indentId}>
                  <TableCell className="font-medium">{indent.indentId}</TableCell>
                  <TableCell>{indent.dateCreated}</TableCell>
                  <TableCell>{indent.storeId}</TableCell>
                  <TableCell className="text-right">₹{indent.totalValue.toLocaleString('en-IN')}</TableCell>
                  <TableCell>
                    <Badge variant="warning">{indent.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleViewClick(indent)}>
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View Indent</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

        {/* View Indent Modal */}
        <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
            <DialogContent className="sm:max-w-4xl">
                <DialogHeader>
                    <DialogTitle>Indent Details</DialogTitle>
                    <DialogDescription>
                    Products in provisional indent <span className="font-medium">{selectedIndent?.indentId}</span>. Review and confirm.
                    </DialogDescription>
                </DialogHeader>
                <div className="max-h-[60vh] overflow-y-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>SKU</TableHead>
                                <TableHead>Product Name</TableHead>
                                <TableHead>Pack Size</TableHead>
                                <TableHead className="text-right">MRP</TableHead>
                                <TableHead className="text-right">PTR</TableHead>
                                <TableHead className="text-center">Quantity</TableHead>
                                <TableHead className="text-right">Value</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {selectedIndent?.products?.map(product => (
                                <TableRow key={product.sku}>
                                    <TableCell>{product.sku}</TableCell>
                                    <TableCell className="font-medium">{product.name}</TableCell>
                                    <TableCell>{product.packSize}</TableCell>
                                    <TableCell className="text-right">₹{product.mrp.toLocaleString('en-IN')}</TableCell>
                                    <TableCell className="text-right">₹{product.ptr.toLocaleString('en-IN')}</TableCell>
                                    <TableCell className="text-center">{product.quantity}</TableCell>
                                    <TableCell className="text-right">₹{product.value.toLocaleString('en-IN')}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <DialogFooter className="flex-col sm:flex-row gap-4 sm:justify-start items-center bg-muted/50 p-4 rounded-b-lg">
                    <div className="text-left">
                        <p className="text-sm text-muted-foreground">Grand Total</p>
                        <p className="text-2xl font-bold">₹{selectedIndent?.totalValue.toLocaleString('en-IN')}</p>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>

        {/* Confirm Indent Alert */}
        <AlertDialog open={isConfirmAlertOpen} onOpenChange={setIsConfirmAlertOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to confirm this indent?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This will convert provisional indent <span className="font-medium">{selectedIndent?.indentId}</span> into a firm order. This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirm}>Confirm</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
        
        {/* Delete Indent Alert */}
        <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to delete this indent?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This will permanently delete provisional indent <span className="font-medium">{selectedIndent?.indentId}</span>. This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    </div>
  );
}
