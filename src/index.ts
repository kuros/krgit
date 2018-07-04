
export class Main {
  private params:string[];

    constructor(params:string[]) {
      this.params = params;
    }

    public start():void {
      console.log(this.params);
    }
}

let main = new Main(process.argv.slice(2));
main.start();
