function Controller() {
    function getTours() {
        if (APP.tours) {
            $.tableView.setData(APP.tours);
            updateCheck();
        } else queryTours();
    }
    function queryTours() {
        Cloud.Objects.query({
            classname: "tour",
            page: 1,
            per_page: 100,
            order: "name"
        }, function(e) {
            if (e.success) if (e.tour.length > 0) {
                var tableData = [];
                for (var i = 0, l = e.tour.length; l > i; i++) {
                    var tour = e.tour[i], row = Alloy.createController("tourRow", tour).getView();
                    tableData.push(row);
                }
                $.tableView.setData(tableData);
                APP.tours = tableData;
            } else $.tableView.setData([ {
                title: "No tours found",
                color: "#fff"
            } ]); else alert("Error:\\n" + (e.error && e.message || JSON.stringify(e)));
        });
    }
    function updateCheck() {
        Cloud.Objects.query({
            classname: "tour",
            page: 1,
            per_page: 100,
            order: "name"
        }, function(e) {
            e.success && e.tour.length != APP.tours.length && queryTours();
        });
    }
    function rowClick(e) {
        var view = Alloy.createController("tourDetails", e.row.args).getView();
        $.tableView.animate({
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
    this.__controllerPath = "toursView";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.search = Ti.UI.createSearchBar({
        barColor: "#000",
        id: "search"
    });
    $.__views.tableView = Ti.UI.createTableView({
        backgroundColor: "#000",
        filterAttribute: "searchFilter",
        searchHidden: true,
        title: "Available Tours",
        search: $.__views.search,
        id: "tableView"
    });
    $.__views.tableView && $.addTopLevelView($.__views.tableView);
    rowClick ? $.__views.tableView.addEventListener("click", rowClick) : __defers["$.__views.tableView!click!rowClick"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var Cloud = require("ti.cloud"), APP = require("alloy/controllers/core");
    APP.navTitle.text = $.tableView.title;
    $.tableView.setData([ {
        title: "Loading tours...",
        color: "#fff"
    } ]);
    getTours();
    __defers["$.__views.tableView!click!rowClick"] && $.__views.tableView.addEventListener("click", rowClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;