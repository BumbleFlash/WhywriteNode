var signup=(data,con,res)=>{
      var msg="";
      con.query("Insert into users(uname,uemail,upass) values('"+data.uname+"','"+data.uemail+"','"+data.upass+"')",function(err,result){
      	if (err) throw err;
      	else{
      		msg= {msg:'Done'}
      	}
      	res.json(msg);

      });
      };
module.exports.signup=signup;