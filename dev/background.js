import example from './background/example';
import reload from './development/reload';

reload();

example();

chrome.runtime.onMessage.addListener(
    async function(arg, sender, sendResponse) {
        if (arg === 'getToken') {
            alert(await getAuth());
        } else {
            chrome.downloads.download({
                url: arg,
                filename: 'test.zip',
                saveAs: false
            });
        }
    }
);

function sendResponse(){
}

let getAuth = async () => {
    return new Promise((resolve, reject) => {
        try {
            chrome.identity.getAuthToken({interactive: true}, async (token) => {
                resolve(token);
            });
        } catch (err) {
            reject(new Error(err));
        }
    });
};
