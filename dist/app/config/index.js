"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
require('dotenv').config();
exports.config = {
    Mongodb_url: process.env.MONGO_DB_URL,
    port: process.env.PORT
};
