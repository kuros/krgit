import {Command} from "./Command";
import {ConfigDetails} from "../service/ConfigService";
import {FileDetails} from "../service/FileService";
import * as inquirer from "inquirer";
import {Answers, ChoiceType, Question, Questions} from "inquirer";
import {Utils} from "../util/Utils";

export class DefaultCommandExecutor implements Command {

    private parentProjectMap:{[key:string]: FileDetails[]};
    private projectMap:{[key:string]: FileDetails[]};

    constructor(private config:ConfigDetails, private args:string[], private fileDetails: FileDetails[]) {
        this.parentProjectMap = this.generateMap(fileDetails, 'parent');
        this.projectMap = this.generateMap(fileDetails, 'project')
    }

    doesHandle(): boolean {
        return this.args.length === 0;
    }

    handle(command:string): void {
        let keys:string[] = Object.keys(this.parentProjectMap);
        if (keys.length == 1) {
            let key:string = keys[0];
            this.checkoutRepos(key, command);
        } else {
            let question:Question = {
                type: "list",
                choices: keys,
                message: "Select group of repos",
                name: "group"
            };

            inquirer.prompt(question).then((answer:Answers) => {
                let group:string = answer["group"];
                this.checkoutRepos(group, command);
            })
        }
    }

    private checkoutRepos(key: string, command: string) {

        let fileDetails: FileDetails[] = this.parentProjectMap[key] || [];
        let choices: ChoiceType[] = [];
        fileDetails.forEach(fileDetail => {
            choices.push(fileDetail.project);
        });

        let question: Question = {
            type: "checkbox",
            choices: choices,
            message: "Select Repository to checkout",
            name: "selectedRepos"
        };

        inquirer.prompt(question).then((answer: Answers) => {
            let selectedRepos: string[] = answer["selectedRepos"];

            selectedRepos.forEach(ans => {

                let fileDetails:FileDetails[] = this.projectMap[ans];

                fileDetails.forEach(fileDetail => {
                    Utils.changeDirectory(fileDetail.path);
                    Utils.runGitCommand(command);
                    // console.log(this.generateCommand());
                });
            })
        })
    }

    private generateMap(fileDetails: FileDetails[], key:string):{[key:string]: FileDetails[]} {
        let map:{[key:string]: FileDetails[]} = {};
        fileDetails.forEach(file => {
            let anies = map[file[key]] || [];
            anies.push(file);
            map[file[key]] = anies;
        });

        return map;
    }
}