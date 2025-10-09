
"use client";

import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { fieldVisitReportsData, type FieldVisitReport } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Clock, Download, MessageSquare, PlusCircle, Star, SortAsc, SortDesc, ClipboardList } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

type SortOrder = "newest" | "oldest" | "highest-rated" | "lowest-rated";

const ReportDetailItem = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 border-b">
    <p className="text-sm font-medium text-muted-foreground">{label}</p>
    <p className="text-sm text-foreground text-left sm:text-right">{value}</p>
  </div>
);

export default function FieldVisitReportsPage() {
  const [selectedReport, setSelectedReport] = useState<FieldVisitReport | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [newComment, setNewComment] = useState("");
  
  const getRatingColor = (rating: number) => {
    if (rating >= 4) return "bg-green-500";
    if (rating >= 3) return "bg-yellow-500";
    return "bg-red-500";
  };
  
  const sortedReports = useMemo(() => {
    return [...fieldVisitReportsData].sort((a, b) => {
      const getAvgRating = (report: FieldVisitReport) => {
        const ratings = Object.values(report.ratings);
        return ratings.reduce((sum, r) => sum + r, 0) / ratings.length;
      };

      switch (sortOrder) {
        case "oldest":
          return new Date(a.visitDateTime).getTime() - new Date(b.visitDateTime).getTime();
        case "highest-rated":
          return getAvgRating(b) - getAvgRating(a);
        case "lowest-rated":
          return getAvgRating(a) - getAvgRating(b);
        case "newest":
        default:
          return new Date(b.visitDateTime).getTime() - new Date(a.visitDateTime).getTime();
      }
    });
  }, [sortOrder]);


  const calculateAverageRating = (report: FieldVisitReport) => {
    const ratings = Object.values(report.ratings);
    const total = ratings.reduce((acc, rating) => acc + rating, 0);
    return (total / ratings.length).toFixed(1);
  };

  const handleDownload = () => {
    if (!selectedReport) return;

    const headers = [
        "Field", "Value", "Remarks"
    ];
    
    const rows = [
        ["Visit Date & Time", selectedReport.visitDateTime, ""],
        ["Employee Name", selectedReport.employeeName, ""],
        ["Franchisee Store Name", selectedReport.storeName, ""],
        ["Local Head Name", selectedReport.localHeadName, ""],
        ["Store Environment", selectedReport.ratings.storeEnvironment.toString(), selectedReport.remarks.storeEnvironment || ""],
        ["Staff Grooming", selectedReport.ratings.staffGrooming.toString(), selectedReport.remarks.staffGrooming || ""],
        ["Staff Quality", selectedReport.ratings.staffQuality.toString(), selectedReport.remarks.staffQuality || ""],
        ["Staff Present", selectedReport.staffPresent.toString(), ""],
        ["PVT Label Promotions – Pharma", selectedReport.ratings.pvtLabelPharma.toString(), selectedReport.remarks.pvtLabelPharma || ""],
        ["PVT Label Promotions – Non-Pharma", selectedReport.ratings.pvtLabelNonPharma.toString(), selectedReport.remarks.pvtLabelNonPharma || ""],
        ["TO’s Replenishment Status", selectedReport.replenishmentStatus, ""],
        ["Outstanding Payments", selectedReport.outstandingPayments, selectedReport.outstandingPaymentsRemarks || ""],
        ["Observation on SOP Deviation", selectedReport.sopDeviation || "N/A", ""],
        ["Any Other Observations", selectedReport.otherObservations || "N/A", ""],
    ];

    let csvContent = headers.join(",") + "\n";
    csvContent += rows.map(e => e.map(cell => `"${cell}"`).join(",")).join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `field-visit-report-${selectedReport.id}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCommentSubmit = () => {
    if (!newComment.trim()) return;
    // Here you would typically call an API to save the comment
    console.log("Submitting comment:", newComment);
    setNewComment(""); // Clear the textarea
  };


  return (
    <TooltipProvider>
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Left Sidebar for Reports List */}
      <aside className="w-full max-w-sm border-r flex flex-col">
        <div className="p-4 border-b">
          <h1 className="font-headline text-2xl font-bold">Field Visit Reports</h1>
          <p className="text-muted-foreground">Review submissions from the field team.</p>
        </div>
         <div className="p-2 flex gap-2 border-b bg-muted/50">
            <Button variant={sortOrder === 'newest' ? 'soft' : 'ghost'} size="sm" onClick={() => setSortOrder('newest')} className="flex-1">
                <SortDesc className="h-4 w-4 mr-2" />
                Newest
            </Button>
            <Button variant={sortOrder === 'oldest' ? 'soft' : 'ghost'} size="sm" onClick={() => setSortOrder('oldest')} className="flex-1">
                <SortAsc className="h-4 w-4 mr-2" />
                Oldest
            </Button>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-3">
            {sortedReports.map((report) => {
              const avgRating = parseFloat(calculateAverageRating(report));
              return (
              <Card
                key={report.id}
                className={cn(
                    "cursor-pointer transition-all hover:shadow-md",
                    selectedReport?.id === report.id && "ring-2 ring-primary"
                )}
                onClick={() => setSelectedReport(report)}
              >
                <CardHeader className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-base">{report.storeName}</CardTitle>
                        <CardDescription>{report.employeeName}</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge
                        className={cn(
                            "text-white",
                            getRatingColor(avgRating)
                        )}
                        >
                            {avgRating.toFixed(1)} <Star className="h-3 w-3 ml-1" />
                        </Badge>
                        {report.franchiseeComments && report.franchiseeComments.length > 0 && (
                             <Tooltip>
                                <TooltipTrigger>
                                     <MessageSquare className="h-5 w-5 text-muted-foreground" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Franchisee has commented</p>
                                </TooltipContent>
                            </Tooltip>
                        )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground truncate">
                        {report.otherObservations || "No major observations."}
                    </p>
                </CardContent>
                <CardFooter className="p-4 pt-0 text-xs text-muted-foreground flex justify-between">
                   <div className="flex items-center gap-1">
                     <Clock className="h-3 w-3" />
                     <span>{new Date(report.visitDateTime).toLocaleString()}</span>
                   </div>
                   <span>ID: {report.id}</span>
                </CardFooter>
              </Card>
            )})}
          </div>
        </ScrollArea>
      </aside>

      {/* Main Content for Report Details */}
      <main className="flex-1 overflow-y-auto p-6 bg-muted/20">
        {selectedReport ? (
          <Card>
            <CardHeader className="flex flex-row justify-between items-center">
              <div>
                <CardTitle>Report Overview</CardTitle>
                <CardDescription>
                  Visit to {selectedReport.storeName} on {new Date(selectedReport.visitDateTime).toLocaleDateString()}
                </CardDescription>
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={handleDownload}>
                        <Download className="h-5 w-5" />
                        <span className="sr-only">Download Report</span>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>Download Report (CSV)</TooltipContent>
              </Tooltip>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                
                <ReportDetailItem label="Employee" value={`${selectedReport.employeeName} (${selectedReport.employeeId})`} />
                <ReportDetailItem label="Store ID" value={selectedReport.storeId} />
                <ReportDetailItem label="Local Head" value={selectedReport.localHeadName} />
                <Separator />
                {(Object.keys(selectedReport.ratings) as Array<keyof typeof selectedReport.ratings>).map(key => (
                   <ReportDetailItem 
                     key={key}
                     label={<span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>}
                     value={
                       <div className="flex flex-col items-start sm:items-end gap-1">
                         <Badge variant={selectedReport.ratings[key] <= 2 ? "destructive" : "secondary"}>
                           Rating: {selectedReport.ratings[key]}/5
                         </Badge>
                         {selectedReport.remarks[key] && <p className="text-xs text-muted-foreground italic">"{selectedReport.remarks[key]}"</p>}
                       </div>
                     } 
                   />
                ))}
                <Separator />
                <ReportDetailItem label="Staff Present" value={selectedReport.staffPresent} />
                <ReportDetailItem label="Replenishment Status" value={selectedReport.replenishmentStatus} />
                <ReportDetailItem 
                  label="Outstanding Payments" 
                  value={
                    <div className="flex flex-col items-start sm:items-end gap-1">
                      <span>{selectedReport.outstandingPayments}</span>
                      {selectedReport.outstandingPaymentsRemarks && <p className="text-xs text-muted-foreground italic">"{selectedReport.outstandingPaymentsRemarks}"</p>}
                    </div>
                  }
                />
                <ReportDetailItem label="SOP Deviation Observations" value={selectedReport.sopDeviation || "None"} />
                <ReportDetailItem label="Other Observations" value={selectedReport.otherObservations || "None"} />
                
                 <Separator/>

                 {/* Franchisee Comments */}
                 <div>
                    <h3 className="font-headline text-lg font-semibold mb-4">Franchisee Comments</h3>
                    {selectedReport.franchiseeComments && selectedReport.franchiseeComments.length > 0 ? (
                        <div className="space-y-4 mb-6">
                            {selectedReport.franchiseeComments.map((comment, index) => (
                                <div key={index} className="p-3 rounded-lg bg-muted/50 border">
                                    <p className="text-sm text-muted-foreground">"{comment.text}"</p>
                                    <p className="text-xs text-right mt-2 text-muted-foreground">- Anand Sharma on {comment.date}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-muted-foreground mb-4">No comments from franchisee yet.</p>
                    )}
                    <div className="space-y-2">
                        <Textarea 
                            placeholder="Write your comment here..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <Button onClick={handleCommentSubmit} disabled={!newComment.trim()}>
                            Submit Comment
                        </Button>
                    </div>
                 </div>

              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <ClipboardList className="h-16 w-16 text-muted-foreground/50" />
            <h2 className="mt-4 text-xl font-semibold">No Report Selected</h2>
            <p className="mt-2 text-muted-foreground">Please select a field visit report from the list on the left.</p>
          </div>
        )}
      </main>
    </div>
    </TooltipProvider>
  );
}

