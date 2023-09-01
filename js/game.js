let gameDeck = []

let cards = {
    DK: {
        id: "DK",
        name: "Kit de désamorçage",
        effect: "Permet de désamorcer une bombe une fois piochée.",
        count: undefined
    },
    ST: {
        id: "ST",
        name: "Passe-tour",
        effect: "Sautez votre tour.",
        count: 5
    },
    NO: {
        id: "NO",
        name: "NON",
        effect: "Bloque une action.",
        count: 4
    },
    BOMB: {
        id: "BOMB",
        name: "Exploding Kittenz",
        effect: "Vous explosez, sauf si vous possédez un kit de désamorçage",
        count: undefined
    },
    ATCK: {
        id: "ATCK",
        name: "Attaque",
        effect: "Joue 2 tours au lieu d'un.",
        count: 4
    }
}

function prepareCards(playerCount) {
    cards.DK.count = playerCount
    cards.BOMB.count = playerCount-1
    Object.values(cards).forEach( function(card, i){
        for(var j=0 ; j<card.count ; j++){
            gameDeck.push({ id: card.id, name: card.name, effect: card.effect });
        }
    })
    return gameDeck;
}

function giveCards(players, cards){
    console.log(cards)
    players.forEach(player => {
        player['hand'] = [];
        var diffuseKit = cards.find( (card) => card.id === "DK" )
        var diffuseKitIndex = cards.findIndex( (card) => card.id === "DK" )
        console.log(diffuseKit)
        console.log(diffuseKitIndex)
        if(diffuseKitIndex !== -1){
            player.hand.push(diffuseKit)
            cards.splice(diffuseKitIndex, 1)
        }
        console.log(cards)
    });
    cards.forEach(card => {
        
    })
    // console.log(players)
}

module.exports = { prepareCards, giveCards }

