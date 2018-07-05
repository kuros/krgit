import {Command} from "./Command";
import {ConfigDetails} from "../service/ConfigService";
import {FileDetails} from "../service/FileService";
import {Utils} from "../util/Utils";

export class FolderCommandExecutor implements Command {

    private parentProjectMap:{[key:string]: FileDetails[]};

    constructor(private config:ConfigDetails, private args:string[], private fileDetails: FileDetails[]) {
        this.parentProjectMap = Utils.generateMap(fileDetails, 'parent');
    }

    doesHandle(): boolean {
        return this.args.length === 1
    }

    handle(command:string): void {

        let arg:string = this.args[0];
        let fileDetails:FileDetails[] = this.parentProjectMap[arg];

        fileDetails.forEach(fileDetail => {
            Utils.changeDirectory(fileDetail.path);
            Utils.runGitCommand(command);
        });
    }
}