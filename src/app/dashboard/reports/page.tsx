
"use client";

import { Download, CheckCircle, File as FileIcon, Sheet as ExcelIcon } from "lucide-react";
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
import { monthlyReports } from "@/lib/data";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export default function ReportsPage() {
  const [currentYear] = useState(new Date().getFullYear().toString());
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-headline text-3xl font-bold">Monthly Reports</h1>
        <p className="text-muted-foreground">
          Access and download your monthly statements and reports.
        </p>
      </div>

       <Card>
        <CardHeader>
          <CardTitle>Select Period</CardTitle>
          <CardDescription>
            Filter reports by year and month (only current financial year will be available).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="grid gap-2 w-full md:w-48">
              <Label htmlFor="year">Year</Label>
              <Select defaultValue="2025">
                <SelectTrigger id="year">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2025">2025</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2 w-full md:w-48">
              <Label htmlFor="month">Month</Label>
               <Select defaultValue="september">
                <SelectTrigger id="month">
                  <SelectValue placeholder="Select month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="september">September</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>


      <Card>
        <CardHeader>
          <CardTitle>Available Reports</CardTitle>
          <CardDescription>
            Download reports and complete required actions.
          </CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report Name</TableHead>
                <TableHead>Month/Year</TableHead>
                <TableHead>File Type</TableHead>
                <TableHead>Status / Action</TableHead>
                <TableHead className="text-right">Download</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {monthlyReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">{report.name}</TableCell>
                  <TableCell>{report.period}</TableCell>
                  <TableCell className="flex items-center gap-2">
                    {report.fileType === 'Excel' ? 
                        <ExcelIcon className="h-4 w-4 text-green-600"/> : 
                        <FileIcon className="h-4 w-4 text-red-600"/>
                    }
                    {report.fileType}
                  </TableCell>
                  <TableCell>
                    <span>-</span>
                  </TableCell>
                  <TableCell className="text-right">
                     <Button variant="ghost" size="icon">
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
    </div>
  );
}
