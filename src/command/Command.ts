import {ConfigDetails} from "../service/ConfigService";
import {FileDetails} from "../service/FileService";

export interface Command {
    doesHandle():boolean;
    handle(command:string):void;
}