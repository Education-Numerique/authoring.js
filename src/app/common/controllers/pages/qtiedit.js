(function() {
  this.QtiEditController = Ember.ObjectController.extend({

    // editActivity: function(id){
    //   this.set('content', new LxxlLib.Model.Activity());
    // },

    // Mutation on the content
    addPage: function(at){
      if(!at)
        this.content.pages.push(new LxxlLib.Model.Page());
      else
        this.content.pages.splice(at, 0, new LxxlLib.Model.Page());
    },

    deletePage: function(page){
      this.content.pages.splice(this.pages.indexOf(page), 1);
    },

    movePage: function(page, pos){
      this.content.pages.splice(this.pages.indexOf(page), 1);
      this.content.pages.splice(pos, 0, page);
    },


    reset: function(){
    }


    // cheat: "*********************/// *******************",

    // toto: function(){
    //   return this.get('content');
    // }.property('content'),

    // init: function(){
    //   this._super();
    // }
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


