"use client"
import Image from "next/image";
import HomePage from "./Home/page";
import EventPage from "./Event/page";
export default function Home() {
  return (
   <>
      <HomePage />
      <EventPage />
   </>
  );
}
