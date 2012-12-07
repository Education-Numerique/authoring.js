/**
 * @file
 * @summary Load the template file and build-up the application
 *
 * @author {PUKE-RIGHTS-AUTHOR}
 * @version {PUKE-PACKAGE-VERSION}
 *
 * @license {PUKE-RIGHTS-LICENSE}.
 * @copyright {PUKE-RIGHTS-COPYRIGHT}
 * @name {PUKE-GIT-ROOT}/app/common/root/application.js{PUKE-GIT-REVISION}
 */

(function() {
  'use strict';

  // Redactor language rebinding
  window.RELANG = {};
  RELANG['fr'] = I18n.translations.fr.redactor;

  this.LxxlApp = {
    rootElement: $('#lxxlroot'),

    ready: function() {
      if (jsBoot.debug)
        jsBoot.debug.tick('Ember application is ready!', true);

      this._super();
      
      LxxlApp.router.applicationController.addObserver('isAuthor', function () {
        var value = LxxlApp.get('router.applicationController.isAuthor');
        if (value)
          $('#lxxlroot').addClass('user-author');
        else
          $('#lxxlroot').removeClass('user-author');
      });

      LxxlApp.router.applicationController.addObserver('isAdmin', function () {
        var value = LxxlApp.get('router.applicationController.isAdmin');
        if (value)
          $('#lxxlroot').addClass('user-admin');
        else
          $('#lxxlroot').removeClass('user-admin');
      });

      LxxlApp.router.applicationController.addObserver('isLogged', function () {
        var value = LxxlApp.get('router.applicationController.isLogged');
        if (value) {
          $('#lxxlroot').removeClass('user-anonymous');
          $('#lxxlroot').addClass('user-logged');
        } else {
          $('#lxxlroot').addClass('user-anonymous');
          $('#lxxlroot').removeClass('user-logged');
        }
      });
    },
    init: function() {
      if (jsBoot.debug)
        jsBoot.debug.tick('Ember application inited');
      this._super();
    },
    autoinit: false
  };

  var url = '{PUKE-PACKAGE-VERSION}/lxxl.tpl';
  var callback = function() {
    LxxlApp = Ember.Application.create(LxxlApp);
    LxxlApp.initialize();
  };

  var xhrtpl = new XMLHttpRequest();
  xhrtpl.open('GET', url, true);
  xhrtpl.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  xhrtpl.onreadystatechange = function() {
    if (xhrtpl.readyState == 4 && xhrtpl.status == 200) {
      var data = xhrtpl.responseText;
      var parser = /\/[*\s]{1,}@template\s?:\s+([a-z0-9_.-\/]+)(?:[^\/]+|[^*]\/)*[*]\/((?:[^\/]+|[\/][^*])*)/g;
      var result, name, content;
      while ((parser.lastIndex < data.length) && (result = (parser.exec(data)))) {
        content = result.pop();
        name = result.pop();
        Em.TEMPLATES[name] = Em.Handlebars.compile(content);
      }
      if (jsBoot.debug)
        jsBoot.debug.tick('Templates loaded');
      // And init the application
      callback();
    }
  };
  xhrtpl.send();

}).apply(this);
