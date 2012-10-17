var 
Cloud = require('ti.cloud'),
args = arguments[0],
data = args,
address = data.formatted_address.split(","),
destinationData = {
	name: data.name,
	address: address[0],
	city: address[1],
	state: address[2],
	latitude: data.geometry.location.lat,
	longitude: data.geometry.location.lng,
	custom_fields:{reference:data.reference}
};


$.name.value = data.name;
// $.address.value =address[0];
// $.city.value =address[1];
// $.state.value =address[2];
Cloud.Users.login({
    login: 'testUser',
    password: 'NaviTour2012'
}, function (e) {

});
	
	// if(Ti.Facebook.loggedIn){
		// $.submit.show();
	// } else {
		//var loginBtn = Ti.Facebook.createLoginButton({});
		// var loginBtn = Ti.UI.createButton({
			// width:200,
			// height:30,
			// title:'Login'
		// });
// 		
		// loginBtn.addEventListener('click', function(e){
			// Cloud.Users.login({
			    // login: 'testUser',
			    // password: 'NaviTour2012'
			// }, function (e) {
			    // if (e.success) {
// 			    	
			    	// loginBtn.hide();
					// $.submit.show();
			    // }
			// });
		// })
		// $.mainView.add(loginBtn);
		
		// Ti.Facebook.addEventListener('login', function(e) {
// 			
		    // if (e.success) {
		    // loginBtn.hide();
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
	//}

function nameChange(e){
	destinationData.name = e.source.value
}

function addressChange(e){
	destinationData.address = e.source.value
}

function notesChange(e){
	destinationData.custom_fields.notes = e.source.value
}

function detailsChange(e){
	destinationData.custom_fields.details = e.source.value
}

function orderChange(e){
	
	destinationData.custom_fields.order = e.source.value
}

// function toursChange(e){
	// destinationData.custom_fields.tours = e.source.value
// }
toursList();
function toursList(e){
	
	Cloud.Objects.query({
	    classname: 'tour',
	    page: 1,
	    per_page: 100,
	    response_json_depth:1
	    // where: {
	        // color: 'blue'
	    // }
	}, function ( e ) {
		
	    if ( e.success ) {

	        var selectTour = Ti.UI.createTableViewSection({ headerTitle: 'Select a Tour' });

	        for ( var i = 0, l=e.tour.length; i < l; i++ ) {
	        	
	        	var row = Ti.UI.createTableViewRow({
	        		title:e.tour[i].name,
	        		tag:e.tour[i].tags,
	        		hasCheck:false,
	        		font:{fontSize:14},
	        		height:30
	        	});
	        	
	           selectTour.add(row);
	            
	        }
	       
	     $.tours.data = [selectTour];
	        
         $.tours.addEventListener('click', function(e){
            	if(e.rowData.hasCheck){
            		e.rowData.hasCheck=false;
            		destinationData.custom_fields.tours = null;
            		
            	} else{
            		
            		for(var i=0, l=$.tours.data[0].rows.length; i<l;i++){
            			$.tours.data[0].rows[i].hasCheck = false;
            		}
            		
            		e.rowData.hasCheck=true
            		//var prevTag = destinationData.tags
            		destinationData.custom_fields.tours = e.rowData.tag
            		
            	}
            });
      
	        
	    } else {
	        alert('Error:\\n' +
	            ((e.error && e.message) || JSON.stringify(e)));
	    }
	});
}

function submitDestination(e){
	
			
		
			Ti.API.info('[ACS] Create Destination')
						
	    	Cloud.Places.create(destinationData, function (x) {
		    	if (x.success) {
		    		alert(destinationData.name + " Added!");
					
		    	} else {
		    		
		        	alert("Error: "+x.message)
		    	}
			});
};	

function photoClick(e){

			 	
			 	//var photoObj = {};
			 	//photoObj.require = data.required;
			 	
			 	function selectImage(){

					if(Ti.Media.isCameraSupported){
						var dialog = Ti.UI.createOptionDialog({
							title: 'Start by selecting an image.',
							options:['Camera', 'Photo Gallery', 'Cancel'],
							buttonNames: ['Camera', 'Photo Gallery' ],
							cancel:2
						})
						dialog.show();
							
						dialog.addEventListener('click', function(e){
							switch(e.index)
							{
							case 0:
								camera();
							  break;
							case 1:
								gallery();
							  break;
							}
						});
					} else {
						gallery();
					}
					
					function camera(){
						Ti.Media.showCamera({
								success:function(event)
									{
										destinationData.photo = event.media;
										photoButton.title = 'Change Photo';
										
								},
								cancel:function(){},
								error:function(error)
								{
									var a = Titanium.UI.createAlertDialog({title:'Camera'});
							
									// set message
									if (error.code == Titanium.Media.NO_CAMERA)
									{
										a.setMessage('Device does not have photo capabilities');
									}
									else
									{
										a.setMessage('Unexpected error: ' + error.code);
									}
							
									// show alert
									a.show();
								},

								allowEditing:true
						});
					}
					function gallery(){
				
						Ti.Media.openPhotoGallery({
							success:function(event)
								{
									destinationData.photo = event.media;
									e.source.title = 'Change Photo';
							},
							cancel:function(){},
							error:function(error)
							{
								var a = Titanium.UI.createAlertDialog({title:'Camera'});
								if (error.code == Titanium.Media.NO_CAMERA)
								{
									a.setMessage('Device does not have video recording capabilities');
								}
								else
								{
									a.setMessage('Unexpected error: ' + error.code);
								}
								a.show();
							},
							allowEditing:true
						});
					}
					
				}
			 	
			 	
			 	selectImage();
}