const headers = new Headers();
headers.append('X-API-KEY', XAPIKEY); // eslint-disable-line
const API = 'https://www.bungie.net/Platform/Destiny';
export default {
  config: { method: 'GET', headers },
  resources: {
    search(platform, name) { return `${API}/SearchDestinyPlayer/${platform}/${name}/`; },
    summary(platform, membershipId) { return `${API}/${platform}/Account/${membershipId}/Summary/`; },
    stats(platform, membershipId) { return `${API}/Stats/Account/${platform}/${membershipId}/`; },
  }
};

