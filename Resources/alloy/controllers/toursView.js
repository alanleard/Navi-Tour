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
    var $ = this, exports = {}, __alloyId5 = [];
    $.__views.search = A$(Ti.UI.createSearchBar({
        barColor: "#000",
        id: "search"
    }), "SearchBar", null);
    $.__views.tableView = A$(Ti.UI.createTableView({
        backgroundColor: "#000",
        filterAttribute: "searchFilter",
        searchHidden: !0,
        title: "Available Tours",
        search: $.__views.search,
        id: "tableView"
    }), "TableView", null);
    $.addTopLevelView($.__views.tableView);
    $.__views.tableView.on("click", rowClick);
    _.extend($, $.__views);
    var Cloud = require("ti.cloud"), APP = require("alloy/controllers/core");
    APP.navTitle.text = $.tableView.title;
    $.tableView.setData([ {
        title: "Loading tours...",
        color: "#fff"
    } ]);
    getTours();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A;

module.exports = Controller;