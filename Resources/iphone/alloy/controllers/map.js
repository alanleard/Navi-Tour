function Controller() {
    function mapClick() {
        if ($.mapView.mapType == Titanium.Map.STANDARD_TYPE) {
            $.mapView.mapType = Titanium.Map.SATELLITE_TYPE;
            $.mapType.title = "Satellite";
        } else if ($.mapView.mapType == Titanium.Map.SATELLITE_TYPE && true) {
            $.mapView.mapType = Titanium.Map.HYBRID_TYPE;
            $.mapType.title = "Hybrid";
        } else {
            $.mapView.mapType = Titanium.Map.STANDARD_TYPE;
            $.mapType.title = "Standard";
        }
    }
    function mapSize(e) {
        if (0 == $.mapView.top) {
            $.mapView.top = "55%";
            $.mapType.top = "56%";
            $.mapSize.top = "56%";
            e.source.transform = null;
        } else {
            $.mapView.animate({
                top: 0,
                duration: 200
            }, function() {
                $.mapView.top = 0;
                e.source.transform = Ti.UI.create2DMatrix({
                    rotate: 180
                });
                $.mapType.top = 5;
                $.mapSize.top = 5;
            });
            $.mapType.animate({
                top: 5,
                duration: 200
            });
            $.mapSize.animate({
                top: 5,
                duration: 200
            });
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "map";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    var __alloyId0 = [];
    $.__views.mapView = Ti.Map.createView({
        top: "55%",
        width: "fill",
        mapType: Titanium.Map.SATELLITE_TYPE,
        regionFit: true,
        animate: true,
        userLocation: false,
        left: 0,
        bottom: 0,
        right: 0,
        annotations: __alloyId0,
        ns: Ti.Map,
        id: "mapView"
    });
    $.__views.mapView && $.addTopLevelView($.__views.mapView);
    $.__views.driveNav = Ti.UI.createButton({
        right: 5,
        bottom: 5,
        width: 107,
        height: 30,
        backgroundImage: "/drive.png",
        id: "driveNav"
    });
    $.__views.driveNav && $.addTopLevelView($.__views.driveNav);
    $.__views.mapType = Ti.UI.createButton({
        height: 25,
        width: 60,
        top: "56%",
        left: 5,
        title: "Satellite",
        backgroundImage: "/button.png",
        font: {
            fontSize: 12
        },
        id: "mapType"
    });
    $.__views.mapType && $.addTopLevelView($.__views.mapType);
    mapClick ? $.__views.mapType.addEventListener("click", mapClick) : __defers["$.__views.mapType!click!mapClick"] = true;
    $.__views.mapSize = Ti.UI.createButton({
        height: 25,
        width: 25,
        top: "56%",
        right: 5,
        backgroundImage: "/sizeButton.png",
        id: "mapSize"
    });
    $.__views.mapSize && $.addTopLevelView($.__views.mapSize);
    mapSize ? $.__views.mapSize.addEventListener("click", mapSize) : __defers["$.__views.mapSize!click!mapSize"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.mapType!click!mapClick"] && $.__views.mapType.addEventListener("click", mapClick);
    __defers["$.__views.mapSize!click!mapSize"] && $.__views.mapSize.addEventListener("click", mapSize);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;