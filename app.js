'use strict'

const	express = require('express'),
		cors = require('cors'),
		bodyParser = require('body-parser'),
		errorhandler = require('errorhandler'),
		request = require('request'),
		dotenv = require('dotenv');

const isProduction = process.env.NODE_ENV === 'production';



// create global express object 
const app = express();

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({ path: '.env' });

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

if (!isProduction) {
  app.use(errorhandler());
}


// Defined get data(index or listing) route
app.get('/', function (req, res, next) {
  res.send(next());
});

app.get('/api/explore', (req, res) => {
	
	console.log(req.query);
	request({
	  url: process.env.FOURSQUARE_URL+'venues/explore',
	  method: 'GET',
	  qs: {
	    client_id: process.env.CLIENT_ID,
	    client_secret: process.env.CLIENT_SECRET,
	    near: req.query.location,
	    query: req.query.search,
	    radius:	process.env.RADIUS,
	    limit: 1,
	    v: process.env.VERSION
	  }
	}, function(err, response, body) {
	  if (err) {
	    res.send(err);
	  } else {
	    res.send(JSON.parse(body));
	  }
	});

})

app.get('/api/search', (req, res) => {
	
	
	request({
	  url: process.env.FOURSQUARE_URL+'venues/search',
	  method: 'GET',
	  qs: {
	    client_id: process.env.CLIENT_ID,
	    client_secret: process.env.CLIENT_SECRET,
	    near: req.query.location,
	    query: req.query.search,
	    radius:	process.env.RADIUS,
	    limit: 10,
	    v: process.env.VERSION
	  }
	}, function(err, response, body) {
	  if (err) {
	    res.send(err);
	  } else {
	    res.send(JSON.parse(body));
	  }
	});

})


// finally, let's start our server...
var server = app.listen( process.env.PORT || 3000, function(){
  console.log('Listening on port ' + server.address().port);
});