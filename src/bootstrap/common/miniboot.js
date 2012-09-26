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

'use strict';


(function() {
  window.ENV = {};
  // ENV.RAISE_ON_DEPRECATION = true;

  // Root of the versioned app
  var bootRoot = window.lxxlVersionedRoot = '{PUKE-BOOT-ROOT}/';
  // Will load Ember debug, and jsBoot debug helpers
  var debug = !!location.href.match(/use-debug/);
  // Use a splitted jsBoot stack instead (DONT DO THAT KID!)
  var nostack = !!location.href.match(/use-split/);
  // Read the comment above!
  var trunk = !!location.href.match(/use-trunk/);
  // -min suffixing
  var suffix = (!debug && !location.href.match(/-full/)) ? '-min.js' : '.js';

  var debugUser = (location.href.match(/user-anonymous/) || location.href.match(/user-author/) ||
      location.href.match(/user-reviewer/) || location.href.match(/user-admin/) || ['user-author']).pop();

  // IE deserves to be raped :)
  if (/ie[0-8]/.test(document.getElementsByTagName('html').className))
    jsBoot.loader.use('ie7', trunk ? 'trunk' : '2.1b4');

  // Load jsboot core stylesheet
  jsBoot.loader.use('normalize', 2.0);
  jsBoot.loader.use('h5bp', 4.0);
  // Bundled assets (vanilla bootstrap doesn't work)
  jsBoot.loader.use('libs/css/bootstrap.css');
  jsBoot.loader.use('libs/css/bootstrap-responsive.css');

  if (!nostack) {
    jsBoot.boot.ember(null, debug);
  }else {
    // Don't try this at home kids!!!!
    jsBoot.loader.use(jsBoot.loader.SHIMS);
    jsBoot.loader.wait();
    jsBoot.loader.use(jsBoot.loader.MINGUS);
    jsBoot.loader.use('stacktrace', trunk ? 'trunk' : '0.4');
    jsBoot.loader.use(jsBoot.loader.CORE);
    jsBoot.loader.use(jsBoot.loader.SERVICE);
    jsBoot.loader.use('jquery', trunk ? 'trunk' : '1.7');
    jsBoot.loader.use('handlebars', trunk ? 'trunk' : '1.rc1', 'main');// b6
    jsBoot.loader.use('i18n', trunk ? 'trunk' : '3rc2');
    jsBoot.loader.wait();
    // UI obviously depends on a stack of shite
    // jsBoot.loader.use(jsBoot.loader.UI);
    // This could be put anywhere, but has to wait for core
    if (debug)
      jsBoot.loader.use(jsBoot.loader.DEBUG);
    jsBoot.loader.use('ember', trunk ? 'trunk' : '1.0.pre', debug ? 'debug' : 'prod');
  }

  // Fullscreen shim-like
  jsBoot.loader.use('bigscreen', trunk ? 'trunk' : 'stable');

  // Redactor rich text editing
  jsBoot.loader.use('redactor', 'stable');

  // Use bootstrap as part of the stack as well - for some reason, the unicorn theme doesn't
  // fit well with the vanilla bootstrap...<
  jsBoot.loader.use('bootstrap', trunk ? 'trunk' : 'stable', '.js$');

  // Growl like notifications
  jsBoot.loader.use('gritter', trunk ? 'trunk' : 'stable');

  // Multiple select stuff
  jsBoot.loader.use('chosen', trunk ? 'trunk' : 'stable');

  // Redactor rich text editing
  jsBoot.loader.use('validate', trunk ? 'trunk' : '1.10');

  // Custom forms
  jsBoot.loader.use('uniform', trunk ? 'trunk' : '1.5');

  // Data tables - no style from them though
  jsBoot.loader.use('datatable', trunk ? 'trunk' : '1.9', 'js$');

  // Unicorn base theming
  jsBoot.loader.use('libs/css/unicorn.main.css');
  jsBoot.loader.use('libs/css/unicorn.grey.css');


  // And application stylesheet as well
  // jsBoot.loader.use("{PUKE-BOOT-ROOT}/lxxl{MIN}.css");

  jsBoot.loader.wait(function() {
    if (debug) {
      jsBoot.debug.tick('Base stack loaded - continuing with the app itself');
      // $.gritter.add({
      //   title: 'Base stack loaded',
      //   text: 'Keep on truckin!',
      //   sticky: false
      // });

      // jsBoot.debug.cssPoller.start();
      jsBoot.debug.console.VERBOSITY = jsBoot.debug.console.INFO |
          jsBoot.debug.console.WARN | jsBoot.debug.console.ERROR |
          jsBoot.debug.console.LOG | jsBoot.debug.console.DEBUG;
    // TRACE is out of the game - jsBoot debug reserved
    }else {
      //      jsBoot.loader.muteConsole();
    }

    $('body').addClass(debugUser);
  });

  // Wizard depend on this crap, and possibly flot as well
  jsBoot.loader.use('libs/js/jquery.ui.custom' + suffix);
  jsBoot.loader.wait();
  jsBoot.loader.use('libs/js/jquery.wizard' + suffix);
  jsBoot.loader.use('libs/js/jquery.flot' + suffix);
  jsBoot.loader.use('libs/js/jquery.flot.pie' + suffix);

  jsBoot.loader.use('libs/js/file-upload/load-image' + suffix);
  jsBoot.loader.use('libs/js/file-upload/jquery.fileupload' + suffix);
  jsBoot.loader.use('libs/js/file-upload/jquery.fileupload-fp' + suffix);


  // Load the app itself, along its stylesheet
  jsBoot.loader.use(bootRoot + 'lxxl' + suffix);
  jsBoot.loader.use(bootRoot + 'lxxl' + suffix.replace(/js$/, 'css'));


  jsBoot.loader.wait(function() {
    if (debug)
      jsBoot.debug.tick('Application stack fully loaded - will bootstrap now');
    // Now, go away placeholder
    $('html').removeClass('no-js');
    if (typeof chrome == 'undefined')
      $('html').addClass('unsupported-browser');
  });




  // Form validation
  // jsBoot.loader.use('libs/js/jquery.validate.js');
  /*
    $("#register_form").validate({
        rules:{
            user_name:"required",
            user_email:{
                required:true,
                email: true
            },
        messages:{
            user_name:"Enter your first and last name",
            user_email:{
                required:"Enter your email address",
                email:"Enter valid email address"
        },
        errorClass: "help-inline",
        errorElement: "span"
    });

<form id="register_form" name="register_form" action="auth.php" method="post">
    <input type="text" name="user_name" id="user_name" value="" />
    <input type="text" name="user_email"  id="user_email" value="" />
    <input type="submit" name="submit" value="Register" />
</form>
 */

  // Charts
  // jsBoot.loader.use('libs/js/jquery.peity.js');

  // Datatables
  // jsBoot.loader.use('libs/js/jquery.dataTables.js');

  // Calendar
  // jsBoot.loader.use('libs/js/fullcalendar.js');



  // Form wizard
  // jsBoot.loader.use('libs/js/jquery.wizard.js');





  // jsBoot.loader.use('libs/js/jquery.flot.js');
  // jsBoot.loader.use('libs/js/jquery.flot.resize.js');
  // jsBoot.loader.use('libs/js/excanvas.js');
  // jsBoot.loader.use('libs/js/jquery.gritter.js');
  // jsBoot.loader.use('libs/js/unicorn.dashboard.js');



})();
