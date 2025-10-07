import { MoreHorizontal } from "lucide-react";
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
import { returns as returnsData } from "@/lib/data";

const statusVariant: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
    "Approved": "default",
    "Pending": "secondary",
    "Rejected": "destructive",
};

export default function ReturnsPage() {
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
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Total Value</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {returnsData.map((ret) => (
                <TableRow key={ret.returnId}>
                  <TableCell className="font-medium">{ret.returnId}</TableCell>
                  <TableCell>{ret.date}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[ret.status] || 'secondary'}>
                      {ret.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    ₹{ret.total.toLocaleString('en-IN')}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
