
"use client";

import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Pie,
  PieChart,
  Cell,
  ComposedChart,
} from "recharts";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { performanceData } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";

const chartConfigBase = {
  netSale: { label: "Net Sale", color: "hsl(var(--primary))" },
  margin: { label: "Margin", color: "hsl(var(--chart-2))" },
  branded: { label: "Branded", color: "hsl(var(--primary))" },
  pl: { label: "PL+SIP", color: "hsl(var(--chart-2))" },
  pharma_sale: { label: "Pharma Sale", color: "hsl(var(--chart-1))" },
  pharma_margin: { label: "Pharma Margin", color: "hsl(var(--chart-2))" },
  general_sale: { label: "General Sale", color: "hsl(var(--chart-3))" },
  general_margin: { label: "General Margin", color: "hsl(var(--chart-4))" },
  pl_pharma_sale: { label: "PL Pharma Sale", color: "hsl(var(--chart-5))" },
  pl_pharma_margin: { label: "PL Pharma Margin", color: "hsl(var(--chart-1))" },
  pl_general_sale: { label: "PL General Sale", color: "hsl(var(--chart-2))" },
  pl_general_margin: { label: "PL General Margin", color: "hsl(var(--chart-3))" },
  surgical_sale: { label: "Surgical Sale", color: "hsl(var(--chart-4))" },
  surgical_margin: { label: "Surgical Margin", color: "hsl(var(--chart-5))" },
  salesOrders: { label: "Sales Orders", color: "hsl(var(--chart-1))" },
  webOrders: { label: "Web Orders", color: "hsl(var(--chart-3))" },
  abv: { label: "Avg Bill Value", color: "hsl(var(--primary))" },
  bills: { label: "No. of Bills", color: "hsl(var(--chart-4))" },
  "bills_lt_200": { label: "<200", color: "hsl(var(--chart-1))" },
  "bills_200_500": { label: "200-500", color: "hsl(var(--chart-2))" },
  "bills_500_999": { label: "500-999", color: "hsl(var(--chart-3))" },
  "bills_gt_1000": { label: ">1000", color: "hsl(var(--chart-4))" },
  offline: { label: "Offline", color: "hsl(var(--chart-1))" },
  online: { label: "Online", color: "hsl(var(--chart-2))" },
};

