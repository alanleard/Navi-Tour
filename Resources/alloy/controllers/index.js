function Controller() {
    function installClick(e) {
        APP.nav.installNavi();
    }
    function toursClick(e) {
        var tourView = Alloy.createController("tours").getView();
        $.destination.animate({
            opacity: 0,
            duration: 100
        }, function() {
            $.tour.animate({
                opacity: 0,
                duration: 500
            }, function() {
                tourView.opacity = 0;
                APP.index.add(tourView);
                tourView.animate({
                    opacity: 1,
                    duration: 200
                });
                $.BackButton.show();
            });
        });
    }
    function backClick(e) {
        var x = APP.index.children.length;
        APP.index.remove(APP.index.children[x - 1]);
        APP.navTitle.text = APP.index.children[x - 2].title;
        if (x == 2) {
            e.source.hide();
            APP.rightNav.hide();
            $.destination.animate({
                opacity: 1,
                duration: 200
            });
            $.tour.animate({
                opacity: 1,
                duration: 200
            });
        }
    }
    function destinationsClick(e) {
        var desView = Alloy.createController("locations").getView();
        $.tour.animate({
            opacity: 0,
            duration: 100
        }, function() {
            $.destination.animate({
                opacity: 0,
                duration: 500
            }, function() {
                desView.opacity = 0;
                APP.index.add(desView);
                desView.animate({
                    opacity: 1,
                    duration: 200
                });
                $.BackButton.show();
                APP.rightNav.show();
            });
        });
    }
    function createTourClick(e) {}
    function addDestinationClick(e) {
        $.BackButton.show();
        APP.index.add(Alloy.createController("createDestination").getView());
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    var $ = this, exports = {};
    $.__views.index = A$(Ti.UI.createWindow({
        backgroundColor: "#000",
        height: "fill",
        id: "index"
    }), "Window", null);
    $.addTopLevelView($.__views.index);
    $.__views.NavBar = A$(Ti.UI.createView({
        height: 50,
        top: 0,
        width: "fill",
        backgroundColor: "#000",
        id: "NavBar"
    }), "View", $.__views.index);
    $.__views.index.add($.__views.NavBar);
    $.__views.BackButton = A$(Ti.UI.createButton({
        visible: !1,
        left: 10,
        height: 30,
        top: 10,
        width: 50,
        image: "back.png",
        title: "Back",
        id: "BackButton"
    }), "Button", $.__views.NavBar);
    $.__views.NavBar.add($.__views.BackButton);
    $.__views.BackButton.on("click", backClick);
    $.__views.NavTitle = A$(Ti.UI.createLabel({
        text: "Navi-Tour",
        width: "fill",
        height: 50,
        textAlign: "center",
        color: "#fff",
        font: {
            fontFamily: "Zapfino",
            fontSize: 22,
            fontWeight: "bold"
        },
        top: 10,
        left: 65,
        right: 45,
        minimumFontSize: 8,
        verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
        id: "NavTitle"
    }), "Label", $.__views.NavBar);
    $.__views.NavBar.add($.__views.NavTitle);
    $.__views.rightButton = A$(Ti.UI.createButton({
        visible: !1,
        right: 5,
        height: 30,
        top: 10,
        width: 30,
        image: "add.png",
        id: "rightButton"
    }), "Button", $.__views.NavBar);
    $.__views.NavBar.add($.__views.rightButton);
    $.__views.rightButton.on("click", addDestinationClick);
    $.__views.line = A$(Ti.UI.createView({
        height: 2,
        bottom: 0,
        width: "fill",
        backgroundColor: "#fff",
        id: "line"
    }), "View", $.__views.NavBar);
    $.__views.NavBar.add($.__views.line);
    $.__views.MainView = A$(Ti.UI.createView({
        top: 50,
        title: "Navi-Tours",
        id: "MainView"
    }), "View", $.__views.index);
    $.__views.index.add($.__views.MainView);
    $.__views.ButtonView = A$(Ti.UI.createView({
        layout: "vertical",
        title: "Navi-Tours",
        id: "ButtonView"
    }), "View", $.__views.MainView);
    $.__views.MainView.add($.__views.ButtonView);
    $.__views.destination = A$(Ti.UI.createView({
        width: "fill",
        height: "50%",
        top: 0,
        backgroundImage: "destination.jpg",
        id: "destination"
    }), "View", $.__views.ButtonView);
    $.__views.ButtonView.add($.__views.destination);
    $.__views.destination.on("click", destinationsClick);
    $.__views.destinationLabel = A$(Ti.UI.createLabel({
        text: "Discover Destinations",
        font: {
            fontFamily: "Zapfino",
            fontSize: 20,
            fontWeight: "bold"
        },
        shadowOffset: {
            x: 1,
            y: 1
        },
        shadowColor: "#fff",
        color: "#000",
        height: "size",
        id: "destinationLabel"
    }), "Label", $.__views.destination);
    $.__views.destination.add($.__views.destinationLabel);
    $.__views.tour = A$(Ti.UI.createView({
        width: "fill",
        height: "50%",
        top: 0,
        backgroundImage: "tour.jpg",
        id: "tour"
    }), "View", $.__views.ButtonView);
    $.__views.ButtonView.add($.__views.tour);
    $.__views.tour.on("click", toursClick);
    $.__views.tourLabel = A$(Ti.UI.createLabel({
        text: "Explore Tours",
        font: {
            fontFamily: "Zapfino",
            fontSize: 20,
            fontWeight: "bold"
        },
        shadowOffset: {
            x: 1,
            y: 1
        },
        shadowColor: "#fff",
        color: "#000",
        height: "size",
        id: "tourLabel"
    }), "Label", $.__views.tour);
    $.__views.tour.add($.__views.tourLabel);
    _.extend($, $.__views);
    var APP = require("alloy/controllers/core"), Cloud = require("ti.cloud");
    APP.nav = require("ti.navibridge");
    APP.nav.setApplicationId("ICiAV4Ay");
    APP.index = $.MainView;
    APP.navBar = $.NavBar;
    APP.navTitle = $.NavTitle;
    APP.rightNav = $.rightButton;
    $.index.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A;

module.exports = Controller;