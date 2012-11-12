(function() {
  'use strict';
  this.QtisController = Ember.ObjectController.extend({
    qti: (function() {
      var ret = [
        {id: 'abc', author: 'Roger Doe', title: 'Stuff', category: 'Anglais pas littéraire'},
        {id: 'cde', author: 'Jane Doe', title: 'Stuff 2', category: 'Maths'}
      ];
      for (var x = 0; x < 150; x++)
        ret.push({id: x, author: 'Roger', title: 'Stuff' + x, category: 'Maths > ' +
              Math.round(10 * Math.random())});
      return ret;
    })(),

    authors: function() {
      var o = {};
      var k = this.get('qti').forEach(function(item) {
        if (!(item.author in o))
          o[item.author] = 0;
        o[item.author]++;
      });
      return o;
    }.property('qti'),

    categories: function() {
      var o = {};
      var k = this.get('qti').forEach(function(item) {
        if (!(item.category in o))
          o[item.category] = 0;
        o[item.category]++;
      });
      return o;
    }.property('qti'),

    nbActivities: function() {
      return this.get('qti').length;
    }.property('qti'),

    nbCategories: function() {
      return Object.keys(this.get('categories')).length;
    }.property('categories'),

    nbAuthors: function() {
      return Object.keys(this.get('authors')).length;
    }.property('authors')

  });

}).apply(LxxlApp);
