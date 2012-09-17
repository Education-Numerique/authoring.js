(function() {

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
      for (var i in adds)
        rt[i] = adds[i];
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
              router.get('applicationController').connectOutlet('qtiEdit', qtiFactory.getQtiById(qti.id));
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

var LxxlLib = {};
LxxlLib.Model = new (function(){

  // Returns the array of all matters (keys)
  this.MATTERS = Object.keys(I18n.translate('qti.matters'));
  this.LEVELS = Object.keys(I18n.translate('qti.levels'));
  this.LENGTHS = Object.keys(I18n.translate('qti.lengths'));
  this.DIFFICULTIES = Object.keys(I18n.translate('qti.difficulties'));
  this.FLAVORS = Object.keys(I18n.translate('qti.pageFlavors'));

  var Answer = function(){
    this.text;
    this.comment;
    this.isCorrect;
    this.weight = 0;
  };

  var Question = function(){
    this.coef = 0;
    // Rich text
    this.text;
    this.answers = [];

    this.addAnswer = function(at){
      if(!at)
        this.answers.push(new LxxlLib.Model.Answer());
      else
        this.answers.splice(at, 0, new LxxlLib.Model.Answer());
    };

    this.deleteAnswer = function(answer){
      this.answers.splice(this.answers.indexOf(answer), 1);
    };

    this.moveAnswer = function(answer, pos){
      this.answers.splice(this.answers.indexOf(answer), 1);
      this.answers.splice(pos, 0, answer);
    };

  };

  var Page = function(){
    // Page "flavor"
    this.flavor;

    this.title;
    this.subtitle;
    // Rich text
    this.advice;
    // Rich text
    this.document;

    // Coefficient de la page dans l'exercice
    this.coef = 0;

    this.limitedTime = 0;// 0 == infinity - X seconds = time
    this.sequencing = -1; // -1 = follow through | 0 = random sur la totalité | X = random sur un subset

    this.questions = [];

    this.addQuestion = function(at){
      if(!at)
        this.questions.push(new LxxlLib.Model.Question());
      else
        this.questions.splice(at, 0, new LxxlLib.Model.Question());
    };

    this.deleteQuestion = function(question){
      this.questions.splice(this.questions.indexOf(question), 1);
    };

    this.moveQuestion = function(question, pos){
      this.questions.splice(this.questions.indexOf(question), 1);
      this.questions.splice(pos, 0, question);
    };
  }


  var Activity = function(id){
    this.id = id;

    // Basic infos
    this.title = null;
    this.level = 0;
    this.matter = null;
    this.length = 0;
    this.difficulty = null;
    this.category = null;

    this.description = I18n.translate('qti.def.description');// 160 chars max
    this.thumbnail = null;

    // Attached stuff
    this.pages = [];


    this.addPage = function(at){
      if(!at)
        this.pages.push(new LxxlLib.Model.Page());
      else
        this.pages.splice(at, 0, new LxxlLib.Model.Page());
    };

    this.deletePage = function(page){
      this.pages.splice(this.pages.indexOf(page), 1);
    };

    this.movePage = function(page, pos){
      this.pages.splice(this.pages.indexOf(page), 1);
      this.pages.splice(pos, 0, page);
    };


    this.reset = function(){
    };

    this.toJSON = function(){
    };

    this.fromJSON = function(flat){
    };
  };


  this.Question = function(id){
    return Ember.Object.create(new Question(id));
  };


  this.Activity = function(id){
    return Ember.Object.create(new Activity(id));
  };

  this.Page = function(){
    return Ember.Object.create(new Page());
  };


})();

var qtiFactory = new (function(){
  this.getQtiById = function(id){
    return new LxxlLib.Model.Activity();
  };

  this.newQti = function() {
  };
})();





