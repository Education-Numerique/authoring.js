/**
 * @version {PUKE-PACKAGE-VERSION}
 * @author {PUKE-PACKAGE-AUTHOR}
 * @name {PUKE-PACKAGE-NAME}
 * @homepage {PUKE-PACKAGE-HOME}
 * @file This is meant to load whatever you need before actually running your application.
 * Your main application script should not be in there though, but rather loaded asynchronously
 * as well.
 * @license {PUKE-PACKAGE-LICENSE}.
 * @copyright {PUKE-PACKAGE-COPYRIGHT}
 * @location {PUKE-PACKAGE-GIT-ROOT}/bootstrap/desktop/bootstrap.js{PUKE-PACKAGE-GIT-REV}
 */

'use strict';


(function() {
  // Will load Ember debug, and jsBoot debug helpers
  var debug = !!location.href.match(/use-debug/);
  // Use a splitted jsBoot stack instead (DONT DO THAT KID!)
  var nostack = !!location.href.match(/use-split/);
  // Read the comment above!
  var trunk = !!location.href.match(/use-trunk/);

  // Root of the versioned app, and w/o -min suffix
  var bootRoot = '{PUKE-BOOT-ROOT}/';
  var suffix = (!debug && !location.href.match(/-full/)) ? '-min.js' : '.js';

  // IE deserves to be raped :)
  if (/ie[0-8]/.test(document.getElementsByTagName('html').className))
    jsBoot.loader.use('ie7', trunk ? 'trunk' : '2.1b4');


  // Load bootstrap stylesheet
  // jsBoot.loader.use("{SPIT-CSSBOOT}");
  // And application stylesheet as well
  // jsBoot.loader.use("{PUKE-BOOT-ROOT}/lxxl{MIN}.css");
  // Doesn't work because of img/ relative path
  // jsBoot.loader.use('bootstrap', trunk ? 'trunk' : 'jsboot', 'css$');
  /*  jsBoot.loader.use("libs/css/bootstrap.css");
  jsBoot.loader.use("libs/css/bootstrap-responsive.css");
  jsBoot.loader.use("libs/css/jquery.gritter.css");
  jsBoot.loader.use("libs/css/chosen.css");
  jsBoot.loader.use("libs/css/unicorn.main.css");
  jsBoot.loader.use("libs/css/unicorn.grey.css");*/


  if (!nostack) {
    jsBoot.boot.ember(null, debug);
  }else {
    // Don't try this at home kids!!!!
    jsBoot.loader.use(jsBoot.loader.SHIMS);
    jsBoot.loader.wait();
    jsBoot.loader.use(jsBoot.loader.MINGUS);
    jsBoot.loader.use('stacktrace', trunk ? 'trunk' : '0.3');
    jsBoot.loader.use(jsBoot.loader.CORE);
    jsBoot.loader.use(jsBoot.loader.SERVICE);
    jsBoot.loader.use('jquery', trunk ? 'trunk' : '1.7');
    jsBoot.loader.use('handlebars', trunk ? 'trunk' : '1.b6', 'main');
    jsBoot.loader.wait();
    // This could be put anywhere, but has to wait for core
    if (debug)
      jsBoot.loader.use(jsBoot.loader.DEBUG);
    jsBoot.loader.use('ember', trunk ? 'trunk' : '1.0.pre', debug ? 'debug' : 'prod');
    jsBoot.loader.use('i18n', trunk ? 'trunk' : '3rc2');
    jsBoot.loader.wait();
  }

  // Use bootstrap as part of the stack as well.
  jsBoot.loader.use('bootstrap', trunk ? 'trunk' : 'jsboot', 'js$');

  jsBoot.loader.wait(function() {
    if (debug)
      jsBoot.debug.tick('Base stack loaded - continuing with the app itself');
    if (debug) {
      // jsBoot.debug.cssPoller.start();
      jsBoot.debug.console.VERBOSITY = jsBoot.debug.console.INFO |
          jsBoot.debug.console.WARN | jsBoot.debug.console.ERROR |
          jsBoot.debug.console.LOG | jsBoot.debug.console.DEBUG;
    // TRACE is out of the game - jsBoot debug reserved
    }else {
      //      jsBoot.loader.muteConsole();
    }
  });
  // console.warn(jsBoot.loader.list());
  // throw "toto";

  // Growl like notifications
  jsBoot.loader.use('libs/js/jquery.gritter' + suffix);
  // Disable text select
  jsBoot.loader.use('libs/js/jquery.uniform' + suffix);
  // Data tables
  jsBoot.loader.use('libs/js/jquery.dataTables' + suffix);
  // Css bootstrap - vanilla version doesn't work
  //  jsBoot.loader.use('libs/js/bootstrap' + suffix);

  // jsBoot.loader.use('bootstrap', 'jsboot', 'css$');

  jsBoot.loader.use('chosen', 'jsboot');

  // Wizard depend on this crap
  jsBoot.loader.use('libs/js/jquery.ui.custom' + suffix);
  jsBoot.loader.wait();

  jsBoot.loader.use('libs/js/jquery.validate' + suffix);
  jsBoot.loader.use('libs/js/jquery.wizard' + suffix);

  jsBoot.loader.use('libs/js/jquery.flot' + suffix);
  jsBoot.loader.use('libs/js/jquery.flot.pie' + suffix);

  jsBoot.loader.use('redactor', '8.0');

  // Load the app itself
  jsBoot.loader.use(bootRoot + 'lxxl' + suffix);

  jsBoot.loader.wait(function() {
    if (debug)
      jsBoot.debug.tick('Application stack fully loaded - will bootstrap now');
    // Now, go away placeholder
    $('html').removeClass('no-js');
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
