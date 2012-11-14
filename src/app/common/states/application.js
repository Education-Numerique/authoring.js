/*global categoryFactory, activityFactory*/
(function() {
  'use strict';

  var lxxlRoute = function(name, adds) {
    var rt = {
      route: '/' + name,
      enter: function(router) {
        router.set('applicationController.selected', name);
      },
      connectOutlets: function(router) {
        router.get('applicationController').connectOutlet(name);
      }
    };
    if (adds)
      Object.keys(adds).forEach(function(i) {
        rt[i] = adds[i];
      });
    return Ember.Route.extend(rt);
  };


  this.Router = Ember.Router.extend({
    // XXX flag debug here
    enableLogging: true,

    root: Ember.Route.extend({
      // redirectsTo: 'dashboard',
      /*      index: lxxlRoute('/'),*/
      index: Ember.Route.extend({
        route: '/',
        redirectsTo: 'dashboard'
      }),

      // route: '/',
      // enter: function(router) {
      //   console.log('entering route index from', router.get('currentState.name'));
      // },
      // connectOutlets: function(router) {
      //   console.log('entered root.index, fully transitioned to', router.get('currentState.path'));
      //   //        router.get('applicationController').connectOutlet('another');
      //   //       redirectsTo: 'dashboard'
      // }


      // User account related
      showLogin: Ember.Route.transitionTo('login'),
      login: lxxlRoute('login'),

      showRegister: Ember.Route.transitionTo('register'),
      register: lxxlRoute('register'),

      showProfile: Ember.Route.transitionTo('profile'),
      profile: lxxlRoute('profile'),

      showSettings: Ember.Route.transitionTo('settings'),
      settings: lxxlRoute('settings'),



      // User base activities
      // showDashboard: Ember.Route.transitionTo('dashboard.index'),
      // showCnil: Ember.Route.transitionTo('dashboard.cnil'),
      // showCharte: Ember.Route.transitionTo('dashboard.charte'),
      // showAdvice: Ember.Route.transitionTo('dashboard.advices'),

      showDashboard: Ember.Route.transitionTo('dashboard.index'),
      showCnil: Ember.Route.transitionTo('dashboard.cnil'),
      showActions: Ember.Route.transitionTo('dashboard.actions'),

      dashboard: Ember.Route.extend({
        showCharte: Ember.Route.transitionTo('dashboard.charte'),
        showAdvice: Ember.Route.transitionTo('dashboard.advices'),

        index: Ember.Route.extend({
          route: '/',
          connectOutlets: function(router) {
            router.set('dashboardController.selected', 'home');
          }
        }),

        actions: Ember.Route.extend({
          route: '/actions',
          connectOutlets: function(router) {
            router.set('dashboardController.selected', 'actions');
          }
        }),

        cnil: Ember.Route.extend({
          route: '/cnil',
          connectOutlets: function(router) {
            router.set('dashboardController.selected', 'cnil');
          }
        }),
        charte: Ember.Route.extend({
          route: '/charte',
          connectOutlets: function(router) {
            router.set('dashboardController.selected', 'charte');
          }
        }),
        advices: Ember.Route.extend({
          route: '/advices',
          connectOutlets: function(router) {
            router.set('dashboardController.selected', 'advices');
          }
        }),

        route: '/dashboard',

        enter: function(router) {
          router.set('applicationController.selected', 'dashboard');
        },

        connectOutlets: function(router) {
          router.get('applicationController').connectOutlet('dashboard');
        }
      }),



      showSandbox: Ember.Route.transitionTo('sandbox'),
      sandbox: lxxlRoute('sandbox'),

      // QTIs
      showMyQTIs: Ember.Route.transitionTo('myQTIs'),
      myQTIs: lxxlRoute('myQtis'),

      showAllQTIs: Ember.Route.transitionTo('allQTIs'),
      allQTIs: lxxlRoute('qtis'),

      // Categories
      showAllCategories: Ember.Route.transitionTo('categories'),
      categories: lxxlRoute('categories'),

      // Users
      showAllUsers: Ember.Route.transitionTo('users'),
      users: lxxlRoute('users'),


      // Special routes, not top-level in the navigation
      showNewQTI: Ember.Route.transitionTo('newQTI'),
      newQTI: Ember.Route.extend({route: '/qtiNew'}),

      showNewCategory: Ember.Route.transitionTo('newCategory'),
      newCategory: Ember.Route.extend({route: '/categoryNew'}),


      // Routes not accessible from navigation itself
      showPlayQTI: Ember.Route.transitionTo('playQTI'),
      showEditQTI: Ember.Route.transitionTo('editQTI'),
      playQTI: Ember.Route.extend({route: '/qtiShow/:id'}),

      editQTI: Ember.Route.extend(
          {
            route: '/qtiEdit/:id',
            connectOutlets: function(router, qti) {
              router.get('applicationController').connectOutlet('qtiEdit', activityFactory.getActivityById(qti.id));
            }
          }),

      editCategory: Ember.Route.extend({route: '/categoryEdit/:cat_id'}),
      editUser: Ember.Route.extend({route: '/userEdit/:user_id'})
    })
  });
}).apply(LxxlApp);

