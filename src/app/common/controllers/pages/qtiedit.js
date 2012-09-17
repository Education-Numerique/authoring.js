(function() {
  this.QtiEditController = Ember.ObjectController.extend({
    categoryFactory: categoryFactory,

/*
fullName: function(key, value) {
    // getter
    if (arguments.length === 1) {
      var firstName = this.get('firstName');
      var lastName = this.get('lastName');
      return firstName + ' ' + lastName;
    // setter
    } else {
      var name = value.split(" ");
      this.set('firstName', name[0]);
      this.set('lastName', name[1]);
      return value;
    }
*/

    _storedCurrentPage: null,

    currentPage: (function(key, value){
      // Getter
      if (arguments.length === 1) {
        return  !this._storedCurrentPage && this.content.pages.length && this.content.pages[0] || this._storedCurrentPage;
      }

      // Setter
      this.set('_storedCurrentPage', value);
      return value;
    }).property('content', 'content.pages.length'),

    // Mutation on the content
    addPage: function(at){
      if(!at)
        this.content.pages.push(new LxxlLib.Model.Page());
      else
        this.content.pages.splice(at, 0, new LxxlLib.Model.Page());
    },

    deletePage: function(page){
      this.content.pages.splice(this.content.pages.indexOf(page), 1);
    },

    movePage: function(page, pos){
      this.content.pages.splice(this.content.pages.indexOf(page), 1);
      this.content.pages.splice(pos, 0, page);
    },

    matters: (function(){
      return categoryFactory.matters;
    }).property('categoryFactory.matters'),

    levels: (function(){
      return categoryFactory.levels;
    }).property('categoryFactory.levels'),

    categoryTree: (function(){
      return categoryFactory.getTreeFor(content.level, content.matter);
    }).property('content.level', 'content.matter', 'matters', 'levels'),

/*
    reset: function(){
    }
 */

    // cheat: "*********************/// *******************",

    // toto: function(){
    //   return this.get('content');
    // }.property('content'),

  });

}).apply(LxxlApp);


// var activityFactory = new (function(){
//   this.getActivityById = function(id){
//     return ;
//   };

//   this.newActivity = function() {
//     return new LxxlLib.Model.Activity();
//   };
// })();


