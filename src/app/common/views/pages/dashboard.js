(function() {
  var t = this.lxxlPageView('dashboard');

  t.selectedItem = (function() {
    if (this.get('element')) {
      $('.slidify-on', this.get('element')).removeClass('slidify-on');
      $('#' + this.get('controller.selected') + '-collapse', this.get('element')).addClass('slidify-on');
    }
    return this.get('controller.selected');
  }.property('controller.selected', 'element'));

  t.jokeBinding = 'selectedItem';

  this.DashboardView = Ember.View.extend(t);

}).apply(LxxlApp);
