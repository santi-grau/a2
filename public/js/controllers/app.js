define(['angularAMD'], function (angularAMD) {
	var App = angular.module('uploader', []).controller('dropFile', ['$scope', function($scope) {
		$scope.handleDrop = function(e) {
			(e && e.preventDefault) && e.preventDefault();
			$scope.$apply(function(){ $scope.state = 'converting'; })
			var dt = e.dataTransfer;
			var files = dt.files;
			for (var i=0; i < files.length; i++) {
				var reader = new FileReader();
				reader.addEventListener('loadend', $scope.fileLoadEnd, false);
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
		$scope.fileLoadEnd = function(data){
			console.log(data)
			var xmlhttp=new XMLHttpRequest();
			xmlhttp.open("POST","http://ec2-54-69-52-7.us-west-2.compute.amazonaws.com");
			//xmlhttp.open("POST","http://localhost:5000");
			xmlhttp.send(data.target.result);
			xmlhttp.onreadystatechange=function() {
				
				if (xmlhttp.readyState==4 && xmlhttp.status==200){
					console.log(xmlhttp)
					console.log('data received----------')
					console.log(xmlhttp.responseText);
					console.log('font----------')
					// var data = JSON.parse( xmlhttp.responseText );
					// console.log(data)
					setTimeout(function(){
						// $scope.$apply(function(){ $scope.state = ''; });
					}, 2000)
				}else if (xmlhttp.readyState==0 || xmlhttp.status==0){
					console.log(xmlhttp)
				}
			}
		}
		$scope.state = '';
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