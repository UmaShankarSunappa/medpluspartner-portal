

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

export type Order = {
  orderId: string;
  date: string;
  total: number;
  status: string;
  type: string;
  products?: { sku: string; name: string; quantity: number; price: number }[];
  trackingHistory?: { status: string; date: string; location: string }[];
};


export const ordersData: Order[] = [
  { 
    orderId: "ORD-2024-001", 
    date: "1/15/2024", 
    total: 45000.0, 
    status: "Delivered", 
    type: "Auto",
    products: [
      { sku: 'PARA500', name: 'Paracetamol 500mg', quantity: 100, price: 1500 },
      { sku: 'VICKS-AC', name: 'Vicks Action 500', quantity: 50, price: 2000 },
      { sku: 'BAND-AID', name: 'Band-Aid Assorted', quantity: 200, price: 4000 },
    ],
    trackingHistory: [
      { status: 'Delivered', date: '2024-01-15 14:30', location: 'Koramangala, Bangalore' },
      { status: 'Out for Delivery', date: '2024-01-15 09:00', location: 'Bangalore Hub' },
      { status: 'Shipped', date: '2024-01-14 18:00', location: 'Hyderabad Warehouse' },
      { status: 'Processing', date: '2024-01-14 10:00', location: 'Hyderabad Warehouse' },
    ]
  },
  { 
    orderId: "ORD-2024-002", 
    date: "1/18/2024", 
    total: 32000.0, 
    status: "In Transit", 
    type: "Manual",
    products: [
      { sku: 'MOOV', name: 'Moov Ointment', quantity: 40, price: 4800 },
      { sku: 'VOLINI', name: 'Volini Spray', quantity: 30, price: 4500 },
    ],
     trackingHistory: [
      { status: 'In Transit', date: '2024-01-18 11:00', location: 'On its way to Bangalore' },
      { status: 'Shipped', date: '2024-01-17 17:30', location: 'Hyderabad Warehouse' },
      { status: 'Processing', date: '2024-01-17 09:00', location: 'Hyderabad Warehouse' },
    ]
  },
  { 
    orderId: "ORD-2024-003", 
    date: "1/20/2024", 
    total: 58000.0, 
    status: "Processing", 
    type: "Auto",
    products: [
      { sku: 'CETZINE', name: 'Cetirizine 10mg', quantity: 300, price: 3000 },
      { sku: 'ELECTRAL', name: 'Electral Powder', quantity: 500, price: 10000 },
    ],
     trackingHistory: [
      { status: 'Processing', date: '2024-01-20 12:00', location: 'Hyderabad Warehouse' },
    ]
  },
  { 
    orderId: "ORD75641", 
    date: "2023-10-21", 
    total: 8990.0, 
    status: "Processing", 
    type: "Emergency",
    products: [
      { sku: 'INSULIN-G', name: 'Glargine Insulin', quantity: 10, price: 3500 },
      { sku: 'TEST-STRIP', name: 'Glucose Test Strips', quantity: 5, price: 2500 },
    ],
    trackingHistory: [
      { status: 'Processing', date: '2023-10-21 10:00', location: 'Hyderabad Warehouse' },
    ]
  },
  { 
    orderId: "ORD75642", 
    date: "2023-10-20", 
    total: 21350.0, 
    status: "Delivered", 
    type: "Provisional",
    products: [
      { sku: 'ASPIRIN75', name: 'Aspirin 75mg', quantity: 200, price: 1000 },
      { sku: 'ATORVA10', name: 'Atorvastatin 10mg', quantity: 150, price: 2250 },
    ],
    trackingHistory: [
      { status: 'Delivered', date: '2023-10-20 15:00', location: 'Indiranagar, Bangalore' },
      { status: 'Out for Delivery', date: '2023-10-20 09:30', location: 'Bangalore Hub' },
      { status: 'Shipped', date: '2023-10-19 19:00', location: 'Hyderabad Warehouse' },
    ]
  },
  { 
    orderId: "ORD75643", 
    date: "2023-10-18", 
    total: 5400.0, 
    status: "Cancelled", 
    type: "Standard",
    products: [],
    trackingHistory: [
       { status: 'Cancelled', date: '2023-10-18 13:00', location: 'Hyderabad Warehouse' },
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
  storeName: "Koramangala, Bangalore",
  creditLimit: 500000,
  outstanding: 125780,
  creditPeriod: 45,
};

export const transactions = [
    { 
        dateTime: "2023-10-26 14:30", 
        billId: "INV-1024", 
        billType: "Payment", 
        amount: 12450.0,
        billingPlace: "Bangalore",
        transactionType: "Dr"
    },
    { 
        dateTime: "2023-10-25 11:00", 
        billId: "CN-056", 
        billType: "Credit Note", 
        amount: 2300.0,
        billingPlace: "Hyderabad",
        transactionType: "Cr"
    },
    { 
        dateTime: "2023-10-21 10:15", 
        billId: "PUR-5678", 
        billType: "Purchases", 
        amount: 32000.0,
        billingPlace: "Hyderabad",
        transactionType: "Dr"
    },
    { 
        dateTime: "2023-10-20 18:00", 
        billId: "INV-1022", 
        billType: "Payment", 
        amount: 8990.0,
        billingPlace: "Bangalore",
        transactionType: "Dr"
    },
    { 
        dateTime: "2023-09-30 20:00", 
        billId: "COMM-0923", 
        billType: "Commission", 
        amount: 35000.0,
        billingPlace: "Corporate",
        transactionType: "Cr"
    }
];

export const paymentsData = [
  { paymentId: "PAY-2024-001", name: "Monthly Payment", createdDate: "1/15/2024", approvedDate: "1/16/2024", status: "Approved", amount: 30000, mode: "NEFT" },
  { paymentId: "PAY-2024-002", name: "Advance Payment", createdDate: "1/20/2024", approvedDate: null, status: "Pending", amount: 15000, mode: "UPI" },
];

export type Return = {
  returnId: string;
  taxInvoice: string;
  createdBy: string;
  total: number;
  receivedDate: string;
  returnNoteId: string | null;
  status: "Approved" | "Pending" | "Rejected";
  products: {
    sku: string;
    name: string;
    batch: string;
    quantity: number;
    value: number;
  }[];
};

export const returnsData: Return[] = [
  { 
    returnId: "RET-0123", 
    taxInvoice: "TINV-987",
    createdBy: "Anand Sharma",
    total: 2300.0,
    receivedDate: "2023-10-15",
    returnNoteId: "CN-056",
    status: "Approved",
    products: [
        { sku: "PARA500", name: "Paracetamol 500mg", batch: "B123", quantity: 10, value: 150 },
        { sku: "VICKS-AC", name: "Vicks Action 500", batch: "V456", quantity: 5, value: 200 },
    ]
  },
  { 
    returnId: "RET-0124", 
    taxInvoice: "TINV-991",
    createdBy: "Anand Sharma",
    total: 1250.0,
    receivedDate: "2023-10-18",
    returnNoteId: null,
    status: "Pending",
    products: [
        { sku: "MOOV", name: "Moov Ointment", batch: "M789", quantity: 10, value: 1200 }
    ]
  },
  { 
    returnId: "RET-0125", 
    taxInvoice: "TINV-992",
    createdBy: "Anand Sharma",
    total: 800.0,
    receivedDate: "2023-10-22",
    returnNoteId: null,
    status: "Rejected",
    products: [
        { sku: "VOLINI", name: "Volini Spray", batch: "VO101", quantity: 5, value: 750 }
    ]
  },
];

export const monthlyReports = [
    { id: "REP-001", name: "Net Sale vs. Margin", period: "Oct 2025", fileType: "Excel", actionRequired: false },
    { id: "REP-002", name: "Rental Invoices", period: "Oct 2025", fileType: "PDF", actionRequired: false },
    { id: "REP-003", name: "Expiry Products List", period: "Oct 2025", fileType: "Excel", actionRequired: true },
    { id: "REP-004", name: "Slow-Moving Products", period: "Oct 2025", fileType: "Excel", actionRequired: true },
    { id: "REP-005", name: "Credit Note", period: "Oct 2025", fileType: "Excel", actionRequired: false },
    { id: "REP-006", name: "Royalty Fee Invoice", period: "Oct 2025", fileType: "PDF", actionRequired: false },
    { id: "REP-007", name: "GST Reports", period: "Oct 2025", fileType: "Excel", actionRequired: false },
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

export type Complaint = {
  complaintId: string;
  dateTime: string;
  department: string;
  subject: string;
  description: string;
  status: "Resolved" | "In Progress";
  activityLog: {
    date: string;
    activity: string;
    user: string;
  }[];
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
        department: "Logistics",
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
    { href: "/dashboard/account", label: "Account profile", icon: User },
    { href: "/dashboard/orders", label: "Orders", icon: History },
    { href: "/dashboard/financials", label: "Account Balance", icon: Landmark },
    { href: "/dashboard/payments", label: "Payments", icon: Banknote },
    { href: "/dashboard/returns", label: "Returns", icon: Undo2 },
    { href: "/dashboard/provisional-indent", label: "Provisional Indent", icon: ClipboardList },
    { href: "/dashboard/reports", label: "Monthly Reports", icon: FileSliders },
    { href: "/dashboard/invoices", label: "Invoices", icon: FileClock },
    { href: "/dashboard/complaints", label: "Complaints", icon: ShieldQuestion },
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
]

    






    


