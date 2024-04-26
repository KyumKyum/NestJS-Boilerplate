import {Module} from "@nestjs/common";
import {ConfigModule, ConfigService} from "@nestjs/config";
import authConfig from "../../../../config/auth/auth.config";
import {JwtModule} from "@nestjs/jwt";
import {JwtAuthService} from "./jwtAuth.service";

@Module({
    imports: [
        ConfigModule.forFeature(authConfig),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('auth.jwtSecret'),
                signOptions: { expiresIn: 3600 }
            })
        })],
    providers:[JwtAuthService],
    exports: [JwtAuthService, JwtModule]
})

export class JwtAuthModule{}
