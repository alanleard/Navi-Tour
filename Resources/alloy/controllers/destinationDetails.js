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
    function playAudio() {
        var startStopButton = Titanium.UI.createButton({
            title: "Start/Stop Streaming",
            top: 10,
            width: 200,
            height: 40
        }), pauseResumeButton = Titanium.UI.createButton({
            title: "Pause/Resume Streaming",
            top: 10,
            width: 200,
            height: 40,
            enabled: !1
        });
        $.container.add(startStopButton);
        $.container.add(pauseResumeButton);
        var audioPlayer = Ti.Media.createAudioPlayer({
            url: "http://promodj.com/source/3441253/Example_Change_The_Way_You_Kiss_Me_Dj_Electric_Touch_Remix.mp3",
            allowBackground: !1
        });
        startStopButton.addEventListener("click", function() {
            if (audioPlayer.playing || audioPlayer.paused) {
                audioPlayer.stop();
                pauseResumeButton.enabled = !1;
                Ti.Platform.name === "android" && audioPlayer.release();
            } else {
                audioPlayer.start();
                pauseResumeButton.enabled = !0;
            }
        });
        pauseResumeButton.addEventListener("click", function() {
            audioPlayer.paused ? audioPlayer.start() : audioPlayer.pause();
        });
        audioPlayer.addEventListener("progress", function(e) {
            Ti.API.info("Time Played: " + Math.round(e.progress) + " milliseconds");
        });
        audioPlayer.addEventListener("change", function(e) {
            Ti.API.info("State: " + e.description + " (" + e.state + ")");
        });
        audioPlayer.start();
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
        $.videoPlayer.expanded = !1;
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
            $.videoPlayer.expanded = !0;
            $.videoPlayer.start();
            $.flipView.animate({
                opacity: 0,
                duration: 500
            });
        }
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
        right: 35,
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
    $.__views.videoPlayer = A$(Ti.Media.createVideoPlayer({
        autoplay: !0,
        top: 10,
        height: 190,
        width: 320,
        right: 10,
        backgroundColor: "#000",
        opacity: 0,
        expanded: !0,
        ns: "Ti.Media",
        id: "videoPlayer"
    }), "VideoPlayer", $.__views.container);
    $.__views.container.add($.__views.videoPlayer);
    $.__views.videoPlayer.on("load", playVideo);
    $.__views.videoPlayer.on("complete", completeVideo);
    $.__views.videoPlayer.on("click", sizePlayer);
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
    $.videoPlayer.url = args.website ? args.website : null;
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
    playVideo();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A;

module.exports = Controller;