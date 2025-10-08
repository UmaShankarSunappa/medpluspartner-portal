
import { Download, Search } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { invoices as invoicesData } from "@/lib/data";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Label } from "@/components/ui/label";

export default function InvoicesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-headline text-3xl font-bold">Invoices</h1>
        <p className="text-muted-foreground">
          Manage your order and membership fee invoices.
        </p>
      </div>

      <Tabs defaultValue="order" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-sm">
          <TabsTrigger value="order">Order Invoices</TabsTrigger>
          <TabsTrigger value="membership">Membership Fee Invoices</TabsTrigger>
        </TabsList>
        <TabsContent value="order">
          <Card>
            <CardHeader>
              <CardTitle>Order Invoices (From Warehouse)</CardTitle>
              <CardDescription>
                Search and download invoices for your orders.
              </CardDescription>
              <div className="flex flex-col md:flex-row gap-4 items-end pt-4">
                  <div className="grid gap-2 w-full md:w-auto">
                      <Label htmlFor="date-range">Date Range</Label>
                      <DateRangePicker />
                  </div>
                  <div className="grid gap-2 w-full md:w-auto">
                      <Label htmlFor="search-invoice-id">Invoice ID</Label>
                      <div className="relative">
                          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="Search..." id="search-invoice-id" className="pl-8" />
                      </div>
                  </div>
                   <div className="grid gap-2 w-full md:w-auto">
                      <Label htmlFor="search-order-id">Order ID</Label>
                      <div className="relative">
                          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="Search..." id="search-order-id" className="pl-8" />
                      </div>
                  </div>
                  <Button>Search</Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoicesData.order.map((invoice) => (
                    <TableRow key={invoice.invoiceId}>
                      <TableCell className="font-medium">{invoice.invoiceId}</TableCell>
                      <TableCell>{invoice.orderId}</TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>
                        <Badge variant={invoice.status === 'Paid' ? 'default' : 'destructive'}>{invoice.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">₹{invoice.amount.toLocaleString('en-IN')}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="icon">
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Download</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="membership">
          <Card>
            <CardHeader>
              <CardTitle>Membership Agent Fee Invoices (To Franchisor)</CardTitle>
              <CardDescription>
                Review and accept your commission invoices.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoicesData.membership.map((invoice) => (
                    <TableRow key={invoice.invoiceId}>
                      <TableCell className="font-medium">{invoice.invoiceId}</TableCell>
                      <TableCell>{invoice.period}</TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>
                        <Badge variant={invoice.status === 'Paid' ? 'default' : 'secondary'}>{invoice.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">₹{invoice.amount.toLocaleString('en-IN')}</TableCell>
                      <TableCell className="text-right">
                         {invoice.status === 'Generated' ? (
                          <Button size="sm">Accept & Generate PDF</Button>
                        ) : (
                          <Button variant="outline" size="sm" disabled>Accepted</Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
