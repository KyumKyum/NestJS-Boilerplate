import {DocumentBuilder} from "@nestjs/swagger";

export const swaggerConfig = new DocumentBuilder()
    .setTitle('your module')
    .setDescription('your description')
    .setVersion('1.0')
    .addTag('your tag')
    .build()
