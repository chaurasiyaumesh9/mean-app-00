var express = require('express');
var app = express();
var sql = require('mysql');

var connection = sql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'classicmodels'
});
connection.connect(function(err){
	if (!err)
	{
		console.log('DB connected successfully!');
	}else{
		console.log('Error connecting DB...');
	}
});

app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.set('view engine','ejs');


app.get('/',function(request, response){
	response.render('index',{title:"Hello IIN!", message:"This is a hello message from IIN!"});
});

app.get('/customers',function(request, response){
	fetchCustomers(request, response);
});

function fetchCustomers(req, res){

	connection.query('select * from customers',function(err, rows, fields){
		connection.end();
		if (!err)
		{
			//console.log('Got the result..listing now...',rows);
			res.render('customers',{list: rows});
		}else{
			console.log('Error while performing the query..');
		}
	});
	
}

app.listen(3030);