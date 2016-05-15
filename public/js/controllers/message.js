// messageCtrl
var app = app || angular.module('occu');

app.controller('messageCtrl', function($scope, $stateParams, Messages, $q, tokenStore){

    $scope.postMessage = function(msg){
        var msgObj = {message: msg,
            to_username: $scope.contact, token: tokenStore.get()};

        Messages.save(msgObj, function(msg) {
            Messages.query({token: tokenStore.get()},
                function(messages){
                    //console.log(messages);
                    $scope.chatDetail = [];//all message between two contacts
                    $scope.group = [];//store all the chat by group
                    $scope.displayedMessage = [];//all the message that display on the message home screen

                    $scope.groupMessages(messages);
                    $scope.chatDetail = $scope.group[$scope.contact];

                    var offset = document.getElementById("all_message").clientHeight;
                    $("#message_display").scrollTop(offset);
                });
        });

    };

    $scope.groupMessages = function(messages){
        for(var mess in messages){
            if(!messages[mess].from_username) continue; //remove two irrelevant object in query response

            if(messages[mess].from_username != $scope.username){ //if from is not myself, then create group
                if($scope.group[messages[mess].from_username]){
                    $scope.group[messages[mess].from_username].push(messages[mess]);
                }
                else{
                    $scope.group[messages[mess].from_username]=[];
                    $scope.group[messages[mess].from_username].push(messages[mess]);
                }
            }
            else{ //if from is myself, go find the group it should belong to
                if($scope.group[messages[mess].to_username]){
                    $scope.group[messages[mess].to_username].push(messages[mess]);
                }
                else{
                    $scope.group[messages[mess].to_username]=[];
                    $scope.group[messages[mess].to_username].push(messages[mess]);
                }
            }
        }

        var board = document.getElementById('messageBoard');

        for(var contact in $scope.group){
            $scope.displayedMessage.push($scope.group[contact][0]);
        }
        //console.log($scope.group);
        //console.log($scope.displayedMessage);
    };

    $scope.getChat = function(message) {
        if(message.from_username == $scope.username){
            $scope.contact = message.to_username;
        }
        else{
            $scope.contact = message.from_username;
        }
        $scope.chatDetail = $scope.group[$scope.contact];
        $scope.showingDetail = true;
        for(var message in $scope.group[$scope.contact]){
            if($scope.group[$scope.contact][message].from_username == $scope.contact){
                $scope.from_user_nickname = $scope.group[$scope.contact][message].nickname;
                break;
            }
        }
        $scope.markRead($scope.contact);
    };

    $scope.returnToChatBoard = function() {
        $scope.showingDetail = false;
    }


    $scope.markRead = function(otherUser) {
        var obj = {other_user: otherUser};
        obj.token = tokenStore.get();

        Messages.update({other_user: otherUser},obj);
    }



	var username = $scope.username = $stateParams.username;
	$scope.messages = null;//store raw data from query
    $scope.group = [];//store all the chat by group
    $scope.displayedMessage = [];//all the message that display on the message home screen
    $scope.contact = null;
    $scope.chatDetail = [];//all message between two contacts
    $scope.showingDetail = false;

    if (tokenStore.isLogged()){

		var selfUsername = tokenStore.getObj().username;

		if (username == selfUsername) {
            //need to organize message
            $scope.messages = Messages.query({token: tokenStore.get()},
				function(messages){
				    //console.log(messages);
                    $scope.groupMessages(messages);
                });
		} else {
            //no need to organize message
			$scope.enable = true;
			$scope.messages = Messages.query({token: tokenStore.get(), other_user: username},
				function(messages){
				//console.log(messages);
			});	
		}
	}





});