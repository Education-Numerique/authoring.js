(function() {
  this.ApplicationView = Ember.View.extend({

    templateName: function() {
      return 'application/root';
    }.property(),

    navigationView: Ember.View.extend({
      templateName: function() {
        return 'application/header';
      }.property(),

      didInsertElement: function(){
        this._super();
        this.addObserver('parentView.controller.selected', function(){
          unicorn.makeMenuItemActive($('#navigation-' + this.get('parentView.controller.selected')));
        });
        unicorn.makeMenuItemActive($('#navigation-' + this.get('parentView.controller.selected')));
        unicorn.bindBehaviors(this.get('element'));
      }
    }),

    footerView: Ember.View.extend({
      templateName: function() {
        return 'application/footer';
      }.property()
    })
  });

  this.lxxlPageView = function(name){
    var argg;
    return {
      templateName: function() {
        return 'pages/' + name;
      }.property(),

      didInsertElement: function(){
        unicorn.bindBehaviors(this.get('element'));
        this.set('parentView.controller.pageTitle', I18n.translate(name + '.title'));
        var bread = I18n.translate(name + '.bread', {defaultValue: "----"});
        if(bread != '----'){
          argg = this.get('parentView.controller.breadcrumbs');
          argg.pushObject({displayName: bread});
        }
        // Bind behaviors
        unicorn.bindBehaviors(this.get('element'));
        if(this.doOnInsert)
          this.doOnInsert();

      },

      willDestroy: function(){
        if(argg)
          argg.popObject();
      }
    };
  };

}).apply(LxxlApp);
