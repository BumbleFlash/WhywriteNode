var getRoom=(socket,con,user1,user2)=> {
	var cid="",c="",uid1="",uid2="";
    
           con.query("select c_id from conversation where user_1='"+user1+"' and user_2='"+user2+"' or user_1='"+user2+"' and user_2='"+user1+"'",function(err,rows,field)
           {
                if (err) throw err;
                cid=rows[0].c_id;
                console.log(cid);
                c= {cid: cid} 
                socket.emit("getRoom", JSON.stringify(c)); 
           });
       
  
    
        
}
module.exports.getRoom= getRoom;