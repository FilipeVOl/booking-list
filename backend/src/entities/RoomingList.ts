import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { RoomingBooking } from "./RoomingBooking";

@Entity("rooming_lists")
export class RoomingList {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id!: number;

    @Column({ type: "bigint" })
    event_id!: number;

    @Column({ type: "bigint" })
    hotel_id!: number;

    @Column()
    rfp_name!: string;

    @Column()
    cutOff_date!: Date;

    @Column({ default: "active" })
    status!: string;

    @Column({
        type: "enum",
        enum: ["leisure", "staff", "artist"]
    })
    agreement_type!: string;

    @OneToMany(() => RoomingBooking, roomingBooking => roomingBooking.roomingList)
    roomingBookings!: RoomingBooking[];

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}