/*
// Contain keys (can be fed to I18n helper by calling "qti.matters" + key:
LxxlLib.Model.MATTERS
LxxlLib.Model.LEVELS
LxxlLib.Model.LENGTHS
LxxlLib.Model.DIFFICULTIES
LxxlLib.Model.FLAVORS

LxxlLib.Model.Answer:
  text: describe the answer (rich text)
  comment: comment on the answer
  isCorrect: true/false
  weight: if the QTI is weighted, this is an int

LxxlLib.Model.Question:
  coef: default == 0 - means no coefficient applied
  text: describe the question
  answers: [Answer, ..., Answer]

  addAnswer(optional position)
  deleteAnswer(answerObject)
  moveAnswer(answerObject, newPosition)

LxxlLib.Model.Page:
  flavor: undocumented,
  title: title (mandatory)
  subtitle: subtitle
  advice: rich text

  // page flavor "document", or "documentQuizz"
  document: rich text

  // page flavor "documentQuizz"
  questions: [Question, Question]
  coef: 0 (int) - if the QTI has coeffs
  limitedTime: default 0 == infinity, int otherwise in seconds
  sequencing: -1 == default, follow through - 0 == random, X == random on subset

  addQuestion(optional position)
  deleteQuestion(questionObject)
  moveQuestion(questionObject, newPosition)


LxxlLib.Model.Qti:
  id: internal,

  // Basic
  title: title (mandatory)
  matter: [] (from Matters)
  level: string from Levels
  length: int from Lengths
  difficulty: string from Difficulties

  description: rich text
  thumbnail: file

  pages: [Page, Page]


  addPage(optional position)
  deletePage(questionObject)
  movePage(questionObject, newPosition)

 */

(function() {
  'use strict';
  if ('undefined' === typeof window.LxxlLib) {
    window.LxxlLib = {};
  }
})();

(function(LxxlLib) {
  'use strict';

  LxxlLib.Locale = {};
  LxxlLib.Locale.getData = function(key) {
    var def = '---';
    var ret = I18n.translate(key, {defaultValue: def});
    return (ret != def) && ret || null;
  };


  LxxlLib.Model = new (function() {
    this.LENGTHS = Object.keys(I18n.translate('activities.lengths'));
    this.DIFFICULTIES = Object.keys(I18n.translate('activities.difficulties'));
    this.FLAVORS = Object.keys(I18n.translate('activities.pageFlavors'));

    var Answer = function() {
      this.text = LxxlLib.Locale.getData('activities.defaultValues.answer.text');
      this.comment = LxxlLib.Locale.getData('activities.defaultValues.answer.comment');
      this.isCorrect = LxxlLib.Locale.getData('activities.defaultValues.answer.isCorrect');
      this.weight = LxxlLib.Locale.getData('activities.defaultValues.answer.weight');
    };

    var Question = function() {
      this.coef = LxxlLib.Locale.getData('activities.defaultValues.question.coef');
      // Rich text
      this.text = LxxlLib.Locale.getData('activities.defaultValues.question.text');
      this.answers = [];
    };

    this.Question = function(id) {
      return Ember.Object.create(new Question(id));
    };

    this.Answer = function() {
      return Ember.Object.create(new Answer());
    };





    var Matter = function(id) {
      this.id = id;
      this.title = null;
    };

    var Level = function(id) {
      this.id = id;
      this.title = null;
    };

    var Category = function(id) {
      this.id = id;
      this.title = 'default title';
      this.matter = null;
      this.level = null;
      this.content = [];
    };

    this.Matter = function(id) {
      return Ember.Object.create(new Matter(id));
    };

    this.Level = function(id) {
      return Ember.Object.create(new Level(id));
    };

    this.Category = function(id) {
      return Ember.Object.create(new Category(id));
    };




    var Page = function() {
      // Page "flavor"
      this.flavor = LxxlLib.Locale.getData('activities.defaultValues.page.flavor');

      this.title = LxxlLib.Locale.getData('activities.defaultValues.page.title');// 160 chars max
      this.subtitle = LxxlLib.Locale.getData('activities.defaultValues.page.subtitle');
      // Rich text
      this.advice = LxxlLib.Locale.getData('activities.defaultValues.page.advice');
      // Rich text
      this.document = LxxlLib.Locale.getData('activities.defaultValues.page.document');

      // Coefficient de la page dans l'exercice
      this.coef = LxxlLib.Locale.getData('activities.defaultValues.page.coef');

      // 0 == infinity - X seconds = time
      this.limitedTime = LxxlLib.Locale.getData('activities.defaultValues.page.limitedTime');
      // -1 = follow through | 0 = random sur la totalité | X = random sur un subset
      this.sequencing = LxxlLib.Locale.getData('activities.defaultValues.page.sequencing');

      this.displayAll = false;
      this.questions = [];

    };

    var Activity = function(id) {
      this.id = id;

      // Basic infos
      this.title = LxxlLib.Locale.getData('activities.defaultValues.title');
      this.description = LxxlLib.Locale.getData('activities.defaultValues.description');
      this.level = null;//LxxlLib.Locale.getData('activities.defaultValues.description');
      this.matter = null;//LxxlLib.Locale.getData('activities.defaultValues.matter');
      this.duration = null;//LxxlLib.Locale.getData('activities.defaultValues.duration');
      this.difficulty = null;//LxxlLib.Locale.getData('activities.defaultValues.difficulty');
      this.category = [];//LxxlLib.Locale.getData('activities.defaultValues.category');

      this.thumbnail = null;

      this.pages = [];
    };

    var jsonable = Ember.Object.extend({
      // this.fromJson = function(mesh) {
      //   try{
      //     mesh = JSON.parse(mesh);
      //   }catch(e){
      //     throw "FATAL ERROR parsing data - the activity is not valid JSON";
      //   }
      //   for(var i in mesh)
      //     if(typeof this[i] != 'array')
      //       this.set(i, mesh[i]);
      //     else
      //       mesh[i].forEach(function(item){
      //         // Item as a mesh
      //         this.pushObject(new LxxlLib.Model.Page(item));
      //       }, this[i]);
      // };

      toJson: function() {
        var v, ret = [];
        for (var key in this)
          if (this.hasOwnProperty(key)) {
            v = this[key];
            if (v === 'toString')
              continue;
            if (Ember.typeOf(v) === 'function')
              continue;
            ret.push(key);
          }
          return JSON.stringify(this.getProperties(ret));
      }
    });

    this.Page = function() {
      return Ember.Object.create(new Page());
    };

    this.Activity = function(id) {
      return jsonable.create(new Activity(id));
    };

  })();


  this.activityFactory = new (function() {
    this.getActivityById = function(/*id*/) {
      var t = new LxxlLib.Model.Activity();

      (function() {
        this.title = 'Titre test';
        this.description = 'desc';
        this.level = categoryFactory.levels.tl;
        this.matter = categoryFactory.matters.lit;
        this.duration = 120;
        this.difficulty = LxxlLib.Model.DIFFICULTIES.easy;
        this.category = categoryFactory.getTreeFor(this.matter, this.level);
        this.thumbnail = null;


        // Attached stuff
        this.pages = [];

        for (var i = 0; i < 1; i++) {
          var tmp = new LxxlLib.Model.Page();
          tmp.title = 'Page ' + i;
          tmp.subtitle = 'Subtitle ' + i;
          tmp.document = 'Document ' + i;
          tmp.advice = 'Advice ' + i;
          tmp.questions = [];
          tmp.flavor = 'quizz';


          for (var j = 0; j < 3; j++) {
            var tmpQ = new LxxlLib.Model.Question();
            tmpQ.text = 'Question ' + j;

            for (var k = 0; k < 6; k++) {
              var tmpA = new LxxlLib.Model.Answer();
              tmpA.text = 'Answer ' + j + '-' + k;
              tmpA.comment = 'Yihaaaaaa' + k;

              if (k % 2 === 0)
                tmpA.isCorrect = true;

              //tmpQ.answers.pushObject(tmpA);

            }

            //tmp.questions.pushObject(tmpQ);
          }
          this.pages.pushObject(tmp);
        }
      }).apply(t);
      return t;
    };

    this.newActivity = function() {
      return new LxxlLib.Model.Activity();
    };
  })();


  /**
 * XXX crap to be spoofed into the service at some point.
 * Whether the localization ought to reside here or on the service is yet undetermined.
 * ... and whether it's a simple tree or something more complex is undecided.
 */
  this.categoryFactory = new (function() {
    var fakeMatters = Object.keys(I18n.translate('activities.matters'));
    var fakeLevels = Object.keys(I18n.translate('activities.levels'));

    var rootCategory = new LxxlLib.Model.Category();
    rootCategory.id = 'fake id';
    rootCategory.title = 'fake title';

    fakeMatters.forEach(function(matter) {
      fakeLevels.forEach(function(level) {
        var lcat = new LxxlLib.Model.Category();
        lcat.matter = new LxxlLib.Model.Matter();
        lcat.matter.id = matter;
        lcat.matter.title = I18n.translate('activities.matters.' + matter);
        lcat.level = new LxxlLib.Model.Level();
        lcat.level.id = level;
        lcat.level.title = I18n.translate('activities.levels.' + level);
        rootCategory.content.push(lcat);
        var subito = new LxxlLib.Model.Category(Math.random());
        subito.title = 'Compréhension du pied';
        subito.content = [new LxxlLib.Model.Category(Math.random()), new LxxlLib.Model.Category(
            Math.random()), new LxxlLib.Model.Category(Math.random())];
        lcat.content.push(subito);
        subito = new LxxlLib.Model.Category(Math.random());
        subito.title = 'Compréhension de la main';
        subito.content = [new LxxlLib.Model.Category(Math.random()), new LxxlLib.Model.Category(
            Math.random()), new LxxlLib.Model.Category(Math.random())];
        lcat.content.push(subito);
        subito = new LxxlLib.Model.Category(Math.random());
        subito.title = 'Compréhension de René Chatonbriand';
        subito.content = [new LxxlLib.Model.Category(Math.random()), new LxxlLib.Model.Category(
            Math.random()), new LxxlLib.Model.Category(Math.random())];
        lcat.content.push(subito);
      });
    });

    this.matters = (function() {
      return fakeMatters.map(function(id) {
        var matter = new LxxlLib.Model.Matter();
        matter.id = id;
        matter.title = I18n.translate('activities.matters.' + id);
        return matter;
      });
    })();

    this.levels = (function() {
      return fakeLevels.map(function(id) {
        var matter = new LxxlLib.Model.Level();
        matter.id = id;
        matter.title = I18n.translate('activities.levels.' + id);
        return matter;
      });
    })();

    this.getTreeFor = function(matter, level) {
      return rootCategory.content.filter(function(item) {
        return (item.level.id == level) && (item.matter.id == matter);
      }).pop();
    };

  })();
}).apply(this, [LxxlLib]);




// I18n.fallbacks = false;
// var t = activityFactory.getActivityById();
// console.error(t.toJson());
