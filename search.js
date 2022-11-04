let url = new URL(window.location.href);
let params = url.searchParams;
document.getElementsByName('query')[0].value = params.get('q');
document.getElementsByName('status')[0].textContent = "Search something...";

if (params.get('q')){
  search();
}

function enter(){
  if( window.event.keyCode == 13 ){
    submit();
  }
}

function submit(){
  const base_url = location.protocol + '//' + location.host + location.pathname;
  const query = document.getElementById('query').value
  window.location.href = base_url + '?q=' + query
}

function search() {
  const query = params.get('q')
  document.getElementsByName('status')[0].textContent = "Loading...";

  fetch(`https://freasearch.org/search?q=${query}&format=json`)
  .then(function (data) {
    return data.json();
  })
  .then(function (api_result) {
    console.log(api_result);

    for (var i = 0; i < api_result.results.length; i++) {
      var div = document.createElement('div');
      div.className = 'content';

      var link = document.createElement('a');
      link.href = api_result.results[i].url;

      var domain = document.createElement('small');
      domain.textContent = api_result.results[i].parsed_url[1];

      var title = document.createElement('h3');
      title.textContent = api_result.results[i].title;

      var context = document.createElement('p');
      context.textContent = api_result.results[i].content;

      div.appendChild(domain);
      link.appendChild(title);
      div.appendChild(link);
      div.appendChild(context);
      document.getElementById('result').appendChild(div);
    }
  })
}
