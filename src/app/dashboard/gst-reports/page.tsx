
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ReportLink = ({ children }: { children: React.ReactNode }) => (
  <Link href="#" className="text-sm text-primary hover:underline underline-offset-4">
    {children}
  </Link>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Post GST Reports</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <ReportLink>GST Sale Invoice Details Report</ReportLink>
            <ReportLink>GST Consolidated Sale Invoice Details Report</ReportLink>
            <ReportLink>GST Franchise Sale Tax Wise</ReportLink>
            <ReportLink>GST Franchise Sale Return Tax Wise</ReportLink>
            <ReportLink>GST Franchise Purchase Tax Wise</ReportLink>
            <ReportLink>GST Franchise PurchaseReturn Tax Wise</ReportLink>
            <ReportLink>GST Franchise Purchase HSN Wise</ReportLink>
            <ReportLink>GST Franchise PurchaseReturn HSN Wise</ReportLink>
            <ReportLink>GST Franchise Sales HSN Wise</ReportLink>
            <ReportLink>GST Franchise Sale Returns HSN Wise</ReportLink>
            <ReportLink>Franchise Audit Form Wise Stock Value</ReportLink>
            <ReportLink>Return Invoices</ReportLink>
            <ReportLink>Return Rejections</ReportLink>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pre GST Reports</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <ReportLink>Sale Invoice Details Report</ReportLink>
            <ReportLink>Consolidated Sale Invoice Details Report</ReportLink>
            <ReportLink>Franchise Sale Tax Wise</ReportLink>
            <ReportLink>Franchise Sale Return Tax Wise</ReportLink>
            <ReportLink>Franchise Purchase Tax Wise</ReportLink>
            <ReportLink>Franchise PurchaseReturn Tax Wise</ReportLink>
            <ReportLink>Total Stock Value Report</ReportLink>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>ValuePlus</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <ReportLink>Points sale Debit</ReportLink>
            <ReportLink>Points sale Credit</ReportLink>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
