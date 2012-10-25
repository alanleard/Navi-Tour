function Controller() {
    function installClick(e) {
        APP.nav.installNavi();
    }
    function closeAll() {
        APP.backBtn.hide();
        APP.rightNav.hide();
        APP.navTitle.text = APP.index.children[0].title;
        for (var i = 0, l = APP.index.children.length; l >= i; l--) if (l >= 2) APP.index.remove(APP.index.children[l - 1]); else {
            APP.destinationBtn.animate({
                opacity: 1,
                duration: 200
            });
            APP.tourBtn.animate({
                opacity: 1,
                duration: 200
            });
        }
    }
    function toursClick(e) {
        var tourView = Alloy.createController("toursView").getView();
        $.destinationButton.animate({
            opacity: 0,
            duration: 100
        }, function() {
            $.tourButton.animate({
                opacity: 0,
                duration: 500
            }, function() {
                tourView.opacity = 0;
                APP.index.add(tourView);
                tourView.animate({
                    opacity: 1,
                    duration: 200
                });
                APP.backBtn.show();
                APP.rightNav.show();
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
            $.destinationButton.animate({
                opacity: 1,
                duration: 200
            });
            $.tourButton.animate({
                opacity: 1,
                duration: 200
            });
        } else APP.index.children[x - 2].animate({
            opacity: 1,
            duration: 200
        });
    }
    function destinationsClick(e) {
        var destinationView = Alloy.createController("destinationsView").getView();
        $.tourButton.animate({
            opacity: 0,
            duration: 100
        }, function() {
            $.destinationButton.animate({
                opacity: 0,
                duration: 500
            }, function() {
                destinationView.opacity = 0;
                APP.index.add(destinationView);
                destinationView.animate({
                    opacity: 1,
                    duration: 200
                });
                APP.backBtn.show();
                APP.rightNav.show();
            });
        });
    }
    function addClick(e) {
        APP.backBtn.show();
        APP.navTitle.text == "Available Destinations" ? APP.index.add(Alloy.createController("createDestination").getView()) : APP.navTitle.text == "Available Tours" && APP.index.add(Alloy.createController("createTour").getView());
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    var $ = this, exports = {};
    $.__views.container = A$(Ti.UI.createWindow({
        backgroundColor: "#000",
        height: "fill",
        id: "container"
    }), "Window", null);
    $.addTopLevelView($.__views.container);
    $.__views.navBar = A$(Ti.UI.createView({
        height: 50,
        top: 0,
        width: "fill",
        backgroundColor: "#000",
        id: "navBar"
    }), "View", $.__views.container);
    $.__views.container.add($.__views.navBar);
    $.__views.backButton = A$(Ti.UI.createButton({
        visible: !1,
        left: 10,
        height: 30,
        top: 10,
        width: 50,
        image: "back.png",
        title: "Back",
        id: "backButton"
    }), "Button", $.__views.navBar);
    $.__views.navBar.add($.__views.backButton);
    $.__views.backButton.on("click", backClick);
    $.__views.navTitle = A$(Ti.UI.createLabel({
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
        id: "navTitle"
    }), "Label", $.__views.navBar);
    $.__views.navBar.add($.__views.navTitle);
    $.__views.rightNav = A$(Ti.UI.createButton({
        visible: !1,
        right: 5,
        height: 30,
        top: 10,
        width: 30,
        image: "add.png",
        id: "rightNav"
    }), "Button", $.__views.navBar);
    $.__views.navBar.add($.__views.rightNav);
    $.__views.rightNav.on("click", addClick);
    $.__views.line = A$(Ti.UI.createView({
        height: 2,
        bottom: 0,
        width: "fill",
        backgroundColor: "#fff",
        id: "line"
    }), "View", $.__views.navBar);
    $.__views.navBar.add($.__views.line);
    $.__views.mainView = A$(Ti.UI.createView({
        top: 50,
        title: "Navi-Tours",
        id: "mainView"
    }), "View", $.__views.container);
    $.__views.container.add($.__views.mainView);
    $.__views.buttonView = A$(Ti.UI.createView({
        layout: "vertical",
        title: "Navi-Tours",
        id: "buttonView"
    }), "View", $.__views.mainView);
    $.__views.mainView.add($.__views.buttonView);
    $.__views.destinationButton = A$(Ti.UI.createView({
        width: "fill",
        height: "50%",
        top: 0,
        backgroundImage: "destination.jpg",
        id: "destinationButton"
    }), "View", $.__views.buttonView);
    $.__views.buttonView.add($.__views.destinationButton);
    $.__views.destinationButton.on("click", destinationsClick);
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
    }), "Label", $.__views.destinationButton);
    $.__views.destinationButton.add($.__views.destinationLabel);
    $.__views.tourButton = A$(Ti.UI.createView({
        width: "fill",
        height: "50%",
        top: 0,
        backgroundImage: "tour.jpg",
        id: "tourButton"
    }), "View", $.__views.buttonView);
    $.__views.buttonView.add($.__views.tourButton);
    $.__views.tourButton.on("click", toursClick);
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
    }), "Label", $.__views.tourButton);
    $.__views.tourButton.add($.__views.tourLabel);
    _.extend($, $.__views);
    var APP = require("alloy/controllers/core"), Cloud = require("ti.cloud");
    Ti.UI.backgroundColor = "#000";
    APP.nav = require("ti.navibridge");
    APP.nav.setApplicationId("ICiAV4Ay");
    APP.index = $.mainView;
    APP.navBar = $.navBar;
    APP.navTitle = $.navTitle;
    APP.rightNav = $.rightNav;
    APP.backBtn = $.backButton;
    APP.destinationBtn = $.destinationButton;
    APP.tourBtn = $.tourButton;
    APP.closeAll = closeAll;
    $.container.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A;

module.exports = Controller;