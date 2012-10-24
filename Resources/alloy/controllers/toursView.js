function Controller() {
    function getTours() {
        Cloud.Objects.query({
            classname: "tour",
            page: 1,
            per_page: 100,
            order: "name"
        }, function(e) {
            if (e.success) if (e.tour.length > 0) {
                var tableData = [];
                for (var i = 0, l = e.tour.length; i < l; i++) {
                    var tour = e.tour[i], row = Alloy.createController("tourRow", tour).getView();
                    tableData.push(row);
                }
                $.tableView.setData(tableData);
            } else $.tableView.setData([ {
                title: "No tours found",
                color: "#fff"
            } ]); else alert("Error:\\n" + (e.error && e.message || JSON.stringify(e)));
        });
    }
    function rowClick(e) {
        var view = Alloy.createController("tourDetails", e.rowData.args).getView();
        $.container.animate({
            opacity: 0,
            duration: 250
        }, function() {
            view.opacity = 0;
            APP.index.add(view);
            view.animate({
                opacity: 1,
                duration: 100
            });
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    var $ = this, exports = {};
    $.__views.container = A$(Ti.UI.createView({
        title: "Available Tours",
        backgroundColor: "#000",
        id: "container"
    }), "View", null);
    $.addTopLevelView($.__views.container);
    var __alloyId5 = [];
    $.__views.tableView = A$(Ti.UI.createTableView({
        backgroundColor: "#000",
        id: "tableView"
    }), "TableView", $.__views.container);
    $.__views.container.add($.__views.tableView);
    $.__views.tableView.on("click", rowClick);
    _.extend($, $.__views);
    var Cloud = require("ti.cloud"), APP = require("alloy/controllers/core");
    APP.navTitle.text = $.container.title;
    $.tableView.setData([ {
        title: "Loading tours...",
        color: "#fff"
    } ]);
    getTours();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A;

module.exports = Controller;