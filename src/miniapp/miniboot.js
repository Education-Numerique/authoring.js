var bootRoot = '../{PUKE-PACKAGE-VERSION}/';

jsBoot.boot.ember(function(){
  console.warn("J'ai Ember, jquery et handlebars!!!!");
  $('html').removeClass('no-js');
});

jsBoot.loader.use('miniboot.css');

jsBoot.loader.use('bootstrap');

jsBoot.loader.use('raphael');

jsBoot.loader.use('validate');

jsBoot.loader.use('datatable');

jsBoot.loader.use(bootRoot + 'activity/activity.css');
jsBoot.loader.use(bootRoot + 'lxxl-standalone-library.js');

jsBoot.loader.use(bootRoot + 'activity/apiwrapper.js');
jsBoot.loader.use(bootRoot + 'activity/scoring.js');

jsBoot.loader.wait();

jsBoot.loader.use(bootRoot + 'activity/activity.js');


jsBoot.loader.wait(function(){
});

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




jsBoot.loader.use('miniapp.js');
