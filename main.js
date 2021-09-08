var params =location.hash.substr(1).split('&').map(l=>l.split(/(?<!=.*)=/).map(decodeURIComponent)).reduce((o,[k,v])=>Object.assign(o,{[k]:v}),{});
var root = document.getElementById('root');
function log(text) {
  var pre = document.createElement('pre');
  pre.innerText = text;
  root.appendChild(pre);
}
if (params.client_id && params.password && params.t) {
  log('loading...')
  log(params.t);
  log(JSON.stringify(JSON.parse(atob(params.t.split('.')[1])), 2));
  
  var urlToken = 'https://spaces.nexudus.com/api/token';  
  var userId = JSON.parse(JSON.parse(atob(params.t.split('.')[1])).u).u.Id;
  var url = 'http://spaces.nexudus.com/api/sys/users/' + userId;
  fetch(urlToken, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify({ grant_type: 'password', username: params.client_id, password: params.password })
  })
    .then(response => response.json())
    .then(result => fetch(url, {
      method: 'GET',
      headers: { Authorization: 'Bearer ' + result.access_token },
      mode: 'cors'
    }))
    .then(response => response.json())
    .catch(err => log(String(err)));
} else if (params.client_id && params.password && params['?t']) {
  window.open(location.origin+location.pathname+'#'+new URLSearchParams({client_id:params.client_id,password:params.password,t:params['?t']}),'_top');
} else {
  root.innerText = 'hello!';
}
