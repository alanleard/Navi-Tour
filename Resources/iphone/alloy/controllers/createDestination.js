function Controller() {
    function searchWeb(e) {
        var googleKey = "AIzaSyCRn6OD_Jn5hKyjI6Gs0cttF2W1C-jYzYw", url = "https://maps.googleapis.com/maps/api/place/textsearch/json?sensor=true&key=" + googleKey + "&query=";
        $.searchBar.blur();
        $.searchTable.setData([ {
            title: "Searching...",
            color: "#fff"
        } ]);
        var client = Ti.Network.createHTTPClient({
            onload: function() {
                var returnData = JSON.parse(this.responseText);
                var results = returnData.results;
                if (results.length > 0) {
                    var tableData = [];
                    for (var i = 0, l = results.length; l > i; i++) {
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
            timeout: 5e3
        });
        client.open("GET", url + e.source.value);
        client.send();
    }
    function rowClick(e) {
        var view = Alloy.createController("createDestinationForm", e.rowData.args).getView();
        APP.index.add(view);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "createDestination";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.container = Ti.UI.createView({
        title: "Add a Destination",
        backgroundColor: "#000",
        layout: "vertical",
        id: "container"
    });
    $.__views.container && $.addTopLevelView($.__views.container);
    $.__views.searchBar = Ti.UI.createSearchBar({
        hintText: "Destination, City and State or Zip",
        barColor: "#000",
        id: "searchBar"
    });
    $.__views.container.add($.__views.searchBar);
    searchWeb ? $.__views.searchBar.addEventListener("return", searchWeb) : __defers["$.__views.searchBar!return!searchWeb"] = true;
    $.__views.searchTable = Ti.UI.createTableView({
        backgroundColor: "#000",
        id: "searchTable"
    });
    $.__views.container.add($.__views.searchTable);
    rowClick ? $.__views.searchTable.addEventListener("click", rowClick) : __defers["$.__views.searchTable!click!rowClick"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var APP = require("alloy/controllers/core");
    APP.navTitle.text = $.container.title;
    APP.rightNav.hide();
    __defers["$.__views.searchBar!return!searchWeb"] && $.__views.searchBar.addEventListener("return", searchWeb);
    __defers["$.__views.searchTable!click!rowClick"] && $.__views.searchTable.addEventListener("click", rowClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;