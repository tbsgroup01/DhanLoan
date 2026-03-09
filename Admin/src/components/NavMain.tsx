import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { cn } from "@/lib/utils";
import { useLocation, NavLink } from "react-router-dom";
import { type LucideIcon } from "lucide-react";

interface SidebarItem {
  title: string;
  url: string;
  icon?: LucideIcon | any;
}

export function NavMain({ items }: { items: SidebarItem[] }) {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <SidebarGroup className="flex flex-col w-full px-4 py-3">
      <SidebarMenu>
        {items.map((item) => {
          const isActive =
            pathname === item.url || pathname.startsWith(item.url);

          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                className={cn(
                  "flex items-center py-5.5 px-3 text-base text-[#4b5563] dark:text-white hover:bg-primary/10 dark:hover:bg-slate-700",
                  isActive ? "bg-primary text-white dark:bg-primary" : ""
                )}
              >
                <NavLink to={item.url} className="flex items-center gap-3">
                  {item.icon && <item.icon className="!w-4.5 !h-4.5" />}
                  <span>{item.title}</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}