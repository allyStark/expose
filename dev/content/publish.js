import axios from 'axios';

export async function publishToStore(token, zipball) {
    const appId = 'pgdegpjagpldinincfpegfofnijooene';
    const publishUrl = `https://www.googleapis.com/chromewebstore/v1.1/items/${appId}`;
    const headers = {
        'Authorization': `Bearer ${token}`,
        'x-goog-api-version': '2'
    };
    const data = new Blob([new Uint8Array(zipball)]);
    try {
        // TODO error w/ api call permissions
        return await axios.put(publishUrl, { data }, { headers });
    } catch(err) {
        console.log(new Error(err));
    }
}
