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
    function submitTour(e) {
        Ti.API.info("[ACS] Create Destination");
        alert(data);
        Cloud.Objects.create(data, function(x) {
            if (x.success) {
                alert(data.fields.name + " Added!");
                $.container.remove(actInd);
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
                    allowEditing: !0
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
                    allowEditing: !0
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
    var $ = this, exports = {};
    $.__views.container = A$(Ti.UI.createView({
        backgroundColor: "#000",
        id: "container"
    }), "View", null);
    $.addTopLevelView($.__views.container);
    $.__views.mainView = A$(Ti.UI.createScrollView({
        layout: "vertical",
        id: "mainView"
    }), "ScrollView", $.__views.container);
    $.__views.container.add($.__views.mainView);
    $.__views.name = A$(Ti.UI.createTextField({
        top: 10,
        left: 20,
        right: 20,
        height: 30,
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
        hintText: "Tour Name",
        id: "name"
    }), "TextField", $.__views.mainView);
    $.__views.mainView.add($.__views.name);
    $.__views.name.on("change", nameChange);
    $.__views.notes = A$(Ti.UI.createTextField({
        top: 10,
        left: 20,
        right: 20,
        height: 30,
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
        hintText: "Add tour notes",
        id: "notes"
    }), "TextField", $.__views.mainView);
    $.__views.mainView.add($.__views.notes);
    $.__views.notes.on("change", notesChange);
    $.__views.time = A$(Ti.UI.createTextField({
        top: 10,
        left: 20,
        right: 20,
        height: 30,
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
        hintText: "Add total tour time",
        id: "time"
    }), "TextField", $.__views.mainView);
    $.__views.mainView.add($.__views.time);
    $.__views.time.on("change", timeChange);
    $.__views.photo = A$(Ti.UI.createButton({
        top: 10,
        left: 20,
        right: 20,
        height: 30,
        title: "Add a Photo",
        id: "photo"
    }), "Button", $.__views.mainView);
    $.__views.mainView.add($.__views.photo);
    $.__views.photo.on("click", photoClick);
    $.__views.submit = A$(Ti.UI.createButton({
        top: 10,
        left: 20,
        right: 20,
        height: 30,
        title: "Submit Tour",
        id: "submit"
    }), "Button", $.__views.mainView);
    $.__views.mainView.add($.__views.submit);
    $.__views.submit.on("click", submitTour);
    _.extend($, $.__views);
    var Cloud = require("ti.cloud"), data = {
        classname: "tour",
        fields: {}
    };
    Cloud.Users.login({
        login: "testUser",
        password: "NaviTour2012"
    }, function(e) {});
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A;

module.exports = Controller;