var APP = require('alloy/controllers/core');
var args = arguments[0];

$.rowImage.image = args.icon?args.icon:"appicon.png";
$.rowTitle.text = args.name;
$.addressLabel.text = args.formatted_address;
$.row.args = args;



function rowClick(e){
	APP.index.add(Alloy.createController('createDestinationForm', e.rowData.args).getView());
	// var url = "https://maps.googleapis.com/maps/api/place/details/json?sensor=true&key=AIzaSyAie3Ougsoxl7tlnxmfTVGiIfL-jT17ZwU&reference="
// 	
 	// var client = Ti.Network.createHTTPClient({
     // // function called when the response data is available
     // onload : function(e) {
     	// var returnData = JSON.parse(this.responseText);
       // // var results = returnData.results
//          
         // alert(returnData)
         // // if(results.length>0){
         	// // var tableData = [];
	         // // for(var i=0, l = results.length; i<l; i++){
	         	// // var row = Alloy.createController('createDestinationRow', results[i]).getView()
// // 	
	         	// // tableData.push(row);
	         // // }
	         // // $.searchTable.setData(tableData);
         // // } else {
         	// // var row = Ti.UI.createTableViewRow({
         		// // title:"No Results Found"
         	// // });
// //          	
         	// // $.searchTable.setData([row]);
         // // }
     // },
     // // function called when an error occurs, including a timeout
     // onerror : function(e) {
         // Ti.API.debug(e.error);
         // alert('error');
     // },
     // timeout : 5000  // in milliseconds
 // });
 // // Prepare the connection.
 // client.open("GET", url+e.rowData.args.reference);
 // // Send the request.
 // client.send(); 
// 	
	
	
// 	
	// var data = e.rowData.args;
	// var address = data.formatted_address.split(",");
	// var destinationData = []
		// $.name.value = data.name;
		// $.address =address[0];
		// $.city =address[1];
		// $.state =address[2];
		// //photo:data.icon,
		// //latitude =data.geometry.location.lat,
		// //longitude=data.geometry.location.lng,
		// //tags='mtshasta',
		// //custom_fields={reference:data.reference}
// 	
// 
// 
// 	
	// if(Ti.Facebook.loggedIn){
		// $.submit.show();
	// } else {
		// var fbLogin = Ti.Facebook.createLoginButton();
		// $.container.add(fbLogin);
// 		
		// Ti.Facebook.addEventListener('login', function(e) {
// 			
		    // if (e.success) {
		    // fbLogin.hide();
			// $.submit.show();
		      // Cloud.SocialIntegrations.externalAccountLogin({
				    // type: 'facebook',
				    // token: Ti.Facebook.accessToken
				// }, function (e) {
				    // if (e.success) {
// 						
		    		// }
		            // else {
// 		            	
		               // alert("Error: "+e.message);
// 		
		            // }
				// });
// 		       
		    // }
		// });
	// }
// 
// function submitDestination(){
		// var Cloud = require('ti.cloud');
// 		
			// Ti.API.info('[ACS] Create Destination')
// 						
	    	// Cloud.Places.create(destinationData, function (x) {
		    	// if (x.success) {
		    		// alert(destinationData.name + " Added!");
// 	
		    	// } else {
// 		    	
		        	// alert("Error: "+x.message)
		    	// }
			// });
// };	
// 		
		
	
		
		
		// Cloud.Users.login({
		    // login: 'alan@222wine.com',
		    // password: 'Pulcini22'
		// }, function (e) {
		    // if (e.success) {
		       // Ti.API.info('[ACS] Create Destination')
// 				
		        // Cloud.Places.create(destinationData, function (x) {
				    // if (x.success) {
				    	// alert(destinationData.name + " Added!");
// 			
				    // } else {
// 				    	
				        // alert("Error: "+x.message)
				    // }
				// });
		    // } else {
		        // alert('Error:\\n' +
		            // ((e.error && e.message) || JSON.stringify(e)));
		    // }
		// });
// 	
// });
		
		
	
	
};
	
	
	
	// var location = Alloy.createController('locationDetails', e.rowData.args).getView();
	// APP.index.add(location);
	            
//}
// 
// function distanceDisplay(rowLabel){
	// if ( Ti.Geolocation.locationServicesEnabled ) {
	    // Titanium.Geolocation.purpose = 'Get Current Location';
	    // Titanium.Geolocation.getCurrentPosition(function(e) {
	        // if ( e.error ) {
	            // Ti.API.error('Error: ' + e.error);
	        // } else {
// 	           
	            // var 
	            // cLat = e.coords.latitude,
				// cLon = e.coords.longitude,
				// lt = args.latitude,
				// ln = args.longitude,
				// d = 3959 * Math.acos(Math.cos((cLat * Math.PI) / 180) * Math.cos((lt * Math.PI) / 180) * Math.cos((ln * Math.PI) / 180 - (cLon * Math.PI) / 180) + Math.sin((cLat * Math.PI) / 180) * Math.sin((lt * Math.PI) / 180));
// 			    
			    // d = Math.round((d * 100)) / 100;
// 			
			    // rowLabel.text = d + " miles";
	        // }
	    // });
	// } 
// }
// 
// distanceDisplay($.distanceLabel);


