var APP = require('alloy/controllers/core');
var Cloud = require('ti.cloud');

APP.nav = require('ti.navibridge');
APP.nav.setApplicationId('ICiAV4Ay');

APP.index = $.MainView;
APP.navBar = $.NavBar;
APP.navTitle = $.NavTitle;

APP.rightNav = $.rightButton
function installClick( e ) {  
    APP.nav.installNavi(); 
}

function toursClick( e ){
	var tourView = Alloy.createController('tours').getView()
	$.destination.animate({opacity:0.0, duration:100}, function(){
		$.tour.animate({opacity:0.0, duration:500}, function(){
			tourView.opacity= 0.0;
			APP.index.add(tourView);
			tourView.animate({opacity:1.0, duration:200});
			$.BackButton.show();
		});
		
	});

	
	//
}

function backClick( e ){
	var x = APP.index.children.length;
	APP.index.remove(APP.index.children[x-1]);
	APP.navTitle.text = APP.index.children[x-2].title
	if(x==2){
		e.source.hide();
		APP.rightNav.hide();
		$.destination.animate({opacity:1.0, duration:200});
		$.tour.animate({opacity:1.0, duration:200})
	}
}

function destinationsClick( e ){
	
	var desView = Alloy.createController('locations').getView()
	$.tour.animate({opacity:0.0, duration:100}, function(){
		$.destination.animate({opacity:0.0, duration:500}, function(){
			desView.opacity= 0.0;
			APP.index.add(desView);
			desView.animate({opacity:1.0, duration:200});
			$.BackButton.show();
			APP.rightNav.show();
		});
		
	});
	//$.BackButton.show();

	//APP.destinations = Alloy.createController('locations').getView();
	//APP.index.add(Alloy.createController('locations').getView())   	
}

function createTourClick(e){
	
}

function addDestinationClick(e){
	$.BackButton.show();
	
	APP.index.add(Alloy.createController('createDestination').getView())   	
}
$.index.open();
