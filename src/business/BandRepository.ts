import { Band, BandInputDatabase } from "../model/Band";

export interface BandRepository {
    registerBand(band: BandInputDatabase): Promise<void>
    getBandDetails(name: string): Promise<Band>
}