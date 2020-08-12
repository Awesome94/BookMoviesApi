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
exports.connect = void 0;
const typeorm_1 = require("typeorm");
exports.connect = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield typeorm_1.createConnection({
        "type": "postgres",
        "database": "moviesDB",
        "name": "default",
        "synchronize": false,
        "logging": true,
        "migrationsTableName": "custom_migration_table",
        "entities": [
            __dirname + '/models/*.js'
        ],
        "migrations": [
            __dirname + '/migrations/*.js'
        ],
        "cli": {
            entitiesDir: __dirname + "/models/",
            migrationsDir: __dirname + '/migrations/'
        }
    });
});
//# sourceMappingURL=db.js.map