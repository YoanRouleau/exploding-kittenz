import { Deck } from "./deck";

export class Player {
    constructor() {
        this._deck = new Deck();
    }

    get deck() {
        return this._deck;
    }
}
