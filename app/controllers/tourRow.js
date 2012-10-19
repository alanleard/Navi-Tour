var 
APP = require('alloy/controllers/core'),
args = arguments[0];

$.rowImage.image = args.photo?args.photo.urls.square_75:"imgDefault.png";
$.rowTitle.text = args.name;
$.tourTime.text = args.time;
$.tourNotes.text = args.notes;
$.row.args = args;

