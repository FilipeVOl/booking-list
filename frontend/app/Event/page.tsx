"use client"
import EventCard from "./EventCard";
import roomingLists from "../../../backend/json/rooming-lists.json"
import { filterRoomingListsByEvent } from "../types/RoomingList";

const ultraRoomingLists = filterRoomingListsByEvent(roomingLists, "Ultra");
const rollingRoomingLists = filterRoomingListsByEvent(roomingLists, "Rolling");

const EventPage = () => {
  return (
    <div className="flex flex-col gap-12 container mx-auto">
    <div className="w-full flex items-center">
      <div className="flex-1 h-[2px] bg-gradient-to-l from-purple-400 to-transparent" />
      <span className="mx-4 px-3 py-1 bg-purple-400/10 border inset-shadow-md border-purple-400 rounded font-bold text-purple-700 shadow">
        Ultra Musical Festival
      </span>
      <div className="flex-1 h-[2px] bg-gradient-to-r from-purple-400 to-transparent" />
    </div>
    <div className="cards-container  flex flex-row gap-12 overflow-x-auto">
      <EventCard roomingLists={ultraRoomingLists} />
    </div>

    <div className="w-full flex items-center">
      <div className="flex-1 h-[2px] bg-gradient-to-l from-green-400 to-transparent" />
      <span className="mx-4 px-3 py-1 bg-green-400/10 border inset-shadow-md border-green-400 rounded font-bold text-green-700 shadow">
        Austin City Limits
      </span>
      <div className="flex-1 h-[2px] bg-gradient-to-r from-green-400 to-transparent" />
    </div>
    <div className="cards-container  flex flex-row gap-12 overflow-x-auto">
      <EventCard roomingLists={rollingRoomingLists} />
    </div>
    </div>
  );
};

export default EventPage;
