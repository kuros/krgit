import {Command} from "./Command";
import {ConfigDetails} from "../service/ConfigService";
import {FileDetails} from "../service/FileService";
import {Utils} from "../util/Utils";

export class AllCommandExecutor implements Command {

    private parentProjectMap:{[key:string]: FileDetails[]};
    private projectMap:{[key:string]: FileDetails[]};

    constructor(private config:ConfigDetails, private args:string[], private fileDetails: FileDetails[]) {
        this.parentProjectMap = Utils.generateMap(fileDetails, 'parent');
        this.projectMap = Utils.generateMap(fileDetails, 'project')
    }

    doesHandle(): boolean {
        return this.args.length === 1 && this.args[0] === 'all'
    }

    handle(command:string): void {
        this.fileDetails.forEach(fileDetail => {
            Utils.changeDirectory(fileDetail.path);
            Utils.runGitCommand(command);
        })
    }
}