var display= (con,user,socket)=>{
   var msg ="";
   var rows="";
   con.query("Select uname from users where uname != '"+user+"'",function(err,res,fields)
   {
       if (err) throw err;
       else
       {
       	rows= {users: res}
       	console.log(JSON.stringify(rows));
       	socket.emit("getUsers", JSON.stringify(rows));
       }
   });
};
module.exports.display= display;