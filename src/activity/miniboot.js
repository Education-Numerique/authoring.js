/**
 * @version {PUKE-PACKAGE-VERSION}
 * @author {PUKE-PACKAGE-AUTHOR}
 * @name {PUKE-PACKAGE-NAME}
 * @homepage {PUKE-PACKAGE-HOME}
 * @file This is meant to load whatever you need before actually running your application.
 * Your main application script should NOT be in there though, but rather loaded asynchronously
 * as well. DONT edit this unless you know what you are doing.
 * @license {PUKE-PACKAGE-LICENSE}.
 * @copyright {PUKE-PACKAGE-COPYRIGHT}
 * @location {PUKE-PACKAGE-GIT-ROOT}/bootstrap/desktop/bootstrap.js{PUKE-PACKAGE-GIT-REV}
 */

// XXX todo - use burnscars instead of shims
(function() {
  'use strict';
  // Allow the use of additional url parameters to trigger specific behavior
  // Debuggin
  var debug = /use-debug/.test(location.href);
  // Trunk version - don't do this, kid!
  var version = /use-trunk/.test(location.href) && 'trunk';
  // Not minified if debugging
  var suffix = !debug ? '-min.' : '.';

  // No analytics for now
  // var gaTracker = '{PUKE_ANALYTICS}';

  // Root of the versioned app
  var bootRoot = '{PUKE-PACKAGE-VERSION}/';

  // IE deserves to be raped :)
  if (/ie[0-8]/.test(document.getElementsByTagName('html').className))
    jsBoot.loader.use('ie7', '2.1');


  jsBoot.loader.use('normalize', 2.0);
  jsBoot.loader.use('h5bp', 4.0);
  // Bundled assets (vanilla bootstrap doesn't work)
  // jsBoot.loader.use('libs/css/bootstrap.css');
  // jsBoot.loader.use('libs/css/bootstrap-responsive.css');

  // jsBoot.loader.use('burnscars');
  jsBoot.loader.use(jsBoot.loader.SHIMS);
  // jsBoot.loader.use('stacktrace', version || '0.4', null, debug);
  jsBoot.loader.wait();
  // XXX compact every other needed script
  // jsBoot.loader.use(jsBoot.loader.MINGUS);
  jsBoot.loader.use(jsBoot.loader.CORE);
  jsBoot.loader.wait();
  // jsBoot.loader.use(jsBoot.loader.SERVICE);
  jsBoot.loader.use('jquery', version || '1.8');
  jsBoot.loader.use('handlebars', version || '1.0', 'main');// b6
  // jsBoot.loader.use('i18n', trunk ? 'trunk' : '3rc2');
  jsBoot.loader.wait();

  // This could be put anywhere, but has to wait for core
  if (debug)
    jsBoot.loader.use(jsBoot.loader.DEBUG);

  jsBoot.loader.use('bootstrap', version || 'stable');


  jsBoot.loader.wait(function() {
    $('html').removeClass('no-js');
    // Now, go away placeholder
    if (debug) {
      // To be removed - allow to spoof user level when debugging
      jsBoot.debug.tick('Base stack loaded');
      // Set reasonable verbosity
      jsBoot.debug.console.VERBOSITY = jsBoot.debug.console.INFO |
          jsBoot.debug.console.WARN | jsBoot.debug.console.ERROR |
          jsBoot.debug.console.LOG /*| jsBoot.debug.console.DEBUG*/;
    }else {
      // Mute console while in production
      jsBoot.core.toggleConsole(false);
    }
  });

  jsBoot.loader.use('activity.js');
  jsBoot.loader.use('apiwrapper.js');
  jsBoot.loader.use('activity.css');

  jsBoot.loader.wait(function() {
    if (debug)
      jsBoot.debug.tick('Application stack fully loaded - will bootstrap now');
    // Activity may be passed as a json url, or embedded as a datauri?
    var a = new LxxlLib.activity();
    a.setupViewport($('#lxxlroot'), true);
    // a.addStyle('body{background-color: blue;}');
    /*
    a.addStyle('http://static.loft.sn.ackitup.net:4242/lib/frameworks/normalize/normalize-2.0.css');
    */
    a.setupTemplate('activity.tpl');

    a.showActivity('activity.json');

    window.onunload = function(){
      a.end();
    };
  });

})();
