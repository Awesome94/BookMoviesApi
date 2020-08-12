"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
const Movie_model_1 = require("./db/models/Movie.model");
const User_model_1 = require("./db/models/User.model");
const bcrypt_1 = require("bcrypt");
const jwt = __importStar(require("jsonwebtoken"));
const requireJwtMiddleware_1 = require("./middleware/requireJwtMiddleware");
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./db/db");
db_1.connect();
dotenv_1.default.config();
const app = express_1.default();
exports.app = app;
app.use(bodyParser.json({
    limit: '50mb',
    verify(req, res, buf, encoding) {
        req.rawBody = buf;
    }
}));
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(200).send({ "Welcome": "POST to /api/v1/register to get started" });
}));
app.post('/user/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userExists = yield User_model_1.User.findOne({ username: req.body.username });
    if (userExists)
        return res.status(400).send('User already exists');
    const salt = yield bcrypt_1.genSalt(10);
    const hashPassword = yield bcrypt_1.hash(req.body.password, salt);
    const user = new User_model_1.User();
    user.username = req.body.username,
        user.password = hashPassword;
    try {
        const savedUser = yield user.save();
        res.send({ user: user.username });
    }
    catch (err) {
        res.status(400).send(err);
    }
}));
app.post('/login/:username/:password', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_model_1.User.findOne({ username: req.params.username });
    if (!user)
        return res.status(400).send('Username or Password is wrong');
    const validpass = yield bcrypt_1.compare(req.params.password, user.password);
    if (!validpass)
        return res.status(400).send('Password is wrong');
    const token = jwt.sign({ _id: user.username }, process.env.TOKEN_SECRET);
    res.send({ "Access Token": token });
}));
app.post('/book', requireJwtMiddleware_1.requireJwtMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const movie = new Movie_model_1.Movie();
    movie.name = req.body.name;
    movie.plot_summary = req.body.summary;
    movie.assignee = req.body.assignee;
    movie.tickets = req.body.tickets;
    yield movie.save();
    res.send(movie);
}));
app.get('/booked/:username', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const movies = yield Movie_model_1.Movie.find();
    res.send(movies);
}));
//# sourceMappingURL=app.js.map