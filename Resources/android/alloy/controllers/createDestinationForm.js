function Controller() {
    function nameChange(e) {
        destinationData.name = e.source.value;
    }
    function notesChange(e) {
        destinationData.custom_fields.notes = e.source.value;
    }
    function detailsChange(e) {
        destinationData.custom_fields.details = e.source.value;
    }
    function orderChange(e) {
        destinationData.tags = e.source.value;
    }
    function toursList() {
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
                for (var i = 0, l = e.tour.length; l > i; i++) {
                    var row = Ti.UI.createTableViewRow({
                        title: e.tour[i].name,
                        id: e.tour[i].id,
                        hasCheck: false,
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
                        e.rowData.hasCheck = false;
                        destinationData.custom_fields.tours = null;
                    } else {
                        for (var i = 0, l = $.tours.data[0].rows.length; l > i; i++) $.tours.data[0].rows[i].hasCheck = false;
                        e.rowData.hasCheck = true;
                        destinationData.custom_fields.tours = e.rowData.id;
                    }
                });
            } else alert("Error:\\n" + (e.error && e.message || JSON.stringify(e)));
        });
    }
    function submitDestination() {
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
        Ti.API.info("[ACS] Create Destination");
        Cloud.Places.create(destinationData, function(x) {
            if (x.success) {
                APP.closeAll();
                alert(destinationData.name + " Added!");
            } else alert("Error: " + x.message);
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
                    allowEditing: false
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
    this.__controllerPath = "createDestinationForm";
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
    $.__views.tours = Ti.UI.createTableView({
        height: 100,
        left: 20,
        right: 20,
        top: 10,
        borderRadius: 10,
        id: "tours"
    });
    $.__views.mainView.add($.__views.tours);
    $.__views.name = Ti.UI.createTextField({
        top: 10,
        left: 20,
        right: 20,
        height: 30,
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
        hintText: "Destination Name",
        id: "name"
    });
    $.__views.mainView.add($.__views.name);
    nameChange ? $.__views.name.addEventListener("change", nameChange) : __defers["$.__views.name!change!nameChange"] = true;
    $.__views.photo = Ti.UI.createButton({
        top: 20,
        left: 40,
        right: 40,
        height: 30,
        title: "Add a Photo",
        bottom: 10,
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
        hintText: "Add destination notes",
        id: "notes"
    });
    $.__views.mainView.add($.__views.notes);
    notesChange ? $.__views.notes.addEventListener("change", notesChange) : __defers["$.__views.notes!change!notesChange"] = true;
    $.__views.details = Ti.UI.createTextField({
        top: 10,
        left: 20,
        right: 20,
        height: 30,
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
        hintText: "Add destination details",
        id: "details"
    });
    $.__views.mainView.add($.__views.details);
    detailsChange ? $.__views.details.addEventListener("change", detailsChange) : __defers["$.__views.details!change!detailsChange"] = true;
    $.__views.order = Ti.UI.createTextField({
        top: 10,
        left: 20,
        right: 20,
        height: 30,
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
        hintText: "Destination order in tour",
        keyboardType: Ti.UI.KEYBOARD_NUMBERS_PUNCTUATION,
        id: "order"
    });
    $.__views.mainView.add($.__views.order);
    orderChange ? $.__views.order.addEventListener("change", orderChange) : __defers["$.__views.order!change!orderChange"] = true;
    $.__views.submit = Ti.UI.createButton({
        top: 20,
        left: 20,
        right: 20,
        height: 30,
        title: "Submit Destination",
        id: "submit"
    });
    $.__views.mainView.add($.__views.submit);
    submitDestination ? $.__views.submit.addEventListener("click", submitDestination) : __defers["$.__views.submit!click!submitDestination"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var Cloud = require("ti.cloud"), APP = require("alloy/controllers/core"), args = arguments[0], data = args, address = data.formatted_address.split(","), destinationData = {
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
    }, function() {});
    toursList();
    __defers["$.__views.name!change!nameChange"] && $.__views.name.addEventListener("change", nameChange);
    __defers["$.__views.photo!click!photoClick"] && $.__views.photo.addEventListener("click", photoClick);
    __defers["$.__views.notes!change!notesChange"] && $.__views.notes.addEventListener("change", notesChange);
    __defers["$.__views.details!change!detailsChange"] && $.__views.details.addEventListener("change", detailsChange);
    __defers["$.__views.order!change!orderChange"] && $.__views.order.addEventListener("change", orderChange);
    __defers["$.__views.submit!click!submitDestination"] && $.__views.submit.addEventListener("click", submitDestination);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;