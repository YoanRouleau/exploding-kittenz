let express = require("express")
let socketio = require("socket.io")
let http = require("http")

let explodingKittenz = require("./js/game");

let cards = explodingKittenz.prepareCards(4);
// console.log(cards);

let app = express()
let server = http.Server(app)
let io = socketio(server)

let game = {
    players: [],
    test: "oui"
}

app.use("/js", express.static( __dirname + '/js' ))

app.get("/", function(req, res){
    res.sendFile(__dirname + '/index.html');
})

io.on("connection", function(socket){
    socket.on("disconnect", function(){
        socket.disconnect(true)
        let index = game.players.indexOf(game.players.find(player => player.id == socket.id))
        // console.log(game.players.find(user => user.id = socket.id))
        // console.log(`User with ID "${socket.id}" at index "${ index }" disconnected.`)
        game.players.splice(index, 1);
        // console.log(game.players)
        io.emit('userdisconnected', socket.id, game.players)
    })
    
    socket.on('join', function(data){
        if(!game.players.includes(data)) game.players.push(data)
        io.sockets.emit("joined", game.players)
    })

    socket.on("startGame", function(){
        if(game.players.length) {
            // game.players.forEach(element => {
            //     console.log(element)
            // });

            explodingKittenz.giveCards(game.players, shuffle(cards))
        }
    })
})


function shuffle(sourceArray) {
    for (var i = 0; i < sourceArray.length - 1; i++) {
        var j = i + Math.floor(Math.random() * (sourceArray.length - i));

        var temp = sourceArray[j];
        sourceArray[j] = sourceArray[i];
        sourceArray[i] = temp;
    }
    return sourceArray;
}



server.listen(81)