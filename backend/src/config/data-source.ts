import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import * as dotenv from 'dotenv';
import { Booking } from "../entities/Booking";
import { RoomingBooking } from "../entities/RoomingBooking";
import { RoomingList } from "../entities/RoomingList";

dotenv.config();
export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User, Booking, RoomingList, RoomingBooking],
    migrations: [__dirname + "/../migrations/*.{ts,js}"],
    synchronize: true,
});