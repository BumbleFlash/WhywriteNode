var getuid=function(con,user,uid)
{
	var uid;
    con.query("Select uid from users where uname='"+user"'",function(err,rows,field)  

      	{
           uid= rows[0].uid;
           console.log(uid);
      	});
}
module.exports.getuid= getuid;