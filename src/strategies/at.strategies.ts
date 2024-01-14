import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "src/types";

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy,"jwt"){
    constructor() {
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:process.env.JWT_SECRET
        });
    }

    validate(payload:JwtPayload){
        return payload;
    }
}