import { CalendarDays, FileSearch } from "lucide-react";
import { EventDate, getMonth, formatDateRange } from "./EventDate";
import { Button } from "@/components/ui/button";
import { RoomingList } from "../types/RoomingList";
import bookings from "../../../backend/json/bookings.json";
import roomingBookings from "../../../backend/json/rooming-list-bookings.json";
import { FilterContext } from "@/context/filterContext";
import { useContext } from "react";

const EventCard = ({ roomingLists }: { roomingLists: RoomingList[] }) => {
    const { statuses } = useContext(FilterContext)

    const filteredRoomingLists = roomingLists.filter((list: RoomingList) => {
        const getMappedStatus = (status: string) => {
            switch (status.toLowerCase()) {
                case 'confirmed':
                case 'received':
                    return 'active';
                case 'archived':
                    return 'cancelled';
                case 'completed':
                    return 'closed';
                default:
                    return status.toLowerCase();
            }
        };

        const mappedStatus = getMappedStatus(list.status);
        const selectedStatuses = statuses.filter(status => status.checked);
        
        if (selectedStatuses.length === 0) {
            return true;
        }

        return selectedStatuses.some(status => status.value === mappedStatus);
    });
    
  return filteredRoomingLists.map((list: RoomingList) => {
    const relatedBookingIds = roomingBookings
      .filter((item) => item.roomingListId === list.roomingListId)
      .map((item) => item.bookingId);

    const bookingCount = bookings.filter((booking) =>
      relatedBookingIds.includes(booking.bookingId)
    ).length;

    return (
      <div key={list.roomingListId} className="card">
        <main className="flex flex-col">
          <div className="title flex flex-row items-center justify-between">
            <div className="flex flex-col mb-8">
              <h2>{list.rfpName}</h2>
              <p>
                Agreement:{" "}
                <span className="font-bold">{list.agreement_type}</span>
              </p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <EventDate
                month={getMonth(list.cutOffDate.split("-")[1])}
                day={list.cutOffDate.split("-")[2]}
                label="Cut-Off Date"
              />
            </div>
          </div>
          <div className="flex flex-row items-center justify-start gap-2 mb-8">
            <CalendarDays className="text-gray-400 fill-gray-500" />
            <h3 className="text-black/50">
              {(() => {
                const filteredBookings = bookings.filter((booking) =>
                  relatedBookingIds.includes(booking.bookingId)
                );
                
                const minCheckIn = filteredBookings.reduce((min, booking) => 
                  booking.checkInDate < min ? booking.checkInDate : min, 
                  filteredBookings[0]?.checkInDate || ''
                );
                
                const maxCheckOut = filteredBookings.reduce((max, booking) => 
                  booking.checkOutDate > max ? booking.checkOutDate : max, 
                  filteredBookings[0]?.checkOutDate || ''
                );
                
                return `${formatDateRange(new Date(minCheckIn), new Date(maxCheckOut))}`;
              })()}
            </h3>
          </div>
          <div className="flex flex-row items-center justify-center gap-4">
            <Button
              variant="default"
              className="py-6 px-32"
            >
              View bookings ({bookingCount})
            </Button>
            <Button variant="outline" className="py-6 px-2">
              <FileSearch className="text-[#3f25f5]" />
            </Button>
          </div>
        </main>
      </div>
    );
  });
};

export default EventCard;
