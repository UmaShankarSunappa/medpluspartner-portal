
export type Product = {
  id: string;
  name: string;
  price: number;
  packSize: string;
  availQty: number;
  gstRate: number; // e.g., 0.12 for 12%
};

export const products: Product[] = [
  { id: "PARA500", name: "Paracetamol 500mg Tablets", price: 15.00, packSize: "10s", availQty: 1500, gstRate: 0.12 },
  { id: "CET10", name: "Cetirizine 10mg Tablets", price: 20.50, packSize: "10s", availQty: 800, gstRate: 0.12 },
  { id: "AMOXI250", name: "Amoxicillin 250mg Capsules", price: 45.75, packSize: "10s", availQty: 600, gstRate: 0.18 },
  { id: "OMEP20", name: "Omeprazole 20mg Capsules", price: 35.00, packSize: "15s", availQty: 950, gstRate: 0.18 },
  { id: "VICKS-AC", name: "Vicks Action 500 Advanced", price: 40.00, packSize: "10s", availQty: 1200, gstRate: 0.05 },
  { id: "BAND-AID", name: "Band-Aid Assorted Pack", price: 25.00, packSize: "20s", availQty: 2000, gstRate: 0.05 },
  { id: "DOLO650", name: "Dolo 650mg Tablets", price: 30.00, packSize: "15s", availQty: 3000, gstRate: 0.12 },
  { id: "MOOV", name: "Moov Pain Relief Cream", price: 120.00, packSize: "50g", availQty: 700, gstRate: 0.18 },
  { id: "VOLINI", name: "Volini Pain Relief Spray", price: 150.00, packSize: "60g", availQty: 500, gstRate: 0.18 },
  { id: "ELECTRAL", name: "Electral Powder (ORS)", price: 20.00, packSize: "21.8g", availQty: 5000, gstRate: 0.05 },
  { id: "DETTOL-AS", name: "Dettol Antiseptic Liquid", price: 80.00, packSize: "200ml", availQty: 1000, gstRate: 0.18 },
  { id: "SAVALON", name: "Savlon Antiseptic Liquid", price: 75.00, packSize: "200ml", availQty: 1100, gstRate: 0.18 },
  { id: "GLUCON-D", name: "Glucon-D Instant Energy", price: 150.00, packSize: "500g", availQty: 800, gstRate: 0.05 },
  { id: "TELMA40", name: "Telmisartan 40mg", price: 70.00, packSize: "15s", availQty: 1200, gstRate: 0.12 },
  { id: "ROSU10", name: "Rosuvastatin 10mg", price: 90.00, packSize: "10s", availQty: 850, gstRate: 0.12 },
  { id: "METF500", name: "Metformin 500mg", price: 25.00, packSize: "20s", availQty: 2500, gstRate: 0.12 },
  { id: "ATOR10", name: "Atorvastatin 10mg", price: 55.00, packSize: "15s", availQty: 1800, gstRate: 0.12 },
];

