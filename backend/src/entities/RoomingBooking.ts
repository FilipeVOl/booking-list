import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Booking } from "./Booking";
import { RoomingList } from "./RoomingList";

@Entity("rooming_bookings")
export class RoomingBooking {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id!: number;

    @Column({ type: "bigint" })
    roomingList_id!: number;

    @Column({ type: "bigint" })
    booking_id!: number;

    @ManyToOne(() => RoomingList, roomingList => roomingList.roomingBookings)
    @JoinColumn({ name: "roomingList_id" })
    roomingList!: RoomingList;

    @ManyToOne(() => Booking, booking => booking.roomingBookings)
    @JoinColumn({ name: "booking_id" })
    booking!: Booking;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
} 