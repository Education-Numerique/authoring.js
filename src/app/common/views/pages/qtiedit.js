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
        placeholder: 'ui-sortable-placeholder',
        axis: 'y'
      });


      $('.questions-list').sortable({
        placeholder: 'ui-sortable-placeholder',
        handle : '.widget-title',
        start : function(event, ui) {
        
        },
        stop : function(event, ui) {
        },
        axis: 'y'
      });




      $('.container-fix-sortify').each(function () {
            $(this).find('table tbody').sortable({
                placeholder: 'ui-sortable-placeholder',
                handle: 'td:first-of-type',
                helper: function(e, tr)
                  {
                    var $originals = tr.children();
                    var $helper = tr.clone();
                    $helper.children().each(function(index)
                    {
                      // Set helper cell sizes to match the original sizes
                      $(this).width($originals.eq(index).width())
                    });
                    return $helper;
                  },
                  axis: 'y',
                  start : function(event, ui) {
                    ui.placeholder.html('<td /><td /><td /><td />');
                  },
                  scroll:true,
                  containment: $(this)
            }).disableSelection();
      });

      $('textarea').redactor({ 
            imageUpload: '/file_upload.php',
            autoresize: true
        });
    }
  });
}).apply(LxxlApp);
