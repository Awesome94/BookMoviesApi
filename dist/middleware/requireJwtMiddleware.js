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
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireJwtMiddleware = void 0;
const jwt = __importStar(require("jsonwebtoken"));
function requireJwtMiddleware(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({ error: "Missing authorization in headers" });
    }
    const [, token] = req.headers.authorization.split(' ');
    if (!token)
        return res.status(401).send({ error: "Access Denied, Missing token" });
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    }
    catch (err) {
        res.status(400).send({ error: "Access Denied, invalid token" });
    }
}
exports.requireJwtMiddleware = requireJwtMiddleware;
//# sourceMappingURL=requireJwtMiddleware.js.map