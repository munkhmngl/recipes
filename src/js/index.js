import Search from './model/search';

let search = new Search('pasta');
search.doSearch().then(r => console.log(`Үр дүн: ${r}`));