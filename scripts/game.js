import { Deck } from "./deck";

export class Game {
    constructor({ players }) {
        this._deck = new Deck({ isGameDeck: true });
        this._players = players;

        // TODOS:
        // - integrate prepareCards inside constructor
        // - integrate giveCards to Player class
        // - Use import / export instead of module.exports
    }

    get deck() {
        return this._deck;
    }

    get players() {
        return this._players;
    }

    prepareCards = function () {
        this._deck.cards
        card.DK.count = this._players.length;
        cards.BOMB.count = playerCount-1;
        Object.values(cards).forEach( function(card, i){
            for(var j=0 ; j<card.count ; j++){
                this.gameDeck.push({ id: card.id, name: card.name, effect: card.effect });
            }
        })
        return gameDeck;
    }

    giveCards = function (clients, cards){
        clients.forEach(client => {
            client.player.hand = [];
            var diffuseKit = cards.find( (card) => card.id === "DK" )
            var diffuseKitIndex = cards.findIndex( (card) => card.id === "DK" )
            if(diffuseKitIndex !== -1){
                client.player.hand.push(diffuseKit)
                cards.splice(diffuseKitIndex, 1)
            }

            while(client.player.hand.length < 7){
                // console.log(client.player.username + " reçois une carte")
                let cardToGive = cards.find( (card) => card.id !== 'BOMB' && card.id !== 'DK' ),
                    cardToGiveIndex = cards.findIndex( (card) =>  card.id == cardToGive.id )

                client.player.hand.push(cardToGive)
                cards.splice(cardToGiveIndex, 1)
            }
            // console.log("Distribution terminée pour " + client.player.username);
            console.log(client.player.hand)
        });
        console.log(cards)
    }
}

let gameDeck = []

let cards =

function
function

module.exports = { prepareCards, giveCards }

