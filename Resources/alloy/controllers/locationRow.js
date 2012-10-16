function Controller() {
    function rowClick(e) {
        var location = Alloy.createController("locationDetails", e.rowData.args).getView();
        APP.index.add(location);
    }
    function distanceDisplay(rowLabel) {
        if (Ti.Geolocation.locationServicesEnabled) {
            Titanium.Geolocation.purpose = "Get Current Location";
            Titanium.Geolocation.getCurrentPosition(function(e) {
                if (e.error) Ti.API.error("Error: " + e.error); else {
                    var cLat = e.coords.latitude, cLon = e.coords.longitude, lt = args.latitude, ln = args.longitude, d = 3959 * Math.acos(Math.cos(cLat * Math.PI / 180) * Math.cos(lt * Math.PI / 180) * Math.cos(ln * Math.PI / 180 - cLon * Math.PI / 180) + Math.sin(cLat * Math.PI / 180) * Math.sin(lt * Math.PI / 180));
                    d = Math.round(d * 100) / 100;
                    rowLabel.text = d + " miles";
                }
            });
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    var $ = this, exports = {};
    $.__views.row = A$(Ti.UI.createTableViewRow({
        backgroundColor: "#000",
        height: 75,
        width: "fill",
        id: "row"
    }), "TableViewRow", null);
    $.addTopLevelView($.__views.row);
    $.__views.row.on("click", rowClick);
    $.__views.rowImage = A$(Ti.UI.createImageView({
        width: 75,
        defaultImage: "appicon@2x.png",
        left: 0,
        id: "rowImage"
    }), "ImageView", $.__views.row);
    $.__views.row.add($.__views.rowImage);
    $.__views.rowTitle = A$(Ti.UI.createLabel({
        left: 85,
        height: 20,
        width: "fill",
        top: 5,
        color: "#fff",
        verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
        id: "rowTitle"
    }), "Label", $.__views.row);
    $.__views.row.add($.__views.rowTitle);
    $.__views.notesLabel = A$(Ti.UI.createLabel({
        left: 85,
        right: 65,
        top: 25,
        bottom: 5,
        color: "#fff",
        font: {
            fontSize: 12
        },
        textAlign: "left",
        id: "notesLabel"
    }), "Label", $.__views.row);
    $.__views.row.add($.__views.notesLabel);
    $.__views.distanceLabel = A$(Ti.UI.createLabel({
        right: 5,
        width: 60,
        color: "#fff",
        font: {
            fontSize: 12
        },
        bottom: 5,
        textAlign: "right",
        id: "distanceLabel"
    }), "Label", $.__views.row);
    $.__views.row.add($.__views.distanceLabel);
    _.extend($, $.__views);
    var APP = require("alloy/controllers/core"), args = arguments[0];
    $.rowImage.image = args.photo ? args.photo.urls.square_75 : "appicon.png";
    $.rowTitle.text = args.name;
    $.notesLabel.text = args.custom_fields.notes ? args.custom_fields.notes : null;
    $.row.args = args;
    distanceDisplay($.distanceLabel);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A;

module.exports = Controller;