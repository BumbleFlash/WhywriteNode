var getList=(q,con,res)=>{
	var obj=[];
    con.query("Select user_2 from conversation where user_1='"+q.email+"'",function(err,rows,fields){
    	if (err) throw err;
    	if(rows.length>0){
             for(var i=0;i<rows.length;i++){
             	obj.push({name:rows[i].user_2,count:0});
             	console.log(1);

             }
              
    	}
    	
    	con.query("Select user_1 from conversation where user_2='"+q.email+"'",function(err,rows1,fields){
    		if (err) throw err;
    		else{
    	        for(var i=0;i<rows1.length;i++){
             	obj.push({name:rows1[i].user_1,count:0});
             }		
             console.log(2);
             console.log(obj);
    	     res.send(JSON.stringify(obj));

    		}
    	});
    	
    
    });
};
module.exports.getList=getList