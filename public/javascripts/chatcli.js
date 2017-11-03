var socket = io();

function sendMessage(){
    socket.emit('new_message', document.getElementById('chatmsg').value);
}

socket.on('message', function(msg){
    var pp = document.createElement('p');
    pp.innerHTML = msg;
    document.getElementById("chatview").appendChild(pp);
    document.getElementById("chatmsg").value = "";
});

socket.on('add_client', function(msg){
    var pp = document.createElement('p');
    pp.innerHTML = msg;
    document.getElementById("chatview").appendChild(pp);
});

socket.on('remove_client', function(msg){
    var pp = document.createElement('p');
    pp.innerHTML = msg;
    document.getElementById("chatview").appendChild(pp);
});