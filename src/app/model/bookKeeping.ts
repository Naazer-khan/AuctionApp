export class BookKeeping {
    static counter: number = 1;
    playerId: number;
    teamId: number;
    playerSoldAt: number;
    time: string;
    static getNextId(): any {
        return this.counter++;    
    }
}