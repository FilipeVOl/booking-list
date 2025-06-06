import { AppDataSource } from "../config/data-source";
import { Booking } from "../entities/Booking";
import { CreateBookingDTO } from "../dto/Booking";

class BookingRepository {
    private repository = AppDataSource.getRepository(Booking);

    public async findById(id: number): Promise<Booking | null> {
        return await this.repository.findOne({ where: { id } });
    };

    public create (data: CreateBookingDTO): Booking {
        return this.repository.create(data);
    };

    public async save (booking: Booking): Promise<Booking> {
        return await this.repository.save(booking);
    };
}

export default new BookingRepository();