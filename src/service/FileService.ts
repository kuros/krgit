import {readdirSync, statSync} from "fs";
import {ConfigDetails} from "./ConfigService";

export class FileService {

    public getGitDirectories(config: ConfigDetails): FileDetails[] {
        const path = config.cwd;
        const files: string[] = [];
        this.loadFiles(path, files);

        let fileDetails: FileDetails[] = [];
        files.forEach(file => {
            let split: string[] = file.split("/");
            let length = split.length;
            let key: string;
            if (length >= 2) {
                key = split[length - 2];
            } else {
                key = 'root'
            }

            let detail: FileDetails = {
                path: file,
                project: split[length - 1],
                parent: key
            };

            fileDetails.push(detail);
        });

        return fileDetails;
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

export interface FileDetails {
    path: string;
    project: string;
    parent: string;
}