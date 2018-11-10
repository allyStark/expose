const list = document.getElementsByClassName("file-navigation in-mid-page d-flex flex-items-start");

var button = document.createElement("button");
button.setAttribute("id", "btn-publish");
var t = document.createTextNode("Publish WebExtension!");
button.className += "btn btn-sm BtnGroup-item tooltipped tooltipped-n";

button.appendChild(t);
list[0].insertBefore(button, list.firstChild);

$("#btn-publish").on('click', () => {
    // download file
    // let param = "https://github.com/roboticsound/Pulsarr/archive/master.zip"
    // chrome.runtime.sendMessage(param);

    chrome.runtime.sendMessage("getToken");
});
