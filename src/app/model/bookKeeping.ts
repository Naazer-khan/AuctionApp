export class BookKeeping {
    static counter: number = 1;
    playerId: number;
    playerName?:string;
    teamName?:string;
    teamId: number;
    playerSoldAt: number;
    time: string;
    $key : string;
    deleted?: boolean;
    static getNextId(): any {
        return this.counter++;    
    }
}