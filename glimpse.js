var API_URL = "https://x73ay0u3sb.execute-api.us-east-1.amazonaws.com/Beta/";
var bobbyboi = "";

function screenshot_url(submitForm) {
    //$(".scan-status").text("Scanning in progress.");
    $(".url-display").text("")
    $("#screenshot-viewer").height("200px");
    $("#screenshot-viewer").css("box-shadow", "none")
    $("#screenshot-viewer").attr("src", "loading-bars.svg")
    //$(".url-display").text(submitForm.url.value);
    $.when(screenshot(submitForm.url.value)).done(function() {
       //$(".scan-status").text("Scan complete.");
    });
    return false;
}

function screenshot(url) {
    var force_update = document.getElementById('force-update').checked;
    $.when($.ajax(API_URL + "scan?url=" + encodeURIComponent(url) + "&update=" + force_update).done(function(data, textStatus, jqXHR) {
        var json = JSON.parse(jqXHR.responseText);
        if (json.hasOwnProperty('errorMessage')){
            $("#screenshot-viewer").attr("src", "");
            $(".url-display").text("The scan failed.");
            console.log("Scan failed.");
            return false;
        }
        window.location = "scan.html?hash="  + json.urlhash;
        return false;
        $("#screenshot-viewer").css("box-shadow", "10px 10px 10px 10px gray");
        $("#screenshot-viewer").attr("src", json.screenshot);
        $("#screenshot-viewer").height("700px");
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


function get_scan_data(){
    $.when($.ajax(API_URL + "scan/" + $.urlParam('hash')).done(function(data, textStatus, jqXHR) {
        var json = JSON.parse(jqXHR.responseText);
        $("#title").text(json.Item.title.S);
        $("#url").text(json.Item.url.S);
        $("#time").text("Scanned at " + json.Item.timescanned.S);
        $("#numscans").text("Scanned " + json.Item.numscans.N + " times.");
        $("#screenshot-viewer").attr("src", "https://glimpsefiles.s3.amazonaws.com/screenshots/" + json.Item.urlhash.S + ".png");
    }));
}