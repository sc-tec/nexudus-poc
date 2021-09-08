var params = location.search.substr(1).split('&').map(l=>l.split(/(?<!=.*)=/)).reduce((o,[k,v])=>Object.assign(o,{[k]:v}),{});
console.log(params);
var hashParams =location.hash.substr(1).split('&').map(l=>l.split(/(?<!=.*)=/)).reduce((o,[k,v])=>Object.assign(o,{[k]:v}),{});
var root = document.getElementById('root');
if (hashParams.t) {
  root.innerText = 'loading...';
  fetch("https://spaces.nexudus.com/api/auth/me", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer "+hashParams.t
    },
    method: "GET",
    mode: "cors"
  }).then(r => r.json()).then(result => {
    console.log({result});
    var pre = document.createElement('pre');
    pre.innerText = JSON.stringify(result, 2);
    root.innerHTML = '';
    root.appendChild(pre);
  });
} else if (params.t) {
  window.open(location.origin+location.pathname+'#t='+params.t,'_top');
} else {
  root.innerText = 'hello!';
}
