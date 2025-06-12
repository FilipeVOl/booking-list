"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../config/data-source");
const User_1 = require("../entities/User");
class UserRepository {
    constructor() {
        this.repository = data_source_1.AppDataSource.getRepository(User_1.User);
    }
    async findByEmail(email) {
        return await this.repository.findOne({ where: { email } });
    }
    ;
    create(data) {
        return this.repository.create(data);
    }
    ;
    async save(user) {
        return await this.repository.save(user);
    }
    ;
}
exports.default = new UserRepository();
