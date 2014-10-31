// ┌────────────────────────────────────────────────────────────────────┐
// | Filename: main.js
// └────────────────────────────────────────────────────────────────────┘

// ┌────────────────────────────────────────────────────────────────────┐
// | Require modules
// └────────────────────────────────────────────────────────────────────┘
var express = require("express");
var stylus = require('stylus');
var nib = require('nib');
var fs = require('fs');

// ┌────────────────────────────────────────────────────────────────────┐
// | Initialize vars + constants
// └────────────────────────────────────────────────────────────────────┘
var app = express();
var port = Number(process.env.PORT || 5000);

// ┌────────────────────────────────────────────────────────────────────┐
// | App setup
// └────────────────────────────────────────────────────────────────────┘
app.set('views', __dirname + '/views'); 
app.set('view engine', 'jade');
app.use(
	stylus.middleware({
		src: __dirname + '/public',
		compile: function(str, path) { return stylus(str).set('filename', path).use(nib()); }
	})
);

app.use(express.static(__dirname + '/public'));

// ┌────────────────────────────────────────────────────────────────────┐
// | Routes
// └────────────────────────────────────────────────────────────────────┘

app.get('/data', function(req, res){
	var fontPartial = fs.readFileSync('views/partials/font_partial.js', 'utf8');
	var weightPartial = fs.readFileSync('views/partials/weight_partial.js', 'utf8');
	var fonts = JSON.parse(fs.readFileSync('public/data.json', 'utf8'));
	var data = {
		fontPartial : fontPartial,
		weightPartial : weightPartial,
		fonts : fonts
	}
	res.send(data)
});
app.get('/single/:font', function(req, res){
	var css = JSON.parse(fs.readFileSync('public/fonts/' + req.param('font') + '.json', 'utf8'));
	res.send(css);
});
app.get('/', function(req, res){
	res.render('index');
});
app.get('/converter', function(req, res){
	res.render('converter');
});

// ┌────────────────────────────────────────────────────────────────────┐
// | Init!!
// └────────────────────────────────────────────────────────────────────┘
app.listen(port, function() {
	console.log('\n─────> Listening on port: ' + port);
});