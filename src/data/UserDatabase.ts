import { BaseDatabase } from "./BaseDatabase";
import { User } from "../model/User";
import { UserRepository } from "../business/UserRepository";
import { TABELA_USUARIOS } from "../model/Tables";

export class UserDatabase extends BaseDatabase implements UserRepository{

  private static TABLE_USERS = TABELA_USUARIOS;

  public async createUser(
    id: string,
    email: string,
    name: string,
    password: string,
    role: string
  ): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id,
          email,
          name,
          password,
          role
        })
        .into(UserDatabase.TABLE_USERS);
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getUserByEmail(email: string): Promise<User> {
    const result = await this.getConnection()
      .select("*")
      .from(UserDatabase.TABLE_USERS)
      .where({ email });

    return User.toUserModel(result[0]);
  }

}
