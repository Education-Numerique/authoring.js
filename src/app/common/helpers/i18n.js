(function(){
  I18n.defaultLocale = 'fr';
  I18n.locale = 'fr';

  Ember.Handlebars.registerHelper('localize', function(key, options) {
    options.defaultValue = '---';
    var ret = I18n.translate(key, options);
    return (ret != '---') && ret || null;
  });

}).apply(this);