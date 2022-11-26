import * as jwt from "jsonwebtoken";
import { IAuthenticator } from "../business/Ports";

export class Authenticator implements IAuthenticator{
  public generateToken(input: AuthenticationData): string {
    const expiresIn: string = process.env.ACCESS_TOKEN_EXPIRES_IN!
    const token = jwt.sign(
      {
        id: input.id,
        role: input.role
      },
      process.env.JWT_KEY as string,
      {
        expiresIn,
      }
    );
    return token;
  }

  public getData(token: string): AuthenticationData {
    const payload = jwt.verify(token, process.env.JWT_KEY as string) as any;
    const result = {
      id: payload.id,
      role: payload.role
    };
    return result;
  }
}

export interface AuthenticationData {
  id: string;
  role?: string;
}