import { Booking } from "../entities/Booking";
import { AppDataSource } from "../config/data-source";
import { CreateBookingDTO } from "../dto/Booking";

class BookingService {
    public validateCreateBooking(data: CreateBookingDTO): void {
        const requiredFields = ["hotel_id", "event_id", "guest_name", "guest_phone", "checkIn_date", "checkOut_date"];
        requiredFields.forEach((field) => {
            if (!data[field as keyof CreateBookingDTO]) {
                throw new Error(`Field ${field} is required`);
            }
        });
    }
    public async createBooking(data: CreateBookingDTO): Promise<Booking> {
        try {
            console.log('Validating booking data:', data);
            this.validateCreateBooking(data);
            console.log('Validation passed');
            
            return await AppDataSource.transaction(async (manager) => {
                const bookingRepository = manager.getRepository(Booking);


                const existingBooking = await bookingRepository.createQueryBuilder('booking')
                    .where('booking.hotel_id = :hotel_id', { hotel_id: data.hotel_id })
                    .andWhere('booking.event_id = :event_id', { event_id: data.event_id })
                    .getOne();

                if (existingBooking) {
                    console.log('existingbooking:', JSON.stringify(existingBooking, null, 2));
                    throw new Error("Booking already exists");
                }

                const booking = bookingRepository.create(data);
                return await bookingRepository.save(booking);
            });
        } catch (error: any) {
            console.log('Error type:', error.constructor.name);
            console.log('Error message:', error.message);
            console.log('Error stack:', error.stack);
            
            if (error.message.includes('Field') && error.message.includes('is required')) {
                throw new Error('Preencha todos os campos obrigatórios!');
            }
            throw new Error('Erro interno do servidor');
        }
    }
}

export default new BookingService();
