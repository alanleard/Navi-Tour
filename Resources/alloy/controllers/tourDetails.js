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
                for (var i = 0, l = e.places.length; i < l; i++) {
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
                    for (var i = 0, l = tableData.length; i < l; i++) {
                        var row = tableData[i], lt = row.args.latitude, ln = row.args.longitude, d = 3959 * Math.acos(Math.cos(cLat * Math.PI / 180) * Math.cos(lt * Math.PI / 180) * Math.cos(ln * Math.PI / 180 - cLon * Math.PI / 180) + Math.sin(cLat * Math.PI / 180) * Math.sin(lt * Math.PI / 180));
                        d = Math.round(d * 100) / 100;
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
        for (var i = 0; i < length; i++) {
            var row = data[i], annotation = Ti.Map.createAnnotation({
                title: row.args.name,
                latitude: row.args.latitude,
                longitude: row.args.longitude,
                animate: !0
            });
            $.mapView.addAnnotation(annotation);
            i < 5 && tourPointsArr.push({
                lat: row.args.latitude,
                lon: row.args.longitude,
                title: row.args.name
            });
        }
        var cPoint = Math.floor(length / 2);
        $.mapView.setRegion({
            latitude: tourPointsArr[cPoint].lat,
            longitude: tourPointsArr[cPoint].lon,
            latitudeDelta: 0.8,
            longitudeDelta: 0.8
        });
    }
    function driveClick() {
        APP.nav.addMultiPOI({
            poi: JSON.stringify(tourPointsArr),
            callbackURL: "navi-tour://",
            text: "Tour added successfully"
        });
    }
    function mapClick() {
        if ($.mapView.mapType == Titanium.Map.STANDARD_TYPE) {
            $.mapView.mapType = Titanium.Map.SATELLITE_TYPE;
            $.mapType.title = "Satellite";
        } else if ($.mapView.mapType == Titanium.Map.SATELLITE_TYPE) {
            $.mapView.mapType = Titanium.Map.HYBRID_TYPE;
            $.mapType.title = "Hybrid";
        } else if ($.mapView.mapType = Titanium.Map.HYBRID_TYPE) {
            $.mapView.mapType = Titanium.Map.STANDARD_TYPE;
            $.mapType.title = "Standard";
        }
    }
    function mapSize(e) {
        $.mapView.top == 0 ? $.mapView.animate({
            top: "55%",
            duration: 200
        }, function() {
            $.mapView.top = "55%";
            e.source.transform = null;
        }) : $.mapView.animate({
            top: 0,
            duration: 200
        }, function() {
            $.mapView.top = 0;
            e.source.transform = Ti.UI.create2DMatrix({
                rotate: 180
            });
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
    var $ = this, exports = {};
    $.__views.container = A$(Ti.UI.createView({
        backgroundColor: "#000",
        title: "Tour Destinations",
        id: "container"
    }), "View", null);
    $.addTopLevelView($.__views.container);
    var __alloyId4 = [];
    $.__views.tableView = A$(Ti.UI.createTableView({
        top: 0,
        bottom: "45%",
        backgroundColor: "#000",
        id: "tableView"
    }), "TableView", $.__views.container);
    $.__views.container.add($.__views.tableView);
    $.__views.tableView.on("click", rowClick);
    var __alloyId5 = [];
    $.__views.mapView = A$(Ti.Map.createView({
        bottom: 0,
        left: 0,
        right: 0,
        top: "55%",
        width: "fill",
        mapType: Titanium.Map.STANDARD_TYPE,
        regionFit: !0,
        animate: !0,
        userLocation: !1,
        annotations: __alloyId5,
        ns: "Ti.Map",
        id: "mapView"
    }), "View", $.__views.container);
    $.__views.container.add($.__views.mapView);
    $.__views.driveNav = A$(Ti.UI.createButton({
        right: 5,
        bottom: 5,
        width: "107",
        height: 30,
        image: "drive.png",
        id: "driveNav"
    }), "Button", $.__views.mapView);
    $.__views.mapView.add($.__views.driveNav);
    $.__views.driveNav.on("click", driveClick);
    $.__views.mapType = A$(Ti.UI.createButton({
        height: 20,
        width: 80,
        top: 5,
        left: 5,
        title: "Standard",
        backgroundImage: "button.png",
        id: "mapType"
    }), "Button", $.__views.mapView);
    $.__views.mapView.add($.__views.mapType);
    $.__views.mapType.on("click", mapClick);
    $.__views.mapSize = A$(Ti.UI.createButton({
        height: 20,
        width: 20,
        top: "5",
        right: 5,
        backgroundImage: "sizeButton.png",
        id: "mapSize"
    }), "Button", $.__views.mapView);
    $.__views.mapView.add($.__views.mapSize);
    $.__views.mapSize.on("click", mapSize);
    _.extend($, $.__views);
    var args = arguments[0], tags = args ? args.id : null, APP = require("alloy/controllers/core"), Cloud = require("ti.cloud"), tourPointsArr = [], tableData = [];
    $.tableView.setData([ {
        title: "Loading destinations...",
        color: "#fff"
    } ]);
    APP.navTitle.text = $.container.title;
    APP.rightNav.hide();
    getLocations(tags);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A;

module.exports = Controller;