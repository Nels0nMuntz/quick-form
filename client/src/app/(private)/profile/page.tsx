import Link from "next/link";

export default function Profile() {
  return (
    <div>
      <h1>Profile</h1>
      <p>Welcome, user!</p>
      <Link href="/dashboard">Dashboard</Link>
    </div>
  );
}
