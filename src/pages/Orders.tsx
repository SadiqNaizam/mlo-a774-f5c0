import React from 'react';
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

// Custom Components
import LeftSidebar from "@/components/layout/LeftSidebar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { DataGrid } from "@/components/DataGrid";
import { DateRangePicker } from "@/components/DateRangePicker";

// shadcn/ui Components
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// Define the type for an order
type Order = {
  id: string;
  customerName: string;
  email: string;
  total: number;
  status: "Delivered" | "Processing" | "Cancelled";
  date: string;
};

// Sample data
const orders: Order[] = [
  { id: "ORD001", customerName: "John Doe", email: "john.d@example.com", total: 150.75, status: "Delivered", date: "2023-10-25" },
  { id: "ORD002", customerName: "Jane Smith", email: "jane.s@example.com", total: 200.00, status: "Processing", date: "2023-10-24" },
  { id: "ORD003", customerName: "Liam Johnson", email: "liam.j@example.com", total: 75.50, status: "Cancelled", date: "2023-10-23" },
  { id: "ORD004", customerName: "Emma Brown", email: "emma.b@example.com", total: 320.00, status: "Delivered", date: "2023-10-22" },
  { id: "ORD005", customerName: "Noah Williams", email: "noah.w@example.com", total: 50.25, status: "Delivered", date: "2023-10-21" },
  { id: "ORD006", customerName: "Olivia Jones", email: "olivia.j@example.com", total: 450.00, status: "Processing", date: "2023-10-20" },
  { id: "ORD007", customerName: "William Garcia", email: "will.g@example.com", total: 99.99, status: "Delivered", date: "2023-10-19" },
  { id: "ORD008", customerName: "Sophia Miller", email: "sophia.m@example.com", total: 125.00, status: "Cancelled", date: "2023-10-18" },
];

// Define columns for the DataGrid
const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "Order ID",
    cell: ({ row }) => <div>{row.getValue("id")}</div>,
    enableSorting: true,
    enableHiding: false,
    enableColumnFilter: true,
  },
  {
    accessorKey: "customerName",
    header: "Customer",
    cell: ({ row }) => {
        const order = row.original;
        return (
            <div>
                <div className="font-medium">{order.customerName}</div>
                <div className="text-sm text-muted-foreground">{order.email}</div>
            </div>
        )
    },
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
    enableSorting: true,
  },
  {
    accessorKey: "total",
    header: () => <div className="text-right">Total</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("total"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
      return <div className="text-right font-medium">{formatted}</div>;
    },
    enableSorting: true,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status: Order["status"] = row.getValue("status");
      const variant: "default" | "secondary" | "destructive" =
        status === "Delivered" ? "default" : status === "Processing" ? "secondary" : "destructive";
      return <Badge variant={variant}>{status}</Badge>;
    },
    enableSorting: true,
    enableColumnFilter: true,
  },
  {
    id: "actions",
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>View Order Details</DropdownMenuItem>
            <DropdownMenuItem>View Customer</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];


const Orders = () => {
  console.log('Orders page loaded');

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <LeftSidebar />
      <div className="flex flex-col">
        <Header title="Orders" />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold md:text-2xl">All Orders</h1>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex-1 w-full md:w-auto">
               <DateRangePicker />
            </div>
            <div className="flex gap-2 w-full md:w-auto">
                <Input placeholder="Search by customer or order ID..." className="flex-grow"/>
                <Button>Export</Button>
            </div>
          </div>
          
          <div
            className="flex flex-1 items-start justify-center rounded-lg border border-dashed shadow-sm"
          >
            <div className="w-full p-4">
                <DataGrid columns={columns} data={orders} />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Orders;