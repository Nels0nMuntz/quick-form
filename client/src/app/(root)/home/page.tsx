import { Metadata } from "next";
import Link from "next/link";

import { UserInfo } from "@/views/home";

export const metadata: Metadata = {
  title: "Home",
  description: "",
};

export default async function Home() {
  // const user = await getCurrentUser();
  return (
    <div>
      <h1>Home</h1>
      <Link href="/profile">Profile</Link>
      {/* <p>Welcome, {user?.fullName}!</p> */}
      <UserInfo />
    </div>
  );
}
