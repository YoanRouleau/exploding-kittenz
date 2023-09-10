import {Game} from "./game";

export class Lobby {
    constructor() {
        this.players = [];
    }

    join({ player }) {
        this.players.push({ player });
    }

    quit({ playerId }) {
        const player = this.players.find(player => player.id === playerId);
        const playerPosition = this.players.indexOf(player);
        this.players.splice(playerPosition, 1);
    }

    startGame() {
        return new Game({ players: this.players });
    }
}
