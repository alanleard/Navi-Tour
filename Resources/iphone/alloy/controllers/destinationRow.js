function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "destinationRow";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.row = Ti.UI.createTableViewRow({
        backgroundColor: "#000",
        height: 75,
        width: "fill",
        className: "destination",
        id: "row"
    });
    $.__views.row && $.addTopLevelView($.__views.row);
    $.__views.distanceLabel = Ti.UI.createLabel({
        right: 5,
        width: 50,
        color: "#fff",
        font: {
            fontSize: 12
        },
        bottom: 5,
        textAlign: "right",
        id: "distanceLabel"
    });
    $.__views.row.add($.__views.distanceLabel);
    $.__views.rowImage = Ti.UI.createImageView({
        width: 75,
        defaultImage: "imgDefault.png",
        left: 0,
        id: "rowImage"
    });
    $.__views.row.add($.__views.rowImage);
    $.__views.rowTitle = Ti.UI.createLabel({
        left: 85,
        height: 20,
        width: "fill",
        top: 5,
        color: "#fff",
        verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
        id: "rowTitle"
    });
    $.__views.row.add($.__views.rowTitle);
    $.__views.notesLabel = Ti.UI.createLabel({
        left: 85,
        right: 55,
        top: 25,
        bottom: 5,
        color: "#fff",
        font: {
            fontSize: 12
        },
        textAlign: "left",
        id: "notesLabel"
    });
    $.__views.row.add($.__views.notesLabel);
    exports.destroy = function() {};
    _.extend($, $.__views);
    require("alloy/controllers/core");
    var args = arguments[0];
    $.rowImage.image = args.photo ? args.photo.urls.square_75 : "imgDefault.png";
    $.rowTitle.text = args.name;
    $.notesLabel.text = args.custom_fields.notes ? args.custom_fields.notes : null;
    $.row.args = args;
    $.row.searchFilter = args.name + " " + args.custom_fields.notes + " " + args.custom_fields.details;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;