import { Player } from "./player";

export class Team {
    log(): any {
        console.log( JSON.stringify(this));
    }
    static counter: any = 0;
    static getNextId(): any {
        return this.counter++;    
    }
    $key?: string;
    tid: number;
    name: string;
    imageUrl: string;
    numberOfPlayersBought: number;
    reservedAmount: number;
    nextBidMaxAmount: number;
    remainingAmount: number;
    playerIds: string;
    players? : Player[];
}