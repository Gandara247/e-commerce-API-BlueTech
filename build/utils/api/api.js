"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("../../routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const errorHandler_1 = __importDefault(require("../../middlewares/errors/errorHandler"));
const node_path_1 = __importDefault(require("node:path"));
const cors_1 = __importDefault(require("cors"));
const api = (0, express_1.default)();
api.use((0, cors_1.default)({
    origin: ["http://localhost:3000", "https://e-commerce-api-bluetech-production.up.railway.app/"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
api.use((0, cookie_parser_1.default)());
api.use(express_1.default.json());
api.use(routes_1.default);
api.use("/", express_1.default.static(node_path_1.default.resolve("docs")));
//api.use("/images", express.static(path.resolve("images")));
api.use(errorHandler_1.default);
exports.default = api;
