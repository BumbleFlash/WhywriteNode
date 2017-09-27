var createroomid=(data,con,res)=>{
	console.log(data);
	var user1= data.user1, user2=data.user2, msg="";
    //console.log("select c_id from conversation where user_1='"+user1+"'' and user_2='"+user2+"'' or user_1='"+user2+"'' and user_2='"+user1+"'"); 
	con.query("select c_id from conversation where user_1='"+user1+"' and user_2='"+user2+"' or user_1='"+user2+"' and user_2='"+user1+"'",function(err,rows,fields){
         
         if (err) throw err;
         else
         if(rows.length==0){
             con.query("Insert into conversation(user_1, user_2, time, chat_status) values('"+user1+"','"+user2+"','"+data.time+"','"+data.status+"')",function(err,result){
             	if(err) throw err;
             	else{
                   msg= {msg:'Done'}
                   res.json(msg);
               }
             });

         }
         else{
         	msg={msg:'Exists'}
         	res.json(msg);
         }
       	});

}
module.exports.createroomid=createroomid;