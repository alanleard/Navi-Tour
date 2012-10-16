var APP = require('alloy/controllers/core');
var args = arguments[0];

$.rowImage.image = args.photo?args.photo.urls.square_75:"appicon.png";
$.rowTitle.text = args.name;
$.notesLabel.text = args.custom_fields.notes?args.custom_fields.notes:null;
$.row.args = args;

function rowClick(e){
	var location = Alloy.createController('locationDetails', e.rowData.args).getView();
	APP.index.add(location);
	            
}

function distanceDisplay(rowLabel){
	if ( Ti.Geolocation.locationServicesEnabled ) {
	    Titanium.Geolocation.purpose = 'Get Current Location';
	    Titanium.Geolocation.getCurrentPosition(function(e) {
	        if ( e.error ) {
	            Ti.API.error('Error: ' + e.error);
	        } else {
	           
	            var 
	            cLat = e.coords.latitude,
				cLon = e.coords.longitude,
				lt = args.latitude,
				ln = args.longitude,
				d = 3959 * Math.acos(Math.cos((cLat * Math.PI) / 180) * Math.cos((lt * Math.PI) / 180) * Math.cos((ln * Math.PI) / 180 - (cLon * Math.PI) / 180) + Math.sin((cLat * Math.PI) / 180) * Math.sin((lt * Math.PI) / 180));
			    
			    d = Math.round((d * 100)) / 100;
			
			    rowLabel.text = d + " miles";
	        }
	    });
	} 
}

distanceDisplay($.distanceLabel);


