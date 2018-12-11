import sass from './scss/example.scss';
import $ from 'jquery';
import { getZipballUrl, handleFiles } from './content/getUrl';
import { publishToStore } from './content/publish';

const list = document.getElementsByClassName('file-navigation in-mid-page d-flex flex-items-start');

var button = document.createElement('button');
button.setAttribute('id', 'btn-publish');
var t = document.createTextNode('Publish WebExtension!');
button.className += 'btn btn-sm BtnGroup-item tooltipped tooltipped-n test';

button.appendChild(t);
if (list[0]) list[0].insertBefore(button, list.firstChild);

$('#btn-publish').on('click', async () => {
    if (!chrome || !chrome.runtime) return;
    chrome.runtime.sendMessage({
        location: window.location.href,
        action: 'getToken'
    }, response => {
        console.log('response is ', response);
        if (response && response.token) createRequest(response.token, window.location.href);
    });
});

async function createRequest(token) {
    // TODO add handling for if repo is private. Get oauth token that will be persisted by background script's localstorage
    const zipballUrl = await getZipballUrl();
    if (zipballUrl) {
        const zipballToUpload = await handleFiles(zipballUrl);
        const attemptToPublish = await publishToStore(token, zipballToUpload.data);
    } else {
        alert('You must have a release to publish');
    }
}
