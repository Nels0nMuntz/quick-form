import {
  Icon,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/shared/ui";
import Link from "next/link";
import { Navigation } from "./navigation/navigation";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="h-auto py-12">
            <Link
              href="/"
              className="flex w-full items-center justify-center gap-x-4"
            >
              <Icon name="logo" width={40} height={40} />
              <span className="text-2xl font-semibold md:text-white">
                Quick Form
              </span>
            </Link>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <Navigation />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
