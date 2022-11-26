import { AuthenticationData } from "../services/Authenticator"

export interface IIdGenerator {
    generate(): string
}

export interface IHashManager {
    hash(text: string): Promise<string>,
    compare(text: string, hash: string): Promise<boolean>
}

export interface IAuthenticator {
    generateToken(input: AuthenticationData): string
    getData(token: string): AuthenticationData
}
