var params =location.hash.substr(1).split('&')
  .map(function(l) { return l.split(/(?<!=.*)=/).map(decodeURIComponent) })
  .reduce(function(o, s) { return Object.assign(o, { [ s[0] ]: s[1] }) }, {})
var root = document.getElementById('root');
try {
  if (params.b && params['?t']) {
    window.open(location.origin+location.pathname+'#'+new URLSearchParams(Object.keys(params).reduce(function(o, k) {
      return Object.assign(o, k === '?t' ? 
        { t: params[k].replace(/^\$/, '') } :
        { [ k ]: params[k] }
      )
    }, {})), '_top')
  } else if (params.b && params.t) {
    log(params.b, params.t, JSON.stringify(JSON.parse(atob(params.t.split('.')[1])), null, 2), 'loading...')
    var userId = JSON.parse(JSON.parse(atob(params.t.split('.')[1])).u).u.Id
    var url = 'https://spaces.nexudus.com/api/sys/users/' + userId
    fetch(url, {
      method: 'GET',
      headers: { Authorization: 'Basic ' + params.b }
    })
      .then(function(response) { return response.json() })
      .then(function(result) { log(
        JSON.stringify(result, null, 2),
        'AccessToken ' + (result.AccessToken === params.t ? 'is' : 'is NOT') + ' valid.'
      ) })
      .catch(function(err) { log(String(err)) })
  } else {
    log(location.href)
  }
} catch (ex) {
  log(String(ex))
}
function log() {
  for (var i = 0; i < arguments.length; i++)
    root.appendChild(Object.assign(document.createElement('pre'), { innerText: arguments[i] }))
}
