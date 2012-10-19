function Controller() {
    function searchWeb(e) {
        var googleKey = "AIzaSyCRn6OD_Jn5hKyjI6Gs0cttF2W1C-jYzYw", url = "https://maps.googleapis.com/maps/api/place/textsearch/json?sensor=true&key=" + googleKey + "&query=";
        $.searchBar.blur();
        $.searchTable.setData([ {
            title: "Searching...",
            color: "#fff"
        } ]);
        var client = Ti.Network.createHTTPClient({
            onload: function(e) {
                var returnData = JSON.parse(this.responseText), results = returnData.results;
                if (results.length > 0) {
                    var tableData = [];
                    for (var i = 0, l = results.length; i < l; i++) {
                        var row = Alloy.createController("createDestinationRow", results[i]).getView();
                        tableData.push(row);
                    }
                    $.searchTable.setData(tableData);
                } else $.searchTable.setData([ {
                    title: "No results found",
                    color: "#fff"
                } ]);
            },
            onerror: function(e) {
                Ti.API.debug(e.error);
                alert("error");
            },
            timeout: 5000
        });
        client.open("GET", url + e.source.value);
        client.send();
    }
    function rowClick(e) {
        var view = Alloy.createController("createDestinationForm", e.rowData.args).getView();
        APP.index.add(view);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    var $ = this, exports = {};
    $.__views.container = A$(Ti.UI.createView({
        title: "Add a Destination",
        backgroundColor: "#000",
        layout: "vertical",
        id: "container"
    }), "View", null);
    $.addTopLevelView($.__views.container);
    $.__views.searchBar = A$(Ti.UI.createSearchBar({
        hintText: "Destination, City and State or Zip",
        barColor: "#000",
        id: "searchBar"
    }), "SearchBar", $.__views.container);
    $.__views.container.add($.__views.searchBar);
    $.__views.searchBar.on("return", searchWeb);
    var __alloyId0 = [];
    $.__views.searchTable = A$(Ti.UI.createTableView({
        backgroundColor: "#000",
        id: "searchTable"
    }), "TableView", $.__views.container);
    $.__views.container.add($.__views.searchTable);
    $.__views.searchTable.on("click", rowClick);
    _.extend($, $.__views);
    var APP = require("alloy/controllers/core");
    APP.navTitle.text = $.container.title;
    APP.rightNav.hide();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A;

module.exports = Controller;