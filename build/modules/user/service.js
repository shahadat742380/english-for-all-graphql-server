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
exports.userService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("@/schema");
exports.userService = {
    getUsers: (db, offset, limit) => {
        return db.select().from(schema_1.tbl_users).limit(limit).offset(offset).prepare().all();
    },
    getUserById: (db, id) => {
        return db.select().from(schema_1.tbl_users).where((0, drizzle_orm_1.eq)(schema_1.tbl_users.id, id)).prepare().execute();
    },
    addUser: (db, input) => {
        const result = db
            .insert(schema_1.tbl_users)
            .values({
            name: input.name,
            email: input.email,
            profile: input.profile,
            createdAt: (0, drizzle_orm_1.sql) `(strftime('%s', 'now'))`,
            updatedAt: (0, drizzle_orm_1.sql) `(strftime('%s', 'now'))`,
        })
            .returning()
            .prepare().execute();
        return result;
    },
    updateUser: (db, id, input) => {
        const result = db
            .update(schema_1.tbl_users)
            .set({
            name: input.name,
            email: input.email,
            profile: input.profile,
            updatedAt: (0, drizzle_orm_1.sql) `(strftime('%s', 'now'))`,
        })
            .where((0, drizzle_orm_1.eq)(schema_1.tbl_users.id, id))
            .returning()
            .prepare().all();
        return result;
    },
    deleteUser: (db, id) => __awaiter(void 0, void 0, void 0, function* () {
        const isUserExist = yield db
            .select()
            .from(schema_1.tbl_users)
            .where((0, drizzle_orm_1.eq)(schema_1.tbl_users.id, id))
            .prepare()
            .get();
        if (!(isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.id)) {
            return {
                success: false,
                message: "User not found",
            };
        }
        const user = db
            .delete(schema_1.tbl_users)
            .where((0, drizzle_orm_1.eq)(schema_1.tbl_users.id, id))
            .returning()
            .execute();
        return {
            success: true,
            message: "User deleted successfully",
            data: {
                User: user,
            },
        };
    }),
};
