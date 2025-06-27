import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, ShoppingCart, Users, Package, Settings, BarChart3 } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

console.log('LeftSidebar loaded');

const navItems = [
  { to: '/', icon: Home, label: 'Dashboard' },
  { to: '/orders', icon: ShoppingCart, label: 'Orders' },
  { to: '/products', icon: Package, label: 'Products' },
  { to: '/customers', icon: Users, label: 'Customers' },
];

const settingsNav = { to: '/settings', icon: Settings, label: 'Settings' };

const LeftSidebar: React.FC = () => {
  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
      isActive
        ? 'bg-muted text-primary'
        : 'text-muted-foreground hover:text-primary'
    }`;

  return (
    <aside className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <NavLink to="/" className="flex items-center gap-2 font-semibold">
            <BarChart3 className="h-6 w-6 text-primary" />
            <span className="">CommercePulse</span>
          </NavLink>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={navLinkClasses}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-4">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <NavLink to={settingsNav.to} className={navLinkClasses}>
              <settingsNav.icon className="h-4 w-4" />
              {settingsNav.label}
            </NavLink>
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default LeftSidebar;