var params = location.search.substr(1).split('&').map(l=>l.split(/(?<!=.*)=/)).reduce((o,[k,v])=>Object.assign(o,{[k]:v}),{});
console.log(params);
