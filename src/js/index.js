import Search from './model/search';
// Web app төлөв
// Хайлтын quety, үр дүн
// Тухайн үзүүлж байгаа жор
// Лайкласан жорууд
// Захиалж байгаа жорын найрлаганууд

const controlSearch = () => {
   // 1) Вэбээс хайлтын түлхүүр үгийг гаргаж авна
   const query = document.querySelector('.search__field');
   if(query){
      // 2) шинээр хайлтын обьектийг үүсгэж өгнө
      console.log(query.value);
      query.value = '';
      // 3) хайлт хийхэд зориулж дэлгэцийг UI бэлтгэнэ
      // 4) хайлтыг гүйцэтгэнэ
      // 5) хайлтын үр дүнг дэлгэцэнд үзүүлнэ
   }
   console.log(`btn click`);
}

document.querySelector('.search').addEventListener('submit', e => {
   e.preventDefault();
   controlSearch();
});