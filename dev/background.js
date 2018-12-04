import reload from './development/reload';

reload();

chrome.runtime.onMessage.addListener(
    (arg, sender, sendResponse) => {
        if (arg.action === 'getToken') {
            getAuth().then(() => {
                const token = getToken();
                const res = { token };
                sendResponse(res);
            }).catch(err => console.log(new Error(err)));
        } else {
            chrome.downloads.download({
                url: arg,
                filename: 'test.zip',
                saveAs: false
            });
        }
        return true;
    }
);

async function getAuth () {
    try {
        return await chrome.identity.getAuthToken({interactive: true}, token => {
            if (token) setToken(String(token));
            return;
        });
    } catch (err) {
        throw new Error(err);
    }
}

function setToken(token) {
    const key = 'token';
    const value = token;
    return localStorage.setItem([key], value); 
}

function getToken() {
    return localStorage.getItem(['token']);
}
