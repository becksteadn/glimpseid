Vue.component('v-select', VueSelect.VueSelect);

var scan_options = new Vue({
    el: '#sect-options',
    data: {
        seen: false,
        ua_options: [
            {label: 'Custom User-Agent', value: ''},
            {label: 'Chrome', value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36'},
            {label: 'Firefox', value: 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:64.0) Gecko/20100101 Firefox/64.0'},
            {label: 'cURL', value: 'curl/7.9.8 (i686-pc-linux-gnu) libcurl 7.9.8 (OpenSSL 0.9.6b) (ipv6 enabled)'},
            {label: 'Python Requests', value: 'python-requests/1.2.0'},
            {label: 'Googlebot', value: 'Googlebot/2.1 (+http://www.googlebot.com/bot.html)'}
        ],
        ua_selected: {label: 'Chrome', value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36'},
        force_update: false
    }
})