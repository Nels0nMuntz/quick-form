import { Icon } from "@/shared/ui";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="grid grid-cols-1 min-h-screen md:grid-cols-2">
      <div className="flex items-center justify-center bg-white md:bg-midnight">
        <div className="flex flex-col items-center gap-y-5">
          <Icon name="logo" width={100} height={100} />
          <h2 className="text-2xl font-semibold md:text-white">Quick Form</h2>
        </div>
      </div>
      <div className="bg-white flex items-center justify-center px-4">
        {children}
      </div>
    </div>
  );
}
