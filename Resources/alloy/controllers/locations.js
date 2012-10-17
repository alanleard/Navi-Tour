function Controller() {
    function getLocations(tag) {
        Cloud.Places.query({
            page: 1,
            per_page: 100,
            order: "order",
            where: tag ? {
                tours: tag
            } : {}
        }, function(e) {
            if (e.success) if (e.places.length > 0) {
                var tableData = [];
                for (var i = 0, l = e.places.length; i < l; i++) {
                    var location = e.places[i], row = Alloy.createController("locationRow", location).getView();
                    tableData.push(row);
                }
                $.table.setData(tableData);
            } else $.table.setData([ {
                title: "No destinations found",
                color: "#fff"
            } ]); else alert("Error:\\n" + (e.error && e.message || JSON.stringify(e)));
        });
    }
    function startTour(locations) {}
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    var $ = this, exports = {};
    $.__views.container = A$(Ti.UI.createView({
        backgroundColor: "#000",
        title: "Available Destinations",
        id: "container"
    }), "View", null);
    $.addTopLevelView($.__views.container);
    var __alloyId4 = [];
    $.__views.table = A$(Ti.UI.createTableView({
        backgroundColor: "#000",
        id: "table"
    }), "TableView", $.__views.container);
    $.__views.container.add($.__views.table);
    _.extend($, $.__views);
    var Cloud = require("ti.cloud"), APP = require("alloy/controllers/core"), args = arguments[0], tags = args ? args.tags : null;
    APP.navTitle.text = $.container.title;
    $.table.setData([ {
        title: "Loading...",
        color: "#fff"
    } ]);
    getLocations(tags);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A;

module.exports = Controller;