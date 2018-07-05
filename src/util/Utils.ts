import * as child from 'child_process'

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
        console.log(command);
        child.exec(command, (error, stdout) => {
            if (error) {
                console.log(error);
                process.exit(1);
            }

            if (stdout) {
                console.log(stdout);
            }
        });
    }
}