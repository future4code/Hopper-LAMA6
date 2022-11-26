import { Unauthorized } from "../error/CustomError";
import { IAuthenticator, IHashManager, IIdGenerator } from "./Ports";
import { BandRepository } from "./BandRepository";
import { Band, BandInputDatabase, BandInputDTO } from "../model/Band";

export class BandBusiness {
    constructor(
        private bandDatabase: BandRepository,
        private idGenerator: IIdGenerator,
        private authenticator: IAuthenticator
    ){}

    async registerBand(band: BandInputDTO, token: string) {

        const id = this.idGenerator.generate();

        const bandDB: BandInputDatabase = {
            id, 
            name: band.name,
            music_genre: band.musicGenre,
            responsible: band.responsible
        }

        console.log(token);
        

        const roleAuth = this.authenticator.getData(token)

        if (!roleAuth || roleAuth.role !== "ADMIN") {
            throw new Unauthorized();
        }

        await this.bandDatabase.registerBand(bandDB);
    }

    async getBandDetails(name: string, token: string): Promise<Band> {

        const bandDB = await this.bandDatabase.getBandDetails(name)

        const auth = this.authenticator.getData(token)

        if (!auth) {
            throw new Unauthorized();
        }

        return bandDB
    }
}