/**
 * @file
 * @summary Defines some handlebards helpers
 *
 * @author {PUKE-RIGHTS-AUTHOR}
 * @version {PUKE-PACKAGE-VERSION}
 *
 * @license {PUKE-RIGHTS-LICENSE}.
 * @copyright {PUKE-RIGHTS-COPYRIGHT}
 * @name {PUKE-GIT-ROOT}/app/common/helpers/handlebars-addons.js{PUKE-GIT-REVISION}
 */

(function() {
  'use strict';
  I18n.defaultLocale = 'fr';
  I18n.locale = 'fr';

  Ember.Handlebars.registerHelper('localize', function(key, options) {
    options.defaultValue = '---';
    var ret = I18n.translate(key, options);
    return (ret != options.defaultValue) && ret || null;
  });

  Ember.Handlebars.registerHelper('ifequal', function(val1, val2, options) {
    var context = (options.fn.contexts && options.fn.contexts[0]) || this;
    // var val1 = Ember.Handlebars.getPath(context, val1, options.fn);
    // var val2 = Ember.Handlebars.getPath(context, val2, options.fn);
    if (val1 === val2) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });

}).apply(this);
