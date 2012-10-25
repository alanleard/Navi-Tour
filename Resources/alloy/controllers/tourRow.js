function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    var $ = this, exports = {};
    $.__views.row = A$(Ti.UI.createTableViewRow({
        backgroundColor: "#000",
        height: 75,
        className: "tour",
        id: "row"
    }), "TableViewRow", null);
    $.addTopLevelView($.__views.row);
    $.__views.rowImage = A$(Ti.UI.createImageView({
        left: 0,
        width: 75,
        defaultImage: "appicon.png",
        id: "rowImage"
    }), "ImageView", $.__views.row);
    $.__views.row.add($.__views.rowImage);
    $.__views.rowTitle = A$(Ti.UI.createLabel({
        left: 85,
        height: "size",
        width: "size",
        color: "#fff",
        top: 0,
        id: "rowTitle"
    }), "Label", $.__views.row);
    $.__views.row.add($.__views.rowTitle);
    $.__views.tourTime = A$(Ti.UI.createLabel({
        right: 5,
        width: 60,
        color: "#fff",
        font: {
            fontSize: 12
        },
        bottom: 5,
        textAlign: "right",
        id: "tourTime"
    }), "Label", $.__views.row);
    $.__views.row.add($.__views.tourTime);
    $.__views.tourNotes = A$(Ti.UI.createLabel({
        left: 85,
        right: 65,
        top: 25,
        bottom: 5,
        color: "#fff",
        font: {
            fontSize: 12
        },
        textAlign: "left",
        id: "tourNotes"
    }), "Label", $.__views.row);
    $.__views.row.add($.__views.tourNotes);
    _.extend($, $.__views);
    var APP = require("alloy/controllers/core"), args = arguments[0];
    $.rowImage.image = args.photo ? args.photo.urls.square_75 : "imgDefault.png";
    $.rowTitle.text = args.name;
    $.tourTime.text = args.time;
    $.tourNotes.text = args.notes;
    $.row.args = args;
    $.row.searchFilter = args.name + " " + args.notes + " " + args.time;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A;

module.exports = Controller;