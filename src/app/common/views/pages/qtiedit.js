(function() {
  var t = this.lxxlPageView('qtiedit');
  this.QtiEditView = Ember.View.extend(t, {

    pagesCollectionView : Em.CollectionView.extend({
        moveItem: function(fromIndex, toIndex){
            var items = this.get('content');

            this.get('controller').movePage(items.objectAt(fromIndex), toIndex);
        },
        didInsertElement : function () {
            var view = this;
            view.$().sortable({
                placeholder: 'ui-sortable-placeholder',
                axis: 'y',
                start: function(event, ui) {
                    ui.item.previousIndex = ui.item.index();                      
                },
                stop: function(event, ui) {
                    view.moveItem(ui.item.previousIndex, ui.item.index());
                }
            });
        },
        itemViewClass : Em.View.extend({
            click: function () {
                this.get('_parentView').$('li').removeClass('active');
                this.$().addClass('active');
            }
        })
    }),

    didInsertElement: function() {

      


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
