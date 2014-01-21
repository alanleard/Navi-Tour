function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "tourRow";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.row = Ti.UI.createTableViewRow({
        backgroundColor: "#000",
        height: 75,
        className: "tour",
        id: "row"
    });
    $.__views.row && $.addTopLevelView($.__views.row);
    $.__views.rowImage = Ti.UI.createImageView({
        left: 0,
        width: 75,
        defaultImage: "appicon.png",
        id: "rowImage"
    });
    $.__views.row.add($.__views.rowImage);
    $.__views.rowTitle = Ti.UI.createLabel({
        left: 85,
        height: "size",
        width: "size",
        color: "#fff",
        top: 0,
        id: "rowTitle"
    });
    $.__views.row.add($.__views.rowTitle);
    $.__views.tourTime = Ti.UI.createLabel({
        right: 5,
        width: 60,
        color: "#fff",
        font: {
            fontSize: 12
        },
        bottom: 5,
        textAlign: "right",
        id: "tourTime"
    });
    $.__views.row.add($.__views.tourTime);
    $.__views.tourNotes = Ti.UI.createLabel({
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
    });
    $.__views.row.add($.__views.tourNotes);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = (require("alloy/controllers/core"), arguments[0]);
    $.rowImage.image = args.photo ? args.photo.urls.square_75 : "imgDefault.png";
    $.rowTitle.text = args.name;
    $.tourTime.text = args.time;
    $.tourNotes.text = args.notes;
    $.row.args = args;
    $.row.searchFilter = args.name + " " + args.notes + " " + args.time;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;