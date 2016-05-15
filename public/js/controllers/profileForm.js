var app = app || angular.module('occu');

var profileFormController = function($scope, $http, $state, $stateParams, tokenStore, Users, $q) {
    //check user
    $scope.rightUser = false;
    if (tokenStore.isLogged()) {
        $scope.rightUser = (tokenStore.getObj().username===$stateParams.username);
    }

    //get user info
    var username = $scope.username = $stateParams.username;
    var $profile = $scope.$profile =
        Users.get({username: username},function(){
            console.log($profile);
            if(!$profile.interview || $profile.interview.length == 0){
                $profile.interview = [];
                $profile.interview.push({company: ''});
            }
            if(!$profile.availability || $profile.availability.length == 0){
                $profile.availability = [];
                $profile.availability.push({day: '', start: '', end: ''});
            }
            if(!$profile.service_price){
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
            }
        });

    //page showing
    $scope.page1 = true;
    $scope.page2 = false;
    $scope.toSecondPage = function() {
        if($scope.validateFirstPage()){
            $scope.page1 = false;
            $scope.page2 = true;
        }
        else{
            alert("Some fields are required!");
        }
    }

    $scope.toFirstPage = function() {
        if($scope.validateSecondPage()){
            $scope.page1 = true;
            $scope.page2 = false;
        }
        else{
            alert("Some fields are required!");
        }
    }

    $scope.required = [];
    $scope.validateFirstPage = function(){
        $scope.required.firstName = false;
        $scope.required.lastName = false;
        $scope.required.phoneNumber = false;
        $scope.required.nickname = false;
        $scope.required.gender = false;
        $scope.required.education = false;
        $scope.required.educationUniv = false;
        $scope.required.educationYear = false;
        $scope.required.educationMajo = false;
        $scope.required.educationDegr = false;
        $scope.required.job = false;
        $scope.required.jobTime = false;
        $scope.required.jobComp = false;
        $scope.required.jobPosi = false;
        $scope.required.jobLoca = false;
        $scope.required.interview = false;
        $scope.required.icon = false;


        if(!$profile.firstname || $profile.firstname == ''){
            $scope.required.firstname = true;
        }
        if(!$profile.lastname || $profile.lastname == ''){
            $scope.required.lastname = true;
        }
        if(!$profile.phone || $profile.phone == ''){
            $scope.required.phone = true;
        }
        if(!$profile.nickname || $profile.nickname == ''){
            $scope.required.nickname = true;
        }
        if(!$profile.gender){
            $scope.required.gender = true;
        }
        for(var i in $profile.education){
            if($profile.education[i].university == '')
                $scope.required.educationUniv = true;
            if($profile.education[i].year == '')
                $scope.required.educationYear = true;
            if($profile.education[i].major == '')
                $scope.required.educationMajo = true;
            if($profile.education[i].degree == '')
                $scope.required.educationDegr = true;
        }
        for(var i in $profile.job){
            if($profile.job[i].time == '')
                $scope.required.jobTime = true;
            if($profile.job[i].company == '')
                $scope.required.jobComp = true;
            if($profile.job[i].position == '')
                $scope.required.jobPosi = true;
            if($profile.job[i].location == '')
                $scope.required.jobLoca = true;
        }
        for(var i in $profile.interview){
            if($profile.interview[i].company == '')
                $scope.required.interview = true;
        }
        if($profile.education.length == 0){
            $scope.required.interview = true;
        }
        if($profile.job.length == 0){
            $scope.required.interview = true;
        }
        if($profile.interview.length == 0){
            $scope.required.interview = true;
        }
        if(!$scope.uploadedProfilePic){
            $scope.required.icon = true;
        }


        for(var i in $scope.required){
            if($scope.required[i])
                return false;
        }
        return true;
    };

    $scope.validateSecondPage = function(){
        $scope.required.self_description_detail = false;
        $scope.required.self_description_simple = false;
        $scope.required.availability = false;
        $scope.required.availabilityDay = false;
        $scope.required.availabilityStart = false;
        $scope.required.availabilityEnd = false;
        $scope.required.service_price = true;

        if(!$profile.self_description_detail || $profile.self_description_detail == ''){
            $scope.required.self_description_detail = true;
        }
        if(!$profile.self_description_simple || $profile.self_description_simple == ''){
            $scope.required.self_description_simple = true;
        }
        for(var i in $profile.availability){
            if($profile.availability[i].day == '' || !$profile.availability[i].day)
                $scope.required.availabilityDay = true;
            if($profile.availability[i].start == '' || !$profile.availability[i].start)
                $scope.required.availabilityStart = true;
            if($profile.availability[i].end == '' || !$profile.availability[i].end)
                $scope.required.availabilityEnd = true;
        }
        if($profile.availability.length == 0){
            $scope.required.availability = true;
        }

        for(var s in $profile.service_price){
            if($profile.service_price[s].check == true && $profile.service_price[s].price>0)
                $scope.required.service_price = false;
        }

        for(var i in $scope.required){
            if($scope.required[i])
                return false;
        }
        return true;
    };


    //education & job & interview
    $scope.addMoreEducation = function() {
        $profile.education = $profile.education || [];
        $scope.inserted = {university:'', year: '', major: '', degree: ''};
        $profile.education.push($scope.inserted);
    }
    $scope.deleteEducation = function() {
        $profile.education.pop();
    }

    $scope.addMoreJob = function() {
        $profile.job = $profile.job || [];
        $scope.inserted = {time: '', company: '', position: '', location: ''};
        $profile.job.push($scope.inserted);
    }
    $scope.deleteJob = function() {
        $profile.job.pop();
    }

    $scope.addMoreInterview = function() {
        $profile.interview = $profile.interview || [];
        $scope.inserted = {company: ''};
        $profile.interview.push($scope.inserted);
    }
    $scope.deleteInterview = function() {
        $profile.interview.pop();
    }


    //self description
    $scope.self_description_detail_pop = function() {
        $scope.self_description_detail_checked = true;
    }
    $scope.self_description_detail_close = function() {
        $scope.self_description_detail_checked = false;
    }

    $scope.self_description_simple_pop = function() {
        $scope.self_description_simple_checked = true;
    }
    $scope.self_description_simple_close = function() {
        $scope.self_description_simple_checked = false;
    }

    //availability
    $scope.addMoreAvailability = function() {
        $profile.availability = $profile.availability || [];
        $scope.inserted = {day: '', start: '', end: ''};
        $profile.availability.push($scope.inserted);
    }
    $scope.deleteAvailability = function() {
        $profile.availability.pop();
    }

    //service price
    $scope.setService = function(type) {
        for(var s in $profile.service_price){
            if($profile.service_price[s].type == type)
                $profile.service_price[s].check = !$profile.service_price[s].check;
        }
    };



    $scope.submit = function(data) {
        if(!$scope.validateFirstPage()){
            alert('Page 1 is not completed yet')
        }
        else if(!$scope.validateSecondPage()){
            alert('Page 2 is not completed yet')
        }
        else{
            var d = $q.defer();

            var data = {
                firstname: $profile.firstName,
                lastname: $profile.lastName,
                phone: $profile.phoneNumber,
                nickname: $profile.nickname,
                gender: $profile.gender,
                education: JSON.stringify($profile.education),
                job: JSON.stringify($profile.job),
                interview: JSON.stringify($profile.interview),
                self_description_detail: $profile.self_description_detail,
                self_description_simple: $profile.self_description_simple,
                availability: JSON.stringify($profile.avalability),
                service_price: JSON.stringify($profile.service_price)
            };
            data.token = tokenStore.get();
            Users.update({username: $profile.username}, data)
                .$promise.then(
                //success
                function( value ){d.resolve();
                    /*Do something with value*/
                    $("#myModal").modal();
                },
                //error
                function( error ){d.reject(JSON.stringify(error));
                    console.log(error);
                    /*Do something with error*/
                    $("#myModal2").modal();
                }
            );
            return d.promise;
        }
    };




    $(function(){

        $('#image-cropper').cropit();
        $scope.fileChosen = false;
        $('.cropit-image-input').change(function() {
            $scope.fileChosen = true;
            $('#hiddenDiv').css('display','inherit');
        });
        $('.cropit-image-input').click(function(){
            this.value = null;
        })


        $('#upload-btn').click(function() {
            if(!$scope.fileChosen){
                alert('No file chosen!');
                return;
            }
            var imageData = $('#image-cropper').cropit('export');
            var blob = $scope.dataURItoBlob(imageData);
            $scope.uploadFile(new File([blob], "profile_picture.png"));
            //window.open(imageData);
        });
    });

    $scope.dataURItoBlob = function(dataURI) {
        var binary = atob(dataURI.split(',')[1]);
        var array = [];
        for(var i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i));
        }
        return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
    }

    $scope.uploadFile = function(file){
        var uniqueFileName = 'profilePic-' + $stateParams.username + '-' + $scope.uniqueString() + '.jpg';
        var params = {
            Key: uniqueFileName,
            ACL: 'public-read',
            ContentType: file.type,
            Body: file,
            ServerSideEncryption: 'AES256'
        };
        AWS.config.update({ accessKeyId: $scope.creds.access_key, secretAccessKey: $scope.creds.secret_key });
        AWS.config.region = 'us-east-1';
        var bucket = new AWS.S3({ params: { Bucket: $scope.creds.bucket } });
        bucket.putObject(params, function(err, data) {
            if(err) {
                alert(err.message,err.code);
                return false;
            }
            else{
                //success
                var d = $q.defer();

                var data = {
                    icon: 'https://s3-us-west-2.amazonaws.com/outman-bucket-1/'+uniqueFileName
                };
                data.token = tokenStore.get();
                Users.update({username: $profile.username}, data)
                    .$promise.then(
                    //success
                    function( value ){d.resolve();
                        /*Do something with value*/
                        //$("#myModal").modal();
                        $scope.uploadedProfilePic = true;
                        $('#hiddenDiv').css('display','none');
                        alert('Upload successfully');
                    },
                    //error
                    function( error ){d.reject(JSON.stringify(error));
                        console.log(error);
                        /*Do something with error*/
                        //$("#myModal2").modal();
                        alert('Upload failed');
                    }
                );
                return d.promise;
            }
        });
        //end of upload
    }







    //upload profile pic
    $scope.uploadedProfilePic = false;
    $scope.sizeLimit      = 5292880; // 5MB in Bytes
    $scope.creds          = {};
    $scope.creds.access_key = "AKIAIDAXZUK5V4GAXXRQ";
    $scope.creds.secret_key = "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";
    $scope.creds.bucket = "outman-bucket-1";
    /*
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
            var uniqueFileName =  'profilePic-' + $stateParams.username + '-' + $scope.uniqueString() + '-' + $scope.file.name;

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
                    //success
                    var d = $q.defer();

                    var data = {
                        icon: 'https://s3-us-west-2.amazonaws.com/outman-bucket-1/'+uniqueFileName
                    };
                    data.token = tokenStore.get();
                    Users.update({username: $profile.username}, data)
                        .$promise.then(
                        //success
                        function( value ){d.resolve();
                            //Do something with value
                            //$("#myModal").modal();
                            $scope.uploadedProfilePic = true;
                            alert('Upload successfully');
                        },
                        //error
                        function( error ){d.reject(JSON.stringify(error));
                            console.log(error);
                            //Do something with error
                            //$("#myModal2").modal();
                            alert('Upload failed');
                        }
                    );
                    return d.promise;
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
     */
    $scope.uniqueString = function() {
        var text     = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 8; i++ ) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    };





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
          .state('profileForm', {
            url: '/profileForm/:username',
            //params: {currentPage: 1},
            // secure to add login redirection
            // data: {secure:true},
            templateUrl: 'templates/profileForm/',
            controller: profileFormController
            });
});


