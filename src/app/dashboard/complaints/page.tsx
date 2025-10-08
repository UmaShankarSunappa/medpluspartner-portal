
"use client";

import { useState } from "react";
import { MoreHorizontal, PlusCircle } from "lucide-react";
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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { complaintsData, type Complaint } from "@/lib/data";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const statusVariant: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
    "Resolved": "default",
    "In Progress": "secondary",
};

export default function ComplaintsPage() {
    const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);

    const handleViewClick = (complaint: Complaint) => {
        setSelectedComplaint(complaint);
        setIsViewModalOpen(true);
    };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline text-3xl font-bold">Complaints</h1>
          <p className="text-muted-foreground">
            Raise and track your queries and complaints.
          </p>
        </div>
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    New Complaint
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                <DialogTitle>Create a New Complaint</DialogTitle>
                <DialogDescription>
                    Fill out the details below. Our team will get back to you shortly.
                </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                         <Select>
                            <SelectTrigger id="department">
                                <SelectValue placeholder="Select a department" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="warehouse">Warehouse</SelectItem>
                                <SelectItem value="accounts">Accounts</SelectItem>
                                <SelectItem value="logistics">Logistics</SelectItem>
                                <SelectItem value="support">Technical Support</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input id="subject" placeholder="e.g., Damaged stock in order XYZ" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" placeholder="Provide a detailed description of your issue..." />
                    </div>
                </div>
                <DialogFooter>
                <Button type="submit">Submit Complaint</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Complaints</CardTitle>
          <CardDescription>
            A list of your recent complaints and their status.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Complaint ID</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {complaintsData.map((complaint) => (
                <TableRow key={complaint.complaintId}>
                  <TableCell className="font-medium">{complaint.complaintId}</TableCell>
                  <TableCell>{complaint.dateTime}</TableCell>
                  <TableCell>{complaint.department}</TableCell>
                  <TableCell>{complaint.subject}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[complaint.status] || 'secondary'}>
                      {complaint.status}
                    </Badge>
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
                        <DropdownMenuItem onClick={() => handleViewClick(complaint)}>View Details</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View Complaint Modal */}
        <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Complaint Details</DialogTitle>
                    <DialogDescription>
                        Details and activity for complaint <span className="font-medium">{selectedComplaint?.complaintId}</span>
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-muted-foreground">Status</p>
                            <Badge variant={selectedComplaint?.status ? statusVariant[selectedComplaint.status] : 'secondary'}>
                                {selectedComplaint?.status}
                            </Badge>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-muted-foreground">Department</p>
                            <p className="font-semibold">{selectedComplaint?.department}</p>
                        </div>
                         <div className="space-y-1">
                            <p className="text-sm font-medium text-muted-foreground">Date Raised</p>
                            <p className="font-semibold">{selectedComplaint?.dateTime}</p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <h4 className="font-semibold">Subject: {selectedComplaint?.subject}</h4>
                        <p className="text-sm text-muted-foreground bg-slate-50 p-4 rounded-md border">
                            {selectedComplaint?.description}
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Activity Log</h4>
                        <div className="relative pl-6">
                            <div className="absolute left-9 top-0 h-full w-px bg-border -translate-x-1/2"></div>
                            {selectedComplaint?.activityLog?.map((activity, index) => (
                                <div key={index} className="relative flex items-start gap-4 mb-6">
                                     <div className="z-10 h-3 w-3 mt-1.5 rounded-full bg-primary ring-4 ring-background" />
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center">
                                            <p className="font-semibold">{activity.user}</p>
                                            <time className="text-xs text-muted-foreground">{activity.date}</time>
                                        </div>
                                        <p className="text-sm text-muted-foreground">{activity.activity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={() => setIsViewModalOpen(false)}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
  );
}
