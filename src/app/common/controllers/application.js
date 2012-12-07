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

  /**
   * Configuration constants
   * XXX to be puked
   */
  var SERVICE_CONFIG = {
    key: {
      id: 'TEST',
      secret: 'TEST'
    },
    server: {
      host: '{PUKE-SERVICE-HOST}',
      port: '{PUKE-SERVICE-PORT}',
      // host: 'snap.lxxl.com',8081
      // port: '90',
      version: '1.0'
    },
    anonymous: {
      id: 'anonymous',
      login: 'anonymous',
      password: '860b9dbbda6ee5f71ddf3b44e54c469e'
    }
  };

  var STORE_KEY = 'LxxlWebAppKey';

  // Application controller
  this.ApplicationController = Ember.ObjectController.extend(new (function(){

    // User properties
    this.user = null;
    var user;

    // jsBoot application shortcut
    var jsBootApp = this._jsBootApp = jsBoot.controllers.application;

    this.init = function() {

      // Will delay jsBoot init event until the user object is ready
      // This code will be executed once "boot" is done, and after "logout"
      jsBootApp.delay(jsBootApp.INITIALIZED, (function(notifyReady){
        user = new LxxlLib.model.User()
        user.controller = this;
        this.set('user', user);
        // Say ready once done
        notifyReady();
      }.bind(this)));

      // Boot jsBoot
      jsBootApp.boot(STORE_KEY, SERVICE_CONFIG);

      // Super shit
      this._super();
    };

    // Bind user identifier
    this.uid = (function(){
      return jsBootApp.userIdentifier;
    }).property('_jsBootApp.userIdentifier');

    this.AUTHOR = 1;
    // this.REVIEWER = 2;
    this.ADMIN = 3;

    // Bind "isAdmin"
    this.isAdmin = (function(){
      return this.get('user.level') == this.ADMIN;
    }).property('_jsBootApp.status');

    this.isAuthor = (function(){
      return this.get('user.level') == this.AUTHOR;
    }).property('_jsBootApp.status');



    // Bind "isLogged"
    this.isLogged = (function(){
      return jsBootApp.status == jsBootApp.USER_READY;
    }).property('_jsBootApp.status');


    this.isLocked = (function(){
      if(jsBootApp.status == jsBootApp.LOCKED_OUT){
        $('#already-locked').modal({keyboard: false, backdrop: 'static'});
        $('#already-locked').modal('show');
      }else
        $('#already-locked').modal('hide');
      return (jsBootApp.status == jsBootApp.LOCKED_OUT);
    }).property('_jsBootApp.status');

    // Bind "status"
    this.status = (function(){
      return jsBootApp.status;
    }).property('_jsBootApp.status');

    // Which node is actually selected
    this.selected = null;
    this.pageTitle = null;
    this.breadcrumbs = [];


    // Show the failure banner on the login view
    this.USER_FAIL = jsBootApp.USER_FAIL;
    // Show the banner about ONLY ONE FUCKING TAB OPENED
    this.LOCKED_OUT = jsBootApp.LOCKED_OUT;

    this.USER_READY = jsBootApp.USER_READY;
    this.INITIALIZED = jsBootApp.INITIALIZED;
    this.USER_OUT = jsBootApp.USER_OUT;
    this.SHUTDOWN = jsBootApp.SHUTDOWN;


    // Public Methods
    this.login = function(login, password) {
      jsBootApp.login(login, password, true);
    };

    this.logout = function() {
      jsBootApp.logout();
    };

    // Delay user ready until the profile is fetched and ok
    jsBootApp.delay(jsBootApp.USER_READY, function(notifyReady){
      LxxlLib.service.user.profile.pull(function(data){
        //XXX remove me
        data.level = 1;
        user.fromObject(data);
        notifyReady();
      }, function(){
        // XXX Something bad happens on the service - say something?
        notifyReady();
      });
    });

  })());

}).apply(LxxlApp);

