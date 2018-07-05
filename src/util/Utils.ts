import * as child from 'child_process'
import {FileDetails} from "../service/FileService";

export class Utils {
    public static changeDirectory(path:string):void {
        if (path) {
            try {
                process.chdir(path);
            } catch (err) {
                console.log('chdir: ' + path + ' \n' + err);
                process.exit();
            }
        }
    }

    public static runGitCommand(command:string):void {
        child.exec(command, (error, stdout) => {
            if (error) {
                console.log(error);
            }

            if (stdout) {
                console.log(stdout);
            }
        });
    }

    public static generateMap(fileDetails: FileDetails[], key:string):{[key:string]: FileDetails[]} {
        let map:{[key:string]: FileDetails[]} = {};
        fileDetails.forEach(file => {
            let anies = map[file[key]] || [];
            anies.push(file);
            map[file[key]] = anies;
        });

        return map;
    }
}