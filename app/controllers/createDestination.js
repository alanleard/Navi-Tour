var APP = require('alloy/controllers/core');
APP.navTitle.text = $.container.title;

APP.rightNav.hide();

function searchWeb(e){
$.searchBar.blur();	
$.searchTable.setData([{title:'Searching...', color:'#fff'}]);
var url = "https://maps.googleapis.com/maps/api/place/textsearch/json?sensor=true&key=AIzaSyCRn6OD_Jn5hKyjI6Gs0cttF2W1C-jYzYw&query=";

 var client = Ti.Network.createHTTPClient({
     // function called when the response data is available
     onload : function(e) {
     	var returnData = JSON.parse(this.responseText);
        var results = returnData.results
         
         
         if(results.length>0){
         	var tableData = [];
	         for(var i=0, l = results.length; i<l; i++){
	         	var row = Alloy.createController('createDestinationRow', results[i]).getView()
	
	         	tableData.push(row);
	         }
	         $.searchTable.setData(tableData);
         } else {
         	$.searchTable.setData([{title:'No results found', color:'#fff'}]);
         }
     },
     // function called when an error occurs, including a timeout
     onerror : function(e) {
         Ti.API.debug(e.error);
         alert('error');
     },
     timeout : 5000  // in milliseconds
 });
 // Prepare the connection.
 client.open("GET", url+e.source.value);
 // Send the request.
 client.send(); 

}

function rowClick(e){
	var view = Alloy.createController('createDestinationForm', e.rowData.args).getView();
	APP.index.add(view);
		
}
