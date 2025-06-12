"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomingList = void 0;
const typeorm_1 = require("typeorm");
const RoomingBooking_1 = require("./RoomingBooking");
let RoomingList = class RoomingList {
};
exports.RoomingList = RoomingList;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint" }),
    __metadata("design:type", Number)
], RoomingList.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "bigint" }),
    __metadata("design:type", Number)
], RoomingList.prototype, "event_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "bigint" }),
    __metadata("design:type", Number)
], RoomingList.prototype, "hotel_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RoomingList.prototype, "rfp_name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], RoomingList.prototype, "cutOff_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "active" }),
    __metadata("design:type", String)
], RoomingList.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: ["leisure", "staff", "artist"]
    }),
    __metadata("design:type", String)
], RoomingList.prototype, "agreement_type", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => RoomingBooking_1.RoomingBooking, roomingBooking => roomingBooking.roomingList),
    __metadata("design:type", Array)
], RoomingList.prototype, "roomingBookings", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], RoomingList.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], RoomingList.prototype, "updated_at", void 0);
exports.RoomingList = RoomingList = __decorate([
    (0, typeorm_1.Entity)("rooming_lists")
], RoomingList);
