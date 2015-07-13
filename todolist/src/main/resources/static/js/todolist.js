/**
 * To-Do List AngularJS Controller.
 */
function AppController($scope, $http) {
	
	var baseURL = '/todolist';
	
	function findAllTasks() {
		
		$http.get(baseURL + '/task-list').success(function(data) {
		    $scope.items = data;
		 })
	}	
	
	findAllTasks();

	$scope.addNewTask = function() {
		
		if (!$scope.newTaskName) {
			alert('Please fill the task name');
		}
		
		var newTask = {name: $scope.newTaskName, startDate: $scope.newTaskStartDate, endDate: $scope.newTaskEndDate, done: false};
		 
	    var postData = {
            name: newTask.name,
            startDate: newTask.startDate,
            endDate: newTask.endDate
        };
	    
	    $http({
            method: 'POST',
            url: baseURL + '/save-new-task',
            data: postData,
            headers: {
                "Content-Type": "application/json",
                "Accept": "text/plain"
            }
        })
        .then(function (response) {
            if (response.status == 200) {
            	$scope.items.push(newTask);
            }
            else {
            	alert('An error ocurred while saving data: ' + response.data);
            }
        });
         
	    cleanTaskFields();
	}
	
	$scope.toogleAddNewTask = function() {
		
		 if ($scope.createNewTask) {
			 $scope.createNewTask = false;
		 } else {
			 $scope.createNewTask = true;
		 }
	}
	
	function cleanTaskFields() {
		
		$scope.newTaskName = ''; 
	    $scope.newTaskStartDate = '';
	    $scope.newTaskEndDate = '';
	}
	
	$scope.editTask = function($item) {
		
		if ($item.editItem) {
			$item.editItem = false;
		 } else {
			 $item.editItem = true;
		 }
	}
	
	$scope.deleteTask = function($item) {
		
		 $http({
	            method: 'POST',
	            url: baseURL + '/delete-task',
	            data: $item,
	            headers: {
	                "Content-Type": "application/json",
	                "Accept": "text/plain"
	            }
	        })
	        .then(function (response) {
	            if (response.status == 200) {
	            	
	            	var index = $scope.items.indexOf($item);
	        		$scope.items.splice(index, 1);     
	        		
	        		$item.deleteItem = true;
	            }
	            else {
	            	alert('An error ocurred while deleting data: ' + response.data);
	            }
	        });
	}
	
	$scope.deleteTaskDetail = function($item) {
		
		 $http({
	            method: 'POST',
	            url: baseURL + '/delete-task',
	            data: $item,
	            headers: {
	                "Content-Type": "application/json",
	                "Accept": "text/plain"
	            }
	        })
	        .then(function (response) {
	            if (response.status == 200) {
	            	
	            	var index = $scope.details.indexOf($item);
	            	$scope.details.splice(index, 1);     
	        		
	        		$item.deleteItem = true;
	            }
	            else {
	            	alert('An error ocurred while deleting data: ' + response.data);
	            }
	        });
	}
	
	$scope.updateTask = function($item) {
		
	    $http({
            method: 'POST',
            url: baseURL + '/update-task',
            data: $item,
            headers: {
                "Content-Type": "application/json",
                "Accept": "text/plain"
            }
        })
        .then(function (response) {
            if (response.status == 200) {
            	$item.editItem = false;
            }
            else {
            	alert('An error ocurred while updating data: ' + response.data);
            }
        });
	}
	
	$scope.viewDetails = function($item) {
		
		$http.get(baseURL + '/task-details?idTask=' + $item.id).success(function(data) {
			$scope.details = data;
			$item.viewDetails = true;
		 })
	}	
}