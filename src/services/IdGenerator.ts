import { v4 } from "uuid";
import { IIdGenerator } from "../business/Ports";

export class IdGenerator implements IIdGenerator{

    generate(): string{
        return v4();
    }
}