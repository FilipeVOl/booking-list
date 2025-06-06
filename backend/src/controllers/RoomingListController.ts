import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { RoomingList } from "../entities/RoomingList";

class RoomingListController {
    private roomingListRepository = AppDataSource.getRepository(RoomingList);

    // async create(req: Request, res: Response): Promise<Response> {
    //     try {
    //         const roomingList = this.roomingListRepository.create(req.body);
    //         const result = await this.roomingListRepository.save(roomingList);
    //         return res.json({
    //             message: "Rooming list created successfully",
    //             result
    //         });
    //     } catch (error: any) {
    //         return res.status(500).json({ message: "Error creating rooming list", error: error.message });
    //     }
    // }

    async getAll(req: Request, res: Response): Promise<Response> {
        try {
            console.log('Full request body:', req.body);
            
            const searchValue = req.body?.searchValue || '';
            console.log('Search value:', searchValue);
            
            // Lista de valores válidos para agreement_type
            const validAgreementTypes = ['leisure', 'staff', 'artist'];
            
            if (searchValue) {
                // Tenta encontrar o valor em diferentes campos
                const whereConditions: Partial<RoomingList>[] = [
                    { rfp_name: searchValue }
                ];

                // Só adiciona a condição de agreement_type se o valor for um tipo válido
                if (validAgreementTypes.includes(searchValue)) {
                    whereConditions.push({ agreement_type: searchValue });
                }

                const roomingLists = await this.roomingListRepository.find({
                    where: whereConditions,
                    order: { id: "DESC" },
                    relations: ["roomingBookings", "roomingBookings.booking"]
                });
                
                console.log('Found rooming lists:', roomingLists.length);
                
                // Se não encontrou nenhum resultado com os filtros, retorna todos
                if (roomingLists.length === 0) {
                    console.log('No matches found, returning all records');
                    const allRoomingLists = await this.roomingListRepository.find({
                        order: { id: "DESC" },
                        relations: ["roomingBookings", "roomingBookings.booking"]
                    });
                    
                    return res.status(200).json({
                        message: "No matches found for the search, showing all records",
                        roomingLists: allRoomingLists
                    });
                }
                
                return res.status(200).json({
                    message: "Rooming lists fetched successfully",
                    roomingLists
                });
            }

            // Se não houver valor de busca, retorna todos
            const allRoomingLists = await this.roomingListRepository.find({
                order: { id: "DESC" },
                relations: ["roomingBookings", "roomingBookings.booking"]
            });
            
            return res.status(200).json({
                message: "Rooming lists fetched successfully",
                roomingLists: allRoomingLists
            });
        } catch (error: any) {
            console.error('Error in getAll:', error);
            return res.status(500).json({ message: "Error fetching rooming lists", error: error.message });
        }
    }

    async getOne(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const roomingList = await this.roomingListRepository.findOne({
                where: { id: parseInt(id) },
                relations: ["roomingBookings", "roomingBookings.booking"]
            });

            if (!roomingList) {
                return res.status(404).json({ message: "Rooming list not found" });
            }

            return res.json({
                message: "Rooming list fetched successfully",
                roomingList
            });
        } catch (error: any) {
            return res.status(500).json({ message: "Error fetching rooming list", error: error.message });
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const roomingList = await this.roomingListRepository.findOne({
                where: { id: parseInt(id) }
            });

            if (!roomingList) {
                return res.status(404).json({ message: "Rooming list not found" });
            }

            this.roomingListRepository.merge(roomingList, req.body);
            const result = await this.roomingListRepository.save(roomingList);
            return res.json({
                message: "Rooming list updated successfully",
                result
            });
        } catch (error: any) {
            return res.status(500).json({ message: "Error updating rooming list", error: error.message });
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const result = await this.roomingListRepository.delete(parseInt(id));
            
            if (result.affected === 0) {
                return res.status(404).json({ message: "Rooming list not found" });
            }

            return res.status(204).send();
        } catch (error: any) {
            return res.status(500).json({ message: "Error deleting rooming list", error: error.message });
        }
    }
}

export default new RoomingListController(); 