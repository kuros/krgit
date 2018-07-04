import config from './config.json'
import * as inquirer from "inquirer";
import {Answers, Question} from "inquirer";
import {readFileSync, writeFile} from "fs";

export class ConfigService {
    private file_path = "config.json";

    public init():void {
        let questions:Question[] = [
            {type: "input", name: "cwd", message: "Working Directory"},
            {type: "input", name: "username", message: "User Name"},
            {type: "password", name: "password", message: "Password"},
            {type: "checkbox", name: "serverType", message: "Choose Server Type", choices: ['stash', 'github']}
        ];
        inquirer.prompt(questions).then((value:Answers) => {
            // config.cwd = value["cwd"];
            let details:ConfigDetails = {
                cwd: value["cwd"],
                username: value["username"],
                password: Buffer.from(value["password"], 'binary').toString('base64'),
                serverType: value["serverType"][0]
            };


            // console.log(Buffer.from('SOlsbPMgd/NybGQhIQ==', 'base64').toString('binary'));


            writeFile(this.file_path, JSON.stringify(details), err => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("config.json file initialised")
                }
            })
        })
    }

    public loadConfigs():ConfigDetails {
        try {
            return this.parseConfigDetails(JSON.parse(readFileSync(this.file_path, "utf8")));
        } catch (e) {
            throw new Error("Unable to load config file, use 'init' command to initialise config properties");
        }
    }

    private parseConfigDetails(value: any):ConfigDetails {
        return {
            cwd: value["cwd"],
            username: value["username"],
            password: value["password"],
            serverType: value["serverType"]
        };
    }
}

export interface ConfigDetails {
    cwd:string;
    username:string;
    password:string;
    serverType:string;

}