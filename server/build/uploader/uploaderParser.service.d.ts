import { AddTyresToDbService } from './addTyresToDataBase.service';
import { AddWheelsToDbService } from './addWheelToDataBase.service';
export declare class UploaderPaprserService {
    private addTyresToDataBase;
    private addWheelToDataBase;
    constructor(addTyresToDataBase: AddTyresToDbService, addWheelToDataBase: AddWheelsToDbService);
    csvParserTyres(path: string): Promise<string>;
    csvParserWheels(path: string): Promise<string>;
}
