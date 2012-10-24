
function mapClick(){
	if($.mapView.mapType==Titanium.Map.STANDARD_TYPE){
		$.mapView.mapType = Titanium.Map.SATELLITE_TYPE;
		$.mapType.title = 'Satellite';
	} else if ( $.mapView.mapType==Titanium.Map.SATELLITE_TYPE ){
		$.mapView.mapType = Titanium.Map.HYBRID_TYPE
		$.mapType.title = 'Hybrid';
	} else if ( $.mapView.mapType = Titanium.Map.HYBRID_TYPE ){
		$.mapView.mapType = Titanium.Map.STANDARD_TYPE
		$.mapType.title = 'Standard';
	}
	
}

function mapSize( e ){
	if($.mapView.top ==0){
		$.mapView.top = "55%";
		e.source.transform = null;
	} else {
		$.mapView.animate({top:0, duration:200},
		function(){
			$.mapView.top = 0;
			e.source.transform = Ti.UI.create2DMatrix({rotate:180});
		});
	}
	
}
