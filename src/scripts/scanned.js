var scan_app = new Vue({
    el: '#scan',
    data: {
        title: 'Page Title',
        url: 'URL',
        effectiveurl: 'Effective URL',
        time: 'Time',
        numscans: 'Number of Scans',
        screenshot_url: 'https://blahblahblah.blah',
        img_height: '600px'
    }
})

function get_scan_data(){
    $.when($.ajax(API_URL + "scan/" + $.urlParam('hash')).done(function(data, textStatus, jqXHR) {
        var json = JSON.parse(jqXHR.responseText);
        scan_app.title = json.Item.title.S;
        scan_app.url = json.Item.url.S;
        scan_app.effectiveurl = json.Item.effectiveurl.S;
        scan_app.time = "Scanned at " + json.Item.timescanned.S;
        scan_app.numscans = "Scanned " + json.Item.numscans.N + " times.";
        scan_app.screenshot_url = "https://glimpsefiles.s3.amazonaws.com/" + ENV + "/screenshots/" + json.Item.urlhash.S + ".png";
        scan_app.img_height = "600px";
        $("#screenshot-viewer").height("600px");
    }));
}

get_scan_data();