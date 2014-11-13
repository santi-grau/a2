<!doctype html>
<!-- ────────────────────────────────────────────────────────────────────
 __                            __                   __                   
/\ \__                        /\ \__               /\ \__                
\ \ ,_\  __  __  _____      __\ \ ,_\    __    ____\ \ ,_\    __   _ __  
 \ \ \/ /\ \/\ \/\ '__`\  /'__`\ \ \/  /'__`\ /',__\\ \ \/  /'__`\/\`'__\
  \ \ \_\ \ \_\ \ \ \L\ \/\  __/\ \ \_/\  __//\__, `\\ \ \_/\  __/\ \ \/ 
   \ \__\\/`____ \ \ ,__/\ \____\\ \__\ \____\/\____/ \ \__\ \____\\ \_\ 
    \/__/ `/___/> \ \ \/  \/____/ \/__/\/____/\/___/   \/__/\/____/ \/_/ 
             /\___/\ \_\                                                 
             \/__/  \/_/                                                 
 
─────────────────────────────── W/ ♥ C.M. ─────────────────────────────── -->
<html>
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<title>A2 Type Tester</title>
		<meta name="description" content="A2's typetester">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="stylesheet" id="mainStylesheet" href="css/main.css">
	</head>
	<body>
		<ul id="menu" class="clearfix">
			<li class="logo"><a href="http://www.a2-type.co.uk/"></a></li>
			<li class="about">
				<ul>
					<li class="first"><a href="http://www.a2-type.co.uk/html/about.html">News / About</a></li>
					<li><a href="http://www.a2-type.co.uk/html/contact.html">Contact</a></li>
				</ul>
			</li>
			<li class="fonts">
				<ul>
					<li class="first active"><a href="http://www.a2-type.co.uk/html/sans.html">Sans / Grotesque</a></li>
					<li><a href="http://www.a2-type.co.uk/html/serif.html">Serif + Slab Serif</a></li>
					<li><a href="http://www.a2-type.co.uk/html/script.html">Script / Handwriting</a></li>
					<li><a href="http://www.a2-type.co.uk/html/poster.html">Poster / Display</a></li>
					<li><a href="http://www.a2-type.co.uk/html/typewriter_index.html">Typewriter</a></li>
					<li><a href="http://www.a2-type.co.uk/html/angular.html">Angular</a></li>
					<li><a href="http://www.a2-type.co.uk/html/flowers-ornaments.html">Flowers / Ornaments / Borders</a></li>
					<li><a href="http://www.a2-type.co.uk/html/stencil.html">Stencil</a></li>
				</ul>
			</li>
			<li class="news">
				<ul>
					<li class="first"><a href="http://www.a2-type.co.uk/html/newsletter.html">Sign up for newsletter</a></li>
					<li><a href="http://www.a2-type.co.uk/html/webfonts.html">Web Fonts</a></li>
				</ul>
			</li>
			<li>
				<ul>
					<li class="first"><a href="http://www.a2-type.co.uk/html/technical.html">Technical information</a></li>
					<li><a href="http://www.a2-type.co.uk/html/commission.html">Commission type</a></li>
				</ul>
			</li>
			<li>
				<ul>
					<li><a href="http://www.a2-type.co.uk/html/viewcart.php">View Cart</a></li>
				</ul>
			</li>
		</ul>
		<div id="typetester">
			<ul id="toolbar" class="clearfix">
				<li id="fontSelector" class="dropdown"><a id="fontTitle" href="javascript:void(0)" data-defTitle="Select font">Select font</a>
					<ul id="fontList"></ul>
				</li>
				<li id="weightSelector" class="dropdown"><a id="weightTitle" href="javascript:void(0)" data-defTitle="Weight / Style">Weight / Style</a>
					<ul id="weightList"></ul>
				</li>
				<li id="sizeSelector" class="slider"><span>Size</span>
					<div data-attr="size" data-range="200" class="dragger"></div>
				</li>
				<li id="heightSelector" class="slider"><span>Line spacing</span>
					<div data-attr="height" data-range="200" class="dragger"></div>
				</li>
			</ul>
			<div id="content">
				<div id="dashes"></div>
				<div id="loadingFont">Loading font...</div>
				<div id="resizeAlert">Resizing...
					<div id="loaderBar"></div>
				</div>
				<div id="editor" class="loading"></div>
				<div id="options">
					<div id="colorCircle">
						<a id="outerCircle">
							<div id="colorZoom">
								<div class="inner"></div>
							</div>
						</a>
						<div id="centerCircle"></div>
					</div>
					<a id="buy" href="javascript:void(0)"></a><a id="invert" href="javascript:void(0)"></a>
				</div>
			</div>
			<p class="disclaimer">
				A2 Typetester is for testing the A2 Library fonts online only. You are not permitted to use any of the specimens you create in the A2 Typetester for commercial work; printed or digital, or in any way publish our fonts as part of your, or your clients design. All rights reserved © A2-TYPE
			</p>
		</div>
		<?php  if (strpos('http://'.$_SERVER['HTTP_HOST'].$_SERVER['PHP_SELF'],'a2.local') !== false) { ?>
			<script src="js/libs/requirejs/require.js" data-main="js/tester.js"></script>
		<?php }else{ ?>
			<script src="build/tester.js"></script>
		<?php } ?>
	</body>
</html>