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
const secret_manager_1 = require("@google-cloud/secret-manager");
const apiError_1 = __importDefault(require("./api/apiError"));
const storage_1 = require("@google-cloud/storage");
const util_1 = require("util");
const credentials = JSON.parse(dotEnvConfig_1.default.GOOGLE_CREDENTIALS);
const client = new secret_manager_1.SecretManagerServiceClient({ credentials });
const storage = new storage_1.Storage({ credentials });
let bucket;
function getSecret() {
    return __awaiter(this, void 0, void 0, function* () {
        const name = 'projects/311537062777/secrets/gandarasecret/versions/latest';
        const [version] = yield client.accessSecretVersion({ name });
        if (version.payload && version.payload.data) {
            const secretValue = version.payload.data.toString();
            bucket = storage.bucket(dotEnvConfig_1.default.GCLOUD_STORAGE_BUCKET);
        }
        else {
            console.log('Não foi possível acessar o valor do segredo');
        }
    });
}
function storeImages(files) {
    return __awaiter(this, void 0, void 0, function* () {
        let images = [];
        if (!files)
            throw new apiError_1.default(400, "No image uploaded!");
        for (const image of files) {
            const blob = bucket.file(image.originalname);
            const blobStream = blob.createWriteStream();
            blobStream.on('error', (error) => {
                throw error;
            });
            blobStream.on('finish', () => {
                const publicUrl = (0, util_1.format)(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
                images.push(publicUrl);
                console.log(images);
            });
            blobStream.end(image.buffer);
            const publicUrl = (0, util_1.format)(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
            images.push(publicUrl);
        }
        return images;
    });
}
exports.default = storeImages;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield getSecret();
        // call storeImages function here
    });
}
main();
