var 
Cloud = require('ti.cloud');
var APP = require('alloy/controllers/core');
var args = arguments[0],
tags = args?args.tags:null;
APP.navTitle.text = $.tableView.title;
$.tableView.setData([{title:'Loading destinations...', color:'#fff'}]);
getLocations(tags);
//APP.navTitle.text = args.name + " Tour";
function getLocations(tag){
	
	Cloud.Places.query({
	    page: 1,
	    per_page: 100,
	    order:"order",
	    where: tag?{
	    	"tours":tag,
	    	
	        // lnglat: {
	            // '$nearSphere': [-122.23,37.12],
	            // '$maxDistance': 0.00126
	        // }
	    }:{}
	}, function ( e ) {
		
	    if ( e.success ) {
	    	if( e.places.length>0){
	    	var tableData = [];
			
			for ( var i = 0, l=e.places.length; i < l; i++ ) {
				
	           var row = Alloy.createController('destinationRow', e.places[i]).getView()
	            
	            tableData.push(row);
	        }
	        
	        $.tableView.setData(tableData);
	        distanceDisplay();
	        
	      } else {
	      	$.tableView.setData([{title:'No destinations found', color:'#fff'}]);
	      }
	        
	    } else {
	        alert('Error:\\n' +
	            ((e.error && e.message) || JSON.stringify(e)));
	    }
	});
}

function startTour(locations){
	
}

function distanceDisplay(){

	if ( Ti.Geolocation.locationServicesEnabled ) {
	    Titanium.Geolocation.purpose = 'Get Current Location';
	    Titanium.Geolocation.getCurrentPosition(function(e) {
	        if ( e.error ) {
	            Ti.API.error('Error: ' + e.error);
	        } else {
	           
	            var 
	            cLat = e.coords.latitude,
				cLon = e.coords.longitude;
				for( var i = 0, l = $.tableView.data[0].rows.length; i<l; i++ ){
					
					var 
					row = $.tableView.data[0].rows[i],
					lt = row.args.latitude,
					ln = row.args.longitude,
					d = 3959 * Math.acos(Math.cos((cLat * Math.PI) / 180) * Math.cos((lt * Math.PI) / 180) * Math.cos((ln * Math.PI) / 180 - (cLon * Math.PI) / 180) + Math.sin((cLat * Math.PI) / 180) * Math.sin((lt * Math.PI) / 180));
			    
			    	d = Math.round((d * 100)) / 100;
			
			   		row.children[0].text = d + " miles";
				}
				
	        }
	    });
	} 
}

