
var lxxlRoute = function(name, adds){
  var rt = {
    route: name,
    connectOutlets: function(router){
      router.set('applicationController.selected', name);
//      router.get('applicationController').connectOutlet(name);
    }
  };
  if(adds)
    for(var i in adds)
      rt[i] = adds[i];
  return Ember.Route.extend(rt);
};


LxxlApp.Router = Ember.Router.extend({
  // XXX flag debug here
  enableLogging: true,
  root: Ember.Route.extend({
    index: Ember.Route.extend({
      route: '/',
      enter: function(router) {
        console.log("entering route index from", router.get('currentState.name'));
      },
      connectOutlets: function(router) {
        console.log("entered root.index, fully transitioned to", router.get('currentState.path'));
//        router.get('applicationController').connectOutlet('another');
//       redirectsTo: 'dashboard'
      }
    }),

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
    showDashboard: Ember.Route.transitionTo('dashboard'),
    dashboard: lxxlRoute('dashboard'),

    showSandbox: Ember.Route.transitionTo('sandbox'),
    sandbox: lxxlRoute('sandbox'),

    // QTIs
    showMyQTIs: Ember.Route.transitionTo('myQTIs'),
    myQTIs: lxxlRoute('my-qtis'),

    showAllQTIs: Ember.Route.transitionTo('allQTIs'),
    allQTIs: lxxlRoute('all-qtis'),

    // Categories
    showAllCategories: Ember.Route.transitionTo('categories'),
    categories: lxxlRoute('categories'),

    // Users
    showAllUsers: Ember.Route.transitionTo('users'),
    users: lxxlRoute('users'),


    // Special routes, not top-level in the navigation
    showNewQTI: Ember.Route.transitionTo('newQTI'),
    newQTI: Ember.Route.extend({route: 'qti.new'}),

    showNewCategory: Ember.Route.transitionTo('newCategory'),
    newCategory: Ember.Route.extend({route: 'category.new'}),

    // Routes not accessible from navigation itself
    editQTI: Ember.Route.extend({route: 'qti.edit:qti_id'}),
    editCategory: Ember.Route.extend({route: 'category.edit:cat_id'}),
    editUser: Ember.Route.extend({route: 'user.edit:user_id'})
  })
});
