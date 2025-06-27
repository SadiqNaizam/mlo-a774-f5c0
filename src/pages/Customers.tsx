import React, { useState, useMemo } from 'react';
import { ColumnDef } from "@tanstack/react-table";
import { DateRange } from 'react-day-picker';
import { Download } from 'lucide-react';

// Custom Components
import Header from '@/components/layout/Header';
import LeftSidebar from '@/components/layout/LeftSidebar';
import Footer from '@/components/layout/Footer';
import { DataGrid } from '@/components/DataGrid';
import { DateRangePicker } from '@/components/DateRangePicker';

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Customer data type
type Customer = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  joinDate: string;
  status: 'New' | 'Returning' | 'Lapsed';
  orders: number;
  totalSpend: number;
};

// Sample data
const sampleCustomers: Customer[] = [
  { id: 'CUST001', name: 'John Doe', email: 'john.doe@example.com', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d', joinDate: '2023-01-15', status: 'Returning', orders: 5, totalSpend: 550.00 },
  { id: 'CUST002', name: 'Jane Smith', email: 'jane.smith@example.com', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d', joinDate: '2023-02-20', status: 'Returning', orders: 8, totalSpend: 1250.75 },
  { id: 'CUST003', name: 'Michael Johnson', email: 'michael.j@example.com', avatar: 'https://i.pravatar.cc/150?u=a04258114e29026702d', joinDate: '2024-05-10', status: 'New', orders: 1, totalSpend: 75.50 },
  { id: 'CUST004', name: 'Emily Davis', email: 'emily.d@example.com', avatar: 'https://i.pravatar.cc/150?u=a048581f4e29026701d', joinDate: '2022-11-30', status: 'Lapsed', orders: 2, totalSpend: 200.00 },
  { id: 'CUST005', name: 'David Wilson', email: 'david.w@example.com', avatar: 'https://i.pravatar.cc/150?u=a092581f4e29026703d', joinDate: '2023-08-01', status: 'Returning', orders: 12, totalSpend: 2100.25 },
  { id: 'CUST006', name: 'Sarah Brown', email: 'sarah.b@example.com', avatar: 'https://i.pravatar.cc/150?u=b042581f4e29026704e', joinDate: '2024-04-25', status: 'New', orders: 1, totalSpend: 150.00 },
  { id: 'CUST007', name: 'Chris Martinez', email: 'chris.m@example.com', avatar: 'https://i.pravatar.cc/150?u=c042581f4e29026705f', joinDate: '2023-03-12', status: 'Returning', orders: 7, totalSpend: 890.80 },
  { id: 'CUST008', name: 'Jessica Garcia', email: 'jessica.g@example.com', avatar: 'https://i.pravatar.cc/150?u=d042581f4e29026706g', joinDate: '2022-09-05', status: 'Lapsed', orders: 3, totalSpend: 310.40 },
  { id: 'CUST009', name: 'Daniel Rodriguez', email: 'daniel.r@example.com', avatar: 'https://i.pravatar.cc/150?u=e042581f4e29026707h', joinDate: '2023-10-18', status: 'Returning', orders: 6, totalSpend: 950.00 },
  { id: 'CUST010', name: 'Laura Lee', email: 'laura.l@example.com', avatar: 'https://i.pravatar.cc/150?u=f042581f4e29026708i', joinDate: '2024-05-20', status: 'New', orders: 1, totalSpend: 99.99 },
];

const Customers = () => {
  console.log('Customers page loaded');
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const handleDateChange = (range: DateRange | undefined) => {
    setDateRange(range);
    console.log("Selected date range:", range);
    // Here you would typically refetch data based on the new date range
  };

  const columns: ColumnDef<Customer>[] = useMemo(() => [
    {
      accessorKey: "name",
      header: "Customer",
      cell: ({ row }) => {
        const customer = row.original;
        const initials = customer.name.split(' ').map(n => n[0]).join('');
        return (
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src={customer.avatar} alt={customer.name} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="grid gap-0.5">
              <div className="font-medium">{customer.name}</div>
              <div className="text-sm text-muted-foreground">{customer.email}</div>
            </div>
          </div>
        )
      },
      enableSorting: true,
      enableHiding: false,
      enableColumnFilter: true,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        let variant: "default" | "secondary" | "destructive" = "default";
        if (status === 'New') variant = 'default';
        if (status === 'Returning') variant = 'secondary';
        if (status === 'Lapsed') variant = 'destructive';
        
        return <Badge variant={variant}>{status}</Badge>;
      },
      enableSorting: true,
      enableColumnFilter: false,
    },
    {
      accessorKey: "joinDate",
      header: "Join Date",
      cell: ({ row }) => new Date(row.original.joinDate).toLocaleDateString(),
      enableSorting: true,
      enableColumnFilter: false,
    },
    {
      accessorKey: "orders",
      header: "Orders",
      cell: ({ row }) => <div className="text-center">{row.original.orders}</div>,
      enableSorting: true,
      enableColumnFilter: false,
    },
    {
      accessorKey: "totalSpend",
      header: "Total Spend",
      cell: ({ row }) => {
        const amount = parseFloat(String(row.getValue("totalSpend")));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);
        return <div className="text-right font-medium">{formatted}</div>;
      },
      enableSorting: true,
      enableColumnFilter: false,
    },
  ], []);

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <LeftSidebar />
      <div className="flex flex-col">
        <Header title="Customers" />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-muted/40">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
            <h2 className="text-2xl font-bold tracking-tight">Customer List</h2>
            <div className="flex items-center gap-2">
              <DateRangePicker onDateChange={handleDateChange} />
              <Button size="sm" variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          <div className="flex-1 rounded-lg">
            <DataGrid columns={columns} data={sampleCustomers} />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Customers;