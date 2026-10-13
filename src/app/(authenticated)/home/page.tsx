"use client";

import { useEffect, useState } from "react";
import axios from "axios";

type MeResponse = {
  id: string;
  name: string;
  email: string;
  roles: unknown[];
  permissions: unknown[];
};

export default function HomePage() {
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (!token) return;

    const controller = new AbortController();

    async function fetchMe() {
      try {
        const response = await axios.get<MeResponse>(
          `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3333"}/auth/me`,
          {
            headers: { Authorization: `Bearer ${token}` },
            signal: controller.signal,
          },
        );

        console.log("/auth/me name and roles:", {
          name: response.data.name,
          roles: response.data.roles,
        });
        setFirstName(response.data.name.trim().split(/\s+/)[0] ?? "");
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error("Failed to fetch /auth/me:", error);
        }
      }
    }

    void fetchMe();

    return () => controller.abort();
  }, []);

  return (
    <main className="flex-1 p-6">
      <h1 className="text-2xl font-semibold text-text-main">
        Olá{firstName ? `, ${firstName}` : ""}
      </h1>
    </main>
  );
}
