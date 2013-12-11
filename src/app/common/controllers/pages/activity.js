(function() {
  'use strict';
  this.ActivityEditController = Ember.ObjectController.extend({
    /**
     * To be handled somewhere else...
     */

    saveActivity: function() {
      this.get('content').controller.push();
      $('#action-saved').modal('show');
    },

    publishActivity: function() {
      var ctr = this.get('content').controller;
      var result = ctr.canPublish();
      switch (result) {
        case ctr.SHORT_TITLE:
          $('#action-published-error #pub-err').html('le titre de votre activité doit compter au moins 4 caractères.');
          $('#action-published-error').modal('show');
          break;
        case ctr.SHORT_DESCRIPTION:
          $('#action-published-error #pub-err').html('la description de votre activité doit compter au moins 20 caractères.');
          $('#action-published-error').modal('show');
          break;
        case ctr.ONE_PAGE:
          $('#action-published-error #pub-err').html('votre activité doit contenir au moins une page.');
          $('#action-published-error').modal('show');
          break;
        case ctr.NO_GOOD_ANSWER:
          $('#action-published-error #pub-err').html('certaines de vos questions n\'indiquent pas de bonne réponse!');
          $('#action-published-error').modal('show');
          break;
        default:
          ctr.publish();
          $('#action-published').modal('show');
          break;
      }
    },

    deleteActivity: function() {
      jsBoot.controllers.userActivity.removeEventListener(jsBoot.controllers.userActivity.STATE_CHANGED,
          this.autoSaveListener);
      this.get('content').controller.destroy();
      LxxlApp.router.send('showMyActivities');
    },

    unpublishActivity: function() {
      this.get('content.controller').unpublish();
    },

    previewActivity: function() {
      $('#modal-preview').modal({keyboard: false, backdrop: true});
      this.doPreview($('#modal-preview-body'));
      $('#modal-preview').on('hide', function(e) {
        if ($(e.target).attr('id') == 'modal-preview') {
          this.get('content').pages.forEach(function(p) {
            p.score = null;
            p.completed = null;
            if (p.questions)
              p.questions.forEach(function(q) {
                q.score = null;
                q.completed = false;
              });
          });
        }
      }.bind(this));
    },

    embedActivity: function() {
      $('#action-embed').modal('show');
    },

    exportScorm: function() {
      var ip = this.get('content').controller.isPublished;
      if (!ip) {
        $('#action-scorm-error #pub-err').html('Seules les activités publiées peuvent être exportées sous cette forme.');
        $('#action-scorm-error').modal('show');
      }else {
        console.warn('***** export scorm');
        var title = this.get('content.controller.published.title');
        ScormPacker(this.get('content.controller.id'), title, function(zip) {
          var content = zip.generate();
          var blob = zip.generate({type: 'blob'});
          var myLink = $('#download-scorm').get(0);
          myLink.href = window.URL.createObjectURL(blob);
          myLink.download = title.replace(/[^a-z0-9]/gi, '-').trim() + '.zip';
          // $('#download-scorm').attr('href', "data:application/zip;base64," + content);
          // $('#download-scorm').attr('download', 'e-and-n');
          $('#download-package-scorm').modal('show');
        });
      }
      //       var zip = new JSZip();

      // zip.file("RAGOUT/Hello.txt", "Hello World\n");
    },


    addMedia: function(file, success/*, error*/) {
      this.get('content').controller.addMedia(file, function(url) {
        success({filelink: url});
      }, function(error) {
        error({error: error});
      });
    },


    /**
     * Pages management
     */

    isStaticPage: false,
    isPerfPage: false,
    isQuizz: false,
    isMixnmatch: false,
    isQuizzQcm: false,
    isQuizzMulti: false,
    isTat: false,
    flavorLabel: '',


    _updateCurrentFlavor: function() {
      var value = this.get('currentPage.flavor');

      this.set('isStaticPage', false);
      this.set('isPerfPage', false);
      this.set('isQuizz', false);
      this.set('isMixnmatch', false);
      this.set('isTat', false);
      this.set('isQuizzQcm', false);
      this.set('isQuizzMulti', false);

      if (!value)
        return;

      if (value.id == 'simple') {
        this.set('isStaticPage', true);
      } else if (value.id == 'quizz') {
        this.set('isQuizz', true);
        this.set('isQuizzQcm', true);
      } else if (value.id == 'quizzMulti') {
        this.set('isQuizz', true);
        this.set('isQuizzMulti', true);
      } else if (value.id == 'tat') {
        this.set('isTat', true);
      } else if (value.id == 'jmt') {
        this.set('isMixnmatch', true);
      } else if (value.id == 'perf') {
        this.set('isPerfPage', true);
      }

      this.set('flavorLabel', value.title);// I18n.translate('activities.pageFlavors')[value]);

    }.observes('currentPage.flavor'),


    addPage: function(at) {
      var newPage = new LxxlLib.model.Page();
      if (!at)
        this.content.get('pages').pushObject(newPage);
      else
        this.content.get('pages').replace(at, 0, [newPage]);
      this.set('currentPage', newPage);
    },

    deletePage: function(page) {
      if (this.get('currentPage') == page)
        this.set('currentPage', null);
      var pages = this.content.get('pages');
      pages.replace(pages.indexOf(page), 1);
      // console.warn("--delete");
      // this.content.get('pages').forEach(function(item){console.warn(item, item.title);});
    },

    movePage: function(page, pos) {
      var pages = this.content.get('pages');
      pages.replace(pages.indexOf(page), 1);
      pages.replace(pos, 0, [page]);
      // this.content.get('pages').forEach(function(item){console.warn(item, item.title);});
    },


    doPreview: function(node/*, activity*/) {
      var a = new LxxlLib.Masher();
      a.setupViewport(node, true);
      // a.addStyle('body{background-color: blue;}');
      /*
    a.addStyle('http://static.loft.sn.ackitup.net:4242/lib/frameworks/normalize/normalize-2.0.css');
    */
      a.setupTemplate('{PUKE-PACKAGE-VERSION}/activity/activity.tpl');

      a.showActivity(this.get('content').controller, function() {
        // console.warn('All set baby!');
      });
    },


    /**
     * Current page management
     */
    _storedCurrentPage: null,

    currentPage: (function(key, value) {
      // Getter
      //
      window.TEST = this;
      if (arguments.length === 1) {
        // Empty(ed) document gets null
        if (!this.get('content.pages.length'))
          return this.set('_storedCurrentPage', null) && null;
        return this.get('_storedCurrentPage');
      }

      // Setter
      this.set('_storedCurrentPage', value);
      return value;
    }.property('content', 'content.pages.length')),

    tatIsAlphabetical: (function(k, v) {
      if (arguments.length === 1) {
        return !this.get('currentPage.displayHolesRandomly');
      }
      this.set('currentPage.displayHolesRandomly', !v);

      return !v;
    }.property('currentPage', 'currentPage.displayHolesRandomly')),

    tatIsRandom: (function(k, v) {

      if (arguments.length === 1) {
        return this.get('currentPage.displayHolesRandomly');
      }
      this.set('currentPage.displayHolesRandomly', v);

      return v;
    }.property('currentPage', 'currentPage.displayHolesRandomly')),


    pageActivatedLimitedTime: (function(key, value) {
      if (arguments.length === 1) {
        return !!this.get('currentPage.limitedTime');
      }
      this.get('currentPage').set('limitedTime', value ? 60 : 0);

      return !!this.get('currentPage.limitedTime');

    }.property('currentPage', 'currentPage.limitedTime')),


    limitedTimeUpdated: function() {
      if (!this.get('currentPage')) {
        return;
      }

      if (!this.get('minutes.selected') || !this.get('seconds.selected'))
        return;

      var time = this.get('minutes.selected.id') * 60;
      time += this.get('seconds.selected.id');
      this.set('currentPage.limitedTime', time);
    }.observes('currentPage', 'minutes.selected', 'seconds.selected'),

    setSelectedLimitedTime: function() {
      var date = new Date(null);

      date.setSeconds(this.get('currentPage.limitedTime'));
      var time = date.toUTCString().split('1970 ').pop().split('GMT').shift().split(':').map(function(i) {
        return parseInt(i, 10);
      });

      var selectedMinute = null;
      this.get('minutes.content').forEach(function(i) {
        if (i.id == time[1])
          selectedMinute = i;
      });

      var selectedSecond = null;

      this.get('seconds.content').forEach(function(i) {
        if (i.id == time[2])
          selectedSecond = i;
      });

      this.set('minutes.selected', selectedMinute);
      this.set('seconds.selected', selectedSecond);
    }.observes('currentPage.limitedTime'),

    pageActivatedSequencing: (function(key, value) {
      if (arguments.length !== 1) {
        if (value == true && this.get('currentPage.sequencing') == -1) {
          this.set('currentPage.sequencing', 0);
        } else if (value == false && this.get('currentPage.sequencing') >= 0)
          this.set('currentPage.sequencing', -1);
      }

      return (this.get('currentPage.sequencing') >= 0 ? true : false);

    }.property('currentPage.sequencing')),


    quizzSequencingIsNaturalOrder: function() {
      return this.get('currentPage.sequencing') == -1;
    }.property('currentPage.sequencing'),

    quizzSequencingIsRandom: function() {
      return this.get('currentPage.sequencing') == 0;
    }.property('currentPage.sequencing'),

    quizzSequencingIsRandomSubset: function() {
      return this.get('currentPage.sequencing') >= 1;
    }.property('currentPage.sequencing'),

    quizzSequencingIsRandomSubsetValue: function(key, value) {
      if (arguments.length === 1)
        return 1;
      value = parseInt(value, 10);

      if (!value || value <= 0)
        value = 1;
      this.set('currentPage.sequencing', value);
      return value;
    }.property(),

    // setQuizzSequencing: (function(key, value) {
    //   console.warn('************ set quizz sequencing', value);

    //   if (arguments.length === 1)
    //     return value;
    //   value = parseInt(value, 10);
    //   // console.log('* - * - *', value);
    //   //

    //   if (value == 0) {
    //     this.set('currentPage.sequencing', 0);
    //   } else if (value == 1) {
    //     this.set('currentPage.sequencing', 1);
    //   }

    //   return value;
    // }.property()),

    _storedCurrentQuestion: null,

    currentQuestion: (function(key, value) {
      // Getter
      if (arguments.length === 1) {
        // Empty(ed) document gets null
        if (!this.get('currentPage.questions').length)
          return this.set('_storedCurrentQuestion', null) && null;
        return !this.get('_storedCurrentQuestion') && this.get('currentPage.questions')[0] ||
            this.get('_storedCurrentQuestion');
      }

      // Setter
      this.set('_storedCurrentQuestion', value);
      return value;
    }.property('currentPage', 'currentPage.questions.length')),


    addQuestion: function(at) {
      var nq = new LxxlLib.model.Question();
      if (!at)
        this.get('currentPage.questions').pushObject(nq);
      else
        this.get('currentPage.questions').replace(at, 0, nq);
      this.set('currentQuestion', nq);
      this.addAnswer();
      return nq;
    },

    deleteQuestion: function(question) {
      if (this.get('currentQuestion') == question)
        this.set('currentQuestion', null);
      this.get('currentPage.questions').replace(this.get('currentPage.questions').indexOf(question), 1);
    },

    moveQuestion: function(question, pos) {
      this.get('currentPage.questions').replace(this.get('currentPage.questions').indexOf(question), 1);
      this.get('currentPage.questions').replace(pos, 0, [question]);
    },

    addAnswer: function(at) {
      if (!at)
        this.get('currentQuestion.answers').pushObject(new LxxlLib.model.Answer());
      else
        this.get('currentQuestion.answers').replace(at, 0, new LxxlLib.model.Answer());
    },

    deleteAnswer: function(answer) {
      this.get('currentQuestion.answers').replace(this.get('currentQuestion.answers').indexOf(answer), 1);
    },

    moveAnswer: function(answer, pos) {
      this.get('currentQuestion.answers').replace(this.get('currentQuestion.answers').indexOf(answer), 1);
      this.get('currentQuestion.answers').replace(pos, 0, [answer]);
    },



    /**
     * Categories handling
     */

    matters: Ember.Object.create({
      content: LxxlLib.factories.metadata.matters
    }),

    levels: Ember.Object.create({
      content: LxxlLib.factories.metadata.levels
    }),

    categoryTree: (function() {
      var obj = Em.Object.create();
      if (!this.get('content.level') || !this.get('content.matter'))
        return obj;
      var tree = LxxlLib.factories.metadata.getTreeFor(this.get('content.matter.id'), this.get('content.level.id'));
      if (tree)
        obj.set('content', (tree && tree.content) || []);
      return obj;
    }.property('content', 'content.level', 'content.matter')),

    lengths: Ember.Object.create({
      content: LxxlLib.factories.metadata.lengths
    }),

    difficulties: Ember.Object.create({
      content: LxxlLib.factories.metadata.difficulties
    }),

    flavors: Ember.Object.create({
      content: LxxlLib.factories.metadata.flavors
    }),

    minutes: Em.Object.create({
      content: [0, 1, 2, 3, 4, 5, 10, 15, 20, 30, 45, 60, 90].map(function(key) {
        return {id: key, title: key + (key > 1 ? ' minutes' : ' minute')};
      }),
      selected: {id: 0, title: '0 minute'}
    }),

    seconds: Em.Object.create({
      content: [0, 10, 20, 30, 45].map(function(key) {
        return {id: key, title: key + (key > 1 ? ' secondes' : ' seconde')};
      }),
      selected: {id: 0, title: '0 seconde'}
    })

  });


}).apply(LxxlApp);


