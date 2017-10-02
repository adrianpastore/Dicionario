const form = document.querySelector('form');
const divResultado = document.querySelector('div#resultado');
const palavrasele = document.querySelector('#palavraselecio');
const textarea = document.querySelector('#findword');
const scriptTemplate = document.querySelector('#template');

form.addEventListener('submit', function(e) {
    busca(form.palavraselecio.value);
  e.preventDefault();
});

function ajax(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onload = callback;
  xhr.send();
}

function busca(palavraselecio) {
  const url = `http://dicionario-aberto.net/search-json/${palavraselecio}`;
  ajax(url, function(e) {
    printa(JSON.parse(e.target.response));
  });
}

function printa(json) {
  console.log(json);
  const template = scriptTemplate.innerText;
  const handlebars = Handlebars.compile(template);
  const html = handlebars(json.entry.sense[0]);
  const html1= handlebars(json.entry.sense[1]);
  divResultado.innerHTML = html+'\n'+html1;
}
