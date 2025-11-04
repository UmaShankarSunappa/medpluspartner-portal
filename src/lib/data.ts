

import {
  Activity,
  Banknote,
  BarChart,
  Building,
  CreditCard,
  FileText,
  HelpCircle,
  Home,
  LayoutDashboard,
  MessageSquareWarning,
  Newspaper,
  Package,
  Phone,
  ShoppingCart,
  Undo2,
  User,
  Users,
  Wallet,
  FileWarning,
  LineChart,
  MapPin,
  FileSliders,
  FileQuestion,
  MessageCircleQuestion,
  TrendingUp,
  Zap,
  Star,
  Quote,
  CheckCircle,
  BookUser,
  History,
  FileClock,
  Landmark,
  ShieldQuestion,
  ClipboardList,
  Truck,
  CalendarDays,
  TrendingDown,
  PenSquare,
  DollarSign,
  Calendar,
  IndianRupee,
  BookMarked,
  Receipt,
  Calculator,
} from "lucide-react";

export const user = {
  name: "Anand Sharma",
  email: "anand.sharma@example.com",
  avatar: "/avatars/01.png",
};

export const stores = [
  { id: "store-01", name: "Koramangala, Bangalore" },
  { id: "store-02", name: "Indiranagar, Bangalore" },
];

