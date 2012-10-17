var 
APP = require('alloy/controllers/core'),
Cloud = require('ti.cloud');

APP.nav = require('ti.navibridge');
APP.nav.setApplicationId('ICiAV4Ay');
APP.index = $.mainView;
APP.navBar = $.navBar;
APP.navTitle = $.navTitle;
APP.rightNav = $.rightNav;

function installClick( e ) {  
    APP.nav.installNavi(); 
}

function toursClick( e ){
	var tourView = Alloy.createController('toursView').getView()
	$.destinationButton.animate({opacity:0.0, duration:100}, function(){
		$.tourButton.animate({opacity:0.0, duration:500}, function(){
			tourView.opacity= 0.0;
			APP.index.add(tourView);
			tourView.animate({opacity:1.0, duration:200});
			$.backButton.show();
			APP.rightNav.show();
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
		$.destinationButton.animate({opacity:1.0, duration:200});
		$.tourButton.animate({opacity:1.0, duration:200})
	}
}

function destinationsClick( e ){
	
	var destinationView = Alloy.createController('destinationsView').getView()
	$.tourButton.animate({opacity:0.0, duration:100}, function(){
		$.destinationButton.animate({opacity:0.0, duration:500}, function(){
			destinationView.opacity= 0.0;
			APP.index.add(destinationView);
			destinationView.animate({opacity:1.0, duration:200});
			$.backButton.show();
			APP.rightNav.show();
		});
		
	}); 	
}

function createTourClick(e){
	
}

function addClick(e){
	$.backButton.show();
	
	if( APP.navTitle.text =='Available Destinations'){
		APP.index.add(Alloy.createController('createDestination').getView())  
	} else if ( APP.navTitle.text =='Available Tours' ){
		APP.index.add(Alloy.createController('createTour').getView()) 
	}	
}
$.container.open();
