LxxlApp.ApplicationView = Ember.View.extend({
  selectedBinding: 'controller.selected',

  templateName: function(){
    return 'application/root';
  }.property(),

  headerView: Ember.View.extend({
    templateName: function(){
      return 'application/header';
    }.property(),
    /* controller: totoController*/

    navItemView: Ember.View.extend({
        tagName: 'li',
        classNameBindings: ['isActive:active', 'isActive:open'],
        isActive: function() {
          return this.get('item') === this.get('parentView.parentView.selected');
        }.property('item', 'parentView.parentView.selected').cacheable()
    })
  }),

  footerView: Ember.View.extend({
    templateName: function(){
      return 'application/footer';
    }.property()
  })
});
