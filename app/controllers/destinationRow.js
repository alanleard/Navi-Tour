var APP = require('alloy/controllers/core');
var args = arguments[0];

$.rowImage.image = args.photo?args.photo.urls.square_75:"imgDefault.png";
$.rowTitle.text = args.name;
$.notesLabel.text = args.custom_fields.notes?args.custom_fields.notes:null;
$.row.args = args;
$.row.searchFilter = args.name+' '+args.custom_fields.notes+' '+args.custom_fields.details;


