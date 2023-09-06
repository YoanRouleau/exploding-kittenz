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
        count: 5
    },
    STF: {
        id: "STF",
        name: "Divination",
        effect: "Consulte les 3 prochaines cartes de la pioche",
        count: 5
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

function giveCards(clients, cards){
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

module.exports = { prepareCards, giveCards }

