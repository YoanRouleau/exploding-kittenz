document.addEventListener("DOMContentLoaded", function(){
    
    const socket = io();

    let player = {}

    socket.on("connect", function(){
        player.id = socket.id
    })

    socket.on("joined", function(data){
        console.log(data)
        data.forEach(element => {
            if(!$('#'+ element.player.id).length) 
                $('#game--lobby').append(`<p id="${element.player.id}">${element.player.username}</p>`)
        });
    })

    socket.on('userdisconnected', function(userId, remainingPlayers){
        if($('#' + userId).length) 
            $('#' + userId).remove()
        console.log(remainingPlayers)
    })

    document.getElementById("game--gate").addEventListener('submit', function(e){
        e.preventDefault()
        let username = document.getElementById('username').value
        if(!username.length) return
        player.username = username
        player.isLeader = false
        player.isYourTurn = false
        player.cardsCount = 0
        socket.emit("join", {
            player
        })
    })

    $('#game--start').on("click", function(e){
        socket.emit("startGame");
    })


})