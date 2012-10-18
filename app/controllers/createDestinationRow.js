var APP = require('alloy/controllers/core');
var args = arguments[0];

$.rowImage.image = args.icon?args.icon:"imgDefault.png";
$.rowTitle.text = args.name;
$.addressLabel.text = args.formatted_address;
$.row.args = args;
