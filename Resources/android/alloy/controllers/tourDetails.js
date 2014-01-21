function Controller() {
    function getLocations(tag) {
        Cloud.Places.query({
            page: 1,
            per_page: 100,
            order: "tags_array",
            where: tag ? {
                tours: tag
            } : {}
        }, function(e) {
            if (e.success) if (e.places.length > 0) {
                for (var i = 0, l = e.places.length; l > i; i++) {
                    var row = Alloy.createController("destinationRow", e.places[i]).getView();
                    tableData.push(row);
                }
                $.tableView.setData(tableData);
                mapLoad(tableData);
                distanceDisplay();
            } else $.tableView.setData([ {
                title: "No destinations found",
                color: "#fff"
            } ]); else alert("Error:\\n" + (e.error && e.message || JSON.stringify(e)));
        });
    }
    function distanceDisplay() {
        if (Ti.Geolocation.locationServicesEnabled) {
            Titanium.Geolocation.purpose = "Get Current Location";
            Titanium.Geolocation.getCurrentPosition(function(e) {
                if (e.error) Ti.API.error("Error: " + e.error); else {
                    var cLat = e.coords.latitude, cLon = e.coords.longitude;
                    for (var i = 0, l = tableData.length; l > i; i++) {
                        var row = tableData[i], lt = row.args.latitude, ln = row.args.longitude, d = 3959 * Math.acos(Math.cos(cLat * Math.PI / 180) * Math.cos(lt * Math.PI / 180) * Math.cos(ln * Math.PI / 180 - cLon * Math.PI / 180) + Math.sin(cLat * Math.PI / 180) * Math.sin(lt * Math.PI / 180));
                        d = Math.round(100 * d) / 100;
                        row.children[0].text = d + " miles away";
                        cLat = row.args.latitude;
                        cLon = row.args.longitude;
                        $.tableView.setData(tableData);
                    }
                }
            });
        }
    }
    function mapLoad(data) {
        var length = data.length;
        for (var i = 0; length > i; i++) {
            var row = data[i], annotation = Ti.Map.createAnnotation({
                title: row.args.name,
                latitude: row.args.latitude,
                longitude: row.args.longitude,
                animate: true
            });
            $.map.mapView.addAnnotation(annotation);
            5 > i && tourPointsArr.push({
                lat: row.args.latitude,
                lon: row.args.longitude,
                title: row.args.name
            });
        }
        var cPoint = Math.floor(length / 2);
        $.map.mapView.setRegion({
            latitude: tourPointsArr[cPoint].lat,
            longitude: tourPointsArr[cPoint].lon,
            latitudeDelta: .8,
            longitudeDelta: .8
        });
    }
    function driveClick() {
        APP.nav.Enabled = true;
        APP.nav.addMultiPOI({
            poi: tourPointsArr,
            callbackURL: "navi-tour://",
            text: "Tour added successfully"
        });
    }
    function rowClick(e) {
        var view = Alloy.createController("destinationDetails", e.rowData.args).getView();
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
    this.__controllerPath = "tourDetails";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.container = Ti.UI.createView({
        backgroundColor: "#000",
        title: "Tour Destinations",
        id: "container"
    });
    $.__views.container && $.addTopLevelView($.__views.container);
    $.__views.tableView = Ti.UI.createTableView({
        top: 0,
        bottom: "45%",
        backgroundColor: "#000",
        id: "tableView"
    });
    $.__views.container.add($.__views.tableView);
    rowClick ? $.__views.tableView.addEventListener("click", rowClick) : __defers["$.__views.tableView!click!rowClick"] = true;
    $.__views.map = Alloy.createController("map", {
        id: "map",
        __parentSymbol: $.__views.container
    });
    $.__views.map.setParent($.__views.container);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0], tags = args ? args.id : null, APP = require("alloy/controllers/core"), Cloud = require("ti.cloud"), tourPointsArr = [], tableData = [];
    APP.navTitle.text = $.container.title;
    APP.rightNav.hide();
    $.tableView.setData([ {
        title: "Loading destinations...",
        color: "#fff"
    } ]);
    $.map.driveNav.addEventListener("click", driveClick);
    getLocations(tags);
    __defers["$.__views.tableView!click!rowClick"] && $.__views.tableView.addEventListener("click", rowClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;