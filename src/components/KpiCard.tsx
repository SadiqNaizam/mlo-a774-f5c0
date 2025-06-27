import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";
import type { LucideProps } from "lucide-react";
import { cn } from "@/lib/utils";

interface KpiCardProps {
  title: string;
  value: string;
  change: number; // e.g., 12.5 for +12.5%, -5.2 for -5.2%
  changeDescription?: string;
  icon?: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
}

const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  change,
  changeDescription = "from last month",
  icon: Icon
}) => {
  console.log('KpiCard loaded for:', title);

  const isPositiveChange = change >= 0;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground flex items-center">
          <span
            className={cn(
              "flex items-center gap-1",
              isPositiveChange ? "text-green-600" : "text-red-600"
            )}
          >
            {isPositiveChange ? (
              <ArrowUp className="h-4 w-4" />
            ) : (
              <ArrowDown className="h-4 w-4" />
            )}
            {Math.abs(change)}%
          </span>
          <span className="ml-1">{changeDescription}</span>
        </p>
      </CardContent>
    </Card>
  );
};

export default KpiCard;