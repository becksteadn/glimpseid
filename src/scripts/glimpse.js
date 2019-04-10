var ENV = "test";
var API_URL = "https://x73ay0u3sb.execute-api.us-east-1.amazonaws.com/" + ENV + "/";

function screenshot_url(submitForm) {
    //$(".scan-status").text("Scanning in progress.");
    $(".url-display").text("")
    $("#loading-gif").height("200px");
    $("#loading-gif").css("box-shadow", "none")
    $("#loading-gif").attr("src", "images/loading-bars.svg")
    //$(".url-display").text(submitForm.url.value);
    $.when(screenshot(submitForm.url.value)).done(function() {
       //$(".scan-status").text("Scan complete.");
    });
    return false;
}

function screenshot(url) {
    var force_update = scan_options.force_update;
    var custom_ua = encodeURI(scan_options.ua_selected.value);
    var send_url = API_URL + "scan?url=" + encodeURIComponent(url) + "&update=" + force_update + "&user-agent=" + custom_ua;
    $.when($.ajax(send_url).done(function(data, textStatus, jqXHR) {
        var json = JSON.parse(jqXHR.responseText);
        if (json.hasOwnProperty('errorMessage')){
            $("#loading-gif").attr("src", "");
            $(".url-display").text("The scan failed.");
            console.log("Scan failed.");
            return false;
        }
        window.location = "scan.html?hash="  + json.urlhash;
        return false;
        $("#loading-gif").css("box-shadow", "10px 10px 10px 10px gray");
        $("#loading-gif").attr("src", json.screenshot);
        $("#loading-gif").height("700px");
        console.log(jqXHR.responseText);
    }));
}

$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null) {
       return null;
    }
    return decodeURI(results[1]) || 0;
}