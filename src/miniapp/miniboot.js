// alert("toto");


 var bootRoot = '../{PUKE-PACKAGE-VERSION}/';
  /** les clés sont produites dans mongo et mises en oeuvre dans API...   */
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





jsBoot.boot.ember(function(){
	console.warn("Handebars + Ember + JQuery chargés ...");
	$("html").removeClass("no-js");

})

jsBoot.loader.use("miniapp.css");

jsBoot.loader.use('bootstrap'); // js boot est magique, il sait le trouver !!!!

 jsBoot.loader.use('raphael');


  jsBoot.loader.use(bootRoot + 'activity/activity.css');
  jsBoot.loader.use(bootRoot + 'lxxl-standalone-library.js');
  jsBoot.loader.use(bootRoot + 'activity/apiwrapper.js'); // (contenu dans  jsBoot.loader.use(bootRoot + 'lxxl' + suffix + 'js');
  jsBoot.loader.use(bootRoot + 'activity/scoring.js');
  jsBoot.loader.wait(); // pour ne pas charger la suite tant que ce qui précède n'est pas dispo (possibilité de callback !!)
  jsBoot.loader.use(bootRoot + 'activity/activity.js');

jsBoot.loader.wait(function(){ // 
	jsBoot.controllers.application.boot(STORE_KEY, SERVICE_CONFIG, 'disable_instance_lockXXX');
	// alert('done');
});

 // Faire quelque chose d'intelligent (de préférence :))
jsBoot.loader.use("miniapp.js");
