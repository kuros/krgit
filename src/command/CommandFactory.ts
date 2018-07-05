import {ConfigDetails} from "../service/ConfigService";
import {FileDetails} from "../service/FileService";
import {Command} from "./Command";
import {DefaultCommandExecutor} from "./DefaultCommandExecutor";
import {AllCommandExecutor} from "./AllCommandExecutor";


export class CommandFactory {

    private commands:Command[];
    constructor(private config:ConfigDetails, private args:string[], private fileDetails:FileDetails[]) {
        this.commands = [];
        this.commands.push(new DefaultCommandExecutor(config, args, fileDetails));
        this.commands.push(new AllCommandExecutor(config, args, fileDetails));
    }

    public handleCommands(commandSting:string):void {
        for (let i = 0; i < this.commands.length; i++) {
            let command:Command = this.commands[i];
            if (command.doesHandle()) {
                command.handle(commandSting);
            }
        }
    }
}

