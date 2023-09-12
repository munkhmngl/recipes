import Search from './model/search';
import { elements, renderLoader, clearLoader } from './view/base';
import * as searchView from './view/searchView';
import Recipe from './model/Recipe';
// Web app төлөв
// Хайлтын quety, үр дүн
// Тухайн үзүүлж байгаа жор
// Лайкласан жорууд
// Захиалж байгаа жорын найрлаганууд
const state = {};

const controlSearch = async () => {
   // 1) Вэбээс хайлтын түлхүүр үгийг гаргаж авна
   const query = searchView.getInput();
   if(query){
      // 2) шинээр хайлтын обьектийг үүсгэж өгнө
      state.search = new Search(query);
      // 3) хайлт хийхэд зориулж дэлгэцийг UI бэлтгэнэ
      searchView.clearSearchQuery();
      searchView.clearSearchResult();
      renderLoader(elements.searchResultDiv);
      // 4) хайлтыг гүйцэтгэнэ
      await state.search.doSearch(query);
      // 5) хайлтын үр дүнг дэлгэцэнд үзүүлнэ
      clearLoader();
      if(state.search.result === undefined) alert('Хайлтаар илэрцгүй...');
      else searchView.renderRecipes(state.search.result);
   }
}

elements.searchForm.addEventListener('submit', e => {
   e.preventDefault();
   controlSearch();
});

elements.pageButtons.addEventListener('click', e => {
   const btn = e.target.closest('.btn-inline');
   if(btn){
      const goto = parseInt(btn.dataset.goto, 10);
      searchView.clearSearchResult();
      searchView.renderRecipes(state.search.result, goto);
   }
});

const r = new Recipe('5ed6604591c37cdc054bc886');
r.getRecipe();
