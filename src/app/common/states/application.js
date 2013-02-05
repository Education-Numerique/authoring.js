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
      // 
      admin: Ember.Route.extend({
        route: '/admin',

        user: Ember.Route.extend({
          route: '/user/:uid',
          enter: function(router) {
            var isLogged = router.get('applicationController.isLogged');
            var isAdmin = router.get('applicationController.user.level') == 3;
            Ember.run.next(function() {
              if (!isLogged || !isAdmin)
                router.transitionTo('dashboard');
            });
          },
          connectOutlets: function(router, user) {
            router.get('applicationController').connectOutlet({
              viewClass: LxxlApp.ProfileView,
              controller: router.get('userController')
            });

            router.set('userController.content', user);
          }
        }),

        users: Ember.Route.extend({
          route: '/users',
          enter: function(router) {
            router.set('applicationController.selected', 'users');
          },
          connectOutlets: function(router) {
            router.get('applicationController').connectOutlet('users');
          }
        }),

        activities: Ember.Route.extend({
          route: '/activities',
          enter: function(router) {
            router.set('applicationController.selected', 'qtis');
          },
          connectOutlets: function(router) {
            router.get('applicationController').connectOutlet({
              viewClass: LxxlApp.AdminActivitiesView,
              controller: router.get('adminActivities')
            });
          }
        }),
      }),

      showAdminUser: Em.Route.transitionTo('admin.user'),
      showAdminUsers: Ember.Route.transitionTo('admin.users'),
      showAdminActivities: Ember.Route.transitionTo('admin.activities'),


      account: Ember.Route.extend({
        route: '/account',

        login: Ember.Route.extend({
          route: '/login',
          enter: function(router) {
            var isLogged = router.get('applicationController.isLogged');
            Ember.run.next(function() {
              if (isLogged)
                router.transitionTo('dashboard');
            });
          },
          connectOutlets: function(router) {
            router.get('applicationController').connectOutlet('accountLogin');
          }
        }),


        register: Ember.Route.extend({
          route: '/register',
          enter: function(router) {
            var isLogged = router.get('applicationController.isLogged');
            Ember.run.next(function() {
              if (isLogged)
                router.transitionTo('dashboard');
            });
          },
          connectOutlets: function(router) {
            router.get('applicationController').connectOutlet('accountRegister');
          }
        }),


        validate: Ember.Route.extend({
          route: '/validate',
          enter: function(router) {
            var isLogged = router.get('applicationController.isLogged');
            Ember.run.next(function() {
              if (isLogged)
                router.transitionTo('dashboard');
            });
          },
          connectOutlets: function(router) {
            router.get('applicationController').connectOutlet('accountValidation');
          }
        }),

        reminder: Ember.Route.extend({
          route: '/lost-password',
          enter: function(router) {
            var isLogged = router.get('applicationController.isLogged');
            Ember.run.next(function() {
              if (isLogged)
                router.transitionTo('dashboard');
            });
          },
          connectOutlets: function(router) {
            router.get('applicationController').connectOutlet('accountReminder');
          }
        }),


        logout: Ember.Route.extend({
          route: '/logout',
          enter: function(router) {
            router.get('applicationController').logout();
            Ember.run.next(function() {
              router.transitionTo('index');
            });
          }
        }),

        


        profile: Ember.Route.extend({
          route: '/profile',
          enter: function(router) {
            var isLogged = router.get('applicationController.isLogged');
            Ember.run.next(function() {
              if (!isLogged)
                router.transitionTo('dashboard');
            });
          },
          connectOutlets: function(router) {
            router.get('applicationController').connectOutlet({
              viewClass: LxxlApp.ProfileView,
              controller: router.get('userController')
            });

            router.set('userController.content', router.get('applicationController.user'));
          }
        }),





        settings: Ember.Route.extend({
          route: '/settings',
          enter: function(router) {
            var isLogged = router.get('applicationController.isLogged');
            Ember.run.next(function() {
              if (!isLogged)
                router.transitionTo('account.login');
            });
          },
          connectOutlets: function(router) {
            router.get('applicationController').connectOutlet('accountSettings');
          }
        })
      }),

      showAccountLogin: Ember.Route.transitionTo('account.login'),
      showAccountRegister: Ember.Route.transitionTo('account.register'),
      showAccountProfile: Ember.Route.transitionTo('account.profile'),
      showAccountSettings: Ember.Route.transitionTo('account.settings'),
      showAccountReminder: Ember.Route.transitionTo('account.reminder'),
      showAccountLogout: Ember.Route.transitionTo('account.logout'),
      showAccountValidate: Em.Route.transitionTo('account.validate'),
      
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
          router.get('applicationController').connectOutlet('cnil');
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
          router.get('sandboxController');
          // router.get('sandboxController').pull();
        }
      }),




      showDashboard: Ember.Route.transitionTo('dashboard.index'),
      showActions: Ember.Route.transitionTo('dashboard.actions'),
      showCharte: Ember.Route.transitionTo('dashboard.charte'),
      showAdvice: Ember.Route.transitionTo('dashboard.advices'),

      dashboard: Ember.Route.extend({


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



      // QTIs
      showMyActivities: Ember.Route.transitionTo('myActivities'),
      myActivities: Ember.Route.extend({
        route: '/myactivities',
        enter: function(router) {
          router.set('applicationController.selected', 'myActivities');
        },
        connectOutlets: function(router) {
          router.get('applicationController').connectOutlet('myActivities');
        }
      }),

      // showAllQTIs: Ember.Route.transitionTo('allQTIs'),
      // allQTIs: Ember.Route.extend({
      //   route: '/qtis',
      //   enter: function(router) {
      //     router.set('applicationController.selected', 'qtis');
      //   },
      //   connectOutlets: function(router) {
      //     router.get('applicationController').connectOutlet('qtis');
      //   }
      // }),
      

      // Routes not accessible from navigation itself
      // showPlayQTI: Ember.Route.transitionTo('playQTI'),
      editUser: Ember.Route.extend({route: '/userEdit/:user_id'}),


      // playQTI: Ember.Route.extend({route: '/qtiShow/:id'}),

      showActivityEdit: Ember.Route.transitionTo('activity.edit'),
      showNewActivity: Em.Route.transitionTo('activity.create'),

      activity: Em.Route.extend({
        create: Ember.Route.extend({
          route: '/activity/new',
          enter: function(router) {
            var isLogged = router.get('applicationController.isLogged');
            var act = LxxlLib.factories.activities.getActivity();
            Ember.run.next(function() {
              if (!isLogged)
                router.transitionTo('account.login');
              else {
                act.push();
                act.addObserver('id', function() {
                  console.warn('BEEN PUSHED', act.id);
                  router.transitionTo('activity.edit', act);
                });
              }
            });


          },
          connectOutlets: function(router, qti) {
            // XXX @todo
            // XXX page de choix template activité
            router.get('applicationController').connectOutlet('activityEdit',
                LxxlLib.factories.activities.getActivity());
          }
        }),

        edit: Ember.Route.extend({
          route: '/activity/:id',
          enter: function(router) {
            var isLogged = router.get('applicationController.isLogged');
            // Ember.run.next(function() {
            //   if (!isLogged)
            //     router.transitionTo('account.login');
            // });
          },
          connectOutlets: function(router, qti) {
            var activity = LxxlLib.factories.activities.getById(qti.id);
            router.get('applicationController').connectOutlet('activityEdit', activity.draft);
          }
        })



      })
    })
  });
}).apply(LxxlApp);


