var 
APP = require('alloy/controllers/core'),
args = arguments[0],
annotation = Ti.Map.createAnnotation({
	title:args.name,
	latitude:args.latitude,
	longitude:args.longitude,
	animate:true
});

APP.rightNav.hide();
APP.navTitle.text = args.name;
$.videoPlayer.url = args.website?args.website:null;
$.container.title = args.name;
$.detailLabel.text = args.custom_fields.details?args.custom_fields.details:"There are no additonal details for "+args.name;
$.imageView.image = args.photo?args.photo.urls.original:"imgDefault.png";

$.map.mapView.region = {latitude:args.latitude, longitude:args.longitude, latitudeDelta:0.1, longitudeDelta:0.1};
$.map.mapView.addAnnotation(annotation);
$.map.driveNav.addEventListener('click', driveClick);


//playAudio();
playVideo();
function driveClick(){
	APP.nav.addPOI({ 
		lat:args.latitude, 
		lon:args.longitude, 
		title:args.name, 
		callbackURL:"navi-tour://",
	 	text: "Destination added successfully"
	});
}

function flipDetails(){
	$.flipView.animate({view:$.details,transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT}, function(){
		$.imageView.hide();
	}); 
	$.details.show();	      	
}

function flipImage(){
	$.flipView.animate({view:$.imageView,transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT}, function(){
		$.details.hide();
	}); 
	$.imageView.show();
}

function playAudio(){

	
	var startStopButton = Titanium.UI.createButton({
	    title:'Start/Stop Streaming',
	    top:10,
	    width:200,
	    height:40
	});
	
	var pauseResumeButton = Titanium.UI.createButton({
	    title:'Pause/Resume Streaming',
	    top:10,
	    width:200,
	    height:40,
	    enabled:false
	});
	
	$.container.add(startStopButton);
	$.container.add(pauseResumeButton);
	
	// allowBackground: true on Android allows the 
	// player to keep playing when the app is in the 
	// background.
	var audioPlayer = Ti.Media.createAudioPlayer({ 
	    url: 'http://promodj.com/source/3441253/Example_Change_The_Way_You_Kiss_Me_Dj_Electric_Touch_Remix.mp3',
	    allowBackground: false
	});           
	    
	startStopButton.addEventListener('click',function() {
	    // When paused, playing returns false.
	    // If both are false, playback is stopped.
	    if (audioPlayer.playing || audioPlayer.paused)
	    {
	        audioPlayer.stop();
	        pauseResumeButton.enabled = false;
	        if (Ti.Platform.name === 'android')
	        { 
	            audioPlayer.release();
	        }   
	    }
	    else
	    {
	        audioPlayer.start();
	        pauseResumeButton.enabled = true;
	    }
	});
	
	pauseResumeButton.addEventListener('click', function() {
	    if (audioPlayer.paused) {
	        audioPlayer.start();
	    }
	    else {
	        audioPlayer.pause();
	    }
	});
	
	audioPlayer.addEventListener('progress',function(e) {
	    Ti.API.info('Time Played: ' + Math.round(e.progress) + ' milliseconds');
	});
	
	audioPlayer.addEventListener('change',function(e)
	{
	    Ti.API.info('State: ' + e.description + ' (' + e.state + ')');
	});
	
	// win.addEventListener('close',function() {
	    // audioPlayer.stop();
	    // if (Ti.Platform.osname === 'android')
	    // { 
	        // audioPlayer.release();
	    // }
	// });
	audioPlayer.start();
	
}

function playVideo(){
	
	$.videoPlayer.animate({opacity:1.0, duration:500});
	$.flipView.animate({opacity:0.0, duration:500});
}

function completeVideo(){
	$.videoPlayer.pause();
	$.videoPlayer.animate({height:30, width:40, top:5, right:5, duration:250});
	$.videoPlayer.expanded = false;
	$.flipView.animate({opacity:1.0, duration:500});
}

function sizePlayer(){
	if($.videoPlayer.expanded){
		completeVideo()
	} else {
		$.videoPlayer.animate({ 
			top:10,
			right:10,
			height:190,
			width:320,
			duration:500
		});
		$.videoPlayer.expanded = true;
		$.videoPlayer.start();
		$.flipView.animate({opacity:0.0, duration:500});
	}
	
}
