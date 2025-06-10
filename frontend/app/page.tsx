"use client"
import Image from "next/image";
import HomePage from "./Home/page";
import EventPage from "./Event/page";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Home() {
  return (
    <ProtectedRoute>
      <div className="flex flex-col gap-12">
        <HomePage />
        <EventPage />
      </div>
    </ProtectedRoute>
  );
}
