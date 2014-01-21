function Controller() {
    function nameChange(e) {
        data.fields.name = e.source.value;
    }
    function notesChange(e) {
        data.fields.notes = e.source.value;
    }
    function timeChange(e) {
        data.fields.time = e.source.value;
    }
    function submitTour() {
        var loadView = Ti.UI.createView({
            backgroundColor: "#000",
            height: "fill",
            width: "fill",
            opacity: .8
        });
        var actInd = Ti.UI.createActivityIndicator({
            message: "Loading...",
            color: "#fff"
        });
        loadView.add(actInd);
        actInd.show();
        $.container.add(loadView);
        Ti.API.info("[ACS] Create Tour");
        Cloud.Objects.create(data, function(x) {
            if (x.success) {
                APP.closeAll();
                alert("Tour Added!");
            } else alert("Error: " + x.message);
        });
    }
    function photoClick(e) {
        function selectImage() {
            function camera() {
                Ti.Media.showCamera({
                    success: function(event) {
                        data.photo = event.media;
                        e.source.title = "Change Photo";
                    },
                    cancel: function() {},
                    error: function(error) {
                        var a = Titanium.UI.createAlertDialog({
                            title: "Camera"
                        });
                        error.code == Titanium.Media.NO_CAMERA ? a.setMessage("Device does not have photo capabilities") : a.setMessage("Unexpected error: " + error.code);
                        a.show();
                    },
                    allowEditing: false
                });
            }
            function gallery() {
                Ti.Media.openPhotoGallery({
                    success: function(event) {
                        data.photo = event.media;
                        e.source.title = "Change Photo";
                    },
                    cancel: function() {},
                    error: function(error) {
                        var a = Titanium.UI.createAlertDialog({
                            title: "Camera"
                        });
                        error.code == Titanium.Media.NO_CAMERA ? a.setMessage("Device does not have video recording capabilities") : a.setMessage("Unexpected error: " + error.code);
                        a.show();
                    },
                    allowEditing: false
                });
            }
            if (Ti.Media.isCameraSupported) {
                var dialog = Ti.UI.createOptionDialog({
                    title: "Start by selecting an image.",
                    options: [ "Camera", "Photo Gallery", "Cancel" ],
                    buttonNames: [ "Camera", "Photo Gallery" ],
                    cancel: 2
                });
                dialog.show();
                dialog.addEventListener("click", function(e) {
                    switch (e.index) {
                      case 0:
                        camera();
                        break;

                      case 1:
                        gallery();
                    }
                });
            } else gallery();
        }
        selectImage();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "createTour";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.container = Ti.UI.createView({
        backgroundColor: "#000",
        id: "container"
    });
    $.__views.container && $.addTopLevelView($.__views.container);
    $.__views.mainView = Ti.UI.createScrollView({
        layout: "vertical",
        id: "mainView"
    });
    $.__views.container.add($.__views.mainView);
    $.__views.name = Ti.UI.createTextField({
        top: 10,
        left: 20,
        right: 20,
        height: 30,
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
        hintText: "Tour Name",
        id: "name"
    });
    $.__views.mainView.add($.__views.name);
    nameChange ? $.__views.name.addEventListener("change", nameChange) : __defers["$.__views.name!change!nameChange"] = true;
    $.__views.photo = Ti.UI.createButton({
        top: 10,
        left: 40,
        right: 40,
        height: 30,
        title: "Add a Photo",
        id: "photo"
    });
    $.__views.mainView.add($.__views.photo);
    photoClick ? $.__views.photo.addEventListener("click", photoClick) : __defers["$.__views.photo!click!photoClick"] = true;
    $.__views.notes = Ti.UI.createTextField({
        top: 10,
        left: 20,
        right: 20,
        height: 30,
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
        hintText: "Add tour notes",
        id: "notes"
    });
    $.__views.mainView.add($.__views.notes);
    notesChange ? $.__views.notes.addEventListener("change", notesChange) : __defers["$.__views.notes!change!notesChange"] = true;
    $.__views.time = Ti.UI.createTextField({
        top: 10,
        left: 20,
        right: 20,
        height: 30,
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
        hintText: "Add total tour time",
        id: "time"
    });
    $.__views.mainView.add($.__views.time);
    timeChange ? $.__views.time.addEventListener("change", timeChange) : __defers["$.__views.time!change!timeChange"] = true;
    $.__views.submit = Ti.UI.createButton({
        top: 10,
        left: 20,
        right: 20,
        height: 30,
        title: "Submit Tour",
        id: "submit"
    });
    $.__views.mainView.add($.__views.submit);
    submitTour ? $.__views.submit.addEventListener("click", submitTour) : __defers["$.__views.submit!click!submitTour"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var Cloud = require("ti.cloud"), APP = require("alloy/controllers/core"), data = {
        classname: "tour",
        fields: {}
    };
    Cloud.Users.login({
        login: "testUser",
        password: "NaviTour2012"
    }, function() {});
    __defers["$.__views.name!change!nameChange"] && $.__views.name.addEventListener("change", nameChange);
    __defers["$.__views.photo!click!photoClick"] && $.__views.photo.addEventListener("click", photoClick);
    __defers["$.__views.notes!change!notesChange"] && $.__views.notes.addEventListener("change", notesChange);
    __defers["$.__views.time!change!timeChange"] && $.__views.time.addEventListener("change", timeChange);
    __defers["$.__views.submit!click!submitTour"] && $.__views.submit.addEventListener("click", submitTour);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;