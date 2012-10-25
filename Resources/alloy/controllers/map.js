function Controller() {
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
        if ($.mapView.top == 0) {
            $.mapView.top = "55%";
            e.source.transform = null;
        } else $.mapView.animate({
            top: 0,
            duration: 200
        }, function() {
            $.mapView.top = 0;
            e.source.transform = Ti.UI.create2DMatrix({
                rotate: 180
            });
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    var $ = this, exports = {}, __alloyId3 = [];
    $.__views.mapView = A$(Ti.Map.createView({
        top: "55%",
        width: "fill",
        mapType: Titanium.Map.HYBRID_TYPE,
        regionFit: !0,
        animate: !0,
        userLocation: !1,
        left: 0,
        bottom: 0,
        right: 0,
        annotations: __alloyId3,
        ns: "Ti.Map",
        id: "mapView"
    }), "View", null);
    $.addTopLevelView($.__views.mapView);
    $.__views.driveNav = A$(Ti.UI.createButton({
        right: 5,
        bottom: 5,
        width: 107,
        height: 30,
        image: "drive.png",
        id: "driveNav"
    }), "Button", $.__views.mapView);
    $.__views.mapView.add($.__views.driveNav);
    $.__views.mapType = A$(Ti.UI.createButton({
        height: 25,
        width: 80,
        top: 5,
        left: 5,
        title: "Hybrid",
        backgroundImage: "button.png",
        id: "mapType"
    }), "Button", $.__views.mapView);
    $.__views.mapView.add($.__views.mapType);
    $.__views.mapType.on("click", mapClick);
    $.__views.mapSize = A$(Ti.UI.createButton({
        height: 25,
        width: 25,
        top: 5,
        right: 5,
        backgroundImage: "sizeButton.png",
        id: "mapSize"
    }), "Button", $.__views.mapView);
    $.__views.mapView.add($.__views.mapSize);
    $.__views.mapSize.on("click", mapSize);
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A;

module.exports = Controller;