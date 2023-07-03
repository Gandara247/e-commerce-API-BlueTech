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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const storage_1 = require("../uploads/storage");
const dotEnvConfig_1 = __importDefault(require("./dotEnvConfig/dotEnvConfig"));
function deleteImage(fileName) {
    return __awaiter(this, void 0, void 0, function* () {
        const name = fileName.split("/").pop() || "";
        yield storage_1.storage.bucket(dotEnvConfig_1.default.GCLOUD_STORAGE_BUCKET).file(name).delete();
    });
}
exports.default = deleteImage;
