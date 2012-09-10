LxxlApp.ApplicationController = Ember.ObjectController.extend({
  init: function(){
    console.warn(this.content);
    this._super();
  },
  productName: 'Lxxl authoring',
});

