const headers = new Headers();
headers.append('X-API-KEY', XAPIKEY); // eslint-disable-line
export default {
  config: { method: 'GET', headers },
  resources: {
    search(platform, name) { return `https://www.bungie.net/Platform/Destiny/SearchDestinyPlayer/${platform}/${name}/`; },
    summary(platform, membershipId) { return `https://www.bungie.net/Platform/Destiny/${platform}/Account/${membershipId}/Summary/`; },
    stats(platform, membershipId) { return `https://www.bungie.net/Platform/Destiny/Stats/Account/${platform}/${membershipId}/`; },
  }
};
