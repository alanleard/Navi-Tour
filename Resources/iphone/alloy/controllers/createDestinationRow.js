function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "createDestinationRow";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.row = Ti.UI.createTableViewRow({
        backgroundColor: "#000",
        height: 75,
        width: "fill",
        id: "row"
    });
    $.__views.row && $.addTopLevelView($.__views.row);
    $.__views.rowImage = Ti.UI.createImageView({
        width: 75,
        defaultImage: "imgDefault.png",
        left: 0,
        id: "rowImage"
    });
    $.__views.row.add($.__views.rowImage);
    $.__views.rowTitle = Ti.UI.createLabel({
        left: 80,
        width: "fill",
        top: 5,
        height: 20,
        color: "#fff",
        id: "rowTitle"
    });
    $.__views.row.add($.__views.rowTitle);
    $.__views.addressLabel = Ti.UI.createLabel({
        left: 80,
        color: "#fff",
        height: 55,
        width: "fill",
        bottom: 0,
        font: {
            fontSize: 12
        },
        id: "addressLabel"
    });
    $.__views.row.add($.__views.addressLabel);
    exports.destroy = function() {};
    _.extend($, $.__views);
    require("alloy/controllers/core");
    var args = arguments[0];
    $.rowImage.image = args.icon ? args.icon : "imgDefault.png";
    $.rowTitle.text = args.name;
    $.addressLabel.text = args.formatted_address;
    $.row.args = args;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;