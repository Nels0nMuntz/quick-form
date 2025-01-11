import { DashboardPage } from "@/views/dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Forms",
  description:
    "Manage and access all your forms in one place. View, edit, and organize your forms effortlessly with our intuitive web app.",
};

export default async function Dashboard() {
  return <DashboardPage />;
}
