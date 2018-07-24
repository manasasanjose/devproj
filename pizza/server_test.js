var http=require('http');
var express=require('express');
var parser=require('body-parser');
var server=express();
var cors = require('cors');
var mysql=require('mysql');
var store;
server.use(cors());
// Create application/x-www-form-urlencoded parser //default content-type with data beigb sent as name value pair
//server.use(parser.json()); 
//var urlencodedParser = parser.urlencoded({ extended: true }); //the value is a strign or array 
server.use(parser.urlencoded({
  extended: false
}));
server.use(parser.json());
//body parser is  a node js  framework which is to be installed with the express to handle JSON and raw data.

server.post('/request',function(req,res){
	console.log("Server started");
	//response=req.body.firstname;
	console.log(req.body);
	store=JSON.stringify(req.body.toppings);
	store=store.replace(/"/g,'');
	store=store.substring(1,store.length-1);
	var object={crust:req.body.crust,cheese:req.body.cheese,sauces:req.body.sauces,toppings:store};
	//store=JSON.stringify(req.body);
	console.log(store);
	var connection=mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'broadband',
	database: 'cmpe280'
});
connection.connect();
var query=connection.query('insert into pizza_work SET ?',object,function(err,result){
	 if(err){
            console.log("Error" + err);
            res.writeHead(500, {'Content-Type': "application/json"});
            res.end(JSON.stringify({response:error}));
        }
        else{
             res.writeHead(200, {'Content-Type': "application/json"});
             res.end(JSON.stringify({response:'Saved to MySQL'}));
        }  
}); // ? is a place holder , instead of assignign each and every value ,function is a call backfunction which stores the result
console.log(query.sql);

//console.log(req.body);
 

});
server.get('/request',function(req,res){
	console.log("This is get request");
	var connection=mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'broadband',
	database: 'cmpe280'
});
connection.connect();
var query=connection.query('select * from pizza_work',function(err,result){
	 if(err){
            console.log("Error" + err);
            
        }
        else{
             console.log(JSON.stringify(result));
			 var result_val=JSON.stringify(result);
			  res.writeHead(200, {'Content-Type': "application/json"});
             res.end(JSON.stringify({response:result_val}));
        }  
}); // ? is a place holder , instead of assignign each and every value ,function is a call backfunction which stores the result
});
server.listen(8000);