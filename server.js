let express = require("express")
let socketio = require("socket.io")
let http = require("http")

let explodingKittenz = require("./js/game");

let app = express()
let server = http.Server(app)
let io = socketio(server)

let game = {
    cards: [],
    players: [],
}

app.use("/js", express.static( __dirname + '/js' ))

app.get("/", function(req, res){
    res.sendFile(__dirname + '/index.html');
})

io.on("connection", function(socket){
    socket.on("disconnect", function(){
        socket.disconnect(true)
        let index = game.players.indexOf(game.players.find(player => player.id == socket.id))
        game.players.splice(index, 1);
        io.emit('userdisconnected', socket.id, game.players)
    })
    
    socket.on('join', function(data){
        console.log(data)
        if(!game.players.includes(data)) game.players.push(data)
        io.sockets.emit("joined", game.players)
    })

    socket.on("startGame", function(){
        if(game.players.length) {
            game.cards = explodingKittenz.prepareCards(game.players.length);
            explodingKittenz.giveCards(game.players, shuffle(game.cards))
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