var 
Cloud = require('ti.cloud'),
APP = require('alloy/controllers/core');
APP.navTitle.text = $.container.title;
$.table.setData([{title:'Loading...', color:'#fff'}]);
getTours()

function getTours(){
	Cloud.Objects.query({
	    classname: 'tour',
	    page: 1,
	    per_page: 100,
	    // where: {
	        // color: 'blue'
	    // }
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
	        $.table.setData(tableData);
	        	        	
	        } else {
	        	$.table.setData([{title:'No tours found', color:'#fff'}]);
	        }
	    } else {
	        alert('Error:\\n' +
	            ((e.error && e.message) || JSON.stringify(e)));
	    }
	});
}