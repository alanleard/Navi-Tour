var 
APP = require('alloy/controllers/core'),
Cloud = require('ti.cloud');
Ti.UI.backgroundColor = '#000';
APP.nav = require('ti.navibridge');
APP.nav.setApplicationId('ICiAV4Ay');
APP.index = $.mainView;
APP.navBar = $.navBar;
APP.navTitle = $.navTitle;
APP.rightNav = $.rightNav;
APP.backBtn = $.backButton;
APP.destinationBtn = $.destinationButton;
APP.tourBtn = $.tourButton;
APP.closeAll = closeAll;

$.container.open();

function installClick( e ) {  
    APP.nav.installNavi(); 
}

function closeAll(){
	APP.backBtn.hide();
    APP.rightNav.hide();
    APP.navTitle.text = APP.index.children[0].title;
	for (var i = 0, l = APP.index.children.length; l>=i; l--){
		if(l>=2){
			APP.index.remove(APP.index.children[l-1]);
		}else {
			APP.destinationBtn.animate({opacity:1.0, duration:200});
			APP.tourBtn.animate({opacity:1.0, duration:200});
		}
	 }
}

function toursClick( e ){
	var tourView = Alloy.createController('toursView').getView()
	$.destinationButton.animate({opacity:0.0, duration:100}, function(){
		$.tourButton.animate({opacity:0.0, duration:500}, function(){
			tourView.opacity= 0.0;
			APP.index.add(tourView);
			tourView.animate({opacity:1.0, duration:200});
			APP.backBtn.show();
			APP.rightNav.show();
		});
	});
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
	} else {
		APP.index.children[x-2].animate({opacity:1.0, duration:200})
	}
}

function destinationsClick( e ){
	var destinationView = Alloy.createController('destinationsView').getView()
	$.tourButton.animate({opacity:0.0, duration:100}, function(){
		$.destinationButton.animate({opacity:0.0, duration:500}, function(){
			destinationView.opacity= 0.0;
			APP.index.add(destinationView);
			destinationView.animate({opacity:1.0, duration:200});
			APP.backBtn.show();
			APP.rightNav.show();
		});
	}); 	
}

function addClick(e){
	APP.backBtn.show();
	if( APP.navTitle.text =='Available Destinations'){
		APP.index.add(Alloy.createController('createDestination').getView())  
	} else if ( APP.navTitle.text =='Available Tours' ){
		APP.index.add(Alloy.createController('createTour').getView()) 
	}	
}
