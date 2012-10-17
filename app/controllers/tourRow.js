var APP = require('alloy/controllers/core');

var args = arguments[0];

$.rowImage.image = args.photo?args.photo.urls.square_75:"imgDefault.png";
$.rowTitle.text = args.name;
$.tourTime.text = args.time;
$.tourNotes.text = args.notes;
$.row.args = args;

function rowClick( e ){
	
	//var tourView = Alloy.createController('destinationsView', e.rowData.args).getView();
	var tourView = Alloy.createController('tourDetails', e.rowData.args).getView();      
	APP.index.add(tourView);
}

