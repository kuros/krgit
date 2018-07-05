import {ConfigDetails, ConfigService} from "./service/ConfigService";
import {FileDetails, FileService} from "./service/FileService";
import {CommandFactory} from "./command/CommandFactory";
import * as inquirer from "inquirer";
import {Answers, Question} from "inquirer";

export class Main {
    private readonly params: string[];

    constructor(params: string[]) {
        this.params = params;
    }

    public start(): void {
        const configService = new ConfigService();
        if (this.params[0] === 'init') {
            configService.init();
            return;
        }

        let config:ConfigDetails;
        config = configService.loadConfigs();

        const fileService = new FileService();
        let fileDetails:FileDetails[] = fileService.getGitDirectories(config);

        let question:Question = {
            name: "command",
            type: "input",
            message: "Enter Command"
        };

        let commandFactory:CommandFactory = new CommandFactory(config, this.params, fileDetails);
        inquirer.prompt(question).then((answer:Answers) => {
            let command:string = answer['command'];
            commandFactory.handleCommands(command);
        });

    }
}

let main = new Main(process.argv.slice(2));

main.start();
