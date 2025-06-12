import { CalendarDays, FileSearch } from "lucide-react";
import { EventDate, getMonth, formatDateRange, formatPhoneNumber } from "./EventDate";
import { Button } from "@/components/ui/button";
import { RoomingList } from "../types/RoomingList";
import bookings from "../../../backend/json/bookings.json";
import roomingBookings from "../../../backend/json/rooming-list-bookings.json";
import { FilterContext } from "@/context/filterContext";
import { useContext } from "react";
import DialogBox from "../Components/DialogBox";
import { User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const EventCard = ({ roomingLists }: { roomingLists: RoomingList[] }) => {
  const { statuses } = useContext(FilterContext);

  const filteredRoomingLists = roomingLists.filter((list: RoomingList) => {
    const getMappedStatus = (status: string) => {
      switch (status.toLowerCase()) {
        case "confirmed":
        case "received":
          return "active";
        case "archived":
          return "cancelled";
        case "completed":
          return "closed";
        default:
          return status.toLowerCase();
      }
    };

    const mappedStatus = getMappedStatus(list.status);
    const selectedStatuses = statuses.filter((status) => status.checked);

    if (selectedStatuses.length === 0) {
      return true;
    }

    return selectedStatuses.some((status) => status.value === mappedStatus);
  });

  return filteredRoomingLists.map((list: RoomingList) => {
    const relatedBookingIds = roomingBookings
      .filter((item) => item.roomingListId === list.roomingListId)
      .map((item) => item.bookingId);

    const relatedBookings = bookings.filter((booking) =>
      relatedBookingIds.includes(booking.bookingId)
    );

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

                const minCheckIn = filteredBookings.reduce(
                  (min, booking) =>
                    booking.checkInDate < min ? booking.checkInDate : min,
                  filteredBookings[0]?.checkInDate || ""
                );

                const maxCheckOut = filteredBookings.reduce(
                  (max, booking) =>
                    booking.checkOutDate > max ? booking.checkOutDate : max,
                  filteredBookings[0]?.checkOutDate || ""
                );

                return `${formatDateRange(
                  new Date(minCheckIn),
                  new Date(maxCheckOut)
                )}`;
              })()}
            </h3>
          </div>
          <div className="flex flex-row items-center justify-center gap-4">
            <DialogBox
              className="dialog"
              trigger={
                <Button variant="default" className="py-6 px-8 md:px-32">
                  View bookings ({bookingCount})
                </Button>
              }
              title={`Bookings of ${list.rfpName}`}
              description={
                <div className="flex flex-col gap-2 mt-4">
                  {relatedBookings.map((booking) => (
                    <div
                      className=" shadow-md border border-gray-500/30 rounded-lg p-4 min-w-[200px] min-h-[100px]"
                      key={booking.bookingId}
                    >
                      <div className="flex flex-row items-center gap-6">
                        <Avatar className="rounded-lg border-2 w-[100px] h-[100px]">
                          <AvatarImage src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXVzZXItaWNvbiBsdWNpZGUtdXNlciI+PHBhdGggZD0iTTE5IDIxdi0yYTQgNCAwIDAgMC00LTRIOWE0IDQgMCAwIDAtNCA0djIiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjciIHI9IjQiLz48L3N2Zz4=" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col self-start leading-10">
                          <h2 className="font-bold">{booking.guestName}</h2>
                          <h3 className="font-medium italic">{formatPhoneNumber(booking.guestPhoneNumber)}</h3>
                          <p className="flex flex-row items-center gap-2 text-gray-400">
                            <CalendarDays className="text-gray-400 fill-gray-500" />
                            {formatDateRange(
                              new Date(booking.checkInDate),
                              new Date(booking.checkOutDate)
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              }
            />
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
