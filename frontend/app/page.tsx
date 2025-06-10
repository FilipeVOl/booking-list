"use client"
import Image from "next/image";
import HomePage from "./Home/page";
import EventPage from "./Event/page";
export default function Home() {
  return (
   <div className="flex flex-col gap-12">
      <HomePage />
      <EventPage />
   </div>
  );
}
