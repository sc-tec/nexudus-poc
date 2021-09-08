var params = location.search.substr(1).split('&').map(l=>l.split(/(?<!=.*)=/)).reduce((o,[k,v])=>Object.assign(o,{[k]:v}),{});
console.log(params);
var hashParams =location.hash.substr(1).split('&').map(l=>l.split(/(?<!=.*)=/)).reduce((o,[k,v])=>Object.assign(o,{[k]:v}),{});
if (params.t && hashParams.t) window.open(location.origin+location.pathname+'#t='+params.t,'_top');
