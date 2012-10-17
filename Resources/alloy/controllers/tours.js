function Controller() {
    function getTours() {
        Cloud.Objects.query({
            classname: "tour",
            page: 1,
            per_page: 100
        }, function(e) {
            if (e.success) if (e.tour.length > 0) {
                var tableData = [];
                for (var i = 0, l = e.tour.length; i < l; i++) {
                    var tour = e.tour[i], row = Alloy.createController("tourRow", tour).getView();
                    tableData.push(row);
                }
                $.table.setData(tableData);
            } else $.table.setData([ {
                title: "No tours found",
                color: "#fff"
            } ]); else alert("Error:\\n" + (e.error && e.message || JSON.stringify(e)));
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    var $ = this, exports = {};
    $.__views.container = A$(Ti.UI.createView({
        backgroundColor: "#000",
        title: "Available Tours",
        id: "container"
    }), "View", null);
    $.addTopLevelView($.__views.container);
    var __alloyId6 = [];
    $.__views.table = A$(Ti.UI.createTableView({
        backgroundColor: "#000",
        id: "table"
    }), "TableView", $.__views.container);
    $.__views.container.add($.__views.table);
    _.extend($, $.__views);
    var Cloud = require("ti.cloud"), APP = require("alloy/controllers/core");
    APP.navTitle.text = $.container.title;
    $.table.setData([ {
        title: "Loading...",
        color: "#fff"
    } ]);
    getTours();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A;

module.exports = Controller;