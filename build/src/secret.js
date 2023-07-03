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
const secret_manager_1 = require("@google-cloud/secret-manager");
const storage_1 = require("@google-cloud/storage");
function getSecret() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new secret_manager_1.SecretManagerServiceClient();
        const name = 'projects/third-zephyr-391506/secrets/gandarasecret/versions/latest';
        const [version] = yield client.accessSecretVersion({ name });
        if (version.payload && version.payload.data) {
            const secretValue = version.payload.data.toString();
            const credentials = JSON.parse(secretValue);
            const storage = new storage_1.Storage({ credentials });
            function listBuckets() {
                return __awaiter(this, void 0, void 0, function* () {
                    const [buckets] = yield storage.getBuckets();
                    console.log('Buckets:');
                    buckets.forEach(bucket => {
                        console.log(bucket.name);
                    });
                });
            }
            listBuckets();
        }
        else {
            console.log('Não foi possível acessar o valor do segredo');
        }
    });
}
getSecret();
