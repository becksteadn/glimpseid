var API_URL = "https://x73ay0u3sb.execute-api.us-east-1.amazonaws.com/Beta/"

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
    console.log(force_update);
    $.when($.ajax(API_URL + "screenshot?url=" + encodeURIComponent(url) + "&update=" + force_update).done(function(data, textStatus, jqXHR) {
        var json = JSON.parse(jqXHR.responseText);
        if (json.hasOwnProperty('errorMessage')){
            $("#screenshot-viewer").attr("src", "");
            $(".url-display").text("The scan failed.")
            console.log("Scan failed.")
            return false
        }
        $("#screenshot-viewer").css("box-shadow", "10px 10px 10px 10px gray");
        $("#screenshot-viewer").attr("src", json.screenshot);
        $("#screenshot-viewer").height("700px");
        console.log(jqXHR.responseText);
    }));
}