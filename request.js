const url= require("url");
var request=(req,con,res)=>{
      var q= url.parse(req.url,true).query;
      var msg=""; 
      var que= "Insert into conversation(user_1, user_2,time,status) values("+q.user1+","+q.user2+",'"+q.time+"','"+q.status+"')";
      console.log(que);
      con.query(que,function(err,result)
	  {
		if (err) throw err;
		else
		{
			msg= {msg: 'Sent'};
		}
		res.json(msg);
	  });

};
module.exports.request = request;