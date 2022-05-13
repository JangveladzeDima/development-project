import { Body, Controller, Inject, Logger, Post } from "@nestjs/common";
import { ClientRegistrationDto } from "../dto/client-registration.dto";
import { ClientAdapter } from "../../domain/adapter/client.adapter";
import { IClientAdapter } from "../../domain/port/client-adapter.interface";

@Controller('/client')
export class ClientController {
    logger = new Logger(ClientController.name)

    constructor(
        @Inject(ClientAdapter) private readonly clientAdapter: IClientAdapter
    ) {
    }

    @Post('/registration')
    async clientRegistration(
        @Body() clientRegistrationParams: ClientRegistrationDto
    ) {
        try {
            const client = await this.clientAdapter.create(clientRegistrationParams)
            return {
                client,
                message: 'ok'
            }
        } catch (err) {
            this.logger.error(err.message)
            throw err
        }
    }

}