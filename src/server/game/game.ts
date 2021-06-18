
type Player = any

export class Game {

    private players : Record<string, Player> = {}

    addPlayer = (name : string) => this.playerExists(name)
        ? false
        : (this.players[name] = this.createNewPlayer(name), true)
    
    private playerExists = (name : string) => name in this.players
    private createNewPlayer(name : string) { return `I am ${name}` }
    // playerExists(name : string) { return name in this.players }
}