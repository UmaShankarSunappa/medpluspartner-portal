"use client";

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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { ordersData } from "@/lib/data";
import { CalendarIcon, Eye, MoreHorizontal, RefreshCw, Search, Track } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";

const statusVariant: { [key: string]: "default" | "secondary" | "destructive" | "outline" | "success" | "warning" | "info" } = {
    "Delivered": "success",
    "Shipped": "info",
    "Processing": "warning",
    "Cancelled": "destructive",
    "In Transit": "info",
};

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Order History</h1>
          <p className="text-muted-foreground">View and track all your orders</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search Orders</CardTitle>
          <CardDescription>Filter orders by date range (maximum 15 days)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="grid gap-2">
              <Label htmlFor="start-date">Start Date</Label>
              <DatePicker placeholder="dd-mm-yyyy" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="end-date">End Date</Label>
              <DatePicker placeholder="dd-mm-yyyy" />
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
          <CardDescription>Your order history and details</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Web Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Actions</TableHead>
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
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Track className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
