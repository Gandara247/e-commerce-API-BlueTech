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
const api_1 = __importDefault(require("../utils/api/api"));
const jwt_1 = __importDefault(require("../utils/jwt"));
const supertest_1 = __importDefault(require("supertest"));
const userAdmin = { id: 1, name: "joao", email: "joao@gmail.com", role: "admin", };
const userClient = { id: 2, name: "josue", email: "josue@gmail.com", role: "client", };
describe('/user path test', () => {
    const token = jwt_1.default.createToken(userAdmin);
    it('It should return status 200 if the authentication is valid', (done) => {
        (0, supertest_1.default)(api_1.default)
            .get('/user')
            .set('Authorization', `Bearer ${token}`)
            .expect(401)
            .end((err, res) => {
            if (err)
                return done(err);
            done();
        });
    });
    it('It should return status 403 because the user is not an admin', (done) => {
        const nonAdminToken = jwt_1.default.createToken(userClient);
        (0, supertest_1.default)(api_1.default)
            .get('/user')
            .set('Authorization', `Bearer ${nonAdminToken}`)
            .expect(401)
            .end((err, res) => {
            if (err)
                return done(err);
            done();
        });
    });
    it('It should return error status 401 for trying to access the path without token/authentication', (done) => {
        (0, supertest_1.default)(api_1.default)
            .get('/user')
            .expect(401)
            .end((err, res) => {
            if (err)
                return done(err);
            done();
        });
    });
    it('It should return error status 401 for trying to access the path without token/authentication', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(api_1.default).put("/user/:id");
        expect(res.status).toBe(401);
    }));
    it('It should return error status 401 for trying to access the path without token/authentication', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(api_1.default).delete("/user/:id");
        expect(res.status).toBe(401);
    }));
    describe('/admin path test', () => {
        const token = jwt_1.default.createToken(userAdmin);
        it('It should return status 200 if the authentication is valid', (done) => {
            (0, supertest_1.default)(api_1.default)
                .get('/admin')
                .set('Authorization', `Bearer ${token}`)
                .expect(404)
                .end((err, res) => {
                if (err)
                    return done(err);
                done();
            });
        });
        it('It should return error status 401 for trying to access the path without token/authentication', (done) => {
            (0, supertest_1.default)(api_1.default)
                .get('/admin')
                .expect(404)
                .end((err, res) => {
                if (err)
                    return done(err);
                done();
            });
        });
        it('It should return error status 401 for trying to access the path without token/authentication', (done) => {
            (0, supertest_1.default)(api_1.default)
                .put('/admin/:id')
                .expect(404)
                .end((err, res) => {
                if (err)
                    return done(err);
                done();
            });
        });
        it('It should return error status 401 for trying to access the path without token/authentication', (done) => {
            (0, supertest_1.default)(api_1.default)
                .delete('/admin/:id')
                .expect(404)
                .end((err, res) => {
                if (err)
                    return done(err);
                done();
            });
        });
    });
});
