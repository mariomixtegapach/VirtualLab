angular.module('em', [])
	.controller('emCtrl',function($http, $scope){
		$scope.c = {};
		$scope.fileNameChanged = function() {
			var file = document.getElementById('file').files[0];
			 var reader = new FileReader();
			  reader.addEventListener("load", function (res) {
			   	$scope.c.image = reader.result;
			  });
			  if(file)
			  reader.readAsDataURL(file);  
		}

		$scope.clean = function(){
			$scope.c.name = '';
			$scope.c.comp = '';
			$scope.c.description = '';
			$scope.c.image = '';
		}

		$scope.save = function(){
			$scope.c.components = $scope.c.comp.split(',');
			console.log($scope.c)
			$http.post('/secret/save', $scope.c).then(function(done){
				$scope.clean();
			}, function(err){
				console.log(err);
			})
			
		}




	});