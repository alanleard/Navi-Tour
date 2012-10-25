var 
Cloud = require('ti.cloud'),
APP = require('alloy/controllers/core');

APP.navTitle.text = $.tableView.title;

$.tableView.setData([{title:'Loading tours...', color:'#fff'}]);

getTours()

function getTours(){
	if(APP.tours){
		$.tableView.setData(APP.tours);
		updateCheck();
	} else {
		queryTours();
	}
}

function queryTours(){
	Cloud.Objects.query({
		    classname: 'tour',
		    page: 1,
		    per_page: 100,
		    order:"name"
	
		}, function ( e ) {
			
		    if ( e.success ) {
		        if( e.tour.length >0){
	
		        var tableData = [];
		        
		        for ( var i = 0, l=e.tour.length; i < l; i++ ) {
		        	var 
		        	tour = e.tour[i],
		            row = Alloy.createController('tourRow', tour).getView();
		            
		            tableData.push(row);
		        }
		        $.tableView.setData(tableData);
		        APP.tours = tableData;	        	
		        } else {
		        	$.tableView.setData([{title:'No tours found', color:'#fff'}]);
		        }
		    } else {
		        alert('Error:\\n' +
		            ((e.error && e.message) || JSON.stringify(e)));
		    }
	});
}

function updateCheck(){
	Cloud.Objects.query({
		    classname: 'tour',
		    page: 1,
		    per_page: 100,
		    order:"name"
	
		}, function ( e ) {
			
		    if ( e.success ) {
		    	if(e.tour.length != APP.tours.length){
		    		queryTours();
		    	}
		    }
	});
}
function rowClick( e ){
	var view = Alloy.createController('tourDetails', e.rowData.args).getView();      
	$.tableView.animate({opacity:0.0, duration:250}, function(){
		view.opacity = 0.0;
		APP.index.add(view);
		view.animate({opacity:1.0, duration:100});
	});
	
}
