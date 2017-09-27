var display= (q,con,res)=>{
   var msg ="";
   var rows="";
   con.query("Select uname from users where uname != '"+q.user+"'",function(err,row,fields)
   {
       if (err) throw err;
       else
       {
       	
       	res.json(row);
       }
   });
};
module.exports.display= display;