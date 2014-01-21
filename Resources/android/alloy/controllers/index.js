function Controller() {
    function closeAll() {
        APP.backBtn.hide();
        APP.rightNav.hide();
        APP.navTitle.text = APP.index.children[0].animate({
            zIndex: 100,
            duration: 500
        });
        APP.destinationBtn.animate({
            opacity: 1,
            duration: 200
        });
        APP.tourBtn.animate({
            opacity: 1,
            duration: 200
        });
        for (var i = 0, l = APP.index.children.length; l >= i; l--) l >= 2 && APP.index.remove(APP.index.children[l - 1]);
    }
    function toursClick() {
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
        if (2 == x) {
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
    function destinationsClick() {
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
    function addClick() {
        APP.backBtn.show();
        "Available Destinations" == APP.navTitle.text ? APP.index.add(Alloy.createController("createDestination").getView()) : "Available Tours" == APP.navTitle.text && APP.index.add(Alloy.createController("createTour").getView());
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.container = Ti.UI.createWindow({
        backgroundColor: "#000",
        height: "fill",
        top: 20,
        navBarHidden: true,
        id: "container"
    });
    $.__views.container && $.addTopLevelView($.__views.container);
    $.__views.navBar = Ti.UI.createView({
        height: 50,
        top: 0,
        width: "fill",
        backgroundColor: "#000",
        id: "navBar"
    });
    $.__views.container.add($.__views.navBar);
    $.__views.backButton = Ti.UI.createButton({
        visible: false,
        left: 10,
        height: 30,
        top: 10,
        width: 50,
        backgroundImage: "/back.png",
        id: "backButton"
    });
    $.__views.navBar.add($.__views.backButton);
    backClick ? $.__views.backButton.addEventListener("click", backClick) : __defers["$.__views.backButton!click!backClick"] = true;
    $.__views.navTitle = Ti.UI.createLabel({
        text: "Navi-Tour",
        width: "fill",
        height: 40,
        textAlign: "center",
        color: "#fff",
        font: {
            fontFamily: "Zapfino",
            fontSize: 18,
            fontWeight: "bold"
        },
        top: 0,
        left: 65,
        right: 45,
        minimumFontSize: 8,
        verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
        id: "navTitle"
    });
    $.__views.navBar.add($.__views.navTitle);
    $.__views.rightNav = Ti.UI.createButton({
        visible: false,
        right: 5,
        height: 30,
        top: 10,
        width: 30,
        backgroundImage: "/add.png",
        id: "rightNav"
    });
    $.__views.navBar.add($.__views.rightNav);
    addClick ? $.__views.rightNav.addEventListener("click", addClick) : __defers["$.__views.rightNav!click!addClick"] = true;
    $.__views.line = Ti.UI.createView({
        height: 2,
        bottom: 0,
        width: "fill",
        backgroundColor: "#fff",
        id: "line"
    });
    $.__views.navBar.add($.__views.line);
    $.__views.mainView = Ti.UI.createView({
        top: 50,
        title: "Navi-Tours",
        id: "mainView"
    });
    $.__views.container.add($.__views.mainView);
    $.__views.buttonView = Ti.UI.createView({
        layout: "vertical",
        title: "Navi-Tours",
        id: "buttonView"
    });
    $.__views.mainView.add($.__views.buttonView);
    $.__views.destinationButton = Ti.UI.createView({
        width: "fill",
        height: "50%",
        top: 0,
        backgroundImage: "/destination.jpg",
        id: "destinationButton"
    });
    $.__views.buttonView.add($.__views.destinationButton);
    destinationsClick ? $.__views.destinationButton.addEventListener("click", destinationsClick) : __defers["$.__views.destinationButton!click!destinationsClick"] = true;
    $.__views.destinationLabel = Ti.UI.createLabel({
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
    });
    $.__views.destinationButton.add($.__views.destinationLabel);
    $.__views.tourButton = Ti.UI.createView({
        width: "fill",
        height: "50%",
        top: 0,
        backgroundImage: "/tour.jpg",
        id: "tourButton"
    });
    $.__views.buttonView.add($.__views.tourButton);
    toursClick ? $.__views.tourButton.addEventListener("click", toursClick) : __defers["$.__views.tourButton!click!toursClick"] = true;
    $.__views.tourLabel = Ti.UI.createLabel({
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
    });
    $.__views.tourButton.add($.__views.tourLabel);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var APP = require("alloy/controllers/core");
    require("ti.cloud");
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
    __defers["$.__views.backButton!click!backClick"] && $.__views.backButton.addEventListener("click", backClick);
    __defers["$.__views.rightNav!click!addClick"] && $.__views.rightNav.addEventListener("click", addClick);
    __defers["$.__views.destinationButton!click!destinationsClick"] && $.__views.destinationButton.addEventListener("click", destinationsClick);
    __defers["$.__views.tourButton!click!toursClick"] && $.__views.tourButton.addEventListener("click", toursClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;