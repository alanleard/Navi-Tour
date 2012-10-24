var 
APP = require('alloy/controllers/core'),
args = arguments[0],
annotation = Ti.Map.createAnnotation({
	title:args.name,
	latitude:args.latitude,
	longitude:args.longitude,
	animate:true
});

APP.rightNav.hide();
APP.navTitle.text = args.name;

$.container.title = args.name;
$.detailLabel.text = args.custom_fields.details?args.custom_fields.details:"There are no additonal details for "+args.name;
$.imageView.image = args.photo?args.photo.urls.original:"imgDefault.png";

$.map.mapView.region = {latitude:args.latitude, longitude:args.longitude, latitudeDelta:0.1, longitudeDelta:0.1};
$.map.mapView.addAnnotation(annotation);
$.map.driveNav.addEventListener('click', driveClick);

function driveClick(){
	APP.nav.addPOI({ 
		lat:args.latitude, 
		lon:args.longitude, 
		title:args.name, 
		callbackURL:"navi-tour://",
	 	text: "Destination added successfully"
	});
}

function flipDetails(){
	$.flipView.animate({view:$.details,transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT}, function(){
		$.imageView.hide();
	}); 
	$.details.show();	      	
}

function flipImage(){
	$.flipView.animate({view:$.imageView,transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT}, function(){
		$.details.hide();
	}); 
	$.imageView.show();
}