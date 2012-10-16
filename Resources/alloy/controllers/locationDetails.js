function Controller() {
    function driveClick() {
        APP.nav.addPOI({
            lat: args.latitude,
            lon: args.longitude,
            title: args.name
        }, function() {
            alert("Pushed to GPS");
        });
    }
    function flipDetails() {
        $.containerView.animate({
            view: $.details,
            transition: Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
        }, function() {
            $.Image.hide();
        });
        $.details.show();
    }
    function flipImage() {
        $.containerView.animate({
            view: $.Image,
            transition: Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
        }, function() {
            $.details.hide();
        });
        $.Image.show();
    }
    function mapClick() {
        if ($.Mapview.mapType == Titanium.Map.STANDARD_TYPE) {
            $.Mapview.mapType = Titanium.Map.SATELLITE_TYPE;
            $.mapType.title = "Satellite";
        } else if ($.Mapview.mapType == Titanium.Map.SATELLITE_TYPE) {
            $.Mapview.mapType = Titanium.Map.HYBRID_TYPE;
            $.mapType.title = "Hybrid";
        } else if ($.Mapview.mapType = Titanium.Map.HYBRID_TYPE) {
            $.Mapview.mapType = Titanium.Map.STANDARD_TYPE;
            $.mapType.title = "Standard";
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    var $ = this, exports = {};
    $.__views.container = A$(Ti.UI.createView({
        backgroundColor: "#000",
        id: "container"
    }), "View", null);
    $.addTopLevelView($.__views.container);
    $.__views.containerView = A$(Ti.UI.createView({
        top: 10,
        bottom: "50%",
        left: 10,
        right: 10,
        backgroundColor: "#000",
        id: "containerView"
    }), "View", $.__views.container);
    $.__views.container.add($.__views.containerView);
    $.__views.details = A$(Ti.UI.createScrollView({
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#fff",
        contentHeight: "auto",
        contentWidth: "auto",
        borderRadius: 5,
        id: "details"
    }), "ScrollView", $.__views.containerView);
    $.__views.containerView.add($.__views.details);
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
    $.__views.Image = A$(Ti.UI.createImageView({
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        borderWidth: 10,
        width: "size",
        height: "size",
        borderColor: "#fff",
        preventDefaultImage: !0,
        backgroundColor: "#fff",
        borderRadius: 5,
        id: "Image"
    }), "ImageView", $.__views.containerView);
    $.__views.containerView.add($.__views.Image);
    $.__views.Image.on("click", flipDetails);
    var __alloyId3 = [];
    $.__views.Mapview = A$(Ti.Map.createView({
        top: "55%",
        width: "fill",
        regionFit: !0,
        mapType: Titanium.Map.STANDARD_TYPE,
        animate: !0,
        userLocation: !1,
        left: 0,
        bottom: 0,
        right: 0,
        annotations: __alloyId3,
        ns: "Ti.Map",
        id: "Mapview"
    }), "View", $.__views.container);
    $.__views.container.add($.__views.Mapview);
    $.__views.DriveNav = A$(Ti.UI.createButton({
        right: 5,
        bottom: 5,
        width: "size",
        height: 30,
        title: "Drive Now",
        id: "DriveNav"
    }), "Button", $.__views.container);
    $.__views.container.add($.__views.DriveNav);
    $.__views.DriveNav.on("click", driveClick);
    $.__views.mapType = A$(Ti.UI.createButton({
        height: 30,
        width: "size",
        top: "56%",
        left: 5,
        title: "Standard",
        id: "mapType"
    }), "Button", $.__views.container);
    $.__views.container.add($.__views.mapType);
    $.__views.mapType.on("click", mapClick);
    _.extend($, $.__views);
    var APP = require("alloy/controllers/core"), args = arguments[0];
    APP.rightNav.hide();
    APP.navTitle.text = args.name;
    $.container.title = args.name;
    $.detailLabel.text = args.custom_fields.details ? args.custom_fields.details : "There are no additonal details for " + args.name;
    $.Image.image = args.photo ? args.photo.urls.original : "appicon.png";
    var annotation = Ti.Map.createAnnotation({
        title: args.name,
        latitude: args.latitude,
        longitude: args.longitude,
        animate: !0
    });
    $.Mapview.setRegion({
        latitude: args.latitude,
        longitude: args.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1
    });
    $.Mapview.addAnnotation(annotation);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A;

module.exports = Controller;