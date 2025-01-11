import { PropsWithChildren } from "react";
import { AppSidebar, SidebarProvider, SidebarTrigger } from "@/shared/ui";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <div className="relative mx-auto w-full max-w-[810px] px-4">
          <SidebarTrigger className="absolute right-2 top-2 md:hidden" />
          <div className="pt-12">{children}</div>
        </div>
      </main>
    </SidebarProvider>
  );
}
