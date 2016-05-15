var app = app || angular.module('occu');

var browseController = function($scope, $http, $stateParams, Users) {
	//$scope.currentPage = $stateParams.currentPage || 1;
	//$scope.numPage = 10; //to do, total number of pages
	//$scope.numShow = 6;

    $scope.search = function(){
        $http({method: 'GET', url: '/user/getMentorList'}).
        success(function(data, status) {
            $scope.mentors = data;
        }).
        error(function(data, status) {
            console.log(data);
        });
    }



    $scope.filterByCriteria = function(mentor) {
        //education
        var eduBool = false;
        for(var index in mentor.education){
            var school = $scope.transUniv(mentor.education[index].university);//field in education
            if($scope.criteria.Education[school])
                eduBool = true;
        }
        var eduNoSelection = true;
        for(var edu in $scope.criteria.Education){
            if($scope.criteria.Education[edu])
                eduNoSelection = false;
        }
        if(eduNoSelection)
            eduBool = true;

        //location
        var locationBool = false;
        for(var index in mentor.job){
            var location = $scope.transLocation(mentor.job[index].location);//field in job
            if($scope.criteria.Location[location])
                locationBool = true;
        }
        var locationNoSelection = true;
        for(var job in $scope.criteria.Location){
            if($scope.criteria.Location[job])
                locationNoSelection = false;
        }
        if(locationNoSelection)
            locationBool = true;

        //job
        var jobBool = false;
        for(var index in mentor.job){
            var company = mentor.job[index].company;//field in job
            if($scope.criteria.Job[company])
                jobBool = true;
        }
        var jobNoSelection = true;
        for(var job in $scope.criteria.Job){
            if($scope.criteria.Job[job])
                jobNoSelection = false;
        }
        if(jobNoSelection)
            jobBool = true;

        //interview
        var interBool = false;
        for(var index in mentor.interview){
            var company = mentor.interview[index].company;//field in company
            if($scope.criteria.Interview[company])
                interBool = true;
        }
        var interNoSelection = true;
        for(var job in $scope.criteria.Interview){
            if($scope.criteria.Interview[job])
                interNoSelection = false;
        }
        if(interNoSelection)
            interBool = true;

        if(eduBool && jobBool && interBool && locationBool)
            return true;
    };



    $scope.setEducationChecked = function(crit) {
        $scope.criteria.Education[crit] = !$scope.criteria.Education[crit];
    };
    $scope.setJobChecked = function(crit){
        $scope.criteria.Job[crit] = !$scope.criteria.Job[crit];
    };
    $scope.setInterviewChecked = function(crit){
        $scope.criteria.Interview[crit] = !$scope.criteria.Interview[crit];
    };
    $scope.setLocationChecked = function(crit){
        $scope.criteria.Location[crit] = !$scope.criteria.Location[crit];
    };

    $scope.criteria={
        "Education":{},
        "Job":{},
        "Interview":{},
        "Location":{}
    };
    $scope.mentors=[];
    $scope.search();






    //criteria education
    $scope.univs = [
        {'name': 'Princeton University', 'variable': 'PrincetonUniversity'},
        {'name': 'Harvard University', 'variable': 'HarvardUniversity'},
        {'name': 'Yale University', 'variable': 'YaleUniversity'},
        {'name': 'Columbia University', 'variable': 'ColumbiaUniversity'},
        {'name': 'Stanford University', 'variable': 'StanfordUniversity'},
        {'name': 'University of Chicago', 'variable': 'UniversityofChicago'},
        {'name': 'MIT', 'variable': 'MIT'},
        {'name': 'Duke University', 'variable': 'DukeUniversity'},
        {'name': 'U Penn', 'variable': 'UPenn'},
        {'name': 'CIT', 'variable': 'CIT'},
        {'name': 'Johns Hopkins University', 'variable': 'JohnsHopkinsUniversity'},
        {'name': 'Dartmouth College', 'variable': 'DartmouthCollege'},
        {'name': 'Northwestern University', 'variable': 'NorthwesternUniversity'},
        {'name': 'Brown University', 'variable': 'BrownUniversity'},
        {'name': 'Cornell University', 'variable': 'CornellUniversity'},
        {'name': 'Vanderbilt University', 'variable': 'VanderbiltUniversity'},
        {'name': 'Washington University in St. Louis', 'variable': 'WashingtonUniversityinStLouis'},
        {'name': 'Rice University', 'variable': 'RiceUniversity'},
        {'name': 'University of Notre Dame', 'variable': 'UniversityofNotreDame'},
        {'name': 'UC Berkley', 'variable': 'UCBerkley'},
        {'name': 'Emory', 'variable': 'Emory'},
        {'name': 'Georgetown University', 'variable': 'GeorgetownUniversity'},
        {'name': 'Carnegie Mellon University', 'variable': 'CarnegieMellonUniversity'},
        {'name': 'UCLA', 'variable': 'UCLA'},
        {'name': 'USC', 'variable': 'USC'},
        {'name': 'University of Virginia', 'variable': 'UniversityofVirginia'},
        {'name': 'Tufts University', 'variable': 'TuftsUniversity'},
        {'name': 'Wakeforest University', 'variable': 'WakeforestUniversity'},
        {'name': 'University of Michigan Ann Arbor', 'variable': 'UniversityofMichiganAnnArbor'},
        {'name': 'Boston College', 'variable': 'BostonCollege'},
        {'name': 'University of North Carolina - Chapel Hill', 'variable': 'UniversityofNorthCarolinaChapelHill'},
        {'name': 'New York University', 'variable': 'NewYorkUniversity'},
        {'name': 'University of Rochester', 'variable': 'UniversityofRochester'},
        {'name': 'Brandeis University', 'variable': 'BrandeisUniversity'},
        {'name': 'College of Williams and Mary', 'variable': 'CollegeofWilliamsandMary'},
        {'name': 'Georgia Institute of Technology', 'variable': 'GeorgiaInstituteofTechnology'},
        {'name': 'Case Western Reserve University', 'variable': 'CaseWesternReserveUniversity'},
        {'name': 'UC Santa Barbara', 'variable': 'UCSantaBarbara'},
        {'name': 'UC Irvine', 'variable': 'UCIrvine'},
        {'name': 'UC San Diego', 'variable': 'UCSanDiego'},
        {'name': 'Boston University', 'variable': 'BostonUniversity'},
        {'name': 'Rensselaer Polytechnic Institute', 'variable': 'RensselaerPolytechnicInstitute'},
        {'name': 'Tulane University', 'variable': 'TulaneUniversity'},
        {'name': 'UC Davis', 'variable': 'UCDavis'},
        {'name': 'University of Illinois--Urbana-Champaign', 'variable': 'UniversityofIllinoisUrbanaChampaign'},
        {'name': 'University of Wisconsin - Madison', 'variable': 'UniversityofWisconsinMadison'},
        {'name': 'Lehigh University', 'variable': 'LehighUniversity'},
        {'name': 'Northeastern University', 'variable': 'NortheasternUniversity'},
        {'name': 'Penn State', 'variable': 'PennState'},
        {'name': 'University of Florida', 'variable': 'UniversityofFlorida'},
        {'name': 'University of Miami', 'variable': 'UniversityofMiami'},
        {'name': 'Ohio State University', 'variable': 'OhioStateUniversity'},
        {'name': 'Pepperdine University', 'variable': 'PepperdineUniversity'},
        {'name': 'University of Texas - Austin', 'variable': 'UniversityofTexasAustin'},
        {'name': 'University of Washington', 'variable': 'UniversityofWashington'},
        {'name': 'Yeshiva University', 'variable': 'YeshivaUniversity'},
        {'name': 'George Washington University', 'variable': 'GeorgeWashingtonUniversity'},
        {'name': 'University of Connecticut', 'variable': 'UniversityofConnecticut'}
    ];

    $scope.transUniv = function(univ){
        switch (univ) {
            //1
            case 'Princeton University':
                return 'PrincetonUniversity';
            //2
            case 'Harvard University':
                return 'HarvardUniversity';
            //3
            case 'Yale University':
                return 'YaleUniversity';
            //4
            case 'Columbia University':
                return 'ColumbiaUniversity';
            //5
            case 'Stanford University':
                return 'StanfordUniversity';
            //6
            case 'University of Chicago':
                return 'UniversityofChicago';
            //7
            case 'MIT':
                return 'MIT';
            //8
            case 'Duke University':
                return 'DukeUniversity';
            //9
            case 'U Penn':
                return 'UPenn';
            //10
            case 'CIT':
                return 'CIT';
            //
            case 'Johns Hopkins University':
                return 'JohnsHopkinsUniversity';
            //
            case 'Dartmouth College':
                return 'DartmouthCollege';
            //
            case 'Northwestern University':
                return 'NorthwesternUniversity';
            //
            case 'Brown University':
                return 'BrownUniversity';
            //
            case 'Cornell University':
                return 'CornellUniversity';
            //
            case 'Vanderbilt University':
                return 'VanderbiltUniversity';
            //
            case 'Washington University in St. Louis':
                return 'WashingtonUniversityinStLouis';
            //
            case 'Rice University':
                return 'RiceUniversity';
            //
            case 'University of Notre Dame':
                return 'UniversityofNotreDame';
            //
            case 'UC Berkley':
                return 'UCBerkley';
            //
            case 'Emory':
                return 'Emory';
            //
            case 'Georgetown University':
                return 'GeorgetownUniversity';
            //
            case 'Carnegie Mellon University':
                return 'CarnegieMellonUniversity';
            //
            case 'UCLA':
                return 'UCLA';
            //
            case 'USC':
                return 'USC';
            //
            case 'University of Virginia':
                return 'UniversityofVirginia';
            //
            case 'Tufts University':
                return 'TuftsUniversity';
            //
            case 'Wakeforest University':
                return 'WakeforestUniversity';
            //
            case 'University of Michigan Ann Arbor':
                return 'UniversityofMichiganAnnArbor';
            //
            case 'Boston College':
                return 'BostonCollege';
            //
            case 'University of North Carolina - Chapel Hill':
                return 'UniversityofNorthCarolinaChapelHill';
            //
            case 'New York University':
                return 'NewYorkUniversity';
            //
            case 'University of Rochester':
                return 'UniversityofRochester';
            //
            case 'Brandeis University':
                return 'BrandeisUniversity';
            //
            case 'College of Williams and Mary':
                return 'CollegeofWilliamsandMary';
            //
            case 'Georgia Institute of Technology':
                return 'GeorgiaInstituteofTechnology';
            //
            case 'Case Western Reserve University':
                return 'CaseWesternReserveUniversity';
            //
            case 'UC Santa Barbara':
                return 'UCSantaBarbara';
            //
            case 'UC Irvine':
                return 'UCIrvine';
            //
            case 'UC San Diego':
                return 'UCSanDiego';
            //
            case 'Boston University':
                return 'BostonUniversity';
            //
            case 'Rensselaer Polytechnic Institute':
                return 'RensselaerPolytechnicInstitute';
            //
            case 'Tulane University':
                return 'TulaneUniversity';
            //
            case 'UC Davis':
                return 'UCDavis';
            //
            case 'University of Illinois--Urbana-Champaign':
                return 'UniversityofIllinoisUrbanaChampaign';
            //
            case 'University of Wisconsin - Madison':
                return 'UniversityofWisconsinMadison';
            case 'University of Wisconsin-Madison':
                return 'UniversityofWisconsinMadison';
            //
            case 'Lehigh University':
                return 'LehighUniversity';
            //
            case 'Northeastern University':
                return 'NortheasternUniversity';
            //
            case 'Penn State':
                return 'PennState';
            //
            case 'University of Floriday':
                return 'UniversityofFlorida';
            //
            case 'University of Miami':
                return 'UniversityofMiami';
            //
            case 'Ohio State University':
                return 'OhioStateUniversity';
            //
            case 'Pepperdine University':
                return 'PepperdineUniversity';
            //
            case 'University of Texas - Austin':
                return 'UniversityofTexasAustin';
            //
            case 'University of Washington':
                return 'UniversityofWashington';
            //
            case 'Yeshiva University':
                return 'YeshivaUniversity';
            //
            case 'George Washington University':
                return 'GeorgeWashingtonUniversity';
            //
            case 'University of Connecticut':
                return 'UniversityofConnecticut';

            default:
                return '';
        }
    }

    //criteria location
    $scope.locations = [
        {'name': 'US East', 'variable': 'USEast'},
        {'name': 'US West', 'variable': 'USWest'},
        {'name': 'US Mid', 'variable': 'USMid'},
        {'name': 'China', 'variable': 'China'},
        {'name': 'UK', 'variable': 'UK'},
    ];

    $scope.transLocation = function(univ) {
        switch (univ) {
            //east
            case 'US East':
                return 'USEast';
            case 'NYC':
                return 'USEast';
            //west
            case 'US West':
                return 'USWest';
            //mid
            case 'US Mid':
                return 'USMid';
            //China
            case 'China':
                return 'China';
            case 'Shanghai':
                return 'China';
            case 'Hong Kong':
                return 'China';
            //UK
            case 'UK':
                return 'UK';

            default:
                return '';
        }
    }
};


// home no need controller yet...
app.config(function($stateProvider){
	$stateProvider
          .state('browse', {
            url: '/browse',
            //params: {currentPage: 1},
            // secure to add login redirection
            // data: {secure:true},
            templateUrl: 'templates/browse/',
            controller: browseController
            });
});