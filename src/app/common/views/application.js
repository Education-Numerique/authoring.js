(function() {
  'use strict';
  this.ApplicationView = Ember.View.extend({

    templateName: function() {
      return 'application/root';
    }.property(),

    navigationView: Ember.View.extend({
      templateName: function() {
        return 'application/header';
      }.property(),

      didInsertElement: function() {
        this._super();
        this.addObserver('parentView.controller.selected', function() {
          LxxlLib.behaviors.makeMenuItemActive($('#navigation-' + this.get('parentView.controller.selected')));
        });
        LxxlLib.behaviors.makeMenuItemActive($('#navigation-' + this.get('parentView.controller.selected')));
        LxxlLib.behaviors.bindBehaviors(this.get('element'));
      }
    }),

    footerView: Ember.View.extend({
      templateName: function() {
        return 'application/footer';
      }.property()
    })
  });

  this.lxxlPageView = function(name) {
    var argg;
    return {
      templateName: function() {
        return 'pages/' + name;
      }.property(),

      didInsertElement: function() {
        // Bind behaviors
        LxxlLib.behaviors.bindBehaviors(this.get('element'));
        this.set('parentView.controller.pageTitle', I18n.translate('breadcrumb.' + name + '.title'));
        /*        var bread = LxxlLib.Locale.getData('breadcrumb.' + name + '.bread');
        if (bread) {
          argg = this.get('parentView.controller.breadcrumbs');
          argg.pushObject({displayName: bread});
        }*/
        if (this.doOnInsert)
          this.doOnInsert();

      },

      willDestroy: function() {
        if (argg)
          argg.popObject();
      }
    };
  };

}).apply(LxxlApp);
