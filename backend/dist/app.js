"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const errorHandler_1 = require("./middlewares/errorHandler");
const dotenv_1 = require("dotenv");
const auth_routes_1 = require("./routes/auth.routes");
const user_routes_1 = require("./routes/user.routes");
const data_source_1 = require("./config/data-source");
const booking_routes_1 = require("./routes/booking.routes");
const roomingList_routes_1 = require("./routes/roomingList.routes");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({ origin: (origin, callback) => {
        if (!origin)
            return callback(null, true);
        if (origin.match(/^https?:\/\/localhost:\d+$/)) {
            return callback(null, true);
        }
        const allowedDomains = [process.env.FRONTEND_URL || 'http://localhost:3000'];
        if (allowedDomains.indexOf(origin) !== -1) {
            return callback(null, true);
        }
        callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use('/api/auth', auth_routes_1.authRoutes);
app.use('/api/users', user_routes_1.userRoutes);
app.use('/api/bookings', booking_routes_1.bookingRoutes);
app.use('/api/rooming-lists', roomingList_routes_1.roomingListRoutes);
app.use(errorHandler_1.errorHandler);
const PORT = process.env.PORT || 3001;
data_source_1.AppDataSource.initialize().then(() => {
    console.log('Conexão com o banco de dados estabelecida');
}).catch((error) => {
    console.error('Erro ao conectar ao banco de dados:', error);
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
