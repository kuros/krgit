import {readdirSync, statSync} from "fs";
import {ConfigDetails} from "./ConfigService";

export class FileService {

    public getGitDirectories(config: ConfigDetails): Map<string, Array<string>> {
        const path = config.cwd;
        const files:string[] = [];
        this.loadFiles(path, files);
        return this.generateMap(files);
    }

    private generateMap(files: string[]) {
        let map: Map<string, Array<string>> = new Map<string, Array<string>>();
        files.forEach(file => {
            let split: string[] = file.split("/");
            let length = split.length;

            let key: string;
            if (length >= 2) {
                key = split[length - 2];
            } else {
                key = 'root'
            }

            let value: string = split[length - 1];
            let values: string[] = map.get(key) || [];
            values.push(value);
            map.set(key, values)
        });
        return map;
    }

    private loadFiles(path: string, files: string[]) {
        files = files || [];
        if (statSync(path).isDirectory()) {
            readdirSync(path).forEach(file => {
                if (file === '.git') {
                    files.push(path);
                    return;
                }
                this.loadFiles(path + "/" + file, files);
            });
        }
        return;
    }
}