"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tbl_users = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const sqlite_core_1 = require("drizzle-orm/sqlite-core");
exports.tbl_users = (0, sqlite_core_1.sqliteTable)("tbl_users", {
    id: (0, sqlite_core_1.integer)("id").notNull().primaryKey({ autoIncrement: true }),
    name: (0, sqlite_core_1.text)("name").notNull(),
    email: (0, sqlite_core_1.text)("email").notNull(),
    createdAt: (0, sqlite_core_1.integer)("created_at", { mode: "timestamp" }).default((0, drizzle_orm_1.sql) `(strftime('%s', 'now'))`),
    updatedAt: (0, sqlite_core_1.integer)("updated_at", { mode: "timestamp" }).default((0, drizzle_orm_1.sql) `(strftime('%s', 'now'))`),
});
