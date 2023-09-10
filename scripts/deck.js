import cards from '../public/assets/cards.json';

/**
 * @typedef Card
 * @property {string} id        The card id
 * @property {string} name      The card name
 * @property {string} effect    What the card do
 */

export class Deck {

    /**
     * Create Deck
     *
     * @param {boolean} isDrawPile Check if a deck is for the game and not for players
     */
    constructor({ isDrawPile } = { isDrawPile: false }) {
        /**
         *
         * @type {Card[]}
         * @private
         */
        this._cards = [];
        if (isDrawPile) {
            this._cards = cards;
        }
    }
    get cards() {
        return this._cards;
    }

    get size() {
        return this._cards.length;
    }

    add(cardId) {
        if (typeof cardId !== "string") {
            throw new TypeError("Function add of Deck class needs type string for cardId.");
        }
        if (!Object.keys(cards).includes(cardId)) {
            throw new ReferenceError("Function add of Deck class needs a valid Card Id.");
        }
        this._cards.push(cardId);
    }
}

