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
const dotEnvConfig_1 = __importDefault(require("./dotEnvConfig/dotEnvConfig"));
const storage_1 = require("../uploads/storage");
const apiError_1 = __importDefault(require("./api/apiError"));
const util_1 = require("util");
const bucket = storage_1.storage.bucket(dotEnvConfig_1.default.GCLOUD_STORAGE_BUCKET);
function storeImages(files) {
    return __awaiter(this, void 0, void 0, function* () {
        let images = [];
        if (!files)
            throw new apiError_1.default(400, "No image uploaded!");
        for (const image of files) {
            const blob = bucket.file(image.originalname);
            const blobStream = blob.createWriteStream();
            blobStream.on("error", (error) => {
                throw error;
            });
            blobStream.on("finish", () => {
                // // const publicUrl = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
                // // images.push(publicUrl);
                // console.log(images);
            });
            blobStream.end(image.buffer);
            const publicUrl = (0, util_1.format)(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
            images.push(publicUrl);
        }
        return images;
    });
}
exports.default = storeImages;
;
