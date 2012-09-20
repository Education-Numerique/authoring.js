(function() {
  this.QtiEditController = Ember.ObjectController.extend({
    categoryFactory: categoryFactory,



    /**
     * Pages management
     */
    addPage: function(at) {
      var newPage = new LxxlLib.Model.Page();
      if (!at)
        this.content.pages.pushObject(newPage);
      else
        this.content.pages.splice(at, 0, newPage);
      this.set('currentPage', newPage);
    },

    deletePage: function(page) {
      if (this.currentPage == page)
        this.set('currentPage', null);
      this.content.pages.replace(this.content.pages.indexOf(page), 1);
    },

    movePage: function(page, pos) {
      this.content.pages.splice(this.content.pages.indexOf(page), 1);
      this.content.pages.splice(pos, 0, page);
    },


    /**
     * Current page management
     */
    _storedCurrentPage: null,

    currentPage: (function(key, value) {
      // Getter
      if (arguments.length === 1) {
        // Empty(ed) document gets null
        if (!this.content.pages.length)
          return this.set('_storedCurrentPage', null) && null;
        return !this._storedCurrentPage && this.content.pages[0] || this._storedCurrentPage;
      }

      // Setter
      this.set('_storedCurrentPage', value);
      return value;
    }).property('content', 'content.pages.length'),


    _storedCurrentQuestion: null,

    currentQuestion: (function(key, value) {
      // Getter
      if (arguments.length === 1) {
        // Empty(ed) document gets null
        if (!this.get('currentPage.questions').length)
          return this.set('_storedCurrentQuestion', null) && null;
        return !this.get('_storedCurrentQuestion') && this.get('currentPage.questions')[0] ||
            this.get('_storedCurrentQuestion');
      }

      // Setter
      this.set('_storedCurrentQuestion', value);
      return value;
    }).property('currentPage', 'currentPage.questions.length'),


    addQuestion: function(at) {
      var nq = new LxxlLib.Model.Question();
      if (!at)
        this.get('currentPage.questions').pushObject(nq);
      else
        this.get('currentPage.questions').replace(at, 0, nq);
      this.set('currentQuestion', nq);
    },

    deleteQuestion: function(question) {
      if (this.get('currentQuestion') == question)
        this.set('currentQuestion', null);
      this.get('currentPage.questions').replace(this.get('currentPage.questions').indexOf(question), 1);
    },

    moveQuestion: function(question, pos) {
      this.get('currentPage.questions').splice(this.get('currentPage.questions').indexOf(question), 1);
      this.get('currentPage.questions').splice(pos, 0, question);
    },



    addAnswer: function(at) {
      if (!at)
        this.get('currentQuestion.answers').pushObject(new LxxlLib.Model.Answer());
      else
        this.get('currentQuestion.answers').replace(at, 0, new LxxlLib.Model.Answer());
    },

    deleteAnswer: function(answer) {
      this.get('currentQuestion.answers').replace(this.get('currentQuestion.answers').indexOf(answer), 1);
    },

    moveAnswer: function(answer, pos) {
      this.get('currentQuestion.answers').splice(this.get('currentQuestion.answers').indexOf(answer), 1);
      this.get('currentQuestion.answers').splice(pos, 0, answer);
    },



    /**
     * Categories handling
     */
    matters: (function() {
      return categoryFactory.matters;
    }).property('categoryFactory.matters'),

    levels: (function() {
      return categoryFactory.levels;
    }).property('categoryFactory.levels'),

    categoryTree: (function() {
      return categoryFactory.getTreeFor(content.level, content.matter);
    }).property('content.level', 'content.matter', 'matters', 'levels'),


    lengths: Object.keys(I18n.translate('activities.lengths')),
    difficulties: Object.keys(I18n.translate('activities.difficulties')),
    flavors: Ember.Object.create({
      selected: null,
      content: [],
      init: function() {
        this._super();
        var values = I18n.translate('activities.pageFlavors');
        window.COIN = this;
        for (var key in values) {
          this.get('content').pushObject({
            'value' : key,
            'label' : values[key]
          });
        }
      }
    })

    /**
     * Various select handling
     */


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


