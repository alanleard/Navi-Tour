var 
Cloud = require('ti.cloud'),
data = {classname:'tour', fields:{}};

Cloud.Users.login({
    login: 'testUser',
    password: 'NaviTour2012'
}, function (e) {

});



function nameChange(e){
	data.fields.name = e.source.value
}

function notesChange(e){
	data.fields.notes = e.source.value
}

function timeChange(e){
	data.fields.time = e.source.value
}


function submitTour(e){
	
			// var actInd = Ti.UI.createActivityIndicator({
				// message:'Loading...',
				// color:'#fff',
				// opacity:0.8,
				// borderRadius:20,
				// width:200,
				// height:150
			// });
			// $.container.add(actInd);
			// actInd.show();
		
			Ti.API.info('[ACS] Create Destination')
			alert(data)
	    	Cloud.Objects.create(data, function (x) {
		    	if (x.success) {
		    		alert(data.fields.name + " Added!");
					$.container.remove(actInd);
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
										data.photo = event.media;
										e.source.title = 'Change Photo';
										
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
									data.photo = event.media;
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