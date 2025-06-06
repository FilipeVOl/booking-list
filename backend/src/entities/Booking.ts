import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { RoomingBooking } from "./RoomingBooking";

@Entity("bookings")
export class Booking {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id!: number;

    @Column({ type: "bigint" })
    hotel_id!: bigint;

    @Column({ type: "bigint" })
    event_id!: bigint;

    @Column()
    guest_name!: string;

    @Column({ nullable: true })
    guest_phone!: string;

    @Column()
    checkIn_date!: Date;

    @Column()
    checkOut_date!: Date;

    @OneToMany(() => RoomingBooking, roomingBooking => roomingBooking.booking)
    roomingBookings!: RoomingBooking[];
}