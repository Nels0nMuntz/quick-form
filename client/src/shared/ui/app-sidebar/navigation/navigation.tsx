"use client";

import { usePathname } from "next/navigation";
import { Home, ChartNoAxesCombined, UserPen } from "lucide-react";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/shared/ui";
import { cn } from "@/shared/lib";

const items = [
  {
    title: "My Forms",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: ChartNoAxesCombined,
  },
  {
    title: "My Profile",
    url: "/profile",
    icon: UserPen,
  },
];

export function Navigation() {
  const pathname = usePathname();
  return (
    <SidebarMenu>
      {items.map((item) => {
        const isActive = item.url === pathname;
        return (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              asChild
              className={cn(
                "h-auto py-3 pl-12 text-lg transition-colors before:absolute before:bottom-0 before:left-0 before:top-0 before:w-1 before:bg-white before:opacity-0 before:transition-colors before:transition-opacity hover:before:opacity-100",
                isActive && "bg-white-10 before:opacity-100",
              )}
            >
              <a href={item.url}>
                <item.icon />
                <span>{item.title}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
