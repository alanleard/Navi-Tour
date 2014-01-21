
function mapClick(){
	if($.mapView.mapType==Titanium.Map.STANDARD_TYPE){
		$.mapView.mapType = Titanium.Map.SATELLITE_TYPE;
		$.mapType.title = 'Satellite';
	} else if ( $.mapView.mapType==Titanium.Map.SATELLITE_TYPE  && OS_IOS){
		$.mapView.mapType = Titanium.Map.HYBRID_TYPE;
		$.mapType.title = 'Hybrid';
	} else {
		$.mapView.mapType = Titanium.Map.STANDARD_TYPE;
		$.mapType.title = 'Standard';
	}
	
}

function mapSize(e){
	if($.mapView.top ==0){
		$.mapView.top = "55%";
		$.mapType.top = "56%";
		$.mapSize.top = "56%";
		e.source.transform = null;
	} else {
		if(OS_IOS){
			
			$.mapView.animate({top:0, duration:200},
			function(){
				$.mapView.top = 0;
				e.source.transform = Ti.UI.create2DMatrix({rotate:180});
				$.mapType.top = 5;
				$.mapSize.top = 5;
			});
			$.mapType.animate({top: 5, duration:200});
			$.mapSize.animate({top: 5, duration:200});
		} else {
			$.mapType.top = 5;
			$.mapSize.top = 5;
			$.mapView.top = 0;
			e.source.transform = Ti.UI.create2DMatrix({rotate:180});
		}
	}
	
}
