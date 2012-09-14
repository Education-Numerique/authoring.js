(function() {
  var t = this.lxxlPageView('qtiedit');
  this.QtiEditView = Ember.View.extend(t, {

    didInsertElement: function() {

      $('a[data-toggle="tab"]').on('shown', function(e) {
        if ($(e.target).attr('href') == '#edit') {
          this.$('.widget-title .buttons').show();
        } else {
          this.$('.widget-title .buttons').hide();
        }
      }.bind(this));

      $('.pages-list').sortable({
        placeholder: 'ui-sortable-placeholder'
      });

      window.setTimeout(function() {
        tinyMCE.init({
          mode: 'textareas',
          theme: 'simple',
          editor_selector: 'mceSimple'
        });
      }, 2000);
    },

    totoLaMoule: function(from, key, value) {
      if (!this.get('element'))
        return;

      console.log('====>', this.$('#form-page-explanation').length);

    }.observes('element')
  });
}).apply(LxxlApp);
