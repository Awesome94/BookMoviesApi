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
const cors_1 = __importDefault(require("cors"));
db_1.connect();
dotenv_1.default.config();
const app = express_1.default();
exports.app = app;
app.use(cors_1.default());
app.use(bodyParser.json({
    limit: '50mb',
    verify(req, res, buf, encoding) {
        req.rawBody = buf;
    }
}));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(200).send({ "Welcomed": "POST to /api/v1/register to get started" });
}));
app.post('/api/v1/register/:username/:password', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userExists = yield User_model_1.User.findOne({ username: req.params.username });
    if (userExists)
        return res.status(400).send({ 'error': 'User already registered, Login to continue' });
    const salt = yield bcrypt_1.genSalt(10);
    const hashPassword = yield bcrypt_1.hash(req.params.password, salt);
    const user = new User_model_1.User();
    user.username = req.params.username,
        user.password = hashPassword;
    try {
        const savedUser = yield user.save();
        res.status(201).send({ "Success": "Account created successfully" });
    }
    catch (err) {
        res.status(400).send(err);
    }
}));
app.post('/api/v1/login/:username/:password', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_model_1.User.findOne({ username: req.params.username });
    if (!user)
        return res.status(400).send({ 'error': 'account does not exists, register to continue' });
    const validpass = yield bcrypt_1.compare(req.params.password, user.password);
    if (!validpass)
        return res.status(400).send('Password is wrong');
    const token = jwt.sign({ username: user.username }, process.env.TOKEN_SECRET);
    res.send({ "Access Token": token, "username": user.username });
}));
app.post('/api/v1/book', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const movieBooked = yield Movie_model_1.Movie.findOne({ name: req.body.name });
    if (movieBooked)
        return res.status(400).send('Movie already booked');
    const movie = new Movie_model_1.Movie();
    movie.name = req.body.name;
    movie.plot_summary = req.body.plot_summary;
    movie.assignee = req.body.assignee;
    movie.tickets = req.body.numberOftickets;
    movie.account_owner = req.body.username || 'guest';
    movie.identifier = req.body.imdbID;
    movie.year = req.body.year;
    movie.image = req.body.image;
    yield movie.save();
    movie.identifier = movie.identifier.toString() + movie.id.toString();
    yield movie.save();
    res.status(201).send({ "success": `Movie booked successfully with Identifier: ${movie.identifier}` });
}));
app.get('/api/v1/booked/:identifier', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const movies = yield Movie_model_1.Movie.find({ identifier: req.params.identifier });
    res.status(200).send(movies);
}));
app.get('/api/v1/book/all', requireJwtMiddleware_1.requireJwtMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("we made it here", req.user);
    const username = req.user.username || req.user._id;
    const movies = yield Movie_model_1.Movie.find({ account_owner: username });
    res.status(200).send(movies);
}));
//# sourceMappingURL=app.js.map