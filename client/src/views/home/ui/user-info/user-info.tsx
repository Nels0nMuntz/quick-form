// "use server";

import { serverFetch } from "@/shared/api";

export async function UserInfo() {
  // const userData = await serverFetch.get("currentUser");
  // console.log({ userData });

  // let userName = userData?.data?.data?.fullName || "user";

  return (
    <div>
      <h1>User Info</h1>
      {/* <p>Welcome, {userName}!</p> */}
    </div>
  );
}
