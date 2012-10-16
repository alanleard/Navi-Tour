function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    var $ = this, exports = {};
    $.__views.createTour = A$(Ti.UI.createView({
        backgroundColor: "white",
        id: "createTour"
    }), "View", null);
    $.addTopLevelView($.__views.createTour);
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A;

module.exports = Controller;