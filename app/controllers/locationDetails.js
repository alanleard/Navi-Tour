var APP = require('alloy/controllers/core');

var args = arguments[0];
APP.rightNav.hide();
APP.navTitle.text = args.name;
$.container.title = args.name;
$.detailLabel.text = args.custom_fields.details?args.custom_fields.details:"There are no additonal details for "+args.name;

$.Image.image = args.photo?args.photo.urls.original:"appicon.png";
var annotation = Ti.Map.createAnnotation({
	title:args.name,
	latitude:args.latitude,
	longitude:args.longitude,
	animate:true
});

$.Mapview.setRegion({latitude:args.latitude, longitude:args.longitude, latitudeDelta:0.1, longitudeDelta:0.1});
$.Mapview.addAnnotation(annotation);

function driveClick(){
	APP.nav.addPOI({ lat:args.latitude, lon:args.longitude, title:args.name},
		function(){alert('Pushed to GPS');
	});
}

function flipDetails(){
	$.containerView.animate({view:$.details,transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT}, function(){
		$.Image.hide();
	}); 
	$.details.show();	
	      	
}

function flipImage(){
	$.containerView.animate({view:$.Image,transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT}, function(){
		$.details.hide();
	}); 
	$.Image.show();
}

function mapClick(){
	if($.Mapview.mapType==Titanium.Map.STANDARD_TYPE){
		$.Mapview.mapType = Titanium.Map.SATELLITE_TYPE;
		$.mapType.title = 'Satellite';
	} else if ( $.Mapview.mapType==Titanium.Map.SATELLITE_TYPE ){
		$.Mapview.mapType = Titanium.Map.HYBRID_TYPE
		$.mapType.title = 'Hybrid';
	} else if ( $.Mapview.mapType = Titanium.Map.HYBRID_TYPE ){
		$.Mapview.mapType = Titanium.Map.STANDARD_TYPE
		$.mapType.title = 'Standard';
	}
	
}
