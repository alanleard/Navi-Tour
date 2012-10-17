var APP = require('alloy/controllers/core');
var args = arguments[0];

$.rowImage.image = args.photo?args.photo.urls.square_75:"imgDefault.png";
$.rowTitle.text = args.name;
$.notesLabel.text = args.custom_fields.notes?args.custom_fields.notes:null;
$.row.args = args;

function rowClick(e){
	var location = Alloy.createController('destinationDetails', e.rowData.args).getView();
	APP.index.add(location);
	            
}




