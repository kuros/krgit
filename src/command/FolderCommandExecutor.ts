import {Command} from "./Command";
import {ConfigDetails} from "../service/ConfigService";
import {FileDetails} from "../service/FileService";
import {Utils} from "../util/Utils";
import {Answers, default as inquirer, Question} from "inquirer";

export class FolderCommandExecutor implements Command {

    private parentProjectMap:{[key:string]: FileDetails[]};

    constructor(private config:ConfigDetails, private args:string[], private fileDetails: FileDetails[]) {
        this.parentProjectMap = Utils.generateMap(fileDetails, 'parent');
    }

    doesHandle(): boolean {
        return this.args.length === 1 && this.args[0] === 'group'
    }

    handle(command:string): void {
        let keys:string[] = Object.keys(this.parentProjectMap);
        let question:Question = {
            type: "list",
            choices: keys,
            message: "Select group of repos",
            name: "group"
        };

        inquirer.prompt(question).then((answer:Answers) => {
            let group:string = answer["group"];
            let fileDetails:FileDetails[] = this.parentProjectMap[group];

            fileDetails.forEach(fileDetail => {
                Utils.changeDirectory(fileDetail.path);
                Utils.runGitCommand(fileDetail.path, command);
            });
        });
    }
}