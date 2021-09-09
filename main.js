var params =location.hash.substr(1).split('&').map(l=>l.split(/(?<!=.*)=/).map(decodeURIComponent)).reduce((o,[k,v])=>Object.assign(o,{[k]:v}),{});
var root = document.getElementById('root');
if (params.b && params.t) {
  log(params.b)(params.t)(JSON.stringify(JSON.parse(atob(params.t.split('.')[1])), null, 2))('loading...')
  
  var userId = JSON.parse(JSON.parse(atob(params.t.split('.')[1])).u).u.Id;
  var url = 'https://spaces.nexudus.com/api/sys/users/' + userId;
  fetch(url, {
    method: 'GET',
    headers: { Authorization: 'Basic '+params.b }
  })
    .then(response => response.json())
    .then(result => (log(JSON.stringify(result, null, 2)),log('AccessToken is '+(result.AccessToken==params.t?'valid.':'NOT valid.')),result))
    .catch(err => log(String(err)));
} else if (params.b && params['?t']) {
  window.open(location.origin+location.pathname+'#'+new URLSearchParams({b:params.b,t:params['?t'].replace(/^\$/,'')}),'_top');
} else {
  log(location.href);
}
function log(text) {
  return (root.appendChild(Object.assign(document.createElement('pre'),{innerText:text})),log);
}
