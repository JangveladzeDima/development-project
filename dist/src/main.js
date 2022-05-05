"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: ['log', 'error']
    });
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true }));
    await app.listen(7777);
}
bootstrap().catch((err) => console.log(err));
//# sourceMappingURL=main.js.map