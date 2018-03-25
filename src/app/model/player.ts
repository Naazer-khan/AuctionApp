export class    Player {
  log(): any {
    console.log(JSON.stringify(this));
   } 
    static counter: any = 0;
    static getNextId(): any {
        return this.counter;    
    }


     $key : string;
     pid?: number;
     tid?: number;
     name: string;
     batting?: string;
     bowling?: string;
     role?: string = "";
     run?: number;
     wicket?: number;
     isSold: boolean;
     biddingAmount:number;
}