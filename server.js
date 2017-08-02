var express = require('express');
// var morgan = require('morgan');
var app = express();
var http= require("http").Server(app);
var io= require("socket.io")(http);
var url= require("url");
var mysql= require("mysql");
const login = require('./login');
const request= require('./request');
const display= require('./display');
var i=1;
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

io.on("connection",function(socket)
	{
		
		socket.on("new user",function(data)               
			{
				console.log(data);	
				socket.sender= data;
			});
		i++;
		console.log("one user connected "+i);
		socket.on("send",function(user)
		{
                 var rows;
                 console.log(user);
                 display.display(con,user,socket);
                 
		});
		socket.on("recipient",function(room)
		{
                console.log(room);
                socket.room= room;
                socket.join(socket.room);

		});
		
		socket.on("Message",function(data)
			{
				console.log(socket.room);
				var sockets= Object.keys(io.sockets.sockets);				
				socket.broadcast.to(socket.room).emit("message",{message:data});
				
			});
		socket.on("disconnect",function()
		{
			   console.log("user disconnected "+socket.sender);
		});
	});
http.listen(3000,function()
{
    console.log("Server listening");
});



// // app.use(morgan('combined'));
// app.get('/login', function(req,res)
// {
// 	login.login(req,con,res);
	
// });
// app.get('/signup',function(req,res)
// 	{
// 		var q= url.parse(req.url,true).query;
// 		var msg="";
// 		console.log("Connected");
// 		con.query("Insert into users(uregno,uemail,uname,upass) values("+q.regno+",'"+q.email+"','"+q.name+"','"+q.pass+"')", function(err,result)
// 			{
// 				if(err) throw err;
// 				else
// 				{
// 					console.log("Inserted");
// 					msg={msg: 'Sign up Successful'}
// 				}
// 				res.json(msg);
// 			});
// 	});
// app.get('/send',function(req,res)
//     { 
//       var q= url.parse(req.url,true).query;
//       var msg="";
//       console.log('Connected');
//       console.log("Insert into conversation_reply(message,user_id,time,status,c_id) values('"+q.message+"',"+q.uid+","+q.time+"',"+q.status+"',"+q.c_id+")");
//       con.query("Insert into conversation_reply(message,user_id,time,status,c_id) values('"+q.message+"',"+q.uid+",'"+q.time+"','"+q.status+"',"+q.c_id+")",function(err,result)
//       	{
//       		if(err) throw err;
//       		else
//       		{
//       			console.log("Inserted");
//       			msg={msg:"Sent"}

//       		}
//       		res.json(msg);
//       	});

//    });
// app.get("/show",function(req,res)
// 	{
// 		//var q= url.parse(req.url,true).query;
// 		con.query("Select uname from users", function(err,rows,fields)
// 			{
// 				if(err) throw err;
// 				else
// 					res.json(rows);
// 			});
// 	});
// app.get("/request",function(req,res)
// 	{
//       request.request(req,con,res); 
// 	});
// app.get("/getMessage", function(req,res)
// 	{
		
// 	});

// app.get('/', (req,res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
//})

// app.use(express.static('public'));


