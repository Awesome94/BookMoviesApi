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
exports.CreateMovieTable1597245783001 = void 0;
const typeorm_1 = require("typeorm");
class CreateMovieTable1597245783001 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
                name: "movies",
                columns: [
                    {
                        name: "id",
                        type: "integer",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: "tickets",
                        type: "integer",
                        isNullable: false
                    },
                    {
                        name: "assignee",
                        type: "text",
                        isNullable: false
                    },
                    {
                        name: "name",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "account_owner",
                        type: "text",
                        isNullable: false,
                    },
                    {
                        name: "identifier",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "plot_summary",
                        type: "text",
                        isNullable: false
                    },
                    {
                        name: "image",
                        type: "text",
                        isNullable: false
                    },
                    {
                        name: "year",
                        type: "text",
                        isNullable: false
                    }
                ]
            }), true);
            yield queryRunner.createTable(new typeorm_1.Table({
                name: "users",
                columns: [
                    {
                        name: "username",
                        type: "text",
                        isPrimary: true,
                    },
                    {
                        name: "password",
                        type: "varchar",
                    }
                ]
            }), true);
            queryRunner.clearSqlMemory();
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield queryRunner.dropTable("movies");
        });
    }
}
exports.CreateMovieTable1597245783001 = CreateMovieTable1597245783001;
//# sourceMappingURL=1597245783001-CreateMovieTable.js.map