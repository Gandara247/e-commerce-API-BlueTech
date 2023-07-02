"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
function validateDto(schema) {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        try {
            if (req.body.data) {
                req.body.data = JSON.parse(req.body.data);
            }
            req.body = yield ((_a = schema.body) === null || _a === void 0 ? void 0 : _a.validate(req.body));
            req.params = yield ((_b = schema.params) === null || _b === void 0 ? void 0 : _b.validate(req.params));
            next();
        }
        catch (error) {
            next(error);
        }
    });
}
exports.default = validateDto;
