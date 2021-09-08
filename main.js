var params = location.search.substr(1).split('&').map(l=>l.split(/(?<!=.*)=/).map(decodeURIComponent)).reduce((o,[k,v])=>Object.assign(o,{[k]:v}),{});
console.log(params);
var hashParams =location.hash.substr(1).split('&').map(l=>l.split(/(?<!=.*)=/).map(decodeURIComponent)).reduce((o,[k,v])=>Object.assign(o,{[k]:v}),{});
var root = document.getElementById('root');
if (hashParams.t) {
  root.innerText = 'loading...';
  fetch("https://spaces.nexudus.com/api/auth/me", {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer "+hashParams.t
    },
    body: null,
    mode: "cors"
  }).then(r => r.json()).then(result => {
    console.log({result});
    var pre = document.createElement('pre');
    pre.innerText = JSON.stringify(result, 2);
    root.innerHTML = '';
    root.appendChild(pre);
  })
  .catch(err => console.error(err));
} else if (params.t) {
  window.open(location.origin+location.pathname+'#t='+encodeURIComponent(params.t),'_top');
} else {
  root.innerText = 'hello!';
}
