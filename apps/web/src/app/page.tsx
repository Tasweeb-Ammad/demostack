"use client";

import { useAuthInfo } from "@propelauth/react";

export default function Home() {
  const { loading, isLoggedIn, user } = useAuthInfo();

  console.log(user);

  if (loading) return <p>Loading…</p>;

  if (!isLoggedIn || !user) {
    return <p>Not logged in</p>;
  }

  return (
    <div>
      <p>Welcome, {user.email}</p>
      <p>User ID: {user.userId}</p>
    </div>
  );
}
