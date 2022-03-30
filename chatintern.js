const express = require("express");
const serverStatic = require("serve-static");
const WebSocket = require("ws");

var app = express();
app.use(serverStatic("clientHome", {"index": ["index.html"]}));
app.listen(80);

const wss = new WebSocket.Server({ port: 8080 });

var addressList = [];

wss.on("connection", function connection(ws){


    let obj_addr = {
        "addr": ws._socket.address(),
        "ws": ws
    };
    addressList.push(obj_addr);

    ws.send("Client Connected");



    ws.on("message", function incomping(message){
        // data deal
        if (message !== undefined) {

            console.log(message);

            for (let i = 0; i < addressList.length; i++) {
                const obj = addressList[i];
                if (obj.addr !== ws._socket.address()) 
                {
                    ws.send(message);   
                }
                
            }

        }
    });


});
