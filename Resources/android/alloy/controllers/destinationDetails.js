function Controller() {
    function driveClick() {
        APP.nav.Enabled = true;
        APP.nav.addPOI({
            lat: args.latitude,
            lon: args.longitude,
            title: args.name,
            callbackURL: "navi-tour://",
            text: "Destination added successfully"
        });
    }
    function flipDetails() {
        $.imageView.hide();
        $.details.show();
    }
    function flipImage() {
        $.details.hide();
        $.imageView.show();
    }
    function playVideo() {
        $.videoPlayer.animate({
            opacity: 1,
            duration: 500
        });
        $.flipView.animate({
            opacity: 0,
            duration: 500
        });
    }
    function completeVideo() {
        $.videoPlayer.pause();
        $.videoPlayer.animate({
            height: 30,
            width: 40,
            top: 5,
            right: 5,
            duration: 250
        });
        $.videoPlayer.expanded = false;
        $.flipView.animate({
            opacity: 1,
            duration: 500
        });
    }
    function sizePlayer() {
        if ($.videoPlayer.expanded) completeVideo(); else {
            $.videoPlayer.animate({
                top: 10,
                right: 10,
                height: 190,
                width: 320,
                duration: 500
            });
            $.videoPlayer.expanded = true;
            $.videoPlayer.start();
            $.flipView.animate({
                opacity: 0,
                duration: 500
            });
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "destinationDetails";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.container = Ti.UI.createView({
        backgroundColor: "#000",
        title: null,
        id: "container"
    });
    $.__views.container && $.addTopLevelView($.__views.container);
    $.__views.flipView = Ti.UI.createView({
        top: 10,
        bottom: "45%",
        left: 10,
        right: 10,
        backgroundColor: "#000",
        id: "flipView"
    });
    $.__views.container.add($.__views.flipView);
    $.__views.details = Ti.UI.createScrollView({
        top: 0,
        bottom: 10,
        left: 0,
        right: 0,
        backgroundColor: "#fff",
        contentHeight: "auto",
        contentWidth: "auto",
        borderRadius: 5,
        visible: false,
        id: "details"
    });
    $.__views.flipView.add($.__views.details);
    flipImage ? $.__views.details.addEventListener("click", flipImage) : __defers["$.__views.details!click!flipImage"] = true;
    $.__views.detailLabel = Ti.UI.createLabel({
        height: "size",
        left: 10,
        right: 35,
        top: 5,
        bottom: 5,
        verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
        id: "detailLabel"
    });
    $.__views.details.add($.__views.detailLabel);
    $.__views.imageView = Ti.UI.createImageView({
        width: "fill",
        height: "fill",
        bottom: 10,
        defaultImage: "imgDefault.png",
        id: "imageView"
    });
    $.__views.flipView.add($.__views.imageView);
    flipDetails ? $.__views.imageView.addEventListener("click", flipDetails) : __defers["$.__views.imageView!click!flipDetails"] = true;
    $.__views.videoPlayer = Ti.Media.createVideoPlayer({
        autoplay: true,
        top: 10,
        height: 190,
        width: 320,
        right: 10,
        backgroundColor: "#000",
        opacity: 0,
        expanded: true,
        visible: false,
        ns: Ti.Media,
        id: "videoPlayer"
    });
    $.__views.container.add($.__views.videoPlayer);
    playVideo ? $.__views.videoPlayer.addEventListener("load", playVideo) : __defers["$.__views.videoPlayer!load!playVideo"] = true;
    completeVideo ? $.__views.videoPlayer.addEventListener("complete", completeVideo) : __defers["$.__views.videoPlayer!complete!completeVideo"] = true;
    sizePlayer ? $.__views.videoPlayer.addEventListener("click", sizePlayer) : __defers["$.__views.videoPlayer!click!sizePlayer"] = true;
    $.__views.map = Alloy.createController("map", {
        id: "map",
        __parentSymbol: $.__views.container
    });
    $.__views.map.setParent($.__views.container);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var APP = require("alloy/controllers/core"), args = arguments[0], annotation = Ti.Map.createAnnotation({
        title: args.name,
        latitude: args.latitude,
        longitude: args.longitude,
        animate: true
    });
    APP.rightNav.hide();
    APP.navTitle.text = args.name;
    $.videoPlayer.url = args.website ? args.website : null;
    $.container.title = args.name;
    $.detailLabel.text = args.custom_fields.details ? args.custom_fields.details : "There are no additonal details for " + args.name;
    $.imageView.image = args.photo ? args.photo.urls.original : "imgDefault.png";
    $.map.mapView.region = {
        latitude: args.latitude,
        longitude: args.longitude,
        latitudeDelta: .1,
        longitudeDelta: .1
    };
    $.map.mapView.addAnnotation(annotation);
    $.map.driveNav.addEventListener("click", driveClick);
    __defers["$.__views.details!click!flipImage"] && $.__views.details.addEventListener("click", flipImage);
    __defers["$.__views.imageView!click!flipDetails"] && $.__views.imageView.addEventListener("click", flipDetails);
    __defers["$.__views.videoPlayer!load!playVideo"] && $.__views.videoPlayer.addEventListener("load", playVideo);
    __defers["$.__views.videoPlayer!complete!completeVideo"] && $.__views.videoPlayer.addEventListener("complete", completeVideo);
    __defers["$.__views.videoPlayer!click!sizePlayer"] && $.__views.videoPlayer.addEventListener("click", sizePlayer);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;