const url = require('url');

var login = (req,con,res) => {
    var q= url.parse(req.url,true).query;
    var msg ="";

    console.log("Connected");
    
    con.query("Select * from users where uemail='"+ q.email+"' and upass='"+q.pass+"';",function(err,rows,fields)
    
    {
     if(err) throw err;
     else
     {
        if(rows.length>0)
             msg= {msg:'Thanks,login info is correct'}
         else
             msg= {msg:'Wrong credentials'}

         res.json(msg);
     }
    
});
};

module.exports.login = login;



