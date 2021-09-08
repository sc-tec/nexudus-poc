var params = location.search.substr(1).split('&').map(l=>l.split(/(?<!=.*)=/).map(decodeURIComponent)).reduce((o,[k,v])=>Object.assign(o,{[k]:v}),{});
console.log(params);
var hashParams =location.hash.substr(1).split('&').map(l=>l.split(/(?<!=.*)=/).map(decodeURIComponent)).reduce((o,[k,v])=>Object.assign(o,{[k]:v}),{});
var root = document.getElementById('root');
function log(text) {
  var pre = document.createElement('pre');
  pre.innerText = text;
  root.appendChild(pre);
}
if (hashParams.t) {
  log('loading...')
  log(hashParams.t);
  log(JSON.stringify(JSON.parse(atob(hashParams.t.split('.')[1])), 2));
  
  var userId = JSON.parse(JSON.parse(atob(hashParams.t.split('.')[1])).u).u.Id;
  var options = {
    method: 'GET',
    headers: { Authorization: 'Bearer ' + hashParams.t },
    mode: 'cors'
  };
  var url = 'https://thingproxy.freeboard.io/fetch/http://spaces.nexudus.com/api/sys/users/' + userId;
  fetch(url, options)
    .then(response => response.json())
    .then(result => log(JSON.stringify(result,2)))
    .catch(err => log(String(err)));
} else if (params.t) {
  window.open(location.origin+location.pathname+'#t='+encodeURIComponent(params.t),'_top');
} else {
  root.innerText = 'hello!';
}
