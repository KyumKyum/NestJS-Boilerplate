import {Injectable} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";

export interface JWTSign{
    accessToken: string
}

@Injectable()
export class JwtAuthService{
    constructor(private readonly jwtService: JwtService) {}

    async sign<T>(data: T): Promise<JWTSign> {
        const payload = Object({...data})
        return {accessToken: this.jwtService.sign(payload)}
    }
}
