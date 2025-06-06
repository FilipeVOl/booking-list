export interface CreateBookingDTO {
    hotel_id: bigint;
    event_id: bigint;
    guest_name: string;
    guest_phone: string;
    checkIn_date: Date;
    checkOut_date: Date;
}