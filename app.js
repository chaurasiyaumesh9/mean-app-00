var express = require('express');
var app = express();
var sql = require('mysql');

var pool = sql.createPool({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'classicmodels'
});

/*connection.connect(function(err){
	if (!err)
	{
		console.log('DB connected successfully!');
	}else{
		console.log('Error connecting DB...');
	}
});*/

app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.set('view engine','ejs');


app.get('/',function(request, response){
	response.render('index',{title:"Hello IIN!", message:"This is a hello message from IIN!"});
});

app.get('/customers',function(request, response){
	fetchCustomers(request, response);
});

app.get('/customer/:id', function(request, response){
 	fetchCustomerById( request, response)
});


function fetchCustomers(req, res){
	pool.getConnection( function(err, conn){
		conn.query("select * from customers", function(err, rows) {
             if (!err)
			{
				res.render('customers',{list: rows});
			}else{
				console.log('Error while performing the query..check function fetchCustomers() for more details..');
			}
         })
	});
}

function fetchCustomerById(req, res){
	if ( req.params.id ){
		pool.getConnection( function(err, conn){
			conn.query('select * from customers where customerNumber="' + req.params.id +'"', function(err, row) {
				 if (!err)
				{
					//res.send( row[0] ); 
					res.render('customer',{ row: row[0]}); //getting only one records for specific id. thus accessing it via 0th index.
				}else{
					console.log('Error while performing the query..check function fetchCustomerById() for more details..');
				}
			 })
		});
	}
	
}

app.listen(3030);

//connection.end();