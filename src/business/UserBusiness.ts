import { UserInputDTO, LoginInputDTO } from "../model/User";
import { UserRepository } from "./UserRepository";
import { InvalidEmail, InvalidName, InvalidPassword } from "../error/CustomError";
import { IAuthenticator, IHashManager, IIdGenerator } from "./Ports";

export class UserBusiness {
    constructor(
        private userDatabase: UserRepository,
        private idGenerator: IIdGenerator,
        private hashManager: IHashManager,
        private authenticator: IAuthenticator
    ){}

    async createUser(user: UserInputDTO) {

        const id = this.idGenerator.generate();

        const hashPassword = await this.hashManager.hash(user.password);

        if (user.name.length < 6) {
            throw new InvalidName()
        }

        if (!user.email.includes("@")) {
            throw new InvalidEmail();
          }

        await this.userDatabase.createUser(id, user.email, user.name, hashPassword, user.role);

        const accessToken = this.authenticator.generateToken({ id, role: user.role });

        return accessToken;
    }

    async getUserByEmail(user: LoginInputDTO) {

        const userFromDB = await this.userDatabase.getUserByEmail(user.email);

        const hashCompare = await this.hashManager.compare(user.password, userFromDB.getPassword());

        const accessToken = this.authenticator.generateToken({ id: userFromDB.getId(), role: userFromDB.getRole() });

        if (!hashCompare) {
            throw new InvalidPassword();
        }

        return accessToken;
    }
}