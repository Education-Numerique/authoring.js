(function() {
  var t = this.lxxlPageView('qtiedit');


  var modalHandler = new (function () {
    var _store = {};

    this.save = function (key, callback) {
        _store[key] = callback;
    };

    this.clear = function (key) {
        _store[key] = null;
    };

    this.get = function (key) {
        return _store[key] || false;
    };

  })();

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

            this.get('controller').moveQuestion(item, toIndex);
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

                    this.get('controller').set('currentQuestion', this.get('_parentView.content'));
                    this.get('controller').moveAnswer(item, toIndex);
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
                                ui.placeholder.html('<td /><td /><td /><td /><td /><td />');
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
                    // 
                    
                    DeleteButton : Em.View.extend({
                        tagName : "button",
                        answer : null,
                        modalName : null,

                        attributeBindings : ['href', 'data-toggle'],

                        click : function () {
                            modalHandler.save(this.get('modalName'), function() {
                                this.get('controller').set('currentQuestion', this.get('_parentView._parentView._parentView.content'));
                                this.get('controller').deleteAnswer(this.get('answer'));
                            }.bind(this));
                        }
                    })
                })
            })
        })
    }),

    ModalBox : Em.View.extend({
        modalName : null,

        CancelButton : Em.View.extend({
            attributeBindings : ['data-dismiss'],

            click : function () {
                modalHandler.clear(this.get('modalName'));
                return true;
            }
        }),
        ConfirmButton : Em.View.extend({
            click : function () {
                objectToDelete = modalHandler.get(this.get('_parentView.modalName'));
                objectToDelete();
                this.get('_parentView').$('>.modal').modal('hide');
                return true;
            }
        }),
    }),

    didInsertElement: function() {
        this.$('input')[0].blur();
    }
  });
}).apply(LxxlApp);
