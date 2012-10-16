function Controller() {
    function nameChange(e) {
        destinationData.name = e.source.value;
    }
    function addressChange(e) {
        destinationData.address = e.source.value;
    }
    function notesChange(e) {
        destinationData.custom_fields.notes = e.source.value;
    }
    function detailsChange(e) {
        destinationData.custom_fields.details = e.source.value;
    }
    function orderChange(e) {
        destinationData.custom_fields.order = e.source.value;
    }
    function toursList(e) {
        Cloud.Objects.query({
            classname: "tour",
            page: 1,
            per_page: 100,
            response_json_depth: 1
        }, function(e) {
            if (e.success) {
                var selectTour = Ti.UI.createTableViewSection({
                    headerTitle: "Select a Tour"
                });
                for (var i = 0, l = e.tour.length; i < l; i++) {
                    var row = Ti.UI.createTableViewRow({
                        title: e.tour[i].name,
                        tag: e.tour[i].tags,
                        hasCheck: !1,
                        font: {
                            fontSize: 14
                        },
                        height: 30
                    });
                    selectTour.add(row);
                }
                $.tours.data = [ selectTour ];
                $.tours.addEventListener("click", function(e) {
                    if (e.rowData.hasCheck) {
                        e.rowData.hasCheck = !1;
                        destinationData.custom_fields.tours = null;
                    } else {
                        for (var i = 0, l = $.tours.data[0].rows.length; i < l; i++) $.tours.data[0].rows[i].hasCheck = !1;
                        e.rowData.hasCheck = !0;
                        destinationData.custom_fields.tours = e.rowData.tag;
                    }
                });
            } else alert("Error:\\n" + (e.error && e.message || JSON.stringify(e)));
        });
    }
    function submitDestination(e) {
        Ti.API.info("[ACS] Create Destination");
        Cloud.Places.create(destinationData, function(x) {
            x.success ? alert(destinationData.name + " Added!") : alert("Error: " + x.message);
        });
    }
    function photoClick(e) {
        function selectImage() {
            function camera() {
                Ti.Media.showCamera({
                    success: function(event) {
                        destinationData.photo = event.media;
                        photoButton.title = "Change Photo";
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
                        destinationData.photo = event.media;
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
        hintText: "Destination Name",
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
        hintText: "Add destination notes",
        id: "notes"
    }), "TextField", $.__views.mainView);
    $.__views.mainView.add($.__views.notes);
    $.__views.notes.on("change", notesChange);
    $.__views.details = A$(Ti.UI.createTextField({
        top: 10,
        left: 20,
        right: 20,
        height: 30,
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
        hintText: "Add destination details",
        id: "details"
    }), "TextField", $.__views.mainView);
    $.__views.mainView.add($.__views.details);
    $.__views.details.on("change", detailsChange);
    var __alloyId1 = [];
    $.__views.tours = A$(Ti.UI.createTableView({
        height: 100,
        left: 20,
        right: 20,
        top: 10,
        borderRadius: 10,
        id: "tours"
    }), "TableView", $.__views.mainView);
    $.__views.mainView.add($.__views.tours);
    $.__views.order = A$(Ti.UI.createTextField({
        top: 10,
        left: 20,
        right: 20,
        height: 30,
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
        hintText: "Destination order in tour",
        keyboardType: Ti.UI.KEYBOARD_NUMBERS_PUNCTUATION,
        id: "order"
    }), "TextField", $.__views.mainView);
    $.__views.mainView.add($.__views.order);
    $.__views.order.on("change", orderChange);
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
        title: "Submit Destination",
        id: "submit"
    }), "Button", $.__views.mainView);
    $.__views.mainView.add($.__views.submit);
    $.__views.submit.on("click", submitDestination);
    _.extend($, $.__views);
    var Cloud = require("ti.cloud"), args = arguments[0], data = args, address = data.formatted_address.split(","), destinationData = {
        name: data.name,
        address: address[0],
        city: address[1],
        state: address[2],
        latitude: data.geometry.location.lat,
        longitude: data.geometry.location.lng,
        custom_fields: {
            reference: data.reference
        }
    };
    $.name.value = data.name;
    Cloud.Users.login({
        login: "testUser",
        password: "NaviTour2012"
    }, function(e) {});
    toursList();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A;

module.exports = Controller;