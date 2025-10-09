
"use client";

import { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { fieldVisitReportsData, type FieldVisitReport } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Download, MessageSquare, Star } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function FieldVisitReportsPage() {
  const [selectedReport, setSelectedReport] = useState<FieldVisitReport | null>(null);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

  const calculateAverageRating = (report: FieldVisitReport) => {
    const ratings = Object.values(report.ratings);
    const total = ratings.reduce((acc, rating) => acc + rating, 0);
    return total / ratings.length;
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return "bg-green-500 text-white";
    if (rating >= 3) return "bg-yellow-500 text-white";
    return "bg-red-500 text-white";
  };

  const getTruncatedRemarks = (report: FieldVisitReport) => {
    const allRemarks = Object.values(report.remarks).filter(Boolean);
    if (report.sopDeviation) allRemarks.push(report.sopDeviation);
    if (report.otherObservations) allRemarks.push(report.otherObservations);
    return allRemarks.length > 0 ? allRemarks[0] : "No remarks";
  };

  const handleDownload = (report: FieldVisitReport) => {
    if (!report) return;

    const headers = ["Field", "Value", "Remarks"];

    const rows = [
      ["Visit Date & Time", report.visitDateTime, ""],
      ["Employee Name", report.employeeName, ""],
      ["Franchisee Store Name", report.storeName, ""],
      ["Local Head Name", report.localHeadName, ""],
      [
        "Store Environment",
        report.ratings.storeEnvironment.toString(),
        report.remarks.storeEnvironment || "",
      ],
      [
        "Staff Grooming",
        report.ratings.staffGrooming.toString(),
        report.remarks.staffGrooming || "",
      ],
      [
        "Staff Quality",
        report.ratings.staffQuality.toString(),
        report.remarks.staffQuality || "",
      ],
      ["Staff Present", report.staffPresent.toString(), ""],
      [
        "PVT Label Promotions – Pharma",
        report.ratings.pvtLabelPharma.toString(),
        report.remarks.pvtLabelPharma || "",
      ],
      [
        "PVT Label Promotions – Non-Pharma",
        report.ratings.pvtLabelNonPharma.toString(),
        report.remarks.pvtLabelNonPharma || "",
      ],
      ["TO’s Replenishment Status", report.replenishmentStatus, ""],
      [
        "Outstanding Payments",
        report.outstandingPayments,
        report.outstandingPaymentsRemarks || "",
      ],
      ["Observation on SOP Deviation", report.sopDeviation || "N/A", ""],
      ["Any Other Observations", report.otherObservations || "N/A", ""],
    ];

    let csvContent = headers.join(",") + "\n";
    csvContent += rows.map((e) => e.map((cell) => `"${cell}"`).join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `field-visit-report-${report.id}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCommentClick = (report: FieldVisitReport) => {
    setSelectedReport(report);
    setIsCommentModalOpen(true);
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div>
          <h1 className="font-headline text-3xl font-bold">Field Visit Reports</h1>
          <p className="text-muted-foreground">Review submissions from the field team.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Visit Reports</CardTitle>
            <CardDescription>A summary of all recent field visits.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Visit Date & Time</TableHead>
                  <TableHead>Employee</TableHead>
                  <TableHead>Store</TableHead>
                  <TableHead>Overall Rating</TableHead>
                  <TableHead>Remarks Summary</TableHead>
                  <TableHead className="text-center">Comments</TableHead>
                  <TableHead className="text-right">Download</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fieldVisitReportsData.map((report) => {
                  const avgRating = calculateAverageRating(report);
                  return (
                    <TableRow key={report.id}>
                      <TableCell>{new Date(report.visitDateTime).toLocaleString()}</TableCell>
                      <TableCell>{report.employeeName}</TableCell>
                      <TableCell>
                        <div>{report.storeName}</div>
                        <div className="text-xs text-muted-foreground">{report.storeId}</div>
                      </TableCell>
                      <TableCell>
                        <Badge className={cn(getRatingColor(avgRating))}>
                          {avgRating.toFixed(1)} <Star className="h-3 w-3 ml-1" />
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <p className="w-48 truncate text-sm text-muted-foreground">
                          {getTruncatedRemarks(report)}
                        </p>
                      </TableCell>
                      <TableCell className="text-center">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" onClick={() => handleCommentClick(report)}>
                              <MessageSquare className="h-5 w-5 text-primary" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>View/Add Comments</p>
                          </TooltipContent>
                        </Tooltip>
                      </TableCell>
                      <TableCell className="text-right">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" onClick={() => handleDownload(report)}>
                              <Download className="h-4 w-4" />
                              <span className="sr-only">Download Report</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Download as CSV</TooltipContent>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isCommentModalOpen} onOpenChange={setIsCommentModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Franchisee Comments</DialogTitle>
            <DialogDescription>
              Viewing comments for report #{selectedReport?.id}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Existing Comments</h4>
              {selectedReport?.franchiseeComments && selectedReport.franchiseeComments.length > 0 ? (
                <div className="space-y-3 rounded-md border p-3">
                  {selectedReport.franchiseeComments.map((comment, index) => (
                    <div key={index}>
                      <p className="text-sm">{comment.text}</p>
                      <p className="text-xs text-muted-foreground mt-1">{new Date(comment.date).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No comments yet.</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-comment">Add a Comment</Label>
              <Textarea id="new-comment" placeholder="Type your comment here..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCommentModalOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsCommentModalOpen(false)}>Submit Comment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}
