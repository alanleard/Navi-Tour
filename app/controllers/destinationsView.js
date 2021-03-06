var 
Cloud = require('ti.cloud'),
APP = require('alloy/controllers/core'),
args = arguments[0],
tags = args?args.tags:null,
tableData = [];

APP.navTitle.text = $.tableView.title;

$.tableView.setData([{title:'Loading destinations...', color:'#fff'}]);

getLocations(tags);

function getLocations(tag){
	if(APP.destinations){
		$.tableView.setData(APP.destinations);
		distanceDisplay();
		updateCheck(tag);
	} else {
		queryDestinations(tag);
	}
}
function updateCheck(tag){
	Cloud.Places.query({
		    page: 1,
		    per_page: 100,
		    order:"name",
		    where: tag?{
		    	"tours":tag
		    }:{}
		}, function ( e ) {
		if ( e.success ) {
		    if(e.places.length!=APP.destinations.length){
		    	queryDestinations(tag);
		    }
		}
		});
}
function queryDestinations(tag){
	Cloud.Places.query({
		    page: 1,
		    per_page: 100,
		    order:"name",
		    where: tag?{
		    	"tours":tag
		    }:{}
		}, function ( e ) {
			
		    if ( e.success ) {
		    	if( e.places.length>0){
		    	
				
				for ( var i = 0, l=e.places.length; i < l; i++ ) {
					
		           var row = Alloy.createController('destinationRow', e.places[i]).getView();
		            
		            tableData.push(row);
		        }
		       	APP.destinations = tableData;
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
				for( var i = 0, l = tableData.length; i<l; i++ ){
					
					var 
					row = tableData[i],
					lt = row.args.latitude,
					ln = row.args.longitude,
					d = 3959 * Math.acos(Math.cos((cLat * Math.PI) / 180) * Math.cos((lt * Math.PI) / 180) * Math.cos((ln * Math.PI) / 180 - (cLon * Math.PI) / 180) + Math.sin((cLat * Math.PI) / 180) * Math.sin((lt * Math.PI) / 180));
			    
			    	d = Math.round((d * 100)) / 100;
			
			   		row.children[0].text = d + " miles away";
			   		//$.tableView.updateRow(i,row);
				}
				$.tableView.setData(tableData);
	        }
	    });
	} 
}

function rowClick(e){
	var view = Alloy.createController('destinationDetails', e.row.args).getView();
	$.tableView.animate({opacity:0.0, duration:250}, function(){
		view.opacity = 0.0;
		APP.index.add(view);
		view.animate({opacity:1.0, duration:100});
	});
	
	          
}
