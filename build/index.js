"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = require("process");
const api_1 = __importDefault(require("./utils/api/api"));
api_1.default.listen(process_1.env.PORT, () => console.log("🎲 Successfully connected to the database!"));
