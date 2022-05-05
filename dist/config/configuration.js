"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const databaseConfiguration = () => ({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGERS_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    autoLoadEntities: true,
    synchronize: true
});
exports.default = () => ({
    db: databaseConfiguration()
});
//# sourceMappingURL=configuration.js.map