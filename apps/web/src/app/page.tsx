"use client";

import { Button } from "@/components/ui/button";
import { useAuthInfo, useLogoutFunction } from "@propelauth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { loading, isLoggedIn, user } = useAuthInfo();
  const logout = useLogoutFunction();
  const router = useRouter();

  console.log(user);

  if (loading) return <p>Loading…</p>;

  if (!isLoggedIn || !user) {
    return <p>Not logged in</p>;
  }

  return (
    <div>
      <p>Welcome, {user.email}</p>
      <p>User ID: {user.userId}</p>
      <Button
        type="submit"
        className="w-fit cursor-pointer"
        onClick={async () => {
          await logout(false);
          router.replace("/sign-in");
        }}
      >
        Logout
      </Button>
    </div>
  );
}
