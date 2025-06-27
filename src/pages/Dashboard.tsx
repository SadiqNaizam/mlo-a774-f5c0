import React from 'react';
import { DollarSign, Users, CreditCard, Activity } from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import type { ColumnDef } from '@tanstack/react-table';

// Custom Components
import Header from '@/components/layout/Header';
import LeftSidebar from '@/components/layout/LeftSidebar';
import Footer from '@/components/layout/Footer';
import KpiCard from '@/components/KpiCard';
import { DateRangePicker } from '@/components/DateRangePicker';
import { DataGrid } from '@/components/DataGrid';

// shadcn/ui Components
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// --- Placeholder Data ---

// For KpiCard components
const kpiData = [
  {
    title: 'Total Revenue',
    value: '$45,231.89',
    change: 12.5,
    changeDescription: 'from last month',
    icon: DollarSign,
  },
  {
    title: 'Subscriptions',
    value: '+2350',
    change: 180.1,
    changeDescription: 'from last month',
    icon: Users,
  },
  {
    title: 'Sales',
    value: '+12,234',
    change: 19,
    changeDescription: 'from last month',
    icon: CreditCard,
  },
  {
    title: 'Active Now',
    value: '+573',
    change: -2.1,
    changeDescription: 'since last hour',
    icon: Activity,
  },
];

// For Recharts LineChart
const salesChartData = [
  { name: 'Jan', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Feb', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Mar', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Apr', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'May', total: Math.floor(Math.random() * 5000) + 1000 },
  { name: 'Jun', total: Math.floor(Math.random() * 5000) + 1000 },
];

// For DataGrid (Recent Orders)
type Order = {
  customerName: string;
  email: string;
  amount: number;
  status: 'Pending' | 'Processing' | 'Delivered';
};

const recentOrdersData: Order[] = [
    { customerName: 'Liam Johnson', email: 'liam@example.com', amount: 250.00, status: 'Delivered' },
    { customerName: 'Olivia Smith', email: 'olivia@example.com', amount: 150.75, status: 'Delivered' },
    { customerName: 'Noah Williams', email: 'noah@example.com', amount: 350.50, status: 'Processing' },
    { customerName: 'Emma Brown', email: 'emma@example.com', amount: 450.00, status: 'Delivered' },
    { customerName: 'Ava Jones', email: 'ava@example.com', amount: 550.25, status: 'Pending' },
];

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: 'customerName',
    header: 'Customer',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'));
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount);
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status: Order['status'] = row.getValue('status');
      const variant = status === 'Delivered' ? 'default' : status === 'Processing' ? 'secondary' : 'destructive';
      return <Badge variant={variant}>{status}</Badge>;
    },
  },
];


const Dashboard = () => {
  console.log('Dashboard page loaded');

  // In a real app, this would be wired to a state management library (e.g., Zustand, Redux)
  // or a hook that re-fetches data when the date range changes.
  const handleDateChange = (date: any) => {
    console.log('Date range changed:', date);
    // Here you would trigger a data refetch for the new date range.
    // For this example, we'll just log it.
  };

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <LeftSidebar />
      <div className="flex flex-col">
        <Header title="Dashboard" />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-muted/40">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Overview</h2>
            <div className="flex items-center space-x-2">
              <DateRangePicker onDateChange={handleDateChange} />
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {kpiData.map((kpi, index) => (
              <KpiCard
                key={index}
                title={kpi.title}
                value={kpi.value}
                change={kpi.change}
                changeDescription={kpi.changeDescription}
                icon={kpi.icon}
              />
            ))}
          </div>
          
          <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
              {/* Sales Chart */}
            <Card className="xl:col-span-2">
              <CardHeader>
                <CardTitle>Sales Trend</CardTitle>
                <CardDescription>
                  Your sales performance over the selected period.
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="total" stroke="#8884d8" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Recent Orders Table */}
            <Card className="xl:col-span-1">
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>
                  Your most recent sales.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DataGrid columns={columns} data={recentOrdersData} />
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;