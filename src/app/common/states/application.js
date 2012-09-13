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




var qti = function(id){
  return Ember.Object.create({
    id: id,
    title: 'bitch'
  });
};

var modelBidon = {
  title: "Super Title QTI"
};

var qtiFactory = new (function(){
  this.getQtiById = function(id){
    return new qti(id);
  };

  this.newQti = function(){
  };
})();

