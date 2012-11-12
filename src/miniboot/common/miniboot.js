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


(function() {
  'use strict';

  window.ENV = {};
  // ENV.RAISE_ON_DEPRECATION = true;

  // Will load Ember debug, and jsBoot debug helpers
  var debug = /use-debug/.test(location.href);
  var version = /use-trunk/.test(location.href) && 'trunk';
  // -min suffixing
  var suffix = (!debug && /-min/.test(jsBoot.loader.params('miniboot'))) ? '-min.' : '.';

  var gaTracker = '{PUKE_ANALYTICS}';

  // Root of the versioned app
  var bootRoot = window.lxxlVersionedRoot = '{PUKE-PACKAGE-VERSION}/';



  var debugUser = (location.href.match(/user-anonymous/) || location.href.match(/user-author/) ||
      location.href.match(/user-reviewer/) || location.href.match(/user-admin/) || ['user-author']).pop();



  // IE deserves to be raped :)
  if (/ie[0-8]/.test(document.getElementsByTagName('html').className))
    jsBoot.loader.use('ie7', '2.1');

  // And core stack
  jsBoot.boot.ember(function() {
    $('html').removeClass('no-js');
    if (debug) {
      jsBoot.debug.tick('Ember stack loaded');
      jsBoot.debug.console.VERBOSITY = jsBoot.debug.console.INFO |
          jsBoot.debug.console.WARN | jsBoot.debug.console.ERROR |
          jsBoot.debug.console.LOG /*| jsBoot.debug.console.DEBUG*/;
    }else {
      jsBoot.core.toggleConsole(false);
    }
    $('body').addClass(debugUser);
  }, debug, version);








  // Load jsboot core stylesheet
  // Bundled assets (vanilla bootstrap doesn't work)
  jsBoot.loader.use('libs/css/bootstrap.css');
  jsBoot.loader.use('libs/css/bootstrap-responsive.css');



  // Fullscreen shim-like
  jsBoot.loader.use('bigscreen', version || 'stable');

  // Redactor rich text editing
  jsBoot.loader.use('redactor', 'stable');

  // Use bootstrap as part of the stack as well - for some reason, the unicorn theme doesn't
  // fit well with the vanilla bootstrap...<
  jsBoot.loader.use('bootstrap', version || 'stable', '.js$');

  // Growl like notifications
  jsBoot.loader.use('gritter', version || 'stable');

  // Multiple select stuff
  jsBoot.loader.use('chosen', version || 'stable');

  // Redactor rich text editing
  jsBoot.loader.use('validate', version || '1.10');

  // Custom forms
  jsBoot.loader.use('uniform', version || '1.5');

  // Data tables - no style from them though
  jsBoot.loader.use('datatable', version || '1.9', 'js$');

  // Unicorn base theming
  jsBoot.loader.use('libs/css/unicorn.main.css');
  jsBoot.loader.use('libs/css/unicorn.grey.css');


  // And application stylesheet as well
  // jsBoot.loader.use("{PUKE-BOOT-ROOT}/lxxl{MIN}.css");

  // Wizard depend on this crap, and possibly flot as well
  jsBoot.loader.use('libs/js/jquery.ui.custom' + suffix + 'js');
  jsBoot.loader.wait();
  jsBoot.loader.use('libs/js/jquery.wizard' + suffix + 'js');
  jsBoot.loader.use('libs/js/jquery.flot' + suffix + 'js');
  jsBoot.loader.use('libs/js/jquery.flot.pie' + suffix + 'js');

  jsBoot.loader.use('libs/js/file-upload/load-image' + suffix + 'js');
  jsBoot.loader.use('libs/js/file-upload/jquery.fileupload' + suffix + 'js');
  jsBoot.loader.use('libs/js/file-upload/jquery.fileupload-fp' + suffix + 'js');


  // Load the app itself, along its stylesheet
  jsBoot.loader.use(bootRoot + 'lxxl' + suffix + 'js');
  jsBoot.loader.use(bootRoot + 'lxxl' + suffix + 'css');


  jsBoot.loader.wait(function() {
    if (debug)
      jsBoot.debug.tick('Application stack fully loaded - will bootstrap now');
    // Now, go away placeholder
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
