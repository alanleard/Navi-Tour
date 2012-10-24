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
        bottom: 10,
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
        bottom: 10,
        defaultImage: "imgDefault.png",
        id: "imageView"
    }), "ImageView", $.__views.flipView);
    $.__views.flipView.add($.__views.imageView);
    $.__views.imageView.on("click", flipDetails);
    $.__views.map = Alloy.createController("map", {
        id: "map"
    });
    $.__views.map.setParent($.__views.container);
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
    $.map.mapView.region = {
        latitude: args.latitude,
        longitude: args.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1
    };
    $.map.mapView.addAnnotation(annotation);
    $.map.driveNav.addEventListener("click", driveClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A;

module.exports = Controller;