define(['angularAMD'], function (angularAMD) {
	var App = angular.module('uploader', []).controller('dropFile', ['$scope', function($scope) {
		$scope.handleDrop = function(e) {
			(e && e.preventDefault) && e.preventDefault();
			$scope.$apply(function(){ $scope.state = 'converting'; })
			var dt = e.dataTransfer;
			var files = dt.files;
			for (var i=0; i < files.length; i++) {
				var reader = new FileReader();
				var file = files[i];
				reader.onloadend = ( function(file) {
					return function(data) {
						$scope.fileLoadEnd(data, file)
					};
				})(files[i]);
				reader.readAsArrayBuffer(files[i]);
			}
			$scope.$apply(function(){ $scope.state = 'loading'; });
		};
		$scope.handleDragOver = function(e) {
			(e && e.preventDefault) && e.preventDefault();
			$scope.$apply(function(){ $scope.state = 'dragging'; })
		};
		$scope.handleDragLeave = function(e) {
			(e && e.preventDefault) && e.preventDefault();
			$scope.$apply(function(){ $scope.state = ''; })
		};
		$scope.fileLoadEnd = function(data, file){
			var xmlhttp=new XMLHttpRequest();
			xmlhttp.open("POST","http://ec2-54-69-52-7.us-west-2.compute.amazonaws.com");
			xmlhttp.send(data.target.result);
			xmlhttp.onreadystatechange=function() {
				if (xmlhttp.readyState==4 && xmlhttp.status==200){
					$scope.$apply(function(){ $scope.state = ''; });
					$scope.addSpec(xmlhttp.responseText, file);
				}
			}
		}
		$scope.addSpec = function(result, file){
			var specId = 'spec' + (new Date).getTime();
			console.log('font----------> ' + file.name)
			var data = JSON.parse( result );
			var sheet = (function() {
				var style = document.createElement("style");
				style.appendChild(document.createTextNode(""));
				style.id = specId;
				document.head.appendChild(style);
				return style.sheet;
			})();
			data.forEach(function(i){
				var format;
				for(var k in i) format = k ;
				console.log(format);
				if(format == 'otf') return;
				var fontSet = [];
				i[format].forEach(function(j){
					var fontId = 'f' + (new Date).getTime() + Math.floor(Math.random() * 1000000);
					sheet.insertRule('@font-face { font-family:"' + fontId + '"; src:url("' + j + '"); }', 0);
					fontSet.push('"'+fontId+'"');
				});
				console.log(fontSet.join());
				sheet.insertRule('#' + specId + ' { font-family:"' + fontSet.join() + '"; }', 1);
			});
			


			$scope.$apply(function(){
				$scope.specs.push({
					text: file.name,
					id : specId
				})
			});
		} 
		$scope.state = '';
		$scope.specs = [];
	}]);
	App.directive('droppable', function () {
		return {
			restrict: 'A',
			link: function (scope, element, attrs) {
				element[0].addEventListener('drop', scope.handleDrop, false);
				element[0].addEventListener('dragover', scope.handleDragOver, false);
				element[0].addEventListener('dragleave', scope.handleDragLeave, false);
			}
		}
	});
	return angularAMD.bootstrap(App);
});