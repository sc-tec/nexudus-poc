var params = location.search.substr(1).split('&').map(l=>l.split(/(?<!=.*)=/).map(decodeURIComponent)).reduce((o,[k,v])=>Object.assign(o,{[k]:v}),{});
console.log(params);
var hashParams =location.hash.substr(1).split('&').map(l=>l.split(/(?<!=.*)=/).map(decodeURIComponent)).reduce((o,[k,v])=>Object.assign(o,{[k]:v}),{});
var root = document.getElementById('root');
if (hashParams.t) {
  root.innerText = 'loading...';
  var userId = JSON.parse(JSON.parse(atob(hashParams.t.split('.')[1])).u).u.Id;
  var options = {
    method: 'GET',
    headers: { Authorization: 'Bearer ' + hashParams.t,  },
    mode: 'no-cors''
  };

  fetch('https://thingproxy.freeboard.io/fetch/http://spaces.nexudus.com/api/sys/users/' + userId, options)
    .then(response => response.json())
    .then(result => {
      console.log({result});
      var pre = document.createElement('pre');
      pre.innerText = JSON.stringify(result, 2);
      root.innerHTML = '';
      root.appendChild(pre);
    })
    .catch(err => root.innerText = String(err));
} else if (params.t) {
  window.open(location.origin+location.pathname+'#t='+encodeURIComponent(params.t),'_top');
} else {
  root.innerText = 'hello!';
}
