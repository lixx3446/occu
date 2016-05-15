var app = app || angular.module('occu');

var profileController = function
	($scope, $filter, $stateParams, tokenStore, Users, $q, $state,  $sce) {
	
	var username = $scope.username = $stateParams.username;
	$scope.page = $stateParams.page;
	var $profile = $scope.$profile =
	Users.get({username: username});

	$scope.editable = false;

	if (tokenStore.isLogged()) {
		$scope.editable =
		(tokenStore.getObj().username == username);
	}

    $scope.goApply = function(){
        $state.go('apply', {username: username});
    }

	$scope.isPage = function(page) {
		return $scope.page == page;
	}
	$scope.changePage = function(page) {
        $stateParams.page = page;
        $state.go($state.current, $stateParams,{notify:false,reload:$state.current});
		$scope.page = page;
	}
	$scope.saveData = function(data){
        console.log(data);
        var d = $q.defer();

        data.token = tokenStore.get();
        Users.update({username: username}, data)
        .$promise.then(
            //success
            function( value ){d.resolve();
            /*Do something with value*/},
            //error
            function( error ){d.reject(JSON.stringify(error));
                console.log(error);
            /*Do something with error*/}
        );
        return d.promise;
	}


    //gender & icon
    $scope.genders = [
        {value: 'male', text: 'Male'},
        {value: 'female', text: 'Female'}
    ];

    $scope.showGender = function() {
        var selected = $filter('filter')($scope.genders, {value: $profile.gender});
        return ($profile.gender && selected.length) ? selected[0].text : 'Not set';
    };

    $scope.checkGender = function(gender) {
        gender = gender || $profile.gender;
        if(gender == 'male'){
            $scope.icons = [
                {value: 'images/profile-icon/7.png', text: ''},
                {value: 'images/profile-icon/8.png', text: ''},
                {value: 'images/profile-icon/9.png', text: ''},
                {value: 'images/profile-icon/10.png', text: ''},
                {value: 'images/profile-icon/11.png', text: ''},
                {value: 'images/profile-icon/12.png', text: ''},
                //{value: 'images/profile-icon/13.png', text: ''},
                //{value: 'images/profile-icon/14.png', text: ''},
            ];
        }
        else{
            $scope.icons = [
                {value: 'images/profile-icon/1.png', text: ''},
                {value: 'images/profile-icon/2.png', text: ''},
                {value: 'images/profile-icon/3.png', text: ''},
                {value: 'images/profile-icon/4.png', text: ''},
                {value: 'images/profile-icon/5.png', text: ''},
                {value: 'images/profile-icon/6.png', text: ''},
            ];
        }
    };

    $scope.icons = [
        {value: 'images/profile-icon/1.png', text: 'images/profile-icon/1.png'},
        {value: 'images/profile-icon/2.png', text: 'images/profile-icon/2.png'},
        {value: 'images/profile-icon/3.png', text: 'images/profile-icon/3.png'},
        {value: 'images/profile-icon/4.png', text: 'images/profile-icon/4.png'},
        {value: 'images/profile-icon/5.png', text: 'images/profile-icon/5.png'},
        {value: 'images/profile-icon/6.png', text: 'images/profile-icon/6.png'},
        {value: 'images/profile-icon/7.png', text: 'images/profile-icon/7.png'},
        {value: 'images/profile-icon/8.png', text: 'images/profile-icon/8.png'},
        {value: 'images/profile-icon/9.png', text: 'images/profile-icon/9.png'},
        {value: 'images/profile-icon/10.png', text: 'images/profile-icon/10.png'},
        {value: 'images/profile-icon/11.png', text: 'images/profile-icon/11.png'},
        {value: 'images/profile-icon/12.png', text: 'images/profile-icon/12.png'},
        //{value: 'images/profile-icon/13.png', text: 'images/profile-icon/13.png'},
        //{value: 'images/profile-icon/14.png', text: 'images/profile-icon/14.png'},
    ];

    $scope.checkPersonal = function() {
        if($profile.firstname == null)
            $profile.firstname = '';
        if($profile.lastname == null)
            $profile.lastname = '';
        if($profile.phone == null)
            $profile.phone = '';
        if($profile.nickname == null)
            $profile.nickname = '';
        if($profile.gender == null)
            $profile.gender = '';
        if($profile.icon == null)
            $profile.icon = '';
        $scope.checkGender();
    }


    //education
    $scope.education = [];
    $scope.saveEdu = function(data) {
		var d = $q.defer();

		var obj = {education : JSON.stringify($profile.education)};
		obj.token = tokenStore.get();
		Users.update({username: $profile.username}, obj)
		.$promise.then(
		    //success
		    function( value ){d.resolve();
		    /*Do something with value*/},
		    //error
		    function( error ){d.reject(JSON.stringify(error));
		    	console.log(error);
		    /*Do something with error*/}
	    );
		return d.promise;
	}

	$scope.addEdu = function() {
		$profile.education = $profile.education || [];
		$scope.inserted = {university:'', year: '', major: '', degree: ''};
		$profile.education.push($scope.inserted);
	}
	$scope.deleteEdu = function() {
		$profile.education.pop();
	}
    $scope.cancelEdu = function() {
        $profile.education = $scope.education;
    }
    $scope.storeEdu = function() {
        $scope.education = [];
        for (var key in $profile.education) {
            $scope.education.push($profile.education[key]);
        }
    }

    //job
    $scope.job = [];
    $scope.saveJob = function(data) {
		var d = $q.defer();

		var obj = {job: JSON.stringify($profile.job)};
		obj.token = tokenStore.get();
		Users.update({username: $profile.username}, obj)
		.$promise.then(
		    //success
		    function( value ){d.resolve();
		    /*Do something with value*/},
		    //error
		    function( error ){d.reject(JSON.stringify(error));
		    	console.log(error);
		    /*Do something with error*/}
	    );
		return d.promise;
	}

	$scope.addJob = function() {
		$profile.job = $profile.job || [];
		$scope.inserted = {time: '', company: '', position: '', location: ''};
	    $profile.job.push($scope.inserted);
	}
	$scope.deleteJob = function() {
		$profile.job.pop();
	}
    $scope.cancelJob = function() {
        $profile.job = $scope.job;
    }
    $scope.storeJob = function() {
        $scope.job = [];
        for (var key in $profile.job) {
            $scope.job.push($profile.job[key]);
        }
    }


    //interview
    $scope.interview = [];
    $scope.saveInterview = function(data) {
        var d = $q.defer();

        var obj = {interview: JSON.stringify($profile.interview)};
        obj.token = tokenStore.get();
        Users.update({username: $profile.username}, obj)
            .$promise.then(
            //success
            function( value ){d.resolve();
                /*Do something with value*/},
            //error
            function( error ){d.reject(JSON.stringify(error));
                console.log(error);
                /*Do something with error*/}
        );
        return d.promise;
    }

    $scope.addInterview = function() {
        $profile.interview = $profile.interview || [];
        $scope.inserted = {company: ''};
        $profile.interview.push($scope.inserted);
    }
    $scope.deleteInterview = function() {
        $profile.interview.pop();
    }
    $scope.cancelInterview = function() {
        $profile.interview = $scope.interview;
    }
    $scope.storeInterview = function() {
        $scope.interview = [];
        for (var key in $profile.interview) {
            $scope.interview.push($profile.interview[key]);
        }
    }

    //self_description_detail
    $scope.self_description_detail_checked = false;
    $scope.self_description_detail_pop = function() {
        $scope.self_description_detail_checked = true;
    }
    $scope.self_description_detail_close = function() {
        $scope.self_description_detail_checked = false;
    }
    $scope.checkDescipt = function() {
        if($profile.self_description_detail == null)
            $profile.self_description_detail = '';
    }
    $scope.HTMLself_description_detail = function() {
        if($profile.self_description_detail){
            return $sce.trustAsHtml($profile.self_description_detail.replace(/\n/g, '<br>'));
        }
    };

    //self_description_simple
    $scope.self_description_simple_checked = false;
    $scope.self_description_simple_pop = function() {
        $scope.self_description_simple_checked = true;
    }
    $scope.self_description_simple_close = function() {
        $scope.self_description_simple_checked = false;
    }
    $scope.checkDesciptShort = function() {
        if($profile.self_description_simple == null)
            $profile.self_description_simple = '';
    }
    $scope.HTMLself_description_simple = function() {
        if($profile.self_description_simple){
            return $sce.trustAsHtml($profile.self_description_simple.replace(/\n/g, '<br>'));
        }
    };

    //availability
    $scope.saveAvailability = function() {
        var d = $q.defer();

        var obj = {availability: JSON.stringify($profile.availability)};
        obj.token = tokenStore.get();
        Users.update({username: $profile.username}, obj)
            .$promise.then(
            //success
            function( value ){d.resolve();
                /*Do something with value*/},
            //error
            function( error ){d.reject(JSON.stringify(error));
                console.log(error);
                /*Do something with error*/}
        );
        return d.promise;
    };

    $scope.addMoreAvailability = function() {
        if($profile.availability == null){
            $profile.availability = [];
        }
        $profile.availability.push({
            day: "",
            start: "",
            end: ""
        });
    };
    $scope.deleteAvailability = function() {
        $profile.availability.pop();
    };



    //service and price
    $scope.saveServicePrice = function(data) {
        var d = $q.defer();

        var obj = {service_price: JSON.stringify($profile.service_price)};
        obj.token = tokenStore.get();
        Users.update({username: $profile.username}, obj)
            .$promise.then(
            //success
            function( value ){d.resolve();
                /*Do something with value*/},
            //error
            function( error ){d.reject(JSON.stringify(error));
                console.log(error);
                /*Do something with error*/}
        );
        return d.promise;
    };

    $scope.checkServicePrice = function() {
        if($profile.service_price == null){
            $profile.service_price = [
                {
                    type:"30min Career Talk",
                    check:false,
                    price:0
                },
                {
                    type:"60min Career Talk",
                    check:false,
                    price:0
                },
                {
                    type:"30min Resume Review",
                    check:false,
                    price:0
                },
                {
                    type:"60min Resume Review",
                    check:false,
                    price:0
                },
                {
                    type:"30min Mock Interview",
                    check:false,
                    price:0
                },
                {
                    type:"60min Mock Interview",
                    check:false,
                    price:0
                }];
        }
    };

    $scope.setService = function(type) {
        for(var s in $profile.service_price){
            if($profile.service_price[s].type == type)
                $profile.service_price[s].check = !$profile.service_price[s].check;
        }
    };

};

// This can be moved to js of controller or page
app.config(function($stateProvider){
	$stateProvider
          .state('profile', {
            url: '/profile/:username?page',
            params: {page: 'Profile'},
            templateUrl: 'templates/profile/',
            controller: profileController
	});
});

