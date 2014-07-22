/**
 * @file
 * @summary This is meant to load whatever you need before actually running your application.
 * Your main application script should NOT be in there though, but rather loaded asynchronously
 * as well. DONT edit this unless you know what you are doing.
 *
 * @author {PUKE-RIGHTS-AUTHOR}
 * @version {PUKE-PACKAGE-VERSION}
 *
 * @license {PUKE-RIGHTS-LICENSE}.
 * @copyright {PUKE-RIGHTS-COPYRIGHT}
 * @name {PUKE-GIT-ROOT}/miniboot/common/miniboot.js{PUKE-GIT-REVISION}
 */

(function() {
  /*jshint maxstatements:50*/
  'use strict';

  // Redirect if nomen
  if (!/^(?:static|www|app|dev)\./.test(location.hostname)) {
    location.href = location.href.replace(/^([^:]+:\/\/)/, '$1www.');
    return;
  }

  // Redirect if reload
  if (!!location.hash && !/#\/account/.test(location.hash)) {
    location.href = location.href.replace(/(#.+)/, '');
    return;
  }

  // Root of the versioned app
  var bootRoot = '{PUKE-PACKAGE-VERSION}/';

  // Allow the use of additional url parameters to trigger specific behavior
  // Debuggin
  var debug = /use-debug/.test(location.href);
  debug = true; // JBT : to be removed while in prod !!! (Keep for dev)

  // Ember global configuration
  window.ENV = {
    RAISE_ON_DEPRECATION: debug
  };

  // Trunk version - don't do this, kid!
  var version = /use-trunk/.test(location.href) && 'trunk';
  // Not minified if debugging
  // XXX disable minification for now
  var suffix = !debug ? '-min.' : '.';
  suffix = '.';

  // No analytics for now
  // var gaTracker = '{PUKE_ANALYTICS}';

  var cdnJax = /use-cdnjax/.test(location.href);

  // // To be removed when service login lands
  // var debugUser = debug && ((location.href.match(/user-anonymous/) || location.href.match(/user-author/) ||
  //     location.href.match(/user-reviewer/) || location.href.match(/user-admin/) || ['user-anonymous']).pop());

  // IE deserves to be raped :)
  // if (/ie[0-8]/.test(document.getElementsByTagName('html').className))
  //   jsBoot.loader.use('ie7', '2.1');

  // Callback for when the first part of the stack is loaded
  var onEmberBoot = function() {
    // Js is working here
    $('html').removeClass('no-js');
    // $('.network-crash').hide();
    // Now, go away placeholder
    // if ((typeof chrome == 'undefined') && (typeof XPCNativeWrapper == 'undefined'))
    function msieversion() 
    {
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE ");

        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))
        {
            //alert(parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))));
            $('html').addClass('unsupported-browser');
        }
        // else
        //     alert('otherbrowser');
       return false;
    }
    msieversion();

    // DISABLE THE NO LEAVE PAGE 
    window.onhashchange = function ()
    {
        window.onbeforeunload = null;
    }

    if (debug) {
      // To be removed - allow to spoof user level when debugging
      // $('body').addClass(debugUser);
      jsBoot.debug.tick('Ember stack loaded');
      // Set reasonable verbosity
      jsBoot.debug.console.VERBOSITY = jsBoot.debug.console.INFO |
          jsBoot.debug.console.WARN | jsBoot.debug.console.ERROR |
          jsBoot.debug.console.LOG /*| jsBoot.debug.console.DEBUG*/;
    }else {
      // Mute console while in production
      jsBoot.core.toggleConsole(false);
    }
  };

  // Add core stack
  jsBoot.boot.ember(onEmberBoot, debug, version);

  // Bundled assets (vanilla bootstrap style doesn't work properly)
  jsBoot.loader.use('libs/css/bootstrap' + suffix + 'css');
  //jsBoot.loader.use('libs/css/offline.css');
  // jsBoot.loader.use('libs/css/bootstrap-responsive.css');

  // Fullscreen shim-like - not used for now
  // jsBoot.loader.use('bigscreen', version || 'stable');

  // Redactor rich text editing
  //jsBoot.loader.use('redactor', 'stable');
  jsBoot.loader.use('raphael', version || '2.1', '.js$');

  // Use bootstrap as part of the stack as well - for some reason, the unicorn theme doesn't
  // fit well with the vanilla bootstrap stylesheet
  jsBoot.loader.use('bootstrap', version || 'stable', '.js$');

  // Growl like notifications - not used for now
  // jsBoot.loader.use('gritter', version || 'stable');

  // Multiple select stuff
  jsBoot.loader.use('chosen', version || 'stable', '.css$');

  // Redactor rich text editing
  jsBoot.loader.use('validate', version || '1.10');

  // Moment js for date formatting
  jsBoot.loader.use('moment', version || '1.7');

  // Custom forms
  jsBoot.loader.use('uniform', version || '1.7');

  // Data tables - no style from them though
  jsBoot.loader.use('datatable', version || '1.9', 'js$');
  // jsBoot.loader.use('http://www.education-et-numerique.fr/lib/plugins/jquery/datatable/datatable-1.9.js');

  // Unicorn base theming
  jsBoot.loader.use('libs/css/unicorn.main' + suffix + 'css');
  jsBoot.loader.use('libs/css/unicorn.grey' + suffix + 'css');
  jsBoot.loader.use('libs/css/redactor' + suffix + 'css');
  jsBoot.loader.use("//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css");
  jsBoot.loader.use('libs/css/offline-theme-chrome.css');
  jsBoot.loader.use('libs/css/offline-language-french.css');


  jsBoot.loader.use('libs/js/chosen.jquery' + suffix + 'js');
  // Wizard depend on this crap, and possibly flot as well
  jsBoot.loader.use('libs/js/jquery.ui.custom' + suffix + 'js');
   // JBT & EP added this one ... 15/02/2014
  jsBoot.loader.use('libs/js/jquery.ui.touch-punch.min.js');
  jsBoot.loader.use('libs/js/offline.min.js');
  // jsBoot.loader.use('libs/js/offline-simulate-ui.min.js');
//  jsBoot.loader.use('libs/js/offline-simulate.js');



  if (cdnJax) {
    jsBoot.loader.use('//cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_HTMLorMML.js');
  }else {
    // Mathjax is a bitch
    var baseJax = jsBoot.loader.list().mathjax.filter(function(item) {
      if (item.match(/MathJax[.]js/) && item.match(/latest/))// 2\.1
        return true;
    }).pop();

    jsBoot.loader.use(baseJax + '?config=TeX-MML-AM_HTMLorMML.js');
    jsBoot.loader.wait(function() {

    });
  }

  // jsBoot.loader.use('mathjax', version || '2.1', 'TeX-MML-AM_HTMLorMML.js');
  // jsBoot.loader.use('mathjax', version || '2.1', 'mathjax.*[.]js$');
  // jsBoot.loader.use('//cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_HTMLorMML.js');

  // Mathjax itself
  jsBoot.loader.use('libs/js/jquery.wizard' + suffix + 'js');
  jsBoot.loader.use('libs/js/jquery.flot' + suffix + 'js');
  jsBoot.loader.use('libs/js/jquery.flot.pie' + suffix + 'js');

  jsBoot.loader.use('libs/js/file-upload/canvas-to-blob' + suffix + 'js');
  jsBoot.loader.use('libs/js/file-upload/load-image' + suffix + 'js');
  jsBoot.loader.use('libs/js/file-upload/jquery.fileupload' + suffix + 'js');
  jsBoot.loader.use('libs/js/file-upload/jquery.fileupload-fp' + suffix + 'js');

  jsBoot.loader.use(bootRoot + 'activity/activity' + suffix + 'css');
  jsBoot.loader.use(bootRoot + 'activity/packer' + suffix + 'js');
  // Load the app itself, along its stylesheet
  jsBoot.loader.use(bootRoot + 'lxxl-standalone-library' + suffix + 'js');
  jsBoot.loader.use(bootRoot + 'lxxl' + suffix + 'js');
  jsBoot.loader.use(bootRoot + 'lxxl' + suffix + 'css');
  jsBoot.loader.use('libs/js/redactor' + suffix + 'js');
  jsBoot.loader.use('libs/js/html2canvas' + suffix + 'js');
  jsBoot.loader.use('libs/js/jszip' + suffix + 'js');


  jsBoot.loader.wait(function() {
    if (debug)
      jsBoot.debug.tick('Application stack fully loaded - will bootstrap now');
  });


  window.prefillHack = {
  };

  var a = location.search.substr(1).split('&');
  a.forEach(function(item) {
    item = item.split('=');
    var key = item.shift();
    if (key) {
      prefillHack[key] = item.join('=');
    }
  });

})();
