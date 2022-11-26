import express from "express";
import { BandBusiness } from "../business/BandBusiness";
import { BandController } from "../controller/BandController";
import { BandDatabase } from "../data/BandDatabase";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export const bandRouter = express.Router();

const idGenerator = new IdGenerator();
const authenticator = new Authenticator();

const bandDatabase = new BandDatabase();
const bandBusiness = new BandBusiness(bandDatabase, idGenerator, authenticator);
const bandController = new BandController(bandBusiness);

bandRouter.post("/register", (req, res) => bandController.registerBand(req, res))
bandRouter.get("/details", (req, res) => bandController.getBandDetails(req, res))