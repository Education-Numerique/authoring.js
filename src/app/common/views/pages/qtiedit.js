(function() {
  var t = this.lxxlPageView('qtiedit');
  this.QtiEditView = Ember.View.extend(t, {

    pagesCollectionView : Em.CollectionView.extend({
        moveItem: function(fromIndex, toIndex){
            var items = this.get('content');
            var item = items.objectAt(fromIndex);

            this.get('controller').movePage(item, toIndex);
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

            didInsertElement : function () {
                this.updateActive();
            },

            click: function () {
                this.get('controller').set('currentPage', this.get('content'));
            },

            updateActive : function() {
                if (this.get('controller.currentPage') == this.get('content')) {
                    this.$().addClass('active');
                } else {
                    this.$().removeClass('active');
                }
            }.observes('controller.currentPage')
        })
    }),

    questionsCollectionView : Em.CollectionView.extend({
        moveItem: function(fromIndex, toIndex){
            var items = this.get('content');
            var item = items.objectAt(fromIndex);

            //XXX FIXME moveQuestion
            //this.get('controller').movePage(item, toIndex);
        },
        didInsertElement : function () {
            var view = this;
            view.$().sortable({
                handle : '.widget-title',
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
            classNames: ['widget-box', 'question-box'],

            widgetIdAnchor : function() {
                return '#widget-question-' + this.get('element.id');
            }.property('element.id'),

            widgetId : function() {
                return 'widget-question-' + this.get('element.id');
            }.property('element.id'),

            answersCollectionView : Em.CollectionView.extend({
                moveItem: function(fromIndex, toIndex){
                    var items = this.get('content');
                    var item = items.objectAt(fromIndex);

                    //XXX FIXME moveQuestion
                    //this.get('controller').movePage(item, toIndex);
                },
                didInsertElement : function () {
                    var view = this;
                    view.get('_parentView').$('.container-fix-sortify').each(function () {

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
                                ui.item.previousIndex = ui.item.index();     
                              },
                              stop: function(event, ui) {
                                view.moveItem(ui.item.previousIndex, ui.item.index());
                              },
                              scroll:true,
                              containment: $(this)
                        }).disableSelection();
                    });
                },
                itemViewClass : Em.View.extend({
                    // classNames: ['widget-box', 'question-box'],

                    // widgetIdAnchor : function() {
                    //     return '#widget-question-' + this.get('element.id');
                    // }.property('element.id'),

                    // widgetId : function() {
                    //     return 'widget-question-' + this.get('element.id');
                    // }.property('element.id')
                })
            })
        })
    }),

    didInsertElement: function() {

      

      $('textarea').redactor({ 
            imageUpload: '/file_upload.php',
            autoresize: true
        });
    }
  });
}).apply(LxxlApp);
