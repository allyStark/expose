import axios from 'axios';

const serverBaseUrl = 'http://localhost:8080';

export async function getZipballUrl() {
    const url = window.location.pathname.split('/');
    const repo = url[1];
    const owner = url[2];
    try {
        const latestRelease = `https://api.github.com/repos/${repo}/${owner}/releases/latest`;
        const res = await axios(latestRelease);
        if (res.data && res.data.zipball_url) {
            return res.data.zipball_url;
        } else {
            return null;
        }
    } catch(err) {
        if (err) throw new Error(err);
    }
}

export async function handleFiles(zipballUrl) {
    const url = `${serverBaseUrl}/files/zipball`;
    const responseType = 'arraybuffer';
    return await axios.post(url, { zipballUrl }, { responseType });
}