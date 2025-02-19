//https://csumb.zoom.us/rec/play/68V5frqoqD03HNTAtASDBKJ5W9S9LKysgSYfrvMLyhmxVnUCNAejMuREYeBkG5SoGSHiyQpLSx-glUiF?continueMode=true&_x_zm_rtaid=bgyNvHdYQPGgGXaOdx7SVg.1587335413095.d7a8ddea15a5dbff117ea58904a7dbfa&_x_zm_rhtaid=448
/* Require external APIs and start our application instance */
var express = require('express');
var mysql = require('mysql');
var app = express();

/* Configure our server to read public folder and ejs files */
app.use(express.static('public'));
app.set('view engine', 'ejs');

/* Configure MySQL DBMS */
const connection = mysql.createConnection({
    host: 'us-cdbr-iron-east-01.cleardb.net',
    user: 'b1d8198a140d36',
    password: 'e35bf3fc',
    database: 'heroku_03cbd9882ea9d18'
    
});
connection.connect();

/* The handler for the DEFAULT route */
app.get('/', function(req, res){
    res.render('home');
});

/* The handler for the /author route */
app.get('/results', function(req, res){
    var choice = req.query.choice;
    console.log(choice);
    var stmt;
    
    if(choice === "name"){
        stmt = 'select * from l9_quotes, l9_author where l9_quotes.authorId=l9_author.authorId and l9_author.firstName="' + req.query.inputt + '";';
    }
    else if(choice === "keyword"){
        stmt = 'select * from l9_quotes, l9_author where l9_quotes.authorId=l9_author.authorId and quote like' + '"%' + req.query.inputt + '%"' + ';';
    }
    else if(choice === "category"){
        stmt = 'select * from l9_quotes, l9_author where l9_quotes.authorId=l9_author.authorId and l9_author.category="' + req.query.inputt + '";';
    }
    else{
        stmt = 'select * from l9_quotes, l9_author where l9_quotes.authorId=l9_author.authorId and l9_author.sex="' + req.query.inputt + '";';
    }
    
	connection.query(stmt, function(error, found){
	    var author = null;
	    if(error) throw error;
	    if(found.length){
	        author = found;
	        res.render('results', {author: author});
	    }
	    else{
	        res.render('error');
	    }
	    
	});
});


/* The handler for undefined routes */

/* Start the application server */
const PORT = process.env.PORT || 3000;
app.listen(PORT, function(){
    console.log('Server is running on port ${PORT}.');
})