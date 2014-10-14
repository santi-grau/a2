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
var auth = require('basic-auth');

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
	var fonts = [];
	var defaultWeights = { regular : 'extrabold', antwerp : 'semibold', typewriter : 'regular' };
	var fontSettings = {
		regular : {
			defSize : 141,
			defHeight : 120
		},
		antwerp : {
			defSize : 141,
			defHeight : 120
		},
		typewriter : {
			defSize : 141,
			defHeight : 120
		}
	}
	var fontDirs = fs.readdirSync('public/fonts');
	fontDirs.forEach(function(font, index) {
		if (font.indexOf('.') !== 0){
			var fontWeights = fs.readdirSync('public/fonts/'+font);
			var weights = [];
			var fontname = font.replace(/_/g, " ").split(".")[0];
			fonts.push({
				name : fontname,
				weights : [],
				defContent : fs.readFileSync('defaults/' + fontname + '.json', 'utf8'),
				defSize : fontSettings[fontname].defSize,
				defHeight : fontSettings[fontname].defHeight
			});
			fontWeights.forEach(function(weight) {
				var hash = font + '-' + weight.replace(/_/g, "-").split(".")[0];
				var def = (defaultWeights[fonts[index-1].name] == weight.replace(/_/g, "-").split(".")[0]);
				if (weight.indexOf('.') !== 0){
					var w = {
						name : weight.replace(/_/g, " ").split(".")[0],
						hash : hash,
						file : 'public/fonts/' + font + '/' + weight,
						def : def
					}
					fonts[index-1].weights.push(w);
				}
			})
		}
	});
	var weight_partial = fs.readFileSync('partials/weight_partial.html', 'utf8');
	var data = {
		weight_partial : weight_partial,
		fonts : fonts,
		display : 'regular'
	}
	//var data = fs.readFileSync('data.json', 'utf8');
	res.send(data)
})

app.get('/', function(req, res){
	var credentials = auth(req)
	if (!credentials || credentials.name !== 'fonttester' || credentials.pass !== 'fonttester') {
		res.writeHead(401, {
			'WWW-Authenticate': 'Basic realm="example"'
		})
		res.end()
	} else {
		res.render('index');
	}
});

// ┌────────────────────────────────────────────────────────────────────┐
// | Init!!
// └────────────────────────────────────────────────────────────────────┘
app.listen(port, function() {
	console.log('\n─────> Listening on port: ' + port);
});