import {
  Activity,
  Banknote,
  BarChart,
  Building,
  CreditCard,
  FileText,
  HelpCircle,
  LayoutDashboard,
  MessageSquareWarning,
  Newspaper,
  Package,
  Phone,
  ShoppingCart,
  Undo2,
  User,
  Users,
} from "lucide-react";

export const user = {
  name: "Anand Sharma",
  email: "anand.sharma@example.com",
  avatar: "/avatars/01.png",
};

export const stores = [
  { id: "store-01", name: "Koramangala, Bangalore" },
  { id: "store-02", name: "Indiranagar, Bangalore" },
  { id: "store-03", name: "Jubilee Hills, Hyderabad" },
];

export const kpiData = {
  "store-01": {
    activeOrders: 12,
    availableCredit: 150000,
    pendingReturns: 3,
    openTickets: 1,
  },
  "store-02": {
    activeOrders: 8,
    availableCredit: 250000,
    pendingReturns: 1,
    openTickets: 0,
  },
  "store-03": {
    activeOrders: 21,
    availableCredit: 85000,
    pendingReturns: 5,
    openTickets: 2,
  },
};

export const salesData = [
  { month: "Jan", sales: 450000, margin: 75000 },
  { month: "Feb", sales: 420000, margin: 70000 },
  { month: "Mar", sales: 510000, margin: 85000 },
  { month: "Apr", sales: 480000, margin: 80000 },
  { month: "May", sales: 550000, margin: 92000 },
  { month: "Jun", sales: 530000, margin: 88000 },
];

export const ordersData = [
  { orderId: "ORD75638", date: "2023-10-26", total: 7540.0, status: "Delivered", type: "Standard" },
  { orderId: "ORD75639", date: "2023-10-24", total: 12450.0, status: "Shipped", type: "Provisional" },
  { orderId: "ORD75640", date: "2023-10-23", total: 3200.0, status: "Delivered", type: "Standard" },
  { orderId: "ORD75641", date: "2023-10-21", total: 8990.0, status: "Processing", type: "Emergency" },
  { orderId: "ORD75642", date: "2023-10-20", total: 21350.0, status: "Delivered", type: "Provisional" },
  { orderId: "ORD75643", date: "2023-10-18", total: 5400.0, status: "Cancelled", type: "Standard" },
];

export const accountProfile = {
  personalDetails: {
    name: "Anand Sharma",
    email: "anand.sharma@example.com",
    phone: "+91 98765 43210",
    businessName: "Sharma Health Solutions Pvt. Ltd.",
  },
  licenseDetails: {
    storeId: "MP-BLR-KOR-01",
    gst: "29ABCDE1234F1Z5",
    drugLicense: "DL-123-456-789",
    fssai: "10012345678901",
  },
  bankAccount: {
    bankName: "HDFC Bank",
    accountNumber: "XXXX-XXXX-XXXX-5678",
    ifsc: "HDFC0001234",
    branch: "Koramangala",
  },
};

export const financialSummary = {
  creditLimit: 500000,
  outstanding: 125780,
  creditPeriod: 45,
};

export const transactions = [
  { date: "2023-10-26", description: "INV-1024 Payment", type: "Debit", amount: 12450.0 },
  { date: "2023-10-25", description: "Credit Note CN-056", type: "Credit", amount: 2300.0 },
  { date: "2023-10-20", description: "INV-1022 Payment", type: "Debit", amount: 8990.0 },
  { date: "2023-09-30", description: "Monthly Commission", type: "Credit", amount: 35000.0 },
];

export const payments = [
  { paymentId: "PAY-9871", date: "2023-10-26", amount: 12450.0, method: "NEFT", status: "Completed" },
  { paymentId: "PAY-9870", date: "2023-10-20", amount: 8990.0, method: "RTGS", status: "Completed" },
  { paymentId: "PAY-9869", date: "2023-10-15", amount: 21350.0, method: "UPI", status: "Pending" },
];

export const returns = [
  { returnId: "RET-0123", date: "2023-10-15", status: "Approved", total: 2300.0 },
  { returnId: "RET-0124", date: "2023-10-18", status: "Pending", total: 1250.0 },
  { returnId: "RET-0125", date: "2023-10-22", status: "Rejected", total: 800.0 },
];

export const reports = [
  { id: "REP-M0923", name: "September 2023 Monthly Statement", type: "PDF", date: "2023-10-05", actionRequired: false },
  { id: "REP-R0923", name: "September 2023 Returns Confirmation", type: "Excel", date: "2023-10-03", actionRequired: true },
  { id: "REP-M0823", name: "August 2023 Monthly Statement", type: "PDF", date: "2023-09-05", actionRequired: false },
];

export const invoices = {
  order: [
    { invoiceId: "INV-1024", orderId: "ORD75639", date: "2023-10-25", amount: 12450.0, status: "Paid" },
    { invoiceId: "INV-1025", orderId: "ORD75641", date: "2023-10-22", amount: 8990.0, status: "Unpaid" },
  ],
  membership: [
    { invoiceId: "FEE-0923", period: "September 2023", date: "2023-10-10", amount: 25000.0, status: "Generated" },
    { invoiceId: "FEE-0823", period: "August 2023", date: "2023-09-10", amount: 24500.0, status: "Paid" },
  ],
};

export const complaints = [
    { complaintId: "COM-056", date: "2023-10-12", subject: "Damaged stock received", status: "Resolved" },
    { complaintId: "COM-057", date: "2023-10-25", subject: "Delay in order ORD75641", status: "In Progress" },
];

export const navLinks = {
  public: [
    { href: "#why-partner", label: "About Us" },
    { href: "#", label: "News & Updates" },
    { href: "#", label: "FAQs" },
    { href: "#", label: "Resources & Training" },
    { href: "#", label: "Contact Us" },
  ],
  dashboard: [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/account", label: "Account Profile", icon: User },
    {
      label: "Orders",
      icon: ShoppingCart,
      subItems: [
        { href: "/dashboard/orders", label: "Order History", icon: Activity },
        { href: "/dashboard/orders/provisional", label: "Provisional Indent", icon: FileText },
      ],
    },
    {
      label: "Financials",
      icon: Banknote,
      subItems: [
        { href: "/dashboard/financials", label: "Account Balance", icon: CreditCard },
        { href: "/dashboard/financials/payments", label: "Payments", icon: Banknote },
      ],
    },
    { href: "/dashboard/returns", label: "Returns", icon: Undo2 },
    { href: "/dashboard/reports", label: "Reports", icon: BarChart },
    {
      label: "Invoices",
      icon: FileText,
      subItems: [
        { href: "/dashboard/invoices", label: "Order Invoices", icon: Package },
        { href: "/dashboard/invoices/membership", label: "Fee Invoices", icon: Users },
      ]
    },
    { href: "/dashboard/complaints", label: "Complaints", icon: MessageSquareWarning },
  ],
  footer: {
    company: [
      { href: "#", label: "About Us" },
      { href: "#", label: "Careers" },
      { href: "#", label: "Press" },
      { href: "#", label: "Contact" },
    ],
    support: [
      { href: "#", label: "Help Center" },
      { href: "#", label: "FAQs" },
      { href: "#", label: "Terms of Service" },
      { href: "#", label: "Privacy Policy" },
    ]
  }
};
