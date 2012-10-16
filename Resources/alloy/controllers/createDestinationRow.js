function Controller() {
    function rowClick(e) {
        APP.index.add(Alloy.createController("createDestinationForm", e.rowData.args).getView());
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
        left: 80,
        width: "fill",
        top: 5,
        height: 20,
        color: "#fff",
        id: "rowTitle"
    }), "Label", $.__views.row);
    $.__views.row.add($.__views.rowTitle);
    $.__views.addressLabel = A$(Ti.UI.createLabel({
        left: 80,
        color: "#fff",
        height: 55,
        width: "fill",
        bottom: 0,
        font: {
            fontSize: 12
        },
        id: "addressLabel"
    }), "Label", $.__views.row);
    $.__views.row.add($.__views.addressLabel);
    _.extend($, $.__views);
    var APP = require("alloy/controllers/core"), args = arguments[0];
    $.rowImage.image = args.icon ? args.icon : "appicon.png";
    $.rowTitle.text = args.name;
    $.addressLabel.text = args.formatted_address;
    $.row.args = args;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A;

module.exports = Controller;