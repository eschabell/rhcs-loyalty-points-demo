cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.feedhenry.plugins.apis/www/fhapi.js",
        "id": "com.feedhenry.plugins.apis.FHAPI",
        "merges": [
            "$fh"
        ]
    },
    {
        "file": "plugins/com.feedhenry.plugins.apis/www/android/fhapi.js",
        "id": "com.feedhenry.plugins.apis.FHAPI_ANDROID",
        "merges": [
            "$fh"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.feedhenry.plugins.apis": "0.0.6",
    "cordova-plugin-whitelist": "1.2.2"
}
// BOTTOM OF METADATA
});