import { Request, Response } from "express";
import { BandBusiness } from "../business/BandBusiness";
import { BandInputDTO } from "../model/Band";

export class BandController {
    constructor(
        private bandBusiness: BandBusiness
    ){}

    async registerBand(req: Request, res: Response) {
        try {
            const band: BandInputDTO = {
                name: req.body.name,
                musicGenre: req.body.musicGenre,
                responsible: req.body.responsible
            }
            const token: string = req.headers.authorization as string

            await this.bandBusiness.registerBand(band, token)

            res.status(200).send("Banda resgistrada")
        } catch (error: any) {
            res.status(400).send({ error: error.message });
        }
    }

    async getBandDetails(req: Request, res: Response) {
        try {
            const bandName = req.body.name
            const token: string = req.headers.authorization as string
            
            const band = await this.bandBusiness.getBandDetails(bandName, token)

            res.status(200).send(band)
        } catch (error: any) {
            res.status(400).send({ error: error.message });
        }
    }
}