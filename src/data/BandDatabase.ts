import { BandRepository } from "../business/BandRepository";
import { Band, BandInputDatabase } from "../model/Band";
import { TABELA_BANDAS } from "../model/Tables";
import { BaseDatabase } from "./BaseDatabase";

export class BandDatabase extends BaseDatabase implements BandRepository {

    private static TABLE_BANDS = TABELA_BANDAS

    public async registerBand(bandDB: BandInputDatabase): Promise<void> {
        try {
            await this.getConnection().insert(bandDB).into(BandDatabase.TABLE_BANDS)
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message)
        }
        
    }

    public async getBandDetails(name: string): Promise<Band> {
        const result = await this.getConnection()
            .select("*")
            .from(BandDatabase.TABLE_BANDS)
            .where({ name });
        
        return result[0]
    
    }
}