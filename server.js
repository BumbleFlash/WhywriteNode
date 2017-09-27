var express = require('express');
var app = express();
var http= require("http").Server(http);
var io= require("socket.io")(http);
var url= require("url");
var mysql= require("mysql");
var bodyparser=require("body-parser");
const login = require('./login');
const display= require('./display');
const getRoom= require('./getRoom');
const signup= require('./signup');
const getList=require('./getList');
const createroomid=require('./createroomid');
var i=1;
var q;
app.use(bodyparser.json());
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "reyap",
  password: "pammas"
});
app.get("/",function(req,res)

	{
		res.send("You're Connected");
	});
app.post("/signup",function(req,res)
    {
    	console.log(req.body);
         signup.signup(req.body,con,res);
    });
app.post("/createroomid",function(req,res)
    {
         createroomid.createroomid(req.body,con,res);
    });
app.get("/getList",function(req,res)
    {
    	 q= url.parse(req.url,true).query;
         getList.getList(q,con,res);
    });
app.get("/display",function(req,res)
    {
          q= url.parse(req.url,true).query;
          display.display(q,con,res);
    });
io.on("connection",function(socket)
	{
		
		i++;
		console.log("one user connected "+i);
		socket.on("sendusersforroom",function(user1,user2)   //sending two users for getting the room id
			{
                 getRoom.getRoom(socket,con,user1,user2);
			});
		socket.on("Username",function(user)
			{
         
			});
		
	
		socket.on("room",function(room)   // create a room between users
		{
                console.log(room);
                socket.room= room;
                socket.join(socket.room);
		});
		
		socket.on("Message",function(data)     // recieve the message and send it to the user
			{
				console.log(socket.room);
				var sockets= Object.keys(io.sockets.sockets);
				console.log(data);			
				socket.broadcast.to(socket.room).emit("message",{message:data});
				
			});
		socket.on("disconnect",function()     //status 
		{
			   console.log("user disconnected "+socket.sender);
		});
	});
app.listen(3000,function()
{
    console.log("Server listening");
});
http.listen(8000,function()
{
    console.log("sockets ready");
});




