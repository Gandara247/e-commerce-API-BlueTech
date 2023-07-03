"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = __importDefault(require("../utils/api/api"));
const jwt_1 = __importDefault(require("../utils/jwt"));
const supertest_1 = __importDefault(require("supertest"));
describe('/order path test', () => {
    const userAdmin = { id: 1, name: "joao", email: "joao@gmail.com", role: "admin", };
    const userClient = { id: 2, name: "josue", email: "josue@gmail.com", role: "client", };
    it('/get - It should return status 200 if the authentication is valid', (done) => {
        const token = jwt_1.default.createToken(userAdmin);
        (0, supertest_1.default)(api_1.default)
            .get('/order')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .end((err, res) => {
            done();
        });
    });
    it('/put - It should return status 200 if the authentication is valid', (done) => {
        const token = jwt_1.default.createToken(userAdmin);
        (0, supertest_1.default)(api_1.default)
            .put('/order/:id')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .end((err, res) => {
            done();
        });
    });
    it('/delete - It should return status 204 if the authentication is valid', (done) => {
        const token = jwt_1.default.createToken(userAdmin);
        (0, supertest_1.default)(api_1.default)
            .delete('/order/:id')
            .set('Authorization', `Bearer ${token}`)
            .expect(204)
            .end((err, res) => {
            done();
        });
    });
    it('It should return status 403 because this path is exclusive for the admin user', (done) => {
        const token = jwt_1.default.createToken(userClient);
        (0, supertest_1.default)(api_1.default)
            .get('/order')
            .set('Authorization', `Bearer ${token}`)
            .expect(403)
            .end((err, res) => {
            done();
        });
    });
    it('It should return error status 401 for trying to acess the path without token/authentication', (done) => {
        (0, supertest_1.default)(api_1.default)
            .get('/order')
            .expect(401)
            .end((err, res) => {
            done();
        });
    });
});
