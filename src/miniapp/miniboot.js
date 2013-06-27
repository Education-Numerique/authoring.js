(function(){
  'use strict';

  /**
   * Configuration stuff
   */

  var bootRoot = '../{PUKE-PACKAGE-VERSION}/';

  var SERVICE_CONFIG = {
    key: {
      id: 'PROD',
      secret: 'a8f4981e5bb946993e4173d1e7af4cb866528c4e87f51f80'
      // id: 'TEST',
      // secret: 'TEST'
    },
    server: {
      host: '{PUKE-SERVICE-HOST}',
      port: '{PUKE-SERVICE-PORT}',
      version: '1.0'
    },
    anonymous: {
      id: 'anonymous',
      login: 'anonymous',
      password: '860b9dbbda6ee5f71ddf3b44e54c469e'
    }
  };

  var STORE_KEY = 'LxxlWebAppKey';


  /**
   * Booting
   */


  var debug = /use-debug/.test(location.href);

  jsBoot.boot.ember(function(){
    if(debug){
      jsBoot.debug.console.VERBOSITY = jsBoot.debug.console.INFO |
        jsBoot.debug.console.WARN | jsBoot.debug.console.ERROR|
        jsBoot.debug.console.LOG /*| jsBoot.debug.console.DEBUG*/;
    }else {
      // Mute console while in production
      jsBoot.core.toggleConsole(false);
    }

    // console.warn("J'ai Ember, jquery et handlebars!!!!");
    $('html').removeClass('no-js');
  }, debug);

  // Notre feuille de style
  jsBoot.loader.use('miniboot.css');

  // Composants tiers
  jsBoot.loader.use('bootstrap');

  jsBoot.loader.use('raphael');

  jsBoot.loader.use('validate');

  jsBoot.loader.use('datatable');

  // LXXL core components
  jsBoot.loader.use(bootRoot + 'activity/activity.css');
  jsBoot.loader.use(bootRoot + 'lxxl-standalone-library.js');
  jsBoot.loader.use(bootRoot + 'activity/apiwrapper.js');
  jsBoot.loader.use(bootRoot + 'activity/scoring.js');
  jsBoot.loader.wait();
  jsBoot.loader.use(bootRoot + 'activity/activity.js');


  // On attend tout ça...
  jsBoot.loader.wait(function(){
    // On boot le système
    jsBoot.controllers.application.boot(STORE_KEY, SERVICE_CONFIG, 'disable_instance_lockXXX');
    // Et on finit en chargeant miniapp
    jsBoot.loader.use('miniapp.js');
  });

})();

