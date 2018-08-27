// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
window.$ = window.jQuery = require('jquery');
const nslookup = require('nslookup');

var testedservers;
var foundservers;

function testservers(e) {
    var region = $("#region").val();
    testedservers = 0;
    foundservers = 0;
    for (let i = 0; i < 1000; i++) {
        testserver(region,i,3)
    }

}

function testserver(region, i, tries) {
    nslookup(region + i + '.discord.gg')
        .server('1.1.1.1')
        .end(function (err, addrs) {
            if (err != null) {
                if (tries > 0) {
                    console.log(err + tries);
                    testserver(region, i, tries--);
                }
                else{
                    servertested("");
                }
            } else {
                servertested(addrs);
            }
        });
}

function servertested(addrs){
    testedservers++;
    if (addrs != "" && addrs != undefined) {
        foundservers++;
        $("#found").html(foundservers);
        $("#result").append("route " + addrs + "<br>");
    }
    $("#tested").html(testedservers);
}

$("#getroutesbutton").click(testservers);