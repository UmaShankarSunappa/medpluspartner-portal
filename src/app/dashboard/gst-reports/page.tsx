
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ReportLink = ({ reportName }: { reportName: string }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Link 
          href="#" 
          className="text-sm text-primary hover:underline underline-offset-4 block truncate"
        >
          {reportName}
        </Link>
      </TooltipTrigger>
      <TooltipContent>
        <p>{reportName}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

export default function GstReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-headline text-3xl font-bold">GST Reports</h1>
        <p className="text-muted-foreground">
          Access your Goods and Services Tax related reports.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Post GST Reports</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <ReportLink reportName="GST Sale Invoice Details Report" />
            <ReportLink reportName="GST Consolidated Sale Invoice Details Report" />
            <ReportLink reportName="GST Franchise Sale Tax Wise" />
            <ReportLink reportName="GST Franchise Sale Return Tax Wise" />
            <ReportLink reportName="GST Franchise Purchase Tax Wise" />
            <ReportLink reportName="GST Franchise PurchaseReturn Tax Wise" />
            <ReportLink reportName="GST Franchise Purchase HSN Wise" />
            <ReportLink reportName="GST Franchise PurchaseReturn HSN Wise" />
            <ReportLink reportName="GST Franchise Sales HSN Wise" />
            <ReportLink reportName="GST Franchise Sale Returns HSN Wise" />
            <ReportLink reportName="Franchise Audit Form Wise Stock Value" />
            <ReportLink reportName="Return Invoices" />
            <ReportLink reportName="Return Rejections" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pre GST Reports</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <ReportLink reportName="Sale Invoice Details Report" />
            <ReportLink reportName="Consolidated Sale Invoice Details Report" />
            <ReportLink reportName="Franchise Sale Tax Wise" />
            <ReportLink reportName="Franchise Sale Return Tax Wise" />
            <ReportLink reportName="Franchise Purchase Tax Wise" />
            <ReportLink reportName="Franchise PurchaseReturn Tax Wise" />
            <ReportLink reportName="Total Stock Value Report" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
