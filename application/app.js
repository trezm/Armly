var fs = require( 'fs' );
var express = require( 'express' );
var errors = require( './errors.js' );
var currentProductionMode = process.env.MODE || "test";
var databaseUrl = currentProductionMode;
var collections = ["army_lists"];
var db = require("mongojs").connect(databaseUrl, collections);
var headers = ['header.html'];
var app = express();
app.use( express.bodyParser() );

console.log( "Starting server in production mode: " + currentProductionMode );
if ( !db ) {
	console.log( "WARNING: Could not connect to mongodb server." );
}

// Begin setting up the routes
app.get( '/', function( req, res ) {
	console.log( "Home page requested!" );

	res.writeHeader( 200, { 'Content-type':'text/html' } );
	res.write('ArmlyServer is currently under construction.  Check back soon!' );

	// var fullHTML = "";
	// // Write header files
	// fs.readFile('/html/header.html', 'utf8', function (err,data) {
 //  		if (err) {
 //  			res.statusCode = 400;
 //    		return res.send( "Error 400: An error occured loading the header file." );
 //  		}

 //  		fullHTML += data;
	// });

	// // Write main index
	// fs.readFile('/html/test_maker.html', 'utf8', function (err,data) {
 //  		if (err) {
 //  			res.statusCode = 400;
 //    		return res.send( "Error 400: An error occured loading the index file." );
 //  		}

 //  		fullHTML += data;
	// });

	// res.write( fullHTML );
	res.end();  
});

app.post( '/armylist', function( req, res ) {
	console.log( "Army list posted." );
	// console.log( req.body );

	if ( !req.body.hasOwnProperty( 'list' ) ||
	     !req.body.hasOwnProperty( 'user' ) ) {

		res.statusCode = 400;
	    return res.send('Error 400: Post syntax incorrect.');
	}

	db.army_lists.update( {user:req.body.user}, {$push: {lists:req.body.list}}, {upsert:true}, function(err, updated) {
		if ( err || !updated ) {
			console.log( "ERROR: Could not update list!\n\t" + err );
		}
	});

	db.army_lists.find( {user:req.body.user}, function( err, res ) {
		console.log( "Results:" );

		if ( res ) {
			console.log( res[ 0 ] );
		}
	});

	return res.json( {"response":"success"} );
});

app.get( '/armylist/:user_id/:list_name', function( req, res ) {
	console.log( "List request received." );

	if ( !req.params.user_id || !req.params.list_name ) {
		res.statusCode = 400;
		return res.send( "Error 400: Bad get request." );
	}

	db.army_lists.find( {user:req.params.user_id}, function( err, results ) {
			if ( results != undefined && results.length > 0 ) {
				console.log( "Found user... Now searching for list" );

				var list = [];
				for ( var i = 0; i < results[ 0 ].lists.length; i++ ) {
					var dict = results[ 0 ].lists[ i ];

					if ( dict.list_name == req.params.list_name ) {
						list.push( dict );
					}
				}

				return res.json( {"response":"success", "results":list} );
			}  else if ( results == undefined ) {
				console.log( "WARNING: Could not connect to mongodb server when trying to execute get request." );
				return res.json( {"error":errors.ERRORS.E2001, "results":[]} );
			}

			return res.json( {"error":errors.ERRORS.E1001, "results":[]} );
		}
	);
});

// Javascript calls
app.get( '/javascript/:javascript_file', function( req, res ) {
	if ( !req.params.javascript_file ) {
		res.statusCode = 400;
		return res.send( "Error 400: Bad get request." );
	}
	console.log( "Requested javascript file: " + req.params.javascript_file );	

	fs.readFile( "html/javascript/" + req.params.javascript_file, 'utf8', function( err, data ) {
		if ( err ) {
			console.log( "WARNING: Couldn't read javascript file." );
		} else {
			res.writeHeader( 200, { 'Content-type':'text/javascript' } );
			res.write( data );
			res.send();
		}
	});
});

// CSS calls
app.get( '/css/:css_file', function( req, res ) {
	if ( !req.params.css_file ) {
		res.statusCode = 400;
		return res.send( "Error 400: Bad get request." );
	}
	console.log( "Requested css file: " + req.params.css_file );

	fs.readFile( "html/css/" + req.params.css_file, 'utf8', function( err, data ) {
		if ( err ) {
			console.log( "WARNING: Couldn't read css file: " + err );
		} else {
			res.writeHeader( 200, { 'Content-type':'text/css' } );
			res.write( data );
			res.send();
		}
	});
});

app.get( '/:page_name', function( req, res ) {
	console.log( "Requested page, headers: " + headers );

	if ( !req.params.page_name ) {
		res.statusCode = 400;
		return res.send( "Error 400: Bad get request." );
	}

	// Load up header files
	var headerCount = headers.length;
	var currentPage = "";
	for ( var i = 0; i < headers.length; i++ ) {
		fs.readFile( "html/" + headers[ i ], 'utf8', function( err, data ) {
			if ( err ) {
				console.log( "WARNING: Couldn't read header file." );
			} else {
				headerCount--;

				currentPage += data;
				if ( headerCount == 0 ) {
					getFile( req.params.page_name, currentPage, res );
				}
			}
		});
	}
});

var start = "<!DOCTYPE html><meta charset=\"UTF-8\"><html>";
var end = "</html>";

function getFile( fileName, headerString, res ) {
	fs.readFile( "html/" + fileName, 'utf8', function( err, data ) {
		if ( err ) {
			// do something error-y
		} else {
			res.writeHeader( 200, { 'Content-type':'text/html' } );
			res.write( start + headerString + "<body>" + data + "</body>" + end );
			res.send();
		}
	});
}

app.listen(process.env.PORT || 4730);



