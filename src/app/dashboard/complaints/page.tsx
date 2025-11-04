
"use client";

import { useState } from "react";
import { MoreHorizontal, PlusCircle, MessageCircle, Clock, Check, RefreshCcw } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { complaintsData, type Complaint } from "@/lib/data";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const statusVariant: { [key: string]: "default" | "secondary" | "destructive" | "outline" | "warning" | "success" | "info" } = {
    "Closed": "success",
    "In Progress": "secondary",
    "Awaiting Your Response": "warning",
    "Reopened": "info",
};

export default function ComplaintsPage() {
    const [complaints, setComplaints] = useState<Complaint[]>(complaintsData);
    const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isAcceptAlertOpen, setIsAcceptAlertOpen] = useState(false);
    const [isReopenModalOpen, setIsReopenModalOpen] = useState(false);

    const handleViewClick = (complaint: Complaint) => {
        setSelectedComplaint(complaint);
        setIsViewModalOpen(true);
    };

    const handleAcceptClosure = () => {
        if (!selectedComplaint) return;
        setComplaints(prev => prev.map(c => c.complaintId === selectedComplaint.complaintId ? {...c, status: "Closed"} : c));
        setIsAcceptAlertOpen(false);
        setIsViewModalOpen(false);
    };

    const handleReopenSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const reason = formData.get("reopen-reason") as string;
        if (!selectedComplaint || !reason.trim()) return;

        const newActivity = {
            date: new Date().toLocaleString(),
            activity: `Reopened: ${reason}`,
            user: "Anand Sharma"
        };
        
        setComplaints(prev => prev.map(c => 
            c.complaintId === selectedComplaint.complaintId 
            ? { ...c, status: "Reopened", activityLog: [newActivity, ...c.activityLog] } 
            : c
        ));
        setIsReopenModalOpen(false);
        setIsViewModalOpen(false);
    };


  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
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
                                <SelectItem value="support">Technical Support</SelectItem>
                                <SelectItem value="logistics">Logistics</SelectItem>
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
                    <div className="space-y-2">
                        <Label htmlFor="attachment">Attachment (Optional)</Label>
                        <Input id="attachment" type="file" />
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
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Complaint ID</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {complaints.map((complaint) => (
                <TableRow key={complaint.complaintId}>
                  <TableCell className="font-medium">{complaint.complaintId}</TableCell>
                   <TableCell>{complaint.department}</TableCell>
                  <TableCell>{complaint.dateTime}</TableCell>
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
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                <DialogTitle>Complaint #{selectedComplaint?.complaintId}</DialogTitle>
                <DialogDescription>
                    Status: <Badge variant={statusVariant[selectedComplaint?.status || ''] || 'secondary'}>{selectedComplaint?.status}</Badge>
                </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4 max-h-[60vh] overflow-y-auto pr-4">
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg">Details</h3>
                        <div className="space-y-2">
                            <p className="text-sm font-medium text-muted-foreground">Subject</p>
                            <p className="text-sm">{selectedComplaint?.subject}</p>
                        </div>
                        <div className="space-y-2">
                             <p className="text-sm font-medium text-muted-foreground">Description</p>
                            <p className="text-sm">{selectedComplaint?.description}</p>
                        </div>
                    </div>
                    
                    <Separator />

                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg">Activity Log</h3>
                        <div className="relative pl-6">
                             <div className="absolute left-9 top-0 h-full w-0.5 bg-border -translate-x-1/2"></div>
                            {selectedComplaint?.activityLog.map((log, index) => (
                                <div key={index} className="relative flex items-start gap-4 mb-6">
                                     <div className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                        <MessageCircle className="h-4 w-4" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <p className="font-semibold text-sm">{log.user}</p>
                                            <time className="text-xs text-muted-foreground flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                {log.date}
                                            </time>
                                        </div>
                                        <p className="text-sm text-muted-foreground">{log.activity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                 {selectedComplaint?.status === 'Awaiting Your Response' ? (
                    <DialogFooter className="flex-col sm:flex-row gap-2">
                        <Button variant="outline" onClick={() => setIsReopenModalOpen(true)}>
                            <RefreshCcw className="mr-2 h-4 w-4" />
                            Reopen
                        </Button>
                        <Button onClick={() => setIsAcceptAlertOpen(true)}>
                            <Check className="mr-2 h-4 w-4" />
                            Accept Closure
                        </Button>
                    </DialogFooter>
                ) : (
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>Close</Button>
                    </DialogFooter>
                )}
            </DialogContent>
        </Dialog>
        
        {/* Accept Closure Alert */}
        <AlertDialog open={isAcceptAlertOpen} onOpenChange={setIsAcceptAlertOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This will permanently close the complaint ticket. You won't be able to reopen it after this.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleAcceptClosure}>Confirm</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
        
        {/* Reopen Complaint Modal */}
        <Dialog open={isReopenModalOpen} onOpenChange={setIsReopenModalOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Reopen Complaint</DialogTitle>
                    <DialogDescription>
                        Please provide a reason for reopening this complaint.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleReopenSubmit}>
                    <div className="py-4">
                        <Label htmlFor="reopen-reason">Reason</Label>
                        <Textarea id="reopen-reason" name="reopen-reason" placeholder="Explain why the resolution is not satisfactory..." required />
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setIsReopenModalOpen(false)}>Cancel</Button>
                        <Button type="submit">Submit and Reopen</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    </div>
  );
}
