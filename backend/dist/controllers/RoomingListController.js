"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../config/data-source");
const RoomingList_1 = require("../entities/RoomingList");
const typeorm_1 = require("typeorm");
class RoomingListController {
    constructor() {
        this.roomingListRepository = data_source_1.AppDataSource.getRepository(RoomingList_1.RoomingList);
    }
    async getAll(req, res) {
        var _a;
        try {
            console.log('Full request body:', req.body);
            const searchValue = ((_a = req.query) === null || _a === void 0 ? void 0 : _a.searchValue) || '';
            console.log('Search value:', searchValue);
            const validAgreementTypes = ['leisure', 'staff', 'artist'];
            let whereConditions = [];
            if (searchValue) {
                whereConditions.push({ rfp_name: (0, typeorm_1.Like)(`%${searchValue}%`) });
                if (validAgreementTypes.includes(searchValue)) {
                    whereConditions.push({ agreement_type: searchValue });
                }
            }
            const roomingLists = await this.roomingListRepository.find({
                where: whereConditions.length > 0 ? whereConditions : undefined,
                order: { id: "DESC" },
                relations: ["roomingBookings", "roomingBookings.booking"]
            });
            console.log('Found rooming lists:', roomingLists.length);
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
        catch (error) {
            console.error('Error in getAll:', error);
            return res.status(500).json({ message: "Error fetching rooming lists", error: error.message });
        }
    }
    async getOne(req, res) {
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
        }
        catch (error) {
            return res.status(500).json({ message: "Error fetching rooming list", error: error.message });
        }
    }
    async update(req, res) {
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
        }
        catch (error) {
            return res.status(500).json({ message: "Error updating rooming list", error: error.message });
        }
    }
    async delete(req, res) {
        try {
            const { id } = req.params;
            const result = await this.roomingListRepository.delete(parseInt(id));
            if (result.affected === 0) {
                return res.status(404).json({ message: "Rooming list not found" });
            }
            return res.status(204).send();
        }
        catch (error) {
            return res.status(500).json({ message: "Error deleting rooming list", error: error.message });
        }
    }
}
exports.default = new RoomingListController();
