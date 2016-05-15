'use strict';
var app = app || angular.module('occu');

var vipController = function($scope, $timeout){
    $( "#pic1" ).mouseenter(function() {
            $( "#pic1" ).animate({
                opacity: 0.4
            }, 100 );
            $( "#txt1" ).animate({
                opacity: 1
            }, 100);
        })
        .mouseleave(function(){
            $( "#pic1" ).animate({
                opacity: 1
            }, 100 );
            $( "#txt1" ).animate({
                opacity: 0
            }, 100);
        });

    $( "#pic2" ).mouseenter(function() {
            $( "#pic2" ).animate({
                opacity: 0.4
            }, 100 );
            $( "#txt2" ).animate({
                opacity: 1
            }, 100);
        })
        .mouseleave(function(){
            $( "#pic2" ).animate({
                opacity: 1
            }, 100 );
            $( "#txt2" ).animate({
                opacity: 0
            }, 100);
        });

    $( "#pic3" ).mouseenter(function() {
            $( "#pic3" ).animate({
                opacity: 0.4
            }, 100 );
            $( "#txt3" ).animate({
                opacity: 1
            }, 100);
        })
        .mouseleave(function(){
            $( "#pic3" ).animate({
                opacity: 1
            }, 100 );
            $( "#txt3" ).animate({
                opacity: 0
            }, 100);
        });

    $( "#pic4" ).mouseenter(function() {
            $( "#pic4" ).animate({
                opacity: 0.4
            }, 100 );
            $( "#txt4" ).animate({
                opacity: 1
            }, 100);
        })
        .mouseleave(function(){
            $( "#pic4" ).animate({
                opacity: 1
            }, 100 );
            $( "#txt4" ).animate({
                opacity: 0
            }, 100);
        });

    $( "#pic5" ).mouseenter(function() {
            $( "#pic5" ).animate({
                opacity: 0.4
            }, 100 );
            $( "#txt5" ).animate({
                opacity: 1
            }, 100);
        })
        .mouseleave(function(){
            $( "#pic5" ).animate({
                opacity: 1
            }, 100 );
            $( "#txt5" ).animate({
                opacity: 0
            }, 100);
        });

    $( "#pic6" ).mouseenter(function() {
            $( "#pic6" ).animate({
                opacity: 0.4
            }, 100 );
            $( "#txt6" ).animate({
                opacity: 1
            }, 100);
        })
        .mouseleave(function(){
            $( "#pic6" ).animate({
                opacity: 1
            }, 100 );
            $( "#txt6" ).animate({
                opacity: 0
            }, 100);
        });

    $( "#pic7" ).mouseenter(function() {
            $( "#pic7" ).animate({
                opacity: 0.4
            }, 100 );
            $( "#txt7" ).animate({
                opacity: 1
            }, 100);
        })
        .mouseleave(function(){
            $( "#pic7" ).animate({
                opacity: 1
            }, 100 );
            $( "#txt7" ).animate({
                opacity: 0
            }, 100);
        });

    $( "#pic8" ).mouseenter(function() {
            $( "#pic8" ).animate({
                opacity: 0.4
            }, 100 );
            $( "#txt8" ).animate({
                opacity: 1
            }, 100);
        })
        .mouseleave(function(){
            $( "#pic8" ).animate({
                opacity: 1
            }, 100 );
            $( "#txt8" ).animate({
                opacity: 0
            }, 100);
        });
}



app.config(function($stateProvider){
	$stateProvider
          .state('vipInfo', {
            url: '/vipInfo',
            // secure to add login redirection
            // data: {secure:true},
            templateUrl: 'templates/vipInfo/',
              controller: vipController
          });
});