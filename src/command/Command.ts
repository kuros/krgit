export interface Command {
    doesHandle():boolean;
    handle(command:string):void;
}