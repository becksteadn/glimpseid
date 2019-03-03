var API_URL = "https://x73ay0u3sb.execute-api.us-east-1.amazonaws.com/Beta/"

function screenshot(url) {
    $.when($.ajax(API_URL + "screenshot?url=" + encodeURIComponent(url))).done(function(data, textStatus, jqXHR) {
        var json = JSON.parse(jqXHR.responseText);
        $("#screenshot-viewer").attr("src", json.screenshot);
        $("#screenshot-viewer").height("700px");
        console.log(jqXHR.responseText);
    });
}