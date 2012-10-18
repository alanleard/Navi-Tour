function Controller() {
    function rowClick(e) {
        var location = Alloy.createController("destinationDetails", e.rowData.args).getView();
        APP.index.add(location);
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
    $.__views.distanceLabel = A$(Ti.UI.createLabel({
        right: 5,
        width: 50,
        color: "#fff",
        font: {
            fontSize: 12
        },
        bottom: 5,
        textAlign: "right",
        id: "distanceLabel"
    }), "Label", $.__views.row);
    $.__views.row.add($.__views.distanceLabel);
    $.__views.rowImage = A$(Ti.UI.createImageView({
        width: 75,
        defaultImage: "imgDefault.png",
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
        right: 55,
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
    _.extend($, $.__views);
    var APP = require("alloy/controllers/core"), args = arguments[0];
    $.rowImage.image = args.photo ? args.photo.urls.square_75 : "imgDefault.png";
    $.rowTitle.text = args.name;
    $.notesLabel.text = args.custom_fields.notes ? args.custom_fields.notes : null;
    $.row.args = args;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A;

module.exports = Controller;