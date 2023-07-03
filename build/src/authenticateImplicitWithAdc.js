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
const storage_1 = require("@google-cloud/storage");
const dotEnvConfig_1 = __importDefault(require("./utils/dotEnvConfig/dotEnvConfig"));
const projectId = (dotEnvConfig_1.default.GCLOUD_PROJECT_ID);
function authenticateImplicitWithAdc() {
    return __awaiter(this, void 0, void 0, function* () {
        const storage = new storage_1.Storage({
            projectId,
        });
        const [buckets] = yield storage.getBuckets();
        for (const bucket of buckets) {
            console.log(`- ${bucket.name}`);
        }
    });
}
authenticateImplicitWithAdc();
