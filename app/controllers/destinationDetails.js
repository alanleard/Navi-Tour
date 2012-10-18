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
$.mapView.setRegion({latitude:args.latitude, longitude:args.longitude, latitudeDelta:0.1, longitudeDelta:0.1});
$.mapView.addAnnotation(annotation);

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

function mapClick(){
	if($.mapView.mapType==Titanium.Map.STANDARD_TYPE){
		$.mapView.mapType = Titanium.Map.SATELLITE_TYPE;
		$.mapType.title = 'Satellite';
	} else if ( $.mapView.mapType==Titanium.Map.SATELLITE_TYPE ){
		$.mapView.mapType = Titanium.Map.HYBRID_TYPE
		$.mapType.title = 'Hybrid';
	} else if ( $.mapView.mapType = Titanium.Map.HYBRID_TYPE ){
		$.mapView.mapType = Titanium.Map.STANDARD_TYPE
		$.mapType.title = 'Standard';
	}
	
}

function mapSize(e){
	if($.mapView.top ==0){
		// $.mapView.animate({top:"55%", duration:500},
		// function(){
			$.mapView.top = "55%";
			e.source.transform = null;
		//});
		
	} else {
		$.mapView.animate({top:0, duration:200},
		function(){
			$.mapView.top = 0;
			
			e.source.transform = Ti.UI.create2DMatrix({rotate:180});
		});
	}
	
}
