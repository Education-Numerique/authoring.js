/**
 * @file
 * @summary This is a simplified miniboot meant for standalone applications.
 *
 * @author {PUKE-RIGHTS-AUTHOR}
 * @version {PUKE-PACKAGE-VERSION}
 *
 * @license {PUKE-RIGHTS-LICENSE}.
 * @copyright {PUKE-RIGHTS-COPYRIGHT}
 * @name {PUKE-GIT-ROOT}/miniboot/common/miniboot.js{PUKE-GIT-REVISION}
 */

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
  jsBoot.loader.use(jsBoot.loader.MINGUS);
  if (debug)
    jsBoot.loader.use('stacktrace', version || '0.4', null, debug);
  jsBoot.loader.wait();
  jsBoot.loader.use(jsBoot.loader.CORE);
  jsBoot.loader.wait();
  if (debug)
    jsBoot.loader.use(jsBoot.loader.DEBUG, null, null, debug);
  jsBoot.loader.use(jsBoot.loader.SERVICE);
  jsBoot.loader.use('jquery', version || '1.8');
  jsBoot.loader.use('handlebars', version || '1.0', 'main');// b6
  // jsBoot.loader.use('i18n', trunk ? 'trunk' : '3rc2');
  jsBoot.loader.wait();

  // This could be put anywhere, but has to wait for core
  if (debug)
    jsBoot.loader.use(jsBoot.loader.DEBUG);

  jsBoot.loader.use('bootstrap', version || 'stable');

  jsBoot.loader.use('apiwrapper' + suffix + 'js');
  jsBoot.loader.use('lxxl-standalone-library' + suffix + 'js');

  // Callback for when the first part of the stack is loaded
  jsBoot.loader.wait(function() {
    // Js is working here
    $('html').removeClass('no-js');
    // Now, go away placeholder
    // if ((typeof chrome == 'undefined') && (typeof XPCNativeWrapper == 'undefined'))
    //   $('html').addClass('unsupported-browser');
    if (debug) {
      jsBoot.debug.tick('Ember stack loaded');
      // Set reasonable verbosity
      jsBoot.debug.console.VERBOSITY = jsBoot.debug.console.INFO |
          jsBoot.debug.console.WARN | jsBoot.debug.console.ERROR |
          jsBoot.debug.console.LOG /*| jsBoot.debug.console.DEBUG*/;
    }else {
      // Mute console while in production
      jsBoot.core.toggleConsole(false);
    }

    // Initialize service - to be {PUKE-*}-ed
    jsBoot.service.core.initialize({
      id: 'TEST',
      secret: 'TEST'
    }, {
      // host: 'localhost',
      // port: '8081',
      host: 'snap.lxxl.com',
      port: '90',
      version: '1.0'
    }, {
      id: 'anonymous',
      login: 'anonymous',
      password: '860b9dbbda6ee5f71ddf3b44e54c469e'
    });
  });

  // jsBoot.loader.use('activity' + suffix + 'css');
  jsBoot.loader.use('activity' + suffix + 'js');

  jsBoot.loader.wait(function() {
    if (debug)
      jsBoot.debug.tick('Application stack fully loaded - will bootstrap now');
    // Activity may be passed as a json url, or embedded as a datauri?
    var a = new LxxlLib.activity();
    a.setupViewport($('#lxxlroot'), true);
    // a.addStyle('body{background-color: blue;}');

    a.setupTemplate('activity.tpl');

    a.showActivity('activity.json');

    window.onunload = function(){
      a.end();
    };
  });
})();
