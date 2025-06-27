import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { File } from "lucide-react";

// Import custom layout and data components
import Header from "@/components/layout/Header";
import LeftSidebar from "@/components/layout/LeftSidebar";
import Footer from "@/components/layout/Footer";
import { DataGrid } from "@/components/DataGrid";
import { DateRangePicker } from "@/components/DateRangePicker";

// Import shadcn/ui components
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

// Define the data structure for a product
export type Product = {
  id: string;
  name: string;
  imageUrl: string;
  stock: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
  sold: number;
  revenue: number;
};

// Sample data for the products grid
const sampleProducts: Product[] = [
  {
    id: "PROD-001",
    name: "Classic Cotton T-Shirt",
    imageUrl: "https://placehold.co/40x40/E2E8F0/4A5568?text=T",
    stock: 120,
    status: "In Stock",
    sold: 1500,
    revenue: 45000,
  },
  {
    id: "PROD-002",
    name: "Modern Wireless Headphones",
    imageUrl: "https://placehold.co/40x40/E2E8F0/4A5568?text=H",
    stock: 45,
    status: "In Stock",
    sold: 800,
    revenue: 79920,
  },
  {
    id: "PROD-003",
    name: "Leather-bound Notebook",
    imageUrl: "https://placehold.co/40x40/E2E8F0/4A5568?text=N",
    stock: 8,
    status: "Low Stock",
    sold: 350,
    revenue: 8750,
  },
  {
    id: "PROD-004",
    name: "Stainless Steel Water Bottle",
    imageUrl: "https://placehold.co/40x40/E2E8F0/4A5568?text=W",
    stock: 200,
    status: "In Stock",
    sold: 2200,
    revenue: 55000,
  },
  {
    id: "PROD-005",
    name: "Ergonomic Office Chair",
    imageUrl: "https://placehold.co/40x40/E2E8F0/4A5568?text=C",
    stock: 0,
    status: "Out of Stock",
    sold: 120,
    revenue: 30000,
  },
  {
    id: "PROD-006",
    name: "Smart Fitness Tracker",
    imageUrl: "https://placehold.co/40x40/E2E8F0/4A5568?text=F",
    stock: 75,
    status: "In Stock",
    sold: 950,
    revenue: 47500,
  },
];

// Define columns for the DataGrid
export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Product Name",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <img
          src={row.original.imageUrl}
          alt={row.original.name}
          className="h-10 w-10 rounded-md object-cover"
        />
        <div className="font-medium">{row.getValue("name")}</div>
      </div>
    ),
    enableSorting: true,
    enableHiding: false,
    enableColumnFilter: true,
  },
  {
    accessorKey: "status",
    header: "Stock Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as Product["status"];
      let variant: "default" | "secondary" | "destructive" = "default";
      if (status === "Low Stock") variant = "secondary";
      if (status === "Out of Stock") variant = "destructive";
      return <Badge variant={variant}>{status}</Badge>;
    },
  },
  {
    accessorKey: "sold",
    header: "Units Sold",
    cell: ({ row }) => <div className="text-center">{row.getValue("sold")}</div>,
  },
  {
    accessorKey: "revenue",
    header: "Revenue",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("revenue"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
];

const Products = () => {
  console.log("Products page loaded");
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <LeftSidebar />
      <div className="flex flex-col">
        <Header title="Products" />
        <ScrollArea className="flex-1">
          <main className="flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <div className="flex items-center justify-between gap-2 mb-6">
              <DateRangePicker />
              <Button size="sm" variant="outline" className="h-9 gap-1">
                <File className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Export
                </span>
              </Button>
            </div>
            <DataGrid columns={columns} data={sampleProducts} />
          </main>
        </ScrollArea>
        <Footer />
      </div>
    </div>
  );
};

export default Products;