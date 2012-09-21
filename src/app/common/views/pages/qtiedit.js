(function() {
  var t = this.lxxlPageView('qtiedit');


  var modalHandler = new (function() {
    var _store = {};

    this.save = function(key, callback) {
      _store[key] = callback;
    };

    this.clear = function(key) {
      _store[key] = null;
    };

    this.get = function(key) {
      return _store[key] || false;
    };

  })();

  this.QtiEditView = Ember.View.extend(t, {
    classNameBindings: ['isStaticPage', 'isQuizz', 'isTat'],
    isStaticPage: false,
    isQuizz: false,
    isTat: false,


    _updateFlavor: function() {
      var value = this.get('controller.currentPage.flavor');

      this.set('isStaticPage', false);
      this.set('isQuizz', false);
      this.set('isTat', false);
      console.log('????', value);
      if (value == 'staticPage')
        this.set('isStaticPage', true);
      else if (value == 'quizz')
        this.set('isQuizz', true);
      else if (value == 'tat')
        this.set('isTat', true);
    }.observes('controller.currentPage.flavor'),

    InformationButton : Em.View.extend({
      tagName: 'button',
      click : function (e) {
        e.preventDefault();
        this.get('controller').set('currentPage', null);
        return false;
      }
    }),

    DoPreview : Em.View.extend({
      tagName : 'button',
      click : function(e) {
        e.preventDefault();
        this.get('controller').doPreview();
        return false;
      }
    }),

    AddQuestionButton: Em.View.extend({
      click: function(e) {
        this.get('controller').addQuestion();
        e.preventDefault();
        return false;
      }
    }),

    AddPageButton: Em.View.extend({
      click: function(e) {
        this.get('controller').addPage();
        this.get('controller.currentPage').set('flavor', this.get('controller.flavors.selected.value'));
        $('#modal-create-page').modal('hide');
      }
    }),




    pagesCollectionView: Em.CollectionView.extend({
      moveItem: function(fromIndex, toIndex) {
        var items = this.get('content');
        var item = items.objectAt(fromIndex);

        this.get('controller').movePage(item, toIndex);
      },
      didInsertElement: function() {
        var view = this;
        view.$().sortable({
          placeholder: 'ui-sortable-placeholder',
          axis: 'y',
          delay: 150,
          items: 'li:not(.empty)',
          start: function(event, ui) {
            ui.item.previousIndex = ui.item.index();
          },
          stop: function(event, ui) {
            view.moveItem(ui.item.previousIndex, ui.item.index());
          }
        });
      },
      emptyView: Ember.View.extend({
        classNames: ['empty'],
        template: Ember.Handlebars.compile('<a><span class=\"page-title\">Aucune page</span></a>')
      }),

      itemViewClass: Em.View.extend({
        classNameBindings: ['pageType'],
        pageType: null,
        flavorIcon: null,

        didInsertElement: function() {
          this.updateActive();
          this.flavorUpdated();
        },

        click: function() {
          this.get('controller').set('currentPage', this.get('content'));
        },

        updateActive: function() {
          if (!this.get('element'))
            return;

          if (this.get('controller.currentPage') == this.get('content')) {
            this.$().addClass('active');
          } else {
            this.$().removeClass('active');
          }
        }.observes('controller.currentPage'),

        flavorUpdated: function() {
          var value = this.get('content.flavor');
          if (value == 'staticPage') {
            this.set('flavorIcon', 'icon-file');
            this.set('pageType', 'page-static');
          } else if (value == 'quizz') {
            this.set('flavorIcon', 'icon-ok');
            this.set('pageType', 'page-quizz');
          } else if (value == 'tat') {
            this.set('flavorIcon', 'icon-text-width');
            this.set('pageType', 'page-tat');
          }
        }.observes('content.flavor'),

        DeletePageButton: Em.View.extend({
          tagName: 'button',
          page: null,
          modalName: null,

          attributeBindings: ['href', 'data-toggle'],

          click: function(event) {
            modalHandler.save(this.get('modalName'), function() {
              this.get('controller').deletePage(this.get('page'));
            }.bind(this));

            event.preventDefault();
            return false;
          }
        })
      })
    }),

    questionsCollectionView: Em.CollectionView.extend({
      moveItem: function(fromIndex, toIndex) {
        var items = this.get('content');
        var item = items.objectAt(fromIndex);

        this.get('controller').moveQuestion(item, toIndex);
      },
      didInsertElement: function() {
        var view = this;
        view.$().sortable({
          handle: '.widget-title',
          placeholder: 'ui-sortable-placeholder',
          axis: 'y',
          delay: 150,
          start: function(event, ui) {
            ui.item.previousIndex = ui.item.index();
          },
          stop: function(event, ui) {
            view.moveItem(ui.item.previousIndex, ui.item.index());
          }
        });
      },

      emptyView: Ember.View.extend({
        classNames: ['empty'],
        template: Ember.Handlebars.compile('<i>Aucune question</i>')
      }),

      itemViewClass: Em.View.extend({
        classNames: ['widget-box', 'question-box'],

        widgetIdAnchor: function() {
          return '#widget-question-' + this.get('element.id');
        }.property('element.id'),

        widgetId: function() {
          return 'widget-question-' + this.get('element.id');
        }.property('element.id'),

        DeleteQuestionButton: Em.View.extend({
          tagName: 'button',
          question: null,
          modalName: null,

          attributeBindings: ['href', 'data-toggle'],

          click: function(event) {
            modalHandler.save(this.get('modalName'), function() {
              this.get('controller').deleteQuestion(this.get('question'));
            }.bind(this));

            event.preventDefault();
            return false;
          }
        }),

        AddAnswerButton: Em.View.extend({
          click: function(e) {
            this.get('controller').set('currentQuestion', this.get('_parentView.content'));
            this.get('controller').addAnswer();
            e.preventDefault();
            return false;
          }
        }),

        answersCollectionView: Em.CollectionView.extend({
          moveItem: function(fromIndex, toIndex) {
            var items = this.get('content');
            var item = items.objectAt(fromIndex);

            this.get('controller').set('currentQuestion', this.get('_parentView.content'));
            this.get('controller').moveAnswer(item, toIndex);
          },
          didInsertElement: function() {
            var view = this;
            view.get('_parentView').$('.container-fix-sortify').each(function() {

              $(this).find('table tbody').sortable({
                placeholder: 'ui-sortable-placeholder',
                handle: 'td:first-of-type',
                delay: 150,
                items: 'tr:not(.empty)',
                helper: function(e, tr)
                {
                  var $originals = tr.children();
                  var $helper = tr.clone();
                  $helper.children().each(function(index)
                      {
                        // Set helper cell sizes to match the original sizes
                        $(this).width($originals.eq(index).width());
                      });
                  return $helper;
                },
                axis: 'y',
                start: function(event, ui) {
                  ui.placeholder.html('<td /><td /><td /><td /><td /><td />');
                  ui.item.previousIndex = ui.item.index();
                },
                stop: function(event, ui) {
                  view.moveItem(ui.item.previousIndex, ui.item.index());
                },
                scroll: true,
                containment: $(this)
              }).disableSelection();
            });
          },

          emptyView: Ember.View.extend({
            classNames: ['empty'],
            template: Ember.Handlebars.compile('<td colspan=\"6\"><i>Aucune réponse</i></td>')
          }),
          itemViewClass: Em.View.extend({

            DeleteButton: Em.View.extend({
              tagName: 'button',
              answer: null,
              modalName: null,

              attributeBindings: ['href', 'data-toggle'],

              click: function() {
                modalHandler.save(this.get('modalName'), function() {
                  this.get('controller').set('currentQuestion',
                      this.get('_parentView._parentView._parentView.content'));
                  this.get('controller').deleteAnswer(this.get('answer'));
                }.bind(this));
              }
            })
          })
        })
      })
    }),

    ModalBox: Em.View.extend({
      modalName: null,

      CancelButton: Em.View.extend({
        attributeBindings: ['data-dismiss'],

        click: function() {
          modalHandler.clear(this.get('modalName'));
          return true;
        }
      }),
      ConfirmButton: Em.View.extend({
        click: function() {
          objectToDelete = modalHandler.get(this.get('_parentView.modalName'));
          objectToDelete();
          this.get('_parentView').$('>.modal').modal('hide');
          return true;
        }
      })
    }),

    didInsertElement: function() {
      this.$('input')[0].blur();
      this._updateFlavor();

      this.get('controller').set('currentPage', null);
    }
  });
}).apply(LxxlApp);
