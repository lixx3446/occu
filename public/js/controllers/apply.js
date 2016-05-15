var app = app || angular.module('occu');

var applyController = function($scope, $http, $state, $stateParams, tokenStore, Users) {
    //check user
    $scope.rightUser = false;
    if (tokenStore.isLogged()) {
        $scope.rightUser = (tokenStore.getObj().username===$stateParams.username);
    }

    //deal with education & job
    $scope.education = [];
    $scope.job = [];

    $scope.addMoreEducation = function () {
        $scope.education.push({
            university: "",
            year: "",
            major: "",
            degree: ""
        });
    };
    $scope.deleteEducation = function () {
        $scope.education.pop();
    };
    $scope.addMoreJob = function () {
        $scope.job.push({
            time: "",
            company: "",
            position: "",
            location: ""
        });
    };
    $scope.deleteJob = function () {
        $scope.job.pop();
    };
    $scope.addMoreEducation();
    $scope.addMoreJob();


    $scope.validate = function(){
        $scope.required = [];
        $scope.required.firstName = false;
        $scope.required.lastName = false;
        $scope.required.phoneNumber = false;
        $scope.required.educationUniv = false;
        $scope.required.educationYear = false;
        $scope.required.educationMajo = false;
        $scope.required.educationDegr = false;
        $scope.required.jobTime = false;
        $scope.required.jobComp = false;
        $scope.required.jobPosi = false;
        $scope.required.jobLoca = false;
        if(!$scope.firstName || $scope.firstName == ''){
            $scope.required.firstName = true;
        }
        if(!$scope.lastName || $scope.lastName == ''){
            $scope.required.lastName = true;
        }
        if(!$scope.phoneNumber || $scope.phoneNumber == ''){
            $scope.required.phoneNumber = true;
        }
        if(!$scope.file){
            for(var i in $scope.education){
                if($scope.education[i].university == '')
                    $scope.required.educationUniv = true;
                if($scope.education[i].year == '')
                    $scope.required.educationYear = true;
                if($scope.education[i].major == '')
                    $scope.required.educationMajo = true;
                if($scope.education[i].degree == '')
                    $scope.required.educationDegr = true;
            }
            for(var i in $scope.job){
                if($scope.job[i].time == '')
                    $scope.required.jobTime = true;
                if($scope.job[i].company == '')
                    $scope.required.jobComp = true;
                if($scope.job[i].position == '')
                    $scope.required.jobPosi = true;
                if($scope.job[i].location == '')
                    $scope.required.jobLoca = true;
            }
        }

        for(var i in $scope.required){
            if($scope.required[i])
                return false;
        }
        return true;
    };

    //on submit function
    $scope.apply = function(){
        console.log($scope.validate());
        if($scope.validate()) {
            var data = {
                username: $stateParams.username,
                firstname: $scope.firstName,
                lastname: $scope.lastName,
                phone: $scope.phoneNumber,
                education: JSON.stringify($scope.education),
                job: JSON.stringify($scope.job)
            };
            if ($scope.file) {
                data.filename = $scope.file.name;
            }
            data.token = tokenStore.get();
            $http.post("/user/" + $stateParams.username + "/applyMentor",
                data)
                .success(function (data, status) {
                    $("#myModal").modal();
                }).error(function () {
                $("#myModal2").modal();
            });

            //Though i do suggest put file upload as a button where you can see progress bar and only enable submit when finished
            //So server could also store the url of the file once submitted
            //Now we can't get the filename of the apply, can we?
            if ($scope.file)
                $scope.upload();
            //add send email
        }
        else{
            alert("Some fields are required!");
        }
    };




    //start of upload file
    $scope.sizeLimit      = 5292880; // 5MB in Bytes
    $scope.creds          = {};
    $scope.creds.access_key = "AKIAIDAXZUK5V4GAXXRQ";
    $scope.creds.secret_key = "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";
    $scope.creds.bucket = "outman-bucket-1";

    $scope.upload = function() {
        AWS.config.update({ accessKeyId: $scope.creds.access_key, secretAccessKey: $scope.creds.secret_key });
        AWS.config.region = 'us-east-1';
        var bucket = new AWS.S3({ params: { Bucket: $scope.creds.bucket } });

        if($scope.file) {
            // Perform File Size Check First
            var fileSize = Math.round(parseInt($scope.file.size));
            if (fileSize > $scope.sizeLimit) {
                alert('Sorry, your attachment is too big. <br/> Maximum '  + $scope.fileSizeLabel() + ' file attachment allowed','File Too Large');
                return false;
            }
            // Prepend Unique String To Prevent Overwrites
            var uniqueFileName =  $stateParams.username + '-' + $scope.uniqueString() + '-' + $scope.file.name;

            var params = {
                Key: uniqueFileName,
                ACL: 'public-read',
                ContentType: $scope.file.type,
                Body: $scope.file,
                ServerSideEncryption: 'AES256'
            };

            bucket.putObject(params, function(err, data) {
                if(err) {
                    alert(err.message,err.code);
                    return false;
                }
                else{
                    console.log(data);
                }
                });
        }
        else {
            // No File Selected
            alert('Please select a file to upload');
        }
    };

    $scope.fileSizeLabel = function() {
        // Convert Bytes To MB
        return Math.round($scope.sizeLimit / 1024 / 1024) + 'MB';
    };

    $scope.uniqueString = function() {
        var text     = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 8; i++ ) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    };
    //end of upload file


    //start of sending notification email
    $scope.sendEmailNotification = function(){
        var data = {
            username: $scope.user.username
        };
        $http.post("/email/sendNotification", data).success(function(data, status) {
            alert('Submit successfully');
        });
    };
    //end of sending notification email



    $('#myModal').on('hidden.bs.modal', function () {
        $state.go('home');
    });
    $('#myModal2').on('hidden.bs.modal', function () {
        $state.go('home');
    });
};


// home no need controller yet...
app.config(function($stateProvider){
	$stateProvider
          .state('apply', {
            url: '/apply/:username',
            //params: {currentPage: 1},
            // secure to add login redirection
            // data: {secure:true},
            templateUrl: 'templates/apply/',
            controller: applyController
            });
});

//create file directive
app.directive('file', function() {
    return {
        restrict: 'AE',
        scope: {
            file: '@'
        },
        link: function(scope, el, attrs){
            el.bind('change', function(event){
                var files = event.target.files;
                var file = files[0];
                scope.file = file;
                scope.$parent.file = file;
                scope.$apply();
            });
        }
    };
});
