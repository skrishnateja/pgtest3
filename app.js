/*
    Date: 2015-12-25
    2016-02-22 - Detect if we are using Cordova/Phonegap or a browser.
*/
var app = {
    self : {},
    //
    onDeviceReady : function () {
        //alert("device ready.");
        if (device.platform === "iOS") {
            alert("got iOS.");
            // hide Exit button. They don't have one on iOS devices.
            // http://www.mzcart.com/javascript-how-to-addremove-css-class-from-a-dom-element/
            document.getElementById('exitApp').classList.add("hidden");
            // deals with post-iOS-7 change that covers the status bar
            // http://coenraets.org/blog/2013/09/phonegap-and-cordova-with-ios-7/
            document.body.style.marginTop = "20px";
            // hide the Splash Screen for iOS only
            navigator.splashscreen.hide();
        } else if (device.platform == 'Android') {
            // Get rid of 300ms delay 
            var serviceURL = "http://skrishnateja.xyz/phonegaptest/services/";
            var employees;
            $.getJSON(serviceURL + 'getemployees.php', function(data,status) {
            $('#title').html(status);
            $('#employeeList li').remove();
            employees = data.items;
            $.each(employees, function(index, employee) {
                $('#employeeList').append('<li><a href="employeedetails.html?id=' + employee.id + '">' +
                        '<img src="pics/' + employee.picture + '"/>' +
                        '<h4>' + employee.firstName + ' ' + employee.lastName + '</h4>' +
                        //'<p>' + employee.title + '</p>' +
                        '<span class="ui-li-count">' + employee.reportCount + '</span></a></li>');
            });
            $('#employeeList').listview('refresh');
             });

            document.addEventListener('DOMContentLoaded', function() {
                FastClick.attach(document.body); 
            },false);
            // Exit App
            document.getElementById('exitApp').addEventListener('click', function() {
                navigator.app.exitApp();
            });
        } else if (device.platform == 'browser') {
            // hide Exit button. Browser does not exit.
            document.getElementById('exitApp').classList.add("hidden");
        }
    }
};

//
//    Entry Point
//
document.addEventListener('DOMContentLoaded', function() {
    // Detect if we are using Cordova/Phonegap or a browser.
    // https://videlais.com/2014/08/21/lessons-learned-from-detecting-apache-cordova/
    var isCordovaApp = (typeof window.cordova !== "undefined");

    // Is it a device we know?
    if ( isCordovaApp === true ) {
        // Wait for PhoneGap to load
        document.addEventListener("deviceready", app.onDeviceReady, false);
    } else {
        // This needs to be global so other modules can see it.
        device = {platform:'browser'};
        // Force the function.
        app.onDeviceReady();
    }
});
