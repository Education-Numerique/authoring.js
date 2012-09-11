(function() {
  var t = this.lxxlPageView('dashboard')

  t.selectedItem = function(){
    if(this.get('element')){
      $('.in', this.get('element')).removeClass('in');
      $('#' + this.get('controller.selected') + '-collapse', this.get('element')).addClass('in');
    }
    return this.get('controller.selected');
  }.property('controller.selected', 'element');

  t.jokeBinding = 'selectedItem';

  this.DashboardView = Ember.View.extend(t);

}).apply(LxxlApp);
