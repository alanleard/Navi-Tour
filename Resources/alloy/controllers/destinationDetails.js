function Controller() {
    function driveClick() {
        APP.nav.addPOI({
            lat: args.latitude,
            lon: args.longitude,
            title: args.name,
            callbackURL: "navi-tour://",
            text: "Destination added successfully"
        });
    }
    function flipDetails() {
        $.flipView.animate({
            view: $.details,
            transition: Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
        }, function() {
            $.imageView.hide();
        });
        $.details.show();
    }
    function flipImage() {
        $.flipView.animate({
            view: $.imageView,
            transition: Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
        }, function() {
            $.details.hide();
        });
        $.imageView.show();
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
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    var $ = this, exports = {};
    $.__views.container = A$(Ti.UI.createView({
        backgroundColor: "#000",
        id: "container"
    }), "View", null);
    $.addTopLevelView($.__views.container);
    $.__views.flipView = A$(Ti.UI.createView({
        top: 10,
        bottom: "45%",
        left: 10,
        right: 10,
        backgroundColor: "#000",
        id: "flipView"
    }), "View", $.__views.container);
    $.__views.container.add($.__views.flipView);
    $.__views.details = A$(Ti.UI.createScrollView({
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#fff",
        contentHeight: "auto",
        contentWidth: "auto",
        borderRadius: 5,
        visible: !1,
        id: "details"
    }), "ScrollView", $.__views.flipView);
    $.__views.flipView.add($.__views.details);
    $.__views.details.on("click", flipImage);
    $.__views.detailLabel = A$(Ti.UI.createLabel({
        height: "size",
        left: 10,
        right: 10,
        top: 5,
        bottom: 5,
        verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
        id: "detailLabel"
    }), "Label", $.__views.details);
    $.__views.details.add($.__views.detailLabel);
    $.__views.imageView = A$(Ti.UI.createImageView({
        width: "fill",
        height: "fill",
        defaultImage: "imgDefault.png",
        id: "imageView"
    }), "ImageView", $.__views.flipView);
    $.__views.flipView.add($.__views.imageView);
    $.__views.imageView.on("click", flipDetails);
    var __alloyId2 = [];
    $.__views.mapView = A$(Ti.Map.createView({
        top: "55%",
        width: "fill",
        mapType: Titanium.Map.STANDARD_TYPE,
        regionFit: !0,
        animate: !0,
        userLocation: !1,
        left: 0,
        bottom: 0,
        right: 0,
        annotations: __alloyId2,
        ns: "Ti.Map",
        id: "mapView"
    }), "View", $.__views.container);
    $.__views.container.add($.__views.mapView);
    $.__views.driveNav = A$(Ti.UI.createButton({
        right: 5,
        bottom: 5,
        width: 107,
        height: 30,
        image: "drive.png",
        id: "driveNav"
    }), "Button", $.__views.mapView);
    $.__views.mapView.add($.__views.driveNav);
    $.__views.driveNav.on("click", driveClick);
    $.__views.mapType = A$(Ti.UI.createButton({
        height: 20,
        width: 80,
        top: "5",
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
    var APP = require("alloy/controllers/core"), args = arguments[0], annotation = Ti.Map.createAnnotation({
        title: args.name,
        latitude: args.latitude,
        longitude: args.longitude,
        animate: !0
    });
    APP.rightNav.hide();
    APP.navTitle.text = args.name;
    $.container.title = args.name;
    $.detailLabel.text = args.custom_fields.details ? args.custom_fields.details : "There are no additonal details for " + args.name;
    $.imageView.image = args.photo ? args.photo.urls.original : "imgDefault.png";
    $.mapView.setRegion({
        latitude: args.latitude,
        longitude: args.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1
    });
    $.mapView.addAnnotation(annotation);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A;

module.exports = Controller;