function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    var $ = this, exports = {};
    $.__views.tourDetails = A$(Ti.UI.createView({
        backgroundColor: "white",
        id: "tourDetails"
    }), "View", null);
    $.addTopLevelView($.__views.tourDetails);
    var __alloyId5 = [];
    $.__views.map = A$(Ti.Map.createView({
        annotations: __alloyId5,
        ns: "Ti.Map",
        id: "map"
    }), "View", $.__views.tourDetails);
    $.__views.tourDetails.add($.__views.map);
    $.__views.locations = Alloy.createController("locations", {
        id: "locations"
    });
    $.__views.locations.setParent($.__views.tourDetails);
    $.__views.start = A$(Ti.UI.createButton({
        title: "Get Started!",
        id: "start"
    }), "Button", $.__views.tourDetails);
    $.__views.tourDetails.add($.__views.start);
    $.__views.start.on("click", startClick);
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A;

module.exports = Controller;