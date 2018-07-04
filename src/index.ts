import {ConfigDetails, ConfigService} from "./service/ConfigService";

export class Main {
    private readonly params: string[];

    constructor(params: string[]) {
        this.params = params;
    }

    public start(): void {
        if (this.params.length == 0) {
            return;
        }
        const configService = new ConfigService();

        if (this.params[0] === 'init') {
            configService.init();
            return;
        }

        let config:ConfigDetails;
        config = configService.loadConfigs();

        console.log(JSON.stringify(config));
    }
}

let main = new Main(process.argv.slice(2));
main.start();
