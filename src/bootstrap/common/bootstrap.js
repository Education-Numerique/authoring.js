/**
 * @version {PUKE-PACKAGE-VERSION}
 * @author {PUKE-PACKAGE-AUTHOR}
 * @name {PUKE-PACKAGE-NAME}
 * @homepage {PUKE-PACKAGE-HOME}
 * @file Gris Taupe javascript bootstraper
 * @license {PUKE-PACKAGE-LICENSE}.
 * @copyright {PUKE-PACKAGE-COPYRIGHT}
 * @location {PUKE-PACKAGE-GIT-ROOT}/bootstrap/desktop/bootstrap.js{PUKE-PACKAGE-GIT-REV}
 */

'use strict';

(function(){
  var bootRoot = '{PUKE-BOOT-ROOT}/';
  var debug = !!location.href.match(/use-debug/);
  var nostack = !!location.href.match(/use-split/);
  var trunk = !!location.href.match(/use-trunk/);
  var suffix = (!debug && !location.href.match(/use-full/)) ? '-min.js' : '.js';

  if(!nostack){
    jsBoot.core.boot(null, debug, trunk);
    // Load the app itself
    jsBoot.core.use(bootRoot + 'app' + suffix);
  }else{
    if(debug)
      jsBoot.core.use(jsBoot.core.DEBUG);
    jsBoot.core.use(jsBoot.core.SHIMS);
    jsBoot.core.use('jquery', trunk ? 'trunk': '1.8');
    jsBoot.core.use('handlebars', trunk ? 'trunk': '1.b6', 'main');
    jsBoot.core.wait();
    jsBoot.core.use('ember', trunk ? 'trunk': '1.0.pre', debug ? 'debug' : 'prod');
    jsBoot.core.use('i18n', trunk ? 'trunk': '3rc2');
    jsBoot.core.wait();
  }

  jsBoot.core.wait(function () {
    $('html').removeClass('no-js');
  });


  jsBoot.core.use('libs/js/bootstrap.js');

  // Form validation
  // jsBoot.core.use('libs/js/jquery.validate.js');
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
  // jsBoot.core.use('libs/js/jquery.peity.js');

  // Datatables
  // jsBoot.core.use('libs/js/jquery.dataTables.js');



  jsBoot.core.use('libs/js/jquery.ui.custom.js');

  // Calendar
  // jsBoot.core.use('libs/js/fullcalendar.js');


  jsBoot.core.wait();

  jsBoot.core.use('libs/js/unicorn.js');

  // Form wizard
  // jsBoot.core.use('libs/js/jquery.wizard.js');





  // jsBoot.core.use('libs/js/jquery.flot.js');
  // jsBoot.core.use('libs/js/jquery.flot.resize.js');
  // jsBoot.core.use('libs/js/excanvas.js');
  // jsBoot.core.use('libs/js/jquery.gritter.js');
  // jsBoot.core.use('libs/js/unicorn.dashboard.js');

})();