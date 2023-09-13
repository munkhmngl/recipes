export default class Likes {
   constructor(){
      this.likes = [];
   }
   
   addLike(id, title, desc, img){
      const like = {id, title, desc, img};
      this.likes.push(like);
      return like;
   }

   deleteLike(id){
      // id-тай like-ийг индексийг массиваас хайж олно
      const index = this.likes.findIndex(el => el.id === id);
      // Уг индекс дээрх элементийг массиваас устгана
      this.likes.splice(index, 1);
   }

   isLiked(id) {
      return this.likes.findIndex(el => el.id === id) !== -1;
   }
   
   getNumberOfLikes(){
      return this.likes.length;
   }
};