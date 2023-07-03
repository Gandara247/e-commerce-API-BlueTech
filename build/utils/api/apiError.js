"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class apiError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.default = apiError;
