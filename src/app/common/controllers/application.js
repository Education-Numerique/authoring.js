/**
 * @file
 * @summary Root application controller
 *
 * @author {PUKE-RIGHTS-AUTHOR}
 * @version {PUKE-PACKAGE-VERSION}
 *
 * @license {PUKE-RIGHTS-LICENSE}.
 * @copyright {PUKE-RIGHTS-COPYRIGHT}
 * @name {PUKE-GIT-ROOT}/app/common/controllers/application.js{PUKE-GIT-REVISION}
 */


(function() {
  'use strict';
  /*
  var mainUser = new (function(){
    // Bla
    this.login;
    this.name;

  })();
  */

  var uControl = new (function() {
    this.AUTHOR = 1;
    this.REVIEWER = 2;
    this.ADMIN = 3;

    this.profile = new LxxlLib.model.User();
    this.profile.controller = this;

    var loginFailure = function() {
      // XXX Show the failure banner on the login view
    };

    this.login = function(login, password, suc, fai) {
      jsBoot.service.core.authenticate((function(){
        this.profile.set('uid', jsBoot.service.core.id);
        // Need level here?
        // switch (level) {
        //   default:
        //   case this.AUTHOR:
        //     $('#lxxlroot').addClass('user-author');
        //     break;
        //   case this.REVIEWER:
        //     $('#lxxlroot').addClass('user-reviewer');
        //     break;
        //   case this.ADMIN:
        //     $('#lxxlroot').addClass('user-admin');
        //     break;
        // }

        LxxlLib.service.user.profile.pull((function(data){
          this.profile.fromObject(data);
        }.bind(this)), function(){});
        suc();
      }.bind(this)), function(){
        fai();
      }, login, password);
    };

    this.logout = function() {
      this.set('profile', new LxxlLib.model.User());
      $('#lxxlroot').removeClass('user-author');
      $('#lxxlroot').removeClass('user-reviewer');
      $('#lxxlroot').removeClass('user-admin');
    };

  })();

  this.UserController = Ember.ObjectController.extend(uControl);


  this.ApplicationController = Ember.ObjectController.extend({
    init: function() {
      // Get a ref to the user account
      // console.warn(this.content);
      this._super();
    },
    // Which node ios actually selected
    selected: null,
    pageTitle: null,
    breadcrumbs: [],

    // connectOutlet: function(name, context){
    //   if(name == 'qtiEdit'){

    //   }
    //   this._super(name, context);
    // },

  });

}).apply(LxxlApp);

