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

  this.ActivityEditView = Ember.View.extend({

    StaticPage: Em.View.extend({
      templateName: 'pages/activity/editor/page'
    }),

    TatPage: Em.View.extend({
      templateName: 'pages/activity/editor/tat',
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
          if (this.get('hasNext'))
            this.incrementProperty('current');
        },

        goPrevious: function() {
          if (this.get('hasPrevious'))
            this.decrementProperty('current');
        }

      })
    }),
  
    MixnmatchPage: Em.View.extend({
      templateName: 'pages/activity/editor/mixnmatch',
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
      SequenceButton: Em.View.extend({
        tagName: 'button',
        type: 'button',
        attributeBindings: ['type'],

        click: function(e) {
          if (this.$('.checker').has($(e.target)).length && this.$('input').attr('checked'))
            $('#modal-page-sequencing').modal('show');
          else if (this.$('[data-toggle]')[0] == e.target) {

          }
        }
      }),
      toggleSideDocument: function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
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
        return false;
      },
    }),

    QuizzPage: Em.View.extend({
      templateName: 'pages/activity/editor/quizz',
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
        },
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
        type: 'button',
        attributeBindings: ['type'],

        click: function(e) {
          if (this.$('.checker').has($(e.target)).length && this.$('input').attr('checked'))
            $('#modal-page-sequencing').modal('show');
          else if (this.$('[data-toggle]')[0] == e.target) {

          }
        }
      }),

      addQCM: function(e) {
        this.get('controller').addQuestion();
        e.preventDefault();
        return false;
      },

      addQRM: function(e) {
        var q = this.get('controller').addQuestion();
        q.set('isQRM', true);
        e.preventDefault();
        return false;
      },


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
      templateName: 'pages/activity/editor/informations',

      AttachmentsList: Em.CollectionView.extend({
        itemViewClass: Em.View.extend({
          tagName: 'li',
          classNames: '',
          type: '',

          init: function() {
            this._super();
            if (this.get('content.type').search('pdf') !== -1) {
              this.set('type', 'pdf');
            } else {
              this.set('type', 'mp3');
            }
          },

          deleteAttachment: function() {
            this.get('parentView.content').removeObject(this.get('content'));
          }
        })
      }),

      didInsertElement: function() {
        var self = this;

        $('#fileupload').fileupload();
        $('#fileupload').fileupload('option', {
          dropZone: this.$('.thumbnail-uploader .dropzone')[0],
          limitMultiFileUploads: 1,
          // maxFileSize: 5000000,
          // acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
          process: [
            {
                      action: 'load',
                      fileTypes: /^image\/(gif|jpe?g|png)$/,
                      maxFileSize: 20000000 // 20MB
            },
            {
                      action: 'resize',
                      maxWidth: 800,
                      maxHeight: 800,
                      minWidth: 40,
                      minHeight: 40
            },
            {
                      action: 'save'
            }
          ],
          add: function(e, data) {
            $(this).fileupload('process', data).done(function() {
              self.get('controller.content').controller.setThumbnail(data.files[0]);
            });
          }

        });

        $('#fileattachmentupload').fileupload();
        $('#fileattachmentupload').fileupload('option', {
          dropZone: this.$('.attachments .dropzone')[0],
          limitMultiFileUploads: 1,

          add: function(e, data) {
            var validation = /(application\/pdf|audio\/mpeg3|audio\/mp3|audio\/x-mpeg-3)$/i;
            var maxFileSize = 5000000;

            data.files.forEach(function(file) {
              if (validation.test(file.type) && file.size < maxFileSize) {
                self.get('controller.content').controller.addAttachment(file, file.name, function() {
                  showOkMessage('Le fichier <b>' + file.name + '</b> a bien été ajouté');
                }, function(e) {
                  showErrorMessage();
                });
              } else {
                if (!validation.test(file.type))
                  showErrorMessage('Le fichier <b>' + file.name + '</b> n\'est pas autorisé (' + file.type + ')');
                else if (file.size >= maxFileSize)
                  showErrorMessage('Le fichier <b>' + file.name + '</b> est trop volumineux. La limite est 5Mo.');
              }
            });
          },
          fail: function() {
            showErrorMessage();
          }

        });

        var showErrorMessage = function(message) {
          if (!message)
            message = 'Une erreure est survenue';
          $('.attachments-error span').html(message);
          $('.attachments-error').clearQueue();
          $('.attachments-error').fadeIn().delay(3000).fadeOut();
        };
        var showOkMessage = function(message) {
          $('.upload-ok').html(message);
          $('.upload-ok').clearQueue();
          $('.upload-ok').fadeIn().delay(3000).fadeOut();
        };

        this.$('.dropzone').bind('dragover', function(e) {
          $(this).addClass('hover');
        });
        this.$('.dropzone').bind('dragleave', function(e) {
          $(this).removeClass('hover');
        });
        this.$('.dropzone').bind('drop', function(e) {
          $(this).removeClass('hover').addClass('drop');
          window.setTimeout(function() {
            $(this).removeClass('drop');
          }.bind(this), 1000);

        });
      }
    }),





    InformationButton: Em.View.extend({
      tagName: 'button',
      classNames: 'section-active',

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
          } else if (value.id == 'jmt') {
            this.set('flavorIcon', 'icon-fullscreen');
            this.set('pageType', 'page-jmt');
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
      return 'pages/activity/editor';
    }.property(),

    didInsertElement: function() {
      LxxlLib.behaviors.bindBehaviors(this.get('element'));
      this.set('parentView.controller.pageTitle', I18n.translate('breadcrumb.activityedit.title'));

    }
  });
}).apply(LxxlApp);