export default function PerformancePage() {
  const [view, setView] = useState<"mom" | "day">("mom");
  const data = performanceData[view];
  const [category, setCategory] = useState("pharma");
  const { toast } = useToast();

  const handleMaxRangeError = (max: number) => {
    toast({
      variant: "destructive",
      title: "Invalid Date Range",
      description: `The maximum allowed date range is ${max} days.`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-headline text-3xl font-bold">Performance Dashboard</h1>
        <p className="text-muted-foreground">
          Track your store's key performance indicators.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>
            Select the view and date range to analyze performance.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row gap-4 items-end">
          <div className="grid gap-2">
            <Label>View</Label>
            <Tabs value={view} onValueChange={(v) => setView(v as any)} className="w-full">
              <TabsList>
                <TabsTrigger value="mom">Month-over-Month</TabsTrigger>
                <TabsTrigger value="day">Day wise</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="grid gap-2">
            <Label>Date Range</Label>
            {view === 'mom' ? (
                 <Select>
                    <SelectTrigger className="w-[300px]">
                        <SelectValue placeholder="Select month range" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="last_6_months">Last 6 Months</SelectItem>
                        <SelectItem value="last_3_months">Last 3 Months</SelectItem>
                        <SelectItem value="current_month">Current Month</SelectItem>
                    </SelectContent>
                </Select>
            ) : <DateRangePicker max={15} onMaxRangeError={handleMaxRangeError} />}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Net Sale vs. Margin Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfigBase} className="h-[300px] w-full">
              <BarChart data={data.netSalesMargin}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey={view === 'mom' ? 'month' : 'day'} tickLine={false} axisLine={false} />
                <YAxis />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value, name, props) => {
                        const { payload } = props;
                        if (name === "margin") {
                          return (
                            <div className="flex flex-col">
                              <span>
                                {`₹${value.toLocaleString()}`}
                                {payload.marginPercentage && (
                                  <span className="ml-2 text-muted-foreground">
                                    ({payload.marginPercentage.toFixed(2)}%)
                                  </span>
                                )}
                              </span>
                            </div>
                          );
                        }
                        return `₹${Number(value).toLocaleString()}`;
                      }}
                    />
                  }
                />
                <Legend />
                <Bar dataKey="netSale" fill="var(--color-netSale)" radius={4} />
                <Bar dataKey="margin" fill="var(--color-margin)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Branded Sale vs. (PL+SIP) Sale</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfigBase} className="h-[300px] w-full">
              <BarChart data={data.brandedVsPl}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey={view === 'mom' ? 'month' : 'day'} tickLine={false} axisLine={false} />
                <YAxis />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value, name, props) => {
                        const { payload } = props;
                        const percentage = name === 'branded' ? payload.brandedPercentage : payload.plPercentage;
                        return (
                          <div className="flex flex-col">
                            <span>
                              {`₹${value.toLocaleString()}`}
                              {percentage && (
                                <span className="ml-2 text-muted-foreground">
                                  ({percentage.toFixed(2)}%)
                                </span>
                              )}
                            </span>
                          </div>
                        );
                      }}
                    />
                  }
                />
                <Legend />
                <Bar dataKey="branded" fill="var(--color-branded)" radius={4} />
                <Bar dataKey="pl" fill="var(--color-pl)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

         <Card className="lg:col-span-2">
           <CardHeader>
            <div className="flex justify-between items-center">
                <CardTitle>Detailed Sales &amp; Margin by Category</CardTitle>
                <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="pharma">Pharma</SelectItem>
                        <SelectItem value="general">General</SelectItem>
                        <SelectItem value="pl_pharma">PL Pharma</SelectItem>
                        <SelectItem value="pl_general">PL General</SelectItem>
                        <SelectItem value="surgical">Surgical</SelectItem>
                    </SelectContent>
                </Select>
            </div>
           </CardHeader>
           <CardContent>
             <ChartContainer config={chartConfigBase} className="h-[300px] w-full">
               <BarChart data={data.salesByCategory}>
                 <CartesianGrid vertical={false} />
                 <XAxis dataKey={view === 'mom' ? 'month' : 'day'} tickLine={false} axisLine={false} />
                 <YAxis />
                 <ChartTooltip content={<ChartTooltipContent />} />
                 <Legend />
                 <Bar dataKey={`${category}_sale`} fill={`var(--color-${category}_sale)`} radius={4} name={chartConfigBase[`${category}_sale` as keyof typeof chartConfigBase]?.label} />
                  <Bar dataKey={`${category}_margin`} fill={`var(--color-${category}_margin)`} radius={4} name={chartConfigBase[`${category}_margin` as keyof typeof chartConfigBase]?.label} />
               </BarChart>
             </ChartContainer>
           </CardContent>
         </Card>

        <Card>
          <CardHeader>
            <CardTitle>Offline vs. Online Sale</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <ChartContainer config={chartConfigBase} className="h-[250px] w-[250px]">
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={data.offlineVsOnline}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  strokeWidth={5}
                >
                  {data.offlineVsOnline.map((entry) => (
                     <Cell key={entry.name} fill={entry.fill} className="focus:outline-none" />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Sale &amp; Web Orders Count</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfigBase} className="h-[300px] w-full">
              <BarChart data={data.ordersCount}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey={view === 'mom' ? 'month' : 'day'} />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="salesOrders" stackId="a" fill="var(--color-salesOrders)" />
                <Bar dataKey="webOrders" stackId="a" fill="var(--color-webOrders)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Avg Bill Value (ABV) vs. No. of Bills</CardTitle>
          </CardHeader>
          <CardContent>
             <ChartContainer config={chartConfigBase} className="h-[300px] w-full">
              <ComposedChart data={data.avgBillValue}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey={view === 'mom' ? 'month' : 'day'} />
                <YAxis yAxisId="left" orientation="left" stroke="var(--color-abv)" />
                <YAxis yAxisId="right" orientation="right" stroke="var(--color-bills)" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar yAxisId="right" dataKey="bills" fill="var(--color-bills)" radius={4} />
                <Line yAxisId="left" type="monotone" dataKey="abv" stroke="var(--color-abv)" strokeWidth={2} dot={false} />
              </ComposedChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Bills by Slab</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfigBase} className="h-[300px] w-full">
                <BarChart data={data.billsBySlab}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey={view === 'mom' ? 'month' : 'day'} tickLine={false} axisLine={false} />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="bills_lt_200" stackId="a" fill="var(--color-bills_lt_200)" name="< 200" />
                    <Bar dataKey="bills_200_500" stackId="a" fill="var(--color-bills_200_500)" name="200-500" />
                    <Bar dataKey="bills_500_999" stackId="a" fill="var(--color-bills_500_999)" name="500-999" />
                    <Bar dataKey="bills_gt_1000" stackId="a" fill="var(--color-bills_gt_1000)" name="> 1000" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