export const kpiData = {
  "store-01": {
    activeOrders: 12,
    availableCredit: 150000,
    averageDailySales: 42560,
    avgSalesTrend: 5.2,
    mtdSales: 1245300,
    mtdSalesTrend: 15.1,
  },
  "store-02": {
    activeOrders: 8,
    availableCredit: 250000,
    averageDailySales: 38900,
    avgSalesTrend: -1.5,
    mtdSales: 1132100,
    mtdSalesTrend: -2.4,
  },
  "store-03": {
    activeOrders: 21,
    availableCredit: 85000,
    averageDailySales: 51200,
    avgSalesTrend: 8.9,
    mtdSales: 1489600,
    mtdSalesTrend: 18.7,
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

export const cashDepositReportData = [
    { date: "01-Oct-25", netSales: 16251.46, cashToBeDeposited: 12570.65 },
    { date: "02-Oct-25", netSales: 7891.74, cashToBeDeposited: 6455.66 },
    { date: "03-Oct-25", netSales: 14106.97, cashToBeDeposited: 11133.34 },
    { date: "04-Oct-25", netSales: 15389.52, cashToBeDeposited: 12219.88 },
    { date: "05-Oct-25", netSales: 18387.22, cashToBeDeposited: 14164.62 },
    { date: "06-Oct-25", netSales: 24739.23, cashToBeDeposited: 21107.69 },
    { date: "07-Oct-25", netSales: 17330.08, cashToBeDeposited: 14776.97 },
    { date: "08-Oct-25", netSales: 13029.01, cashToBeDeposited: 10910.66 },
    { date: "09-Oct-25", netSales: 20226.13, cashToBeDeposited: 17660.44 },
    { date: "10-Oct-25", netSales: 9515.42, cashToBeDeposited: 7939.92 },
];

export type Order = {
  orderId: string;
  date: string;
  total: number;
  status: "Order Created" | "Order Picked" | "Order Dispatched" | "Order Delivered" | "Order Replenished" | "Cancelled";
  type: "Auto" | "Indent" | "Web Order" | "Sale Order";
  products?: { sku: string; name: string; quantity: number; price: number }[];
  trackingHistory?: { status: string; date: string; location: string }[];
};


export const ordersData: Order[] = [
  { 
    orderId: "ORD-2024-001", 
    date: "2024-10-15", 
    total: 45000.0, 
    status: "Order Replenished", 
    type: "Auto",
    products: [
      { sku: 'PARA500', name: 'Paracetamol 500mg', quantity: 100, price: 1500 },
      { sku: 'VICKS-AC', name: 'Vicks Action 500', quantity: 50, price: 2000 },
      { sku: 'BAND-AID', name: 'Band-Aid Assorted', quantity: 200, price: 4000 },
    ],
    trackingHistory: [
      { status: 'Order Replenished', date: '2024-10-15 14:30', location: 'Koramangala, Bangalore' },
      { status: 'Order Delivered', date: '2024-10-15 11:00', location: 'Local Hub' },
      { status: 'Order Dispatched', date: '2024-10-14 18:00', location: 'Hyderabad Warehouse' },
      { status: 'Order Picked', date: '2024-10-14 14:00', location: 'Hyderabad Warehouse' },
      { status: 'Order Created', date: '2024-10-13 20:00', location: 'Franchisee Portal' },
    ]
  },
  { 
    orderId: "ORD-2024-002", 
    date: "2024-10-12", 
    total: 32000.0, 
    status: "Order Dispatched", 
    type: "Indent",
    products: [
      { sku: 'MOOV', name: 'Moov Ointment', quantity: 40, price: 4800 },
      { sku: 'VOLINI', name: 'Volini Spray', quantity: 30, price: 4500 },
    ],
     trackingHistory: [
      { status: 'Order Dispatched', date: '2024-10-11 17:30', location: 'On its way to Bangalore' },
      { status: 'Order Picked', date: '2024-10-11 14:30', location: 'Hyderabad Warehouse' },
      { status: 'Order Created', date: '2024-10-10 18:00', location: 'Franchisee Portal' },
    ]
  },
  { 
    orderId: "ORD-2024-003", 
    date: "2024-10-10", 
    total: 58000.0, 
    status: "Order Created", 
    type: "Auto",
    products: [
      { sku: 'CETZINE', name: 'Cetirizine 10mg', quantity: 300, price: 3000 },
      { sku: 'ELECTRAL', name: 'Electral Powder', quantity: 500, price: 10000 },
    ],
     trackingHistory: [
      { status: 'Order Created', date: '2024-10-09 21:00', location: 'Franchisee Portal' },
    ]
  },
  { 
    orderId: "ORD75641", 
    date: "2024-10-08", 
    total: 8990.0, 
    status: "Order Created", 
    type: "Web Order",
    products: [
      { sku: 'INSULIN-G', name: 'Glargine Insulin', quantity: 10, price: 3500 },
      { sku: 'TEST-STRIP', name: 'Glucose Test Strips', quantity: 5, price: 2500 },
    ],
    trackingHistory: [
      { status: 'Order Created', date: '2024-10-08 10:00', location: 'Franchisee Portal' },
    ]
  },
  { 
    orderId: "ORD75642", 
    date: "2024-10-05", 
    total: 21350.0, 
    status: "Order Replenished", 
    type: "Sale Order",
    products: [
      { sku: 'ASPIRIN75', name: 'Aspirin 75mg', quantity: 200, price: 1000 },
      { sku: 'ATORVA10', name: 'Atorvastatin 10mg', quantity: 150, price: 2250 },
    ],
    trackingHistory: [
      { status: 'Order Replenished', date: '2024-10-05 15:00', location: 'Indiranagar, Bangalore' },
      { status: 'Order Delivered', date: '2024-10-05 12:00', location: 'Indiranagar, Bangalore' },
      { status: 'Order Dispatched', date: '2024-10-04 19:00', location: 'Hyderabad Warehouse' },
      { status: 'Order Picked', date: '2024-10-04 16:00', location: 'Hyderabad Warehouse' },
      { status: 'Order Created', date: '2024-10-03 22:00', location: 'System' },
    ]
  },
  { 
    orderId: "ORD75643", 
    date: "2024-10-02", 
    total: 5400.0, 
    status: "Cancelled", 
    type: "Indent",
    products: [],
    trackingHistory: [
       { status: 'Cancelled', date: '2024-10-02 13:00', location: 'Franchisee Portal' },
       { status: 'Order Created', date: '2024-10-01 12:00', location: 'Franchisee Portal' },
    ]
  },
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
  storeName: "Koramangala, BTM",
  creditLimit: 500000,
  outstanding: 125780,
  creditPeriod: 365,
};

export const transactions = [
  {
    dateTime: "2023-10-28 10:00",
    billId: "DN-001",
    billType: "Debit Note",
    description: "Rent",
    amount: 50000.0,
    billingPlace: "Bangalore",
    transactionType: "Dr",
  },
  {
    dateTime: "2023-10-26 14:30",
    billId: "INV-1024",
    billType: "Payment",
    description: "Initial Stock Transfer",
    amount: 12450.0,
    billingPlace: "Bangalore",
    transactionType: "Cr",
  },
  {
    dateTime: "2023-10-25 11:00",
    billId: "CN-056",
    billType: "Credit Note",
    description: "Returns",
    amount: 2300.0,
    billingPlace: "Hyderabad",
    transactionType: "Cr",
  },
  {
    dateTime: "2023-10-21 10:15",
    billId: "PUR-5678",
    billType: "Purchases",
    description: "Min-Max Stock",
    amount: 32000.0,
    billingPlace: "Hyderabad",
    transactionType: "Dr",
  },
  {
    dateTime: "2023-10-15 12:00",
    billId: "SR-005",
    billType: "Sale Return",
    description: "Warehouse Returns",
    amount: 1500.0,
    billingPlace: "Hyderabad",
    transactionType: "Cr",
  },
];


export const paymentsData = [
  { 
    id: "alloc-001a",
    paymentId: "PAY-2024-001", 
    name: "Monthly Payment", 
    createdDate: "1/15/2024 10:30", 
    approvedDate: "1/16/2024 11:00", 
    status: "Successful", 
    amount: 30000, 
    mode: "NEFT",
    storeId: "store-01",
    gatewayTxId: "gat_EviY1b6g3VqD9z",
    remarks: "Monthly payment for October.",
    applicationRatios: { minMax: 1, sale: 1, web: 0 }
  },
  { 
    id: "alloc-002a",
    paymentId: "PAY-2024-002", 
    name: "Advance Payment", 
    createdDate: "1/20/2024 14:00", 
    approvedDate: null, 
    status: "Pending", 
    amount: 15000, 
    mode: "UPI",
    storeId: "store-01",
    gatewayTxId: "gat_FviY2c7g4WrE1a",
    remarks: "Advance for Q4.",
    applicationRatios: { minMax: 1, sale: 0, web: 0 }
  },
  { 
    id: "alloc-001b",
    paymentId: "PAY-2024-001", 
    name: "Monthly Payment", 
    createdDate: "1/15/2024 10:30", 
    approvedDate: "1/16/2024 11:00", 
    status: "Successful", 
    amount: 30000, 
    mode: "NEFT",
    storeId: "store-02",
    gatewayTxId: "gat_EviY1b6g3VqD9z",
    remarks: "Monthly payment for October.",
    applicationRatios: { minMax: 1, sale: 1, web: 0 }
  },
];

export type Return = {
  returnId: string;
  taxInvoice: string;
  createdBy: string;
  total: number;
  returnType: "Expiry" | "Short Expiry" | "Slow Moving" | "Damage" | "Complaint" | "Cuttings" | "MRP Change" | "Emergency" | "Invoice Return Damaged" | "Invoice Return Expired";
  receivedDate: string;
  returnNoteId: string | null;
  status: "Credit Note Received" | "Replenished" | "TO Generated" | "Pending";
  products: {
    sku: string;
    name: string;
    batch: string;
    quantity: number;
    value: number;
  }[];
  trackingHistory?: { status: string; date: string; location: string }[];
};

export const returnsData: Return[] = [
  { 
    returnId: "RET-0123", 
    taxInvoice: "TINV-987",
    createdBy: "Anand Sharma",
    total: 2300.0,
    returnType: "Expiry",
    receivedDate: "2023-10-15",
    returnNoteId: "CN-056",
    status: "Credit Note Received",
    products: [
        { sku: "PARA500", name: "Paracetamol 500mg", batch: "B123", quantity: 10, value: 150 },
        { sku: "VICKS-AC", name: "Vicks Action 500", batch: "V456", quantity: 5, value: 200 },
    ],
    trackingHistory: [
        { status: 'Credit Note Received', date: '2023-10-22 11:00', location: 'Finance Department' },
        { status: 'Replenished', date: '2023-10-21 16:00', location: 'Inventory System' },
        { status: 'TO Generated', date: '2023-10-17 18:00', location: 'System' },
    ]
  },
  { 
    returnId: "RET-0124", 
    taxInvoice: "TINV-991",
    createdBy: "Anand Sharma",
    total: 1250.0,
    returnType: "Damage",
    receivedDate: "2023-10-18",
    returnNoteId: null,
    status: "TO Generated",
    products: [
        { sku: "MOOV", name: "Moov Ointment", batch: "M789", quantity: 10, value: 1200 }
    ],
    trackingHistory: [
        { status: 'TO Generated', date: '2023-10-25 12:00', location: 'System' },
    ]
  },
  { 
    returnId: "RET-0125", 
    taxInvoice: "TINV-992",
    createdBy: "Anand Sharma",
    total: 800.0,
    returnType: "Slow Moving",
    receivedDate: "2023-10-22",
    returnNoteId: null,
    status: "TO Generated",
    products: [
        { sku: "VOLINI", name: "Volini Spray", batch: "VO101", quantity: 5, value: 750 }
    ],
     trackingHistory: [
        { status: 'TO Generated', date: '2023-10-22 15:00', location: 'System' },
    ]
  },
   { 
    returnId: "RET-0126", 
    taxInvoice: "TINV-993",
    createdBy: "Anand Sharma",
    total: 1500.0,
    returnType: "MRP Change",
    receivedDate: "2023-10-28",
    returnNoteId: 'CN-057',
    status: "Replenished",
    products: [
        { sku: "DETTOL-AS", name: "Dettol Antiseptic", batch: "D202", quantity: 10, value: 500 },
        { sku: "SAVALON", name: "Savlon Antiseptic", batch: "S303", quantity: 5, value: 250 },
    ],
     trackingHistory: [
        { status: 'Replenished', date: '2023-10-29 11:00', location: 'Warehouse' },
        { status: 'TO Generated', date: '2023-10-28 14:00', location: 'System' }
    ]
  },
];


export type MonthlyReport = {
  id: string;
  name: string;
  period: string;
  month: string;
  financialYear: string;
  fileType: "Excel" | "PDF";
  status: "Updated" | "Not Updated";
};

export const monthlyReports: MonthlyReport[] = [
    // --- FY 2025-26 ---
    // October
    { id: "REP-OCT-1", name: "Net Sale vs. Margin", period: "Oct 2025", month: "October", financialYear: "FY 2025-26", fileType: "Excel", status: "Updated" },
    { id: "REP-OCT-2", name: "Royalty Fee Invoice", period: "Oct 2025", month: "October", financialYear: "FY 2025-26", fileType: "PDF", status: "Not Updated" },
    { id: "REP-OCT-3", name: "Rental Invoices", period: "Oct 2025", month: "October", financialYear: "FY 2025-26", fileType: "PDF", status: "Updated" },
    { id: "REP-OCT-4", name: "GST Reports", period: "Oct 2025", month: "October", financialYear: "FY 2025-26", fileType: "Excel", status: "Not Updated" },
    { id: "REP-OCT-5", name: "Expiry Products List", period: "Oct 2025", month: "October", financialYear: "FY 2025-26", fileType: "Excel", status: "Updated" },
    { id: "REP-OCT-6", name: "Slow-Moving Products", period: "Oct 2025", month: "October", financialYear: "FY 2025-26", fileType: "Excel", status: "Not Updated" },
    { id: "REP-OCT-7", name: "Credit Note", period: "Oct 2025", month: "October", financialYear: "FY 2025-26", fileType: "Excel", status: "Updated" },
    
    // September
    { id: "REP-SEP-1", name: "Net Sale vs. Margin", period: "Sep 2025", month: "September", financialYear: "FY 2025-26", fileType: "Excel", status: "Updated" },
    { id: "REP-SEP-2", name: "Royalty Fee Invoice", period: "Sep 2025", month: "September", financialYear: "FY 2025-26", fileType: "PDF", status: "Updated" },
    { id: "REP-SEP-3", name: "Rental Invoices", period: "Sep 2025", month: "September", financialYear: "FY 2025-26", fileType: "PDF", status: "Updated" },
    { id: "REP-SEP-4", name: "GST Reports", period: "Sep 2025", month: "September", financialYear: "FY 2025-26", fileType: "Excel", status: "Not Updated" },
    { id: "REP-SEP-5", name: "Expiry Products List", period: "Sep 2025", month: "September", financialYear: "FY 2025-26", fileType: "Excel", status: "Updated" },
    { id: "REP-SEP-6", name: "Slow-Moving Products", period: "Sep 2025", month: "September", financialYear: "FY 2025-26", fileType: "Excel", status: "Updated" },
    { id: "REP-SEP-7", name: "Credit Note", period: "Sep 2025", month: "September", financialYear: "FY 2025-26", fileType: "Excel", status: "Updated" },
    
    // --- FY 2024-25 ---
    { id: "REP-MAR-1", name: "GST Reports", period: "Mar 2025", month: "March", financialYear: "FY 2024-25", fileType: "Excel", status: "Updated" },
];


export const invoices = {
  order: [
    { invoiceId: "INV-1024", orderId: "ORD75639", date: "2023-10-25 14:30", amount: 12450.0, status: "Paid" },
    { invoiceId: "INV-1025", orderId: "ORD75641", date: "2023-10-22 10:00", amount: 8990.0, status: "Unpaid" },
  ],
  membership: [
    { invoiceId: "FEE-0923", period: "September 2023", date: "2023-10-10", amount: 25000.0, status: "Generated" },
    { invoiceId: "FEE-0823", period: "August 2023", date: "2023-09-10", amount: 24500.0, status: "Paid" },
  ],
};

export type Complaint = {
  complaintId: string;
  dateTime: string;
  department: string;
  subject: string;
  status: "Resolved" | "In Progress";
  activityLog: {
    date: string;
    activity: string;
    user: string;
  }[];
  description: string;
};


export const complaintsData: Complaint[] = [
    { 
        complaintId: "COM-056", 
        dateTime: "2023-10-12 10:30 AM", 
        department: "Warehouse",
        subject: "Damaged stock received", 
        description: "Received 10 units of Paracetamol 500mg with damaged packaging in order ORD-2023-123. The outer carton was crushed, and some strips were torn. Please arrange for a replacement or credit note.",
        status: "Resolved",
        activityLog: [
            { date: "2023-10-14 11:00 AM", activity: "Credit note issued for damaged items.", user: "Support Team" },
            { date: "2023-10-13 02:15 PM", activity: "Complaint reviewed. Awaiting confirmation from warehouse.", user: "Support Team" },
            { date: "2023-10-12 10:30 AM", activity: "Complaint raised by partner.", user: "Anand Sharma" },
        ]
    },
    { 
        complaintId: "COM-057", 
        dateTime: "2023-10-25 04:00 PM", 
        department: "Warehouse",
        subject: "Delay in order ORD75641", 
        description: "Order ORD75641 was scheduled for delivery on Oct 24th but has not yet arrived. The tracking information has not been updated in over 24 hours. Please provide an urgent update on the shipment status.",
        status: "In Progress",
        activityLog: [
            { date: "2023-10-26 09:00 AM", activity: "Contacted logistics partner for an update. Awaiting response.", user: "Support Team" },
            { date: "2023-10-25 04:05 PM", activity: "Complaint acknowledged and assigned to logistics team.", user: "Support Team" },
            { date: "2023-10-25 04:00 PM", activity: "Complaint raised by partner.", user: "Anand Sharma" },
        ]
    },
];

export type ProvisionalIndent = {
  indentId: string;
  dateCreated: string;
  storeId: string;
  totalValue: number;
  status: "Pending";
  products: {
    sku: string;
    name: string;
    packSize: string;
    mrp: number;
    ptr: number;
    quantity: number;
    value: number;
  }[];
};


export const provisionalIndentsData: ProvisionalIndent[] = [
  {
    indentId: "IND-2024-001",
    dateCreated: "1/20/2024",
    storeId: "Store 1 - Mumbai Main",
    totalValue: 45000,
    status: "Pending",
    products: [
      { sku: "PROD-A", name: "Product A", packSize: "10x10", mrp: 100, ptr: 80, quantity: 200, value: 16000 },
      { sku: "PROD-B", name: "Product B", packSize: "1x15", mrp: 250, ptr: 200, quantity: 100, value: 20000 },
      { sku: "PROD-C", name: "Product C", packSize: "1x5", mrp: 50, ptr: 45, quantity: 200, value: 9000 },
    ]
  },
  {
    indentId: "IND-2024-002",
    dateCreated: "1/21/2024",
    storeId: "Store 1 - Mumbai Main",
    totalValue: 32000,
    status: "Pending",
    products: [
      { sku: "PROD-D", name: "Product D", packSize: "1x30", mrp: 120, ptr: 100, quantity: 150, value: 15000 },
      { sku: "PROD-E", name: "Product E", packSize: "10x10", mrp: 85, ptr: 70, quantity: 100, value: 7000 },
      { sku: "PROD-F", name: "Product F", packSize: "1x1", mrp: 500, ptr: 400, quantity: 25, value: 10000 },
    ]
  }
];

export type FieldVisitReport = {
  id: string;
  visitDateTime: string;
  employeeName: string;
  employeeId: string;
  storeId: string;
  storeName: string;
  localHeadName: string;
  ratings: {
    storeEnvironment: number;
    staffGrooming: number;
    staffQuality: number;
    pvtLabelPharma: number;
    pvtLabelNonPharma: number;
  };
  remarks: {
    storeEnvironment?: string;
    staffGrooming?: string;
    staffQuality?: string;
    pvtLabelPharma?: string;
    pvtLabelNonPharma?: string;
  };
  staffPresent: number;
  replenishmentStatus: "Completed" | "Pending";
  outstandingPayments: "Yes" | "No";
  outstandingPaymentsRemarks?: string;
  sopDeviation?: string;
  otherObservations?: string;
  franchiseeComments?: { text: string; date: string }[];
};

export const fieldVisitReportsData: FieldVisitReport[] = [
  {
    id: "FVR-001",
    visitDateTime: "2024-10-25 11:30 AM",
    employeeName: "Sanjay Verma",
    employeeId: "EMP-101",
    storeId: "MP-BLR-KOR-01",
    storeName: "Koramangala, Bangalore",
    localHeadName: "Anand Sharma",
    ratings: {
      storeEnvironment: 4,
      staffGrooming: 5,
      staffQuality: 4,
      pvtLabelPharma: 5,
      pvtLabelNonPharma: 3,
    },
    remarks: {
      pvtLabelNonPharma: "Non-pharma promotions could be more visible.",
    },
    staffPresent: 4,
    replenishmentStatus: "Completed",
    outstandingPayments: "No",
    sopDeviation: "None observed.",
    otherObservations: "Store is well-maintained and organized.",
    franchiseeComments: [{ text: "Thanks for the feedback, we will work on the non-pharma promos.", date: "2024-10-26" }],
  },
  {
    id: "FVR-002",
    visitDateTime: "2024-10-26 02:00 PM",
    employeeName: "Priya Singh",
    employeeId: "EMP-102",
    storeId: "MP-BLR-IND-02",
    storeName: "Indiranagar, Bangalore",
    localHeadName: "Rohan Patel",
    ratings: {
      storeEnvironment: 2,
      staffGrooming: 3,
      staffQuality: 3,
      pvtLabelPharma: 2,
      pvtLabelNonPharma: 2,
    },
    remarks: {
      storeEnvironment: "Store entrance was cluttered, needs cleaning.",
      pvtLabelPharma: "Staff not fully aware of the latest pharma label offers.",
      pvtLabelNonPharma: "Promotional standee was not displayed correctly."
    },
    staffPresent: 3,
    replenishmentStatus: "Pending",
    outstandingPayments: "Yes",
    outstandingPaymentsRemarks: "Followed up on pending invoice from last month.",
    otherObservations: "Staff requires additional training on new products.",
    franchiseeComments: [],
  },
];


export const navLinks = {
  public: [
    { href: "/about-us", label: "About Us" },
    { href: "#", label: "News & Updates" },
    { href: "/faq", label: "FAQs" },
    { href: "#", label: "Resources & Training" },
    { href: "/contact-us", label: "Contact Us" },
  ],
  dashboard: [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/sales-summary", label: "Sales Summary", icon: Receipt },
    { href: "/dashboard/orders", label: "Orders", icon: History },
    { href: "/dashboard/financials", label: "Account Balance", icon: Landmark },
    { href: "/dashboard/payments", label: "Payments", icon: Banknote },
    { href: "/dashboard/returns", label: "Purchase Returns", icon: Undo2 },
    { href: "/dashboard/provisional-indent", label: "Provisional Indent", icon: ClipboardList },
    { href: "/dashboard/indent", label: "Manual Indent", icon: BookMarked },
    { href: "/dashboard/roi-analysis", label: "ROI Analysis", icon: Activity },
    { href: "/dashboard/performance", label: "Performance", icon: BarChart },
    { href: "/dashboard/reports", label: "Monthly Reports", icon: FileSliders },
    { href: "/dashboard/gst-reports", label: "GST Reports", icon: FileText },
    { href: "/dashboard/invoices", label: "Invoices", icon: FileClock },
    { href: "/dashboard/complaints", label: "Complaints", icon: ShieldQuestion },
    { href: "/dashboard/stationery-orders", label: "Stationery Orders", icon: PenSquare },
    { href: "/dashboard/field-visit-reports", label: "Field Visit Reports", icon: ClipboardList },
  ],
  footer: {
    company: [
      { href: "/about-us", label: "About Us" },
      { href: "#", label: "Careers" },
      { href: "#", label: "Press" },
      { href: "/contact-us", label: "Contact" },
    ],
    support: [
      { href: "/faq", label: "FAQs" },
      { href: "#", label: "Help Center" },
      { href: "#", label: "Terms of Service" },
      { href: "#", label: "Privacy Policy" },
    ]
  }
};

export const successStories = [
    {
        initials: "DRK",
        name: "Dr. Rajesh Kumar",
        location: "Bangalore, Karnataka",
        store: "Medplus Koramangala",
        rating: 5,
        duration: "1 year with Medplus",
        quote: "Partnering with Medplus has been the best decision for my pharmacy business. The brand recognition and supply chain efficiency have helped me grow 40% year over year. The technology support and training programs are exceptional.",
        metric: "10% MOM Growth",
        metricIcon: TrendingUp,
    },
    {
        initials: "MPS",
        name: "Mrs. Priya Sharma",
        location: "Hyderabad, Telangana",
        store: "Medplus Banjara Hills",
        rating: 5,
        duration: "2 years with Medplus",
        quote: "I converted my existing medical shop to a Medplus franchise three years ago, and it transformed my business completely. The operational support and marketing materials have made a huge difference. My customers trust the Medplus brand.",
        metric: "3x Revenue Increase",
        metricIcon: Zap,
    },
    {
        initials: "MAP",
        name: "Mr. Anil Patel",
        location: "Mumbai, Maharashtra",
        store: "Medplus Andheri West",
        rating: 5,
        duration: "1 year with Medplus",
        quote: "As one of the early franchisees, I've witnessed Medplus's incredible growth journey. The continuous innovation in technology and the dedicated support team make operations seamless. Proud to be part of this healthcare revolution.",
        metric: "Consistent Growth",
        metricIcon: LineChart,
    },
    {
        initials: "DMR",
        name: "Dr. Meena Reddy",
        location: "Chennai, Tamil Nadu",
        store: "Medplus T Nagar",
        rating: 5,
        duration: "1 year with Medplus",
        quote: "The comprehensive training and ongoing support from Medplus have been invaluable. From inventory management to customer service, every aspect is well structured. My store has become a trusted healthcare destination in the community.",
        metric: "High Customer Satisfaction",
        metricIcon: Star,
    }
];

export const faqs = [
    {
        question: "Q1. What documents are required before signing the franchise agreement?",
        answer: "A: You will need to submit KYC documents (PAN, Aadhaar, GST Registration, Shop & Establishment License, and Drug License for pharmacy operations)."
    },
    {
        question: "Q2. What is the minimum investment required to start a MedPlus franchise?",
        answer: "A: Approx. ₹15–20 Lakhs depending on store size, location, and inventory requirements (figures vary regionally; confirm with Franchisee Business Development team)."
    },
    {
        question: "Q3. How much space is required to open a MedPlus store?",
        answer: "A: Minimum 300–400 sq. ft. with proper storage area, air conditioning, and accessibility for customers."
    },
    {
        question: "Q4. Who is responsible for interior design and branding setup of the store?",
        answer: "A: MedPlus provides standard branding guidelines and approved vendors. Franchisees must ensure the setup matches company specifications before launch."
    },
    {
        question: "Q5. Is pharmacy staff recruitment handled by the company or franchisee?",
        answer: "A: Franchisees are responsible for hiring qualified staff (at least one registered pharmacist). MedPlus may assist with training and certification."
    },
    {
        question: "Q6. Is training provided for me and my staff before store launch?",
        answer: "A: Yes, MedPlus conducts mandatory training sessions covering POS usage, billing, inventory management, customer service, and compliance."
    },
    {
        question: "Q7. What IT infrastructure is required in my store?",
        answer: "A: A computer system compatible with MedPlus POS, a barcode scanner, receipt printer, internet connectivity, and backup power supply."
    },
    {
        question: "Q8. Does MedPlus help in obtaining the necessary drug licenses?",
        answer: "A: Franchisees must apply for licenses, but MedPlus provides guidance and required documentation support."
    },
    {
        question: "Q9. How soon after store setup will I start receiving inventory?",
        answer: "A: Once store readiness and compliance checks are completed, the first stock dispatch happens within 7–10 working days."
    },
    {
        question: "Q10. What initial marketing support will I receive for my store launch?",
        answer: "A: MedPlus provides launch kits — including banners, posters, flyers, and digital campaigns — to help promote your store in the local area."
    }
];

const momBrandedVsPl = [
  { month: "Jan", branded: 300000, pl: 150000 },
  { month: "Feb", branded: 280000, pl: 140000 },
  { month: "Mar", branded: 340000, pl: 170000 },
  { month: "Apr", branded: 320000, pl: 160000 },
  { month: "May", branded: 360000, pl: 190000 },
  { month: "Jun", branded: 350000, pl: 180000 },
].map(item => {
    const total = item.branded + item.pl;
    return {
        ...item,
        brandedPercentage: (item.branded / total) * 100,
        plPercentage: (item.pl / total) * 100,
    }
});

const dayWiseTableData = [
  { date: "2025-10-01", netSale: 22050, marginAmount: 3307, brandedSale: 15000, plSipSale: 7050, offlineSale: 20000, onlineSale: 2050, saleOrdersCount: 50, webOrdersCount: 5, avgBillValue: 400, bills_lt_500: 30, bills_500_1000: 20, bills_gt_1000: 5 },
  { date: "2025-10-02", netSale: 23100, marginAmount: 3465, brandedSale: 16000, plSipSale: 7100, offlineSale: 21000, onlineSale: 2100, saleOrdersCount: 52, webOrdersCount: 6, avgBillValue: 398, bills_lt_500: 35, bills_500_1000: 18, bills_gt_1000: 5 },
  { date: "2025-10-03", netSale: 21500, marginAmount: 3225, brandedSale: 14500, plSipSale: 7000, offlineSale: 19500, onlineSale: 2000, saleOrdersCount: 48, webOrdersCount: 4, avgBillValue: 413, bills_lt_500: 28, bills_500_1000: 19, bills_gt_1000: 5 },
  { date: "2025-10-04", netSale: 25200, marginAmount: 3780, brandedSale: 17000, plSipSale: 8200, offlineSale: 23000, onlineSale: 2200, saleOrdersCount: 55, webOrdersCount: 7, avgBillValue: 406, bills_lt_500: 38, bills_500_1000: 20, bills_gt_1000: 4 },
  { date: "2025-10-05", netSale: 26250, marginAmount: 3937, brandedSale: 18000, plSipSale: 8250, offlineSale: 24000, onlineSale: 2250, saleOrdersCount: 58, webOrdersCount: 8, avgBillValue: 410, bills_lt_500: 40, bills_500_1000: 18, bills_gt_1000: 6 },
  { date: "2025-10-06", netSale: 28350, marginAmount: 4252, brandedSale: 19000, plSipSale: 9350, offlineSale: 26000, onlineSale: 2350, saleOrdersCount: 65, webOrdersCount: 9, avgBillValue: 405, bills_lt_500: 45, bills_500_1000: 20, bills_gt_1000: 5 },
  { date: "2025-10-07", netSale: 24150, marginAmount: 3622, brandedSale: 16500, plSipSale: 7650, offlineSale: 22000, onlineSale: 2150, saleOrdersCount: 53, webOrdersCount: 7, avgBillValue: 416, bills_lt_500: 33, bills_500_1000: 20, bills_gt_1000: 5 },
  { date: "2025-10-08", netSale: 27300, marginAmount: 4095, brandedSale: 18500, plSipSale: 8800, offlineSale: 25000, onlineSale: 2300, saleOrdersCount: 62, webOrdersCount: 8, avgBillValue: 407, bills_lt_500: 42, bills_500_1000: 20, bills_gt_1000: 5 },
  { date: "2025-10-09", netSale: 29400, marginAmount: 4410, brandedSale: 20000, plSipSale: 9400, offlineSale: 27000, onlineSale: 2400, saleOrdersCount: 68, webOrdersCount: 10, avgBillValue: 408, bills_lt_500: 48, bills_500_1000: 22, bills_gt_1000: 2 },
  { date: "2025-10-10", netSale: 31500, marginAmount: 4725, brandedSale: 21000, plSipSale: 10500, offlineSale: 28500, onlineSale: 3000, saleOrdersCount: 70, webOrdersCount: 12, avgBillValue: 421, bills_lt_500: 50, bills_500_1000: 18, bills_gt_1000: 7 },
];

export const performanceData = {
  mom: {
    netSalesMargin: [
      { month: "Jan", netSale: 450000, margin: 75000, marginPercentage: (75000 / 450000) * 100 },
      { month: "Feb", netSale: 420000, margin: 70000, marginPercentage: (70000 / 420000) * 100 },
      { month: "Mar", netSale: 510000, margin: 85000, marginPercentage: (85000 / 510000) * 100 },
      { month: "Apr", netSale: 480000, margin: 80000, marginPercentage: (80000 / 480000) * 100 },
      { month: "May", netSale: 550000, margin: 92000, marginPercentage: (92000 / 550000) * 100 },
      { month: "Jun", netSale: 530000, margin: 88000, marginPercentage: (88000 / 530000) * 100 },
    ],
    brandedVsPl: momBrandedVsPl,
    salesByCategory: [
      { month: "Jan", pharma_sale: 200000, pharma_margin: 30000, general_sale: 100000, general_margin: 20000, pl_pharma_sale: 100000, pl_pharma_margin: 40000, pl_general_sale: 50000, pl_general_margin: 25000, surgical_sale: 50000, surgical_margin: 10000 },
      { month: "Feb", pharma_sale: 190000, pharma_margin: 28000, general_sale: 90000, general_margin: 18000, pl_pharma_sale: 90000, pl_pharma_margin: 36000, pl_general_sale: 40000, pl_general_margin: 20000, surgical_sale: 40000, surgical_margin: 8000 },
      { month: "Mar", pharma_sale: 220000, pharma_margin: 35000, general_sale: 120000, general_margin: 24000, pl_pharma_sale: 120000, pl_pharma_margin: 48000, pl_general_sale: 60000, pl_general_margin: 30000, surgical_sale: 60000, surgical_margin: 12000 },
      { month: "Apr", pharma_sale: 210000, pharma_margin: 32000, general_sale: 110000, general_margin: 22000, pl_pharma_sale: 110000, pl_pharma_margin: 44000, pl_general_sale: 55000, pl_general_margin: 27500, surgical_sale: 55000, surgical_margin: 11000 },
      { month: "May", pharma_sale: 240000, pharma_margin: 40000, general_sale: 130000, general_margin: 26000, pl_pharma_sale: 130000, pl_pharma_margin: 52000, pl_general_sale: 65000, pl_general_margin: 32500, surgical_sale: 65000, surgical_margin: 13000 },
      { month: "Jun", pharma_sale: 230000, pharma_margin: 38000, general_sale: 125000, general_margin: 25000, pl_pharma_sale: 125000, pl_pharma_margin: 50000, pl_general_sale: 60000, pl_general_margin: 30000, surgical_sale: 60000, surgical_margin: 12000 },
    ],
    offlineVsOnline: [
      { name: "Offline", value: 2400000, fill: "hsl(var(--chart-1))" },
      { name: "Online", value: 384000, fill: "hsl(var(--chart-2))" },
    ],
    ordersCount: [
      { month: "Jan", salesOrders: 1500, webOrders: 300 },
      { month: "Feb", salesOrders: 1400, webOrders: 280 },
      { month: "Mar", salesOrders: 1600, webOrders: 320 },
      { month: "Apr", salesOrders: 1550, webOrders: 310 },
      { month: "May", salesOrders: 1700, webOrders: 340 },
      { month: "Jun", salesOrders: 1650, webOrders: 330 },
    ],
    avgBillValue: [
        { month: "Jan", abv: 300, bills: 1500 },
        { month: "Feb", abv: 300, bills: 1400 },
        { month: "Mar", abv: 318, bills: 1600 },
        { month: "Apr", abv: 310, bills: 1550 },
        { month: "May", abv: 323, bills: 1700 },
        { month: "Jun", abv: 321, bills: 1650 },
    ],
    billsBySlab: [
        { month: "Jan", bills_lt_200: 300, bills_200_500: 600, bills_500_999: 450, bills_gt_1000: 150 },
        { month: "Feb", bills_lt_200: 280, bills_200_500: 560, bills_500_999: 420, bills_gt_1000: 140 },
        { month: "Mar", bills_lt_200: 320, bills_200_500: 640, bills_500_999: 480, bills_gt_1000: 160 },
        { month: "Apr", bills_lt_200: 310, bills_200_500: 620, bills_500_999: 465, bills_gt_1000: 155 },
        { month: "May", bills_lt_200: 340, bills_200_500: 680, bills_500_999: 510, bills_gt_1000: 170 },
        { month: "Jun", bills_lt_200: 330, bills_200_500: 660, bills_500_999: 495, bills_gt_1000: 165 },
    ]
  },
  day: {
    tableData: dayWiseTableData,
  }
};
    
export const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

export const franchiseReasons = [
    "Strong Brand Reputation and Customer Trust",
    "High Demand for Organized Pharmacy Chains",
    "Attractive ROI and Growth Potential",
    "Supply Chain and Technology Support from MedPlus",
    "Healthcare Background or Personal Interest",
    "Expanding My Existing Business Portfolio",
    "Other"
];

export type StationeryOrder = {
  id: string;
  orderId: string;
  orderDate: string;
  totalItems: number;
  totalCost: number;
  status: "Pending" | "Approved" | "Dispatched" | "Completed" | "Cancelled";
  items: { code: string; name: string; uom: string; quantity: number; cost: number; }[];
  trackingHistory: { status: string; date: string; location: string; }[];
};

export const stationeryOrdersData: StationeryOrder[] = [
  {
    id: "stn-1",
    orderId: "STN-00001",
    orderDate: "2025-09-25",
    totalItems: 2,
    totalCost: 1540,
    status: "Approved",
    items: [
      { code: "PRIN0040", name: "Thermal Rolls - 3” Width & 50 Mtrs Length", uom: "Number", quantity: 20, cost: 1000 },
      { code: "BILL0009", name: "Bill Paper - 10 X 12 X 1, GSM 70", uom: "Pkt", quantity: 4, cost: 540 },
    ],
    trackingHistory: [
        { status: "Approved", date: "2025-09-26", location: "Head Office"},
        { status: "Pending", date: "2025-09-25", location: "Franchisee Portal"},
    ]
  },
   {
    id: "stn-2",
    orderId: "STN-00002",
    orderDate: "2025-09-30",
    totalItems: 1,
    totalCost: 720,
    status: "Pending",
    items: [
      { code: "PRIN0061", name: "Printed Compostable Covers - 7 X 10 inches", uom: "Kilogram", quantity: 3, cost: 720 },
    ],
     trackingHistory: [
        { status: "Pending", date: "2025-09-30", location: "Franchisee Portal"},
    ]
  },
  {
    id: "stn-3",
    orderId: "STN-00003",
    orderDate: "2025-10-05",
    totalItems: 3,
    totalCost: 2140,
    status: "Dispatched",
    items: [
        { code: "PRIN0040", name: "Thermal Rolls - 3” Width & 50 Mtrs Length", uom: "Number", quantity: 10, cost: 500 },
        { code: "BILL0009", name: "Bill Paper - 10 X 12 X 1, GSM 70", uom: "Pkt", quantity: 8, cost: 1080 },
        { code: "REGI0022", name: "Register No. 1, Ledger Pages 300", uom: "Number", quantity: 4, cost: 560 },
    ],
    trackingHistory: [
        { status: "Dispatched", date: "2025-10-06", location: "Central Warehouse"},
        { status: "Approved", date: "2025-10-06", location: "Head Office"},
        { status: "Pending", date: "2025-10-05", location: "Franchisee Portal"},
    ]
  },
];

export type StationeryItem = {
    code: string;
    name: string;
    uom: string;
    example: number;
};

export const stationeryItemsData: StationeryItem[] = [
    { code: "PRIN0040", name: "Thermal Rolls - 3” Width & 50 Mtrs Length", uom: "Number", example: 50},
    { code: "BILL0009", name: "Bill Paper - 10 X 12 X 1, GSM 70", uom: "Pkt", example: 3},
    { code: "PRIN0061", name: "Printed Compostable Covers - 7 X 10 inches", uom: "Kilogram", example: 3},
    { code: "PRIN0062", name: "Printed Compostable Covers - 9 X 12 inches", uom: "Kilogram", example: 5},
    { code: "REGI0022", name: "Register No. 1, Ledger Pages 300", uom: "Number", example: 1},
    { code: "STAT0034", name: "Ball Point Pens - Blue", uom: "Box", example: 2},
    { code: "STAT0035", name: "Stapler Machine - No. 10", uom: "Number", example: 1},
];
  

    

  



    

    








  


