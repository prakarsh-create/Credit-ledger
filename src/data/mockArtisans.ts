import { MSMEProfile } from '../types';

export const mockArtisans: MSMEProfile[] = [
  {
    id: "msme_001",
    name: "Lucknowi Chikankari Kendra",
    ownerName: "Rahat Fatima",
    email: "rahat.fatima@chikankarilucknow.org",
    phone: "+91 94150 12345",
    location: "Chowk",
    craftType: "Chikankari",
    foundedYear: 2012,
    artisanCount: 18,
    monthlyRent: 8500,
    rawMaterialSource: "Local Cotton Mills & Handloom Cooperatives",
    gstFilings: [
      { quarter: "Q1 - 2026", turnover: 245000, taxPaid: 12250, filingDate: "2026-04-18", status: "Filed-On-Time" },
      { quarter: "Q4 - 2025", turnover: 290000, taxPaid: 14500, filingDate: "2026-01-15", status: "Filed-On-Time" },
      { quarter: "Q3 - 2025", turnover: 180000, taxPaid: 9000, filingDate: "2025-10-14", status: "Filed-On-Time" },
      { quarter: "Q2 - 2025", turnover: 210000, taxPaid: 10500, filingDate: "2025-07-22", status: "Filed-Late" }
    ],
    orders: [
      { id: "ord_101", buyerName: "Kora Fab Delhi", orderDate: "2026-04-01", deliveryDate: "2026-04-25", actualDeliveryDate: "2026-04-24", amount: 65000, itemsCount: 120, status: "Delivered", embroiderersAssigned: 12, craftType: "Chikankari" },
      { id: "ord_102", buyerName: "FabIndia Franchise", orderDate: "2026-04-10", deliveryDate: "2026-05-15", actualDeliveryDate: "2026-05-12", amount: 110000, itemsCount: 200, status: "Delivered", embroiderersAssigned: 16, craftType: "Chikankari" },
      { id: "ord_103", buyerName: "Hazratganj Retailers Assoc.", orderDate: "2026-05-02", deliveryDate: "2026-06-05", actualDeliveryDate: "2026-06-05", amount: 45000, itemsCount: 80, status: "In-Production", embroiderersAssigned: 6, craftType: "Chikankari" }
    ],
    monthlySales: [
      { month: "Jun 2025", amount: 62000 },
      { month: "Jul 2025", amount: 68000 },
      { month: "Aug 2025", amount: 75000 },
      { month: "Sep 2025", amount: 82000 },
      { month: "Oct 2025", amount: 95000 },
      { month: "Nov 2025", amount: 120000 },
      { month: "Dec 2025", amount: 110000 },
      { month: "Jan 2026", amount: 85000 },
      { month: "Feb 2026", amount: 90000 },
      { month: "Mar 2026", amount: 95000 },
      { month: "Apr 2026", amount: 115000 },
      { month: "May 2026", amount: 105000 }
    ],
    transactionCashRatio: 0.15, // Only 15% cash, highly digital
    deliveryDelayRate: 0.05, // 5% late deliveries (Excellent efficiency)
    customerRetentionRate: 0.82, // 82% return buyers
    rawMaterialCostIncreaseBuffer: 0.25, // Can absorb 25% cost hike safely
    loanRequirement: 350000,
    loanPurpose: "Upgrade to solar-powered weaving tables, and stocking high-quality georgette silk threads for Urdu festival season."
  },
  {
    id: "msme_002",
    name: "Golden Threads Zardozi Craft",
    ownerName: "Mohammad Salimuddin",
    email: "salim.zardozi@gmail.com",
    phone: "+91 94520 98765",
    location: "Nakhas",
    craftType: "Zardozi",
    foundedYear: 2018,
    artisanCount: 8,
    monthlyRent: 4500,
    rawMaterialSource: "Aminabad Metallic Zari Merchants",
    gstFilings: [
      { quarter: "Q1 - 2026", turnover: 120000, taxPaid: 6000, filingDate: "2026-04-20", status: "Filed-On-Time" },
      { quarter: "Q4 - 2025", turnover: 185000, taxPaid: 9250, filingDate: "2026-01-28", status: "Filed-Late" },
      { quarter: "Q3 - 2025", turnover: 140000, taxPaid: 7000, filingDate: "2025-10-12", status: "Filed-On-Time" },
      { quarter: "Q2 - 2025", turnover: 95000, taxPaid: 4750, filingDate: "2025-07-15", status: "Filed-On-Time" }
    ],
    orders: [
      { id: "ord_201", buyerName: "Kapurthala Bridal Boutique", orderDate: "2026-03-12", deliveryDate: "2026-04-10", actualDeliveryDate: "2026-04-14", amount: 78000, itemsCount: 15, status: "Delivered", embroiderersAssigned: 6, craftType: "Zardozi" },
      { id: "ord_202", buyerName: "Mehdi Hasan Groomswear", orderDate: "2026-04-15", deliveryDate: "2026-05-10", actualDeliveryDate: "2026-05-18", amount: 95000, itemsCount: 18, status: "Delivered", embroiderersAssigned: 8, craftType: "Zardozi" },
      { id: "ord_203", buyerName: "Naza Market Retail Store", orderDate: "2026-05-01", deliveryDate: "2026-05-25", actualDeliveryDate: "2026-05-25", amount: 40000, itemsCount: 8, status: "In-Production", embroiderersAssigned: 4, craftType: "Zardozi" }
    ],
    monthlySales: [
      { month: "Jun 2025", amount: 32000 },
      { month: "Jul 2025", amount: 28000 },
      { month: "Aug 2025", amount: 45000 },
      { month: "Sep 2025", amount: 50000 },
      { month: "Oct 2025", amount: 85000 },
      { month: "Nov 2025", amount: 140000 },
      { month: "Dec 2025", amount: 125000 },
      { month: "Jan 2026", amount: 65000 },
      { month: "Feb 2026", amount: 75000 },
      { month: "Mar 2026", amount: 80000 },
      { month: "Apr 2026", amount: 92000 },
      { month: "May 2026", amount: 55000 }
    ],
    transactionCashRatio: 0.65, // 65% cash transactions (High cash reliance)
    deliveryDelayRate: 0.28, // 28% delay rate due to hand-work complexity and high labor dependencies
    customerRetentionRate: 0.65, // 65% retention
    rawMaterialCostIncreaseBuffer: 0.12, // Lower margin due to rising pure silver gold wire (zari) pricing
    loanRequirement: 200000,
    loanPurpose: "Procure gold zari wire in bulk from Varanasi wholesale agents to hedge against metal price volatility before wedding season."
  },
  {
    id: "msme_003",
    name: "Avadh Karigar Mahila Cooperative",
    ownerName: "Saira Bano",
    email: "saira.avadhcraft@gmail.com",
    phone: "+91 94155 45678",
    location: "Kakori",
    craftType: "Chikankari",
    foundedYear: 2020,
    artisanCount: 24,
    monthlyRent: 2000, // Supported by panchayat bhawan space at Kakori
    rawMaterialSource: "Khadi Gramodyog Uttar Pradesh",
    gstFilings: [
      { quarter: "Q1 - 2026", turnover: 320000, taxPaid: 16000, filingDate: "2026-04-12", status: "Filed-On-Time" },
      { quarter: "Q4 - 2025", turnover: 310000, taxPaid: 15500, filingDate: "2026-01-14", status: "Filed-On-Time" },
      { quarter: "Q3 - 2025", turnover: 290000, taxPaid: 14500, filingDate: "2025-10-10", status: "Filed-On-Time" },
      { quarter: "Q2 - 2025", turnover: 270000, taxPaid: 13500, filingDate: "2025-07-10", status: "Filed-On-Time" }
    ],
    orders: [
      { id: "ord_301", buyerName: "UP Handloom Corp (Avadh)", orderDate: "2026-03-10", deliveryDate: "2026-04-20", actualDeliveryDate: "2026-04-18", amount: 150000, itemsCount: 400, status: "Delivered", embroiderersAssigned: 20, craftType: "Chikankari" },
      { id: "ord_302", buyerName: "Varanasi Silk Merchants", orderDate: "2026-04-02", deliveryDate: "2026-05-10", actualDeliveryDate: "2026-05-09", amount: 95000, itemsCount: 220, status: "Delivered", embroiderersAssigned: 15, craftType: "Chikankari" },
      { id: "ord_303", buyerName: "Swadeshi Store Mumbai", orderDate: "2026-05-05", deliveryDate: "2026-06-15", actualDeliveryDate: "2026-06-15", amount: 80000, itemsCount: 180, status: "In-Production", embroiderersAssigned: 12, craftType: "Chikankari" }
    ],
    monthlySales: [
      { month: "Jun 2025", amount: 85000 },
      { month: "Jul 2025", amount: 90000 },
      { month: "Aug 2025", amount: 95000 },
      { month: "Sep 2025", amount: 100000 },
      { month: "Oct 2025", amount: 120000 },
      { month: "Nov 2025", amount: 135000 },
      { month: "Dec 2025", amount: 140000 },
      { month: "Jan 2026", amount: 110000 },
      { month: "Feb 2026", amount: 105000 },
      { month: "Mar 2026", amount: 115000 },
      { month: "Apr 2026", amount: 130000 },
      { month: "May 2026", amount: 125000 }
    ],
    transactionCashRatio: 0.32,
    deliveryDelayRate: 0.03, // Exceptionally reliable
    customerRetentionRate: 0.90, // Excellent buyer trust with UP govt portals
    rawMaterialCostIncreaseBuffer: 0.30, // Extremely reliable supply chain with Khadi Gramodyog
    loanRequirement: 500000,
    loanPurpose: "Adding digital print machinery to combine Kakori block print designs with handmade shadow-work Chikankari stitches."
  },
  {
    id: "msme_004",
    name: "Begum Sahiba Royal Attire",
    ownerName: "Zeenat Jahan & Sons",
    email: "zeenat.bridal@gmail.com",
    phone: "+91 93361 77211",
    location: "Aminabad",
    craftType: "Zardozi",
    foundedYear: 2021,
    artisanCount: 5,
    monthlyRent: 12000, // High commercial rent in Aminabad market
    rawMaterialSource: "Aminabad Wholesale Market",
    gstFilings: [
      { quarter: "Q1 - 2026", turnover: 65000, taxPaid: 3250, filingDate: "2026-04-29", status: "Filed-Late" },
      { quarter: "Q4 - 2025", turnover: 98000, taxPaid: 4900, filingDate: "2026-02-10", status: "Filed-Late" },
      { quarter: "Q3 - 2025", turnover: 45000, taxPaid: 2250, filingDate: "2025-10-30", status: "Filed-Late" },
      { quarter: "Q2 - 2025", turnover: 55000, taxPaid: 2750, filingDate: "2025-07-28", status: "Filed-Late" }
    ],
    orders: [
      { id: "ord_401", buyerName: "Komal Bridal House Chowk", orderDate: "2026-02-10", deliveryDate: "2026-03-20", actualDeliveryDate: "2026-03-29", amount: 35000, itemsCount: 4, status: "Delivered", embroiderersAssigned: 3, craftType: "Zardozi" },
      { id: "ord_402", buyerName: "Zardozi Corner Lucknow", orderDate: "2026-04-01", deliveryDate: "2026-05-01", actualDeliveryDate: "2026-05-15", amount: 48000, itemsCount: 6, status: "Delivered", embroiderersAssigned: 4, craftType: "Zardozi" }
    ],
    monthlySales: [
      { month: "Jun 2025", amount: 15000 },
      { month: "Jul 2025", amount: 12000 },
      { month: "Aug 2025", amount: 22000 },
      { month: "Sep 2025", amount: 28000 },
      { month: "Oct 2025", amount: 65000 },
      { month: "Nov 2025", amount: 88000 },
      { month: "Dec 2025", amount: 72000 },
      { month: "Jan 2026", amount: 35000 },
      { month: "Feb 2026", amount: 32000 },
      { month: "Mar 2026", amount: 38000 },
      { month: "Apr 2026", amount: 40000 },
      { month: "May 2026", amount: 25000 }
    ],
    transactionCashRatio: 0.85, // Heavy cash reliance (85%)
    deliveryDelayRate: 0.42, // High delay rate (complex intricate designs + bottlenecked workshop)
    customerRetentionRate: 0.50, // Low repeat rate
    rawMaterialCostIncreaseBuffer: 0.08, // Margins are thin due to high rental overhead in Aminabad
    loanRequirement: 150000,
    loanPurpose: "Urgent working capital to pay artisan salaries during low lean seasons and procure raw fabrics from weavers."
  }
];
