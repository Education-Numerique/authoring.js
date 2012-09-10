LxxlApp.ApplicationView = Ember.View.extend({
  templateName: function(){
    return 'application/root';
  }.property(),

  headerView: Ember.View.extend({
    templateName: function(){
      return 'application/header';
    }.property()/*,
    controller: totoController*/
  }),

  footerView: Ember.View.extend({
    templateName: function(){
      return 'application/footer';
    }.property()
  })
});
