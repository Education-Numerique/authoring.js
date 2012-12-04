/**
 * @file
 * @summary Defines the application routing
 *
 * @author {PUKE-RIGHTS-AUTHOR}
 * @version {PUKE-PACKAGE-VERSION}
 *
 * @license {PUKE-RIGHTS-LICENSE}.
 * @copyright {PUKE-RIGHTS-COPYRIGHT}
 * @name {PUKE-GIT-ROOT}/app/common/states/application.js{PUKE-GIT-REVISION}
 */

(function() {
  'use strict';

  this.Router = Ember.Router.extend({
    enableLogging: !!jsBoot.debug,

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
      login: Ember.Route.extend({
        route: '/login',
        enter: function(router) {
          router.set('applicationController.selected', 'login');
        },
        connectOutlets: function(router) {
          router.get('applicationController').connectOutlet('login');
        }
      }),


      showRegister: Ember.Route.transitionTo('register'),
      register: Ember.Route.extend({
        route: '/register',
        enter: function(router) {
          router.set('applicationController.selected', 'register');
        },
        connectOutlets: function(router) {
          router.get('applicationController').connectOutlet('register');
        }
      }),

      showProfile: Ember.Route.transitionTo('profile'),
      profile: Ember.Route.extend({
        route: '/profile',
        enter: function(router) {
          router.set('applicationController.selected', 'profile');
        },
        connectOutlets: function(router) {
          router.get('applicationController').connectOutlet('profile');
        }
      }),

      showSettings: Ember.Route.transitionTo('settings'),
      settings: Ember.Route.extend({
        route: '/settings',
        enter: function(router) {
          router.set('applicationController.selected', 'settings');
        },
        connectOutlets: function(router) {
          router.get('applicationController').connectOutlet('settings');
        }
      }),


      // User base activities
      // showDashboard: Ember.Route.transitionTo('dashboard.index'),
      // showCnil: Ember.Route.transitionTo('dashboard.cnil'),
      // showCharte: Ember.Route.transitionTo('dashboard.charte'),
      // showAdvice: Ember.Route.transitionTo('dashboard.advices'),

      showCnil: Ember.Route.transitionTo('cnil'),

      cnil: Ember.Route.extend({
        route: '/cnil',
        enter: function(router) {
          router.set('applicationController.selected', 'cnil');
        },
        connectOutlets: function(router) {
          console.warn('GRAND WARN');
          router.get('applicationController').connectOutlet('cnil');
        }
      }),

      showDashboard: Ember.Route.transitionTo('dashboard.index'),
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
      sandbox: Ember.Route.extend({
        route: '/sandbox',
        enter: function(router) {
          router.set('applicationController.selected', 'sandbox');
        },
        connectOutlets: function(router) {
          router.get('applicationController').connectOutlet('sandbox');
        }
      }),

      // QTIs
      showMyQTIs: Ember.Route.transitionTo('myQTIs'),
      myQTIs: Ember.Route.extend({
        route: '/myQtis',
        enter: function(router) {
          router.set('applicationController.selected', 'myQtis');
        },
        connectOutlets: function(router) {
          router.get('applicationController').connectOutlet('myQtis');
        }
      }),

      showAllQTIs: Ember.Route.transitionTo('allQTIs'),
      allQTIs: Ember.Route.extend({
        route: '/qtis',
        enter: function(router) {
          router.set('applicationController.selected', 'qtis');
        },
        connectOutlets: function(router) {
          router.get('applicationController').connectOutlet('qtis');
        }
      }),

      // Categories
      showAllCategories: Ember.Route.transitionTo('categories'),
      categories: Ember.Route.extend({
        route: '/categories',
        enter: function(router) {
          router.set('applicationController.selected', 'categories');
        },
        connectOutlets: function(router) {
          router.get('applicationController').connectOutlet('categories');
        }
      }),

      // Users
      showAllUsers: Ember.Route.transitionTo('users'),
      users: Ember.Route.extend({
        route: '/users',
        enter: function(router) {
          router.set('applicationController.selected', 'users');
        },
        connectOutlets: function(router) {
          router.get('applicationController').connectOutlet('users');
        }
      }),

      // Special routes, not top-level in the navigation

      showNewCategory: Ember.Route.transitionTo('newCategory'),
      newCategory: Ember.Route.extend({
        route: '/categoryNew',
        enter: function(router) {
          router.set('applicationController.selected', 'categoryNew');
        },
        connectOutlets: function(router) {
          router.get('applicationController').connectOutlet('categoryNew');
        }
      }),

      // Routes not accessible from navigation itself
      showPlayQTI: Ember.Route.transitionTo('playQTI'),
      editCategory: Ember.Route.extend({route: '/categoryEdit/:cat_id'}),
      editUser: Ember.Route.extend({route: '/userEdit/:user_id'}),


      playQTI: Ember.Route.extend({route: '/qtiShow/:id'}),


      showNewActivity: Em.Route.transitionTo('newActivity'),
      showEditActivity: Ember.Route.transitionTo('editActivity'),
      editActivity: Ember.Route.extend({
        route: '/activity/:id',
        connectOutlets: function(router, qti) {
          var activity = LxxlLib.factories.activities.getById(qti.id);
          activity.pull();
          router.get('applicationController').connectOutlet('activityEdit',
              activity.draft);
        }
      }),
      newActivity: Ember.Route.extend({
        route: '/activity/new',
        enter: function(router) {
          var act = LxxlLib.factories.activities.getActivity();
          act.push();
          act.addObserver('id', function() {
            console.warn('BEEN PUSHED', act.id);
            router.transitionTo('editActivity', act);
          });
        },
        connectOutlets: function(router, qti) {
          // XXX @todo
          // XXX page de choix template activité
          router.get('applicationController').connectOutlet('activityEdit',
              LxxlLib.factories.activities.getActivity());
        }
      })
    })
  });
}).apply(LxxlApp);


