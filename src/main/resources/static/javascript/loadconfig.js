var myConfig;
function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', '/config', false);
    xobj.send(null);
    callback(xobj.responseText);

}
function loadConfig() {
    loadJSON(function (response) {
        // Parse JSON string into object
        myConfig = JSON.parse(response);
    });
}

loadConfig();
console.log("myConfig is loaded :" + myConfig !== undefined);

