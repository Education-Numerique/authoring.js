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

      $('textarea').redactor({ 
            imageUpload: '/file_upload.php',
            autoresize: true
        });
    }
  });
}).apply(LxxlApp);
