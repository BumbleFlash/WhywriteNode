var uid1,uid2;
var request=(con,user1,user2,time,socket)=>{
      
      var msg="";
     
       con.query("Select uid from users where uname='"+user1+"'",function(err,rows,field)

      	{
           uid1= rows[0].uid;
           console.log(uid1);
       });
      con.query("Select uid from users where uname='"+user2+"'",function(err,rows,field)

      	{
           uid2= rows[0].uid;
           console.log(uid2);
           console.log("Insert into conversation(user_1,user_2,time,status,chat_status) values("+uid1+","+uid2+",'"+time+"','sent','yes')");
           // console.log("Insert into conversation(user_1,user_2,time,status) values("+uid1+","+uid2+",'"+time+"','sent')");
           con.query("Insert into conversation(user_1,user_2,time,status,chat_status) values("+uid1+","+uid2+",'"+time+"','sent','yes')",function(err,result)
	       { 	
		        if (err) throw err;
		        else
		    {
			msg= {msg:'Sent'}
			socket.emit("response_sent", JSON.stringify(msg));

		    }
	      });
      	});
     

};
module.exports.request = request; 