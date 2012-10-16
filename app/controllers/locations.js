var 
Cloud = require('ti.cloud');
var APP = require('alloy/controllers/core');
var args = arguments[0],
tags = args?args.tags:null;
APP.navTitle.text = $.container.title;
getLocations(tags);
//APP.navTitle.text = args.name + " Tour";
function getLocations(tag){
	
	Cloud.Places.query({
	    page: 1,
	    per_page: 100,
	    order:'order',
	    where: tag?{
	    	"tours":tag,
	    	
	        // lnglat: {
	            // '$nearSphere': [-122.23,37.12],
	            // '$maxDistance': 0.00126
	        // }
	    }:{}
	}, function ( e ) {
		
	    if ( e.success ) {
	    	
	    	var tableData = [];
			
			for ( var i = 0, l=e.places.length; i < l; i++ ) {
				
	        	var 
	        	location = e.places[i],
	            row = Alloy.createController('locationRow', location).getView()
	            
	            tableData.push(row);
	        }
	        
	        $.table.setData(tableData);
	        
	    } else {
	        alert('Error:\\n' +
	            ((e.error && e.message) || JSON.stringify(e)));
	    }
	});
}

function startTour(locations){
	
}