(function() {
  'use strict';
  // var t = this.lxxlPageView('qtiedit');

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

  this.QtiEditView = Ember.View.extend({

    StaticPage: Em.View.extend({
      templateName: 'pages/qtiedit/page'
    }),

    TatPage: Em.View.extend({
      templateName: 'pages/qtiedit/tat',
      TimeButton: Em.View.extend({
        tagName: 'button',
        type: 'button',
        attributeBindings: ['type'],

        didInsertElement: function() {
          // var self = this.$('.checker');
          this.$().on('click', function(e) {
            if (this.$('.checker').has($(e.target)).length && this.$('input').attr('checked'))
              $('#modal-page-timer').modal('show');
            else if (this.$('[data-toggle]')[0] == e.target) {
              if (!this.get('controller.pageActivatedLimitedTime'))
                this.set('controller.pageActivatedLimitedTime', true);
            }

          }.bind(this));
        }

      }),

      toggleSideDocument: function() {
        var hasDocument = this.get('controller.currentPage.hasDocument');

        if (hasDocument) {
          modalHandler.save('deleteSideDocument', function() {
            this.set('controller.currentPage.document', '');
            this.set('controller.currentPage.hasDocument', false);
          }.bind(this));
          $('#modal-delete-side-document').modal('show');
        } else {
          this.set('controller.currentPage.hasDocument', true);
        }
      },
      TatGestion: Em.View.extend({
        tats: [],
        current: 0,
        tmpNode: null,

        Tat: Em.Object.extend({
          word: null,
          clue: null,
          alt: null,
          item: null
        }),

        tatUpdated: function() {
          this.set('tats', []);
          var tats = $('<p />');
          this.set('tmpNode', tats);
          tats.html(this.get('controller.currentPage.tat'));
          tats.find('[data-type=tat]').each(function(i, item) {
            var tat = this.Tat.create();
            tat.word = $(item).text();
            tat.clue = $(item).attr('data-clue');
            tat.alt = $(item).attr('data-alt');
            tat.item = $(item);
            this.get('tats').pushObject(tat);
          }.bind(this));
        }.observes('controller.currentPage.tat'),

        currentTat: (function() {
          return this.get('tats')[this.get('current')];
        }.property('tats.length', 'current')),


        valueChanged: (function() {
          //XXX optim
          //Observes only when modal is visible
          if (!this.get('tmpNode') || !this.get('currentTat.item'))
            return;

          this.get('currentTat.item').text(this.get('currentTat.word'));
          this.get('currentTat.item').attr('data-clue', this.get('currentTat.clue'));
          this.get('currentTat.item').attr('data-alt', this.get('currentTat.alt'));
          if (this.get('controller.currentPage.tat') == this.get('tmpNode').html())
            return;

          this.set('controller.currentPage.tat', this.get('tmpNode').html());
        }.observes('currentTat.word', 'currentTat.clue', 'currentTat.alt')),

        hasNext: (function() {
          return (this.get('current') < (this.get('tats.length') - 1));
        }.property('tats.length', 'current')),

        hasPrevious: (function() {
          return (this.get('current') > 0);
        }.property('tats.length', 'current')),

        goNext: function() {
          this.incrementProperty('current');
        },

        goPrevious: function() {
          this.decrementProperty('current');
        }

      })
    }),

    QuizzPage: Em.View.extend({
      templateName: 'pages/qtiedit/quizz',
      TimeButton: Em.View.extend({
        tagName: 'button',
        type: 'button',
        attributeBindings: ['type'],

        didInsertElement: function() {
          // var self = this.$('.checker');
          this.$().on('click', function(e) {
            if (this.$('.checker').has($(e.target)).length && this.$('input').attr('checked'))
              $('#modal-page-timer').modal('show');
            else if (this.$('[data-toggle]')[0] == e.target) {
              if (!this.get('controller.pageActivatedLimitedTime'))
                this.set('controller.pageActivatedLimitedTime', true);
            }

          }.bind(this));
        }


      }),

      toggleSideDocument: function() {
        var hasDocument = this.get('controller.currentPage.hasDocument');

        if (hasDocument) {
          modalHandler.save('deleteSideDocument', function() {
            this.set('controller.currentPage.document', '');
            this.set('controller.currentPage.hasDocument', false);
          }.bind(this));
          $('#modal-delete-side-document').modal('show');
        } else {
          this.set('controller.currentPage.hasDocument', true);
        }
      },
      SequenceButton: Em.View.extend({
        tagName: 'button',

        click: function(e) {
          // console.log('====> click');
          if (this.$('.checker').has($(e.target)).length) {
            return true;
          }

          // console.log('====> go model');
        }
      }),
      AddQuestionButton: Em.View.extend({
        click: function(e) {
          this.get('controller').addQuestion();
          e.preventDefault();
          return false;
        }
      }),

      CollapseAllQuestions: Em.View.extend({
        init: function() {
          this._super();
          this.updateIsVisible();
        },

        click: function(e) {
          var boxes = this.get('_parentView').$('.questions-list > .question-box > .widget-content');
          boxes.hide();
          boxes.removeClass('slidify-on').addClass('slidify');

          e.preventDefault();
          return false;
        },

        updateIsVisible: function() {
          this.set('isVisible', !!this.get('controller.currentPage.questions.length'));
        }.observes('controller.currentPage.questions.length')
      }),

      questionsCollectionView: Em.CollectionView.extend({
        lastMove: 0,

        moveItem: function(fromIndex, toIndex) {
          var items = this.get('content');
          var item = items.objectAt(fromIndex);

          this.get('controller').moveQuestion(item, toIndex);
          this.set('lastMove', (new Date().getTime()));
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
              if ($(ui.item).find('.widget-content').hasClass('slidify-on')) {
                $(ui.item).find('.widget-content').show();
              }
            },
            beforeStart: function(event, ui) {
              if ($(ui.item).find('.widget-content').hasClass('slidify-on')) {
                $(ui.item).find('.widget-content').hide();
              }
            },
            containment: 'parent',
            tolerance: 'pointer'
          });
        },

        emptyView: Ember.View.extend({
          classNames: ['empty'],
          template: Ember.Handlebars.compile('<i>Aucune question</i>')
        }),

        itemViewClass: Em.View.extend({
          classNames: ['widget-box', 'question-box'],

          questionNumber: (function() {
            return this.get('parentView.content').indexOf(this.get('content')) + 1;
          }.property('parentView.lastMove')),

          widgetIdAnchor: function() {
            return '#widget-question-' + this.get('elementId');
          }.property('elementId'),

          widgetId: function() {
            return 'widget-question-' + this.get('elementId');
          }.property('elementId'),

          DeleteQuestionButton: Em.View.extend({
            tagName: 'button',
            question: null,
            modalName: null,

            attributeBindings: ['href', 'data-toggle'],

            click: function(event) {
              modalHandler.save(this.get('modalName'), function() {
                this.get('controller').deleteQuestion(this.get('question'));
              }.bind(this));
              $(this.get('href')).modal('show');
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

            selectedAnswer: null,

            moveItem: function(fromIndex, toIndex) {
              var items = this.get('content');
              var item = items.objectAt(fromIndex);

              this.get('controller').set('currentQuestion', this.get('_parentView.content'));
              this.get('controller').moveAnswer(item, toIndex);
            },

            test: function() {
              this.get('content').forEach(function(item) {
                if (this.get('selectedAnswer') == item)
                  item.set('isCorrect', true);
                else
                  item.set('isCorrect', false);
              }.bind(this));
            }.observes('selectedAnswer'),




            didInsertElement: function() {
              var view = this;
              view.get('_parentView').$('table tbody').sortable({
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
                containment: 'parent',
                tolerance: 'pointer'
              }).disableSelection();
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

                click: function(e) {
                  modalHandler.save(this.get('modalName'), function() {
                    this.get('controller').set('currentQuestion',
                        this.get('question'));
                    this.get('controller').deleteAnswer(this.get('answer'));
                  }.bind(this));
                  $(this.get('href')).modal('show');
                  e.preventDefault();
                  return false;
                }
              })
            })
          })
        })
      })
    }),

    InformationTab: Em.View.extend({
      templateName: 'pages/qtiedit/informations',

      didInsertElement: function() {
        var self = this;


        var _loadImage = function(img) {

          if (typeof(img) === 'string') {
            $('.dropzone .preview').empty();
            $('.dropzone .preview').append($('<img src="' + img + '" style="max-width:300px;max-height:300px" />'));
            $('.dropzone .preview').removeClass('default');
            return;
          } else {
            var r = new FileReader();
            r.onload = function(e) {
              self.get('controller.content').set('thumbnail', e.target.result);
            };

            r.readAsDataURL(img);
          }


          window.loadImage(img, function(img) {
            $('.dropzone .preview').empty();
            $('.dropzone .preview').append(img);
            $('.dropzone .preview').removeClass('default');

            var container = $('.dropzone .preview');
            var node = container.find('canvas,img');
            var w = node.width() * 100 / container.width();
            var h = node.height() * 100 / container.height();

            node.css({
              'top' : ((100 - h) / 2) + '%',
              'left' : ((100 - w) / 2) + '%'
            });
          }, {
            maxWidth: 300,
            maxHeight: 300,
            canvas: true
          });


        };

        if (self.get('controller.content.thumbnail'))
          _loadImage(self.get('controller.content.thumbnail'));


        $('#fileupload').fileupload();
        $('#fileupload').fileupload('option', {
          dropZone: this.$('.dropzone')[0],
          url: '//roxee.tv/',
          limitMultiFileUploads: 1,
          maxFileSize: 5000000,
          acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
          process: [
            {
                      action: 'load',
                      fileTypes: /^image\/(gif|jpeg|png)$/,
                      maxFileSize: 20000000 // 20MB
            },
            {
                      action: 'resize',
                      maxWidth: 1440,
                      maxHeight: 900
            },
            {
                      action: 'save'
            }
          ],
          add: function(e, data) {
            $(this).fileupload('process', data).done(function() {
              _loadImage(data.files[0]);

            });
          }
        });

        $(document).bind('dragover', function(e) {
          var dropZone = $('.dropzone'),
              timeout = window.dropZoneTimeout;
          if (!timeout) {
            dropZone.addClass('in');
          } else {
            clearTimeout(timeout);
          }
          if (e.target === dropZone[0]) {
            dropZone.addClass('hover');
          } else {
            dropZone.removeClass('hover');
          }
          window.dropZoneTimeout = setTimeout(function() {
            window.dropZoneTimeout = null;
            dropZone.removeClass('in hover');
          }, 100);
        });
      }
    }),





    InformationButton: Em.View.extend({
      tagName: 'button',
      click: function(e) {
        e.preventDefault();
        this.get('controller').set('currentPage', null);
        return false;
      },

      isActiveUpdate: function() {
        var value = this.get('controller.currentPage');
        if (!value)
          this.$().addClass('section-active');
        else
          this.$().removeClass('section-active');
      }.observes('controller.currentPage')
    }),

    DoPreview: Em.View.extend({
      tagName: 'button',
      click: function(e) {
        e.preventDefault();
        $('#modal-preview').modal({keyboard: false, backdrop: true});
        this.get('controller').doPreview($('#modal-preview-body'));
        return false;
      }
    }),

    DoExport: Em.View.extend({
      tagName: 'button',
      click: function(/*e*/) {
        return false;
      }
    }),

    DoPublish: Em.View.extend({
      tagName: 'button',
      click: function(/*e*/) {
        return false;
      }
    }),

    DoSave: Em.View.extend({
      tagName: 'button',
      click: function(/*e*/) {
        return false;
      }
    }),

    AddPageButton: Em.View.extend({
      click: function(/*e*/) {
        this.get('controller').addPage();
        this.get('controller.currentPage').set('flavor', this.get('controller.flavors.selected'));
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
          },
          containment: 'parent',
          tolerance: 'pointer'
        });
      },

      itemViewClass: Em.View.extend({
        classNameBindings: ['pageType'],
        pageType: null,
        flavorIcon: null,

        didInsertElement: function() {
          this.updateActive();
          this.flavorUpdated();
        },

        click: function(/*e*/) {
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
          if (value.id == 'simple') {
            this.set('flavorIcon', 'icon-file');
            this.set('pageType', 'page-static');
          } else if (value.id == 'quizz') {
            this.set('flavorIcon', 'icon-ok-circle');
            this.set('pageType', 'page-quizz');
          } else if (value.id == 'quizzMulti') {
            this.set('flavorIcon', ' icon-check');
            this.set('pageType', 'page-quizz-multi');
          } else if (value.id == 'tat') {
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
            $(this.get('href')).modal('show');
            event.preventDefault();
            return false;
          }
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
          var objectToDelete = modalHandler.get(this.get('_parentView.modalName'));
          objectToDelete();
          this.get('_parentView').$('>.modal').modal('hide');
          return true;
        }
      })
    }),

    templateName: function() {
      return 'pages/qtiedit';
    }.property(),

    didInsertElement: function() {
      LxxlLib.behaviors.bindBehaviors(this.get('element'));
      this.set('parentView.controller.pageTitle', I18n.translate('breadcrumb.qtiedit.title'));

      this.get('controller').set('currentPage', this.get('controller.content.pages')[0]);
    }
  });
}).apply(LxxlApp);
