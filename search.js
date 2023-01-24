const API_URL = "https://api.freasearch.org/search?q="
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

  fetch(API_URL+query)
  .then(function (data) {
    return data.json();
  })
  .then(function (api_result) {
    console.log(api_result);

    for (let i = 0; i < api_result.results.length; i++) {
      const div = document.createElement('div');
      div.className = 'content';

      const link = document.createElement('a');
      link.href = api_result.results[i].url;

      const domain = document.createElement('small');
      domain.textContent = api_result.results[i].parsed_url[1];

      const title = document.createElement('h3');
      title.textContent = api_result.results[i].title;

      const context = document.createElement('p');
      context.textContent = api_result.results[i].content;

      div.appendChild(domain);
      link.appendChild(title);
      div.appendChild(link);
      div.appendChild(context);
      document.getElementById('result').appendChild(div);
    }
  })
}
