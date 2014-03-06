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
  /*global moment:false*/
  'use strict';
  I18n.defaultLocale = 'fr';
  I18n.locale = 'fr';

  Ember.Handlebars.registerHelper('localize', function(key, options) {
    options.defaultValue = '---';
    var ret = I18n.translate(key, options);
    return (ret != options.defaultValue) && ret || null;
  });

  LxxlLib.Locale = {
    getData: function(key) {
      var def = '---';
      var ret = I18n.translate(key, {defaultValue: def});
      return (ret != def) && ret || null;
    }
  };

  Ember.Handlebars.registerHelper('ifequal', function(val1, val2, options) {
    // var context = (options.fn.contexts && options.fn.contexts[0]) || this;
    // var val1 = Ember.Handlebars.getPath(context, val1, options.fn);
    // var val2 = Ember.Handlebars.getPath(context, val2, options.fn);
    if (val1 === val2) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });


  Ember.Handlebars.registerHelper('pad', function(property, options) {

    var number = Ember.Handlebars.get(this, property, options);
    options = options.hash;
    var width = 2;
    var character = '0';

    if (!number)
      number = 0;

    if ('char' in options)
      character = options.char;

    if ('width' in options)
      width = options.width;

    return pad(number, width, character);

  });

  var pad = function(number, width, character) {
    character = character || '0';
    width -= number.toString().length;
    if (width > 0)
    {
      return new Array(width + (/\./.test(number) ? 2 : 1)).join(character) + number;
    }
    return number;
  };


  // Momentjs

  var isValidDate = function(d) {
    if (Object.prototype.toString.call(d) !== '[object Date]')
      return false;
    return !isNaN(d.getTime());
  };

  Ember.Handlebars.registerHelper('moment', function(property, options) {
    var value = Ember.Handlebars.get(this, property, options);
    // console.warn('-------------------->', value);

    if (Object.prototype.toString.call(value) === '[object String]')
      value = new Date(value);

    if (!isValidDate(value))
      return '';

    if ('format' in options.hash)
      return moment(value).format(options.hash.format);
    else if ('from' in options.hash)
      return moment(value).from(options.hash.from);
    else if ('compute' in options.hash && options.hash.compute == 'age')
      return Math.floor(moment().diff(moment(value), 'months') / 12, 0);
    else if ('fromNow' in options.hash)
      return moment(value).fromNow(options.hash.fromNow == 'true' ? true : false);
  });

  moment.lang('fr', {
    months: 'Janvier_Février_Mars_Avril_Mai_Juin_Juillet_Aout_Septembre_Octobre_Novembre_Décembre'.split('_'),
    monthsShort: 'Jan_Fev_Mar_Avr_Mai_Juin_Juil_Aou_Sep_Oct_Nov_Dec'.split('_'),
    weekdays: 'Dimanche_Lundi_Mardi_Mercredi_Jeudi_Vendredi_Samedi'.split('_'),
    weekdaysShort: 'Dim_Lun_Mar_Mer_Jeu_Ven_Sam'.split('_'),
    longDateFormat: {
      L: 'DD/MM/YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY HH:mm',
      LLLL: 'dddd, D MMMM YYYY HH:mm'
    },
    meridiem: {
      AM: 'AM',
      am: 'am',
      PM: 'PM',
      pm: 'pm'
    },
    calendar: {
      sameDay: '[Ajourd\'hui à] LT',
      nextDay: '[Demain à] LT',
      nextWeek: 'dddd [à] LT',
      lastDay: '[Hier à] LT',
      lastWeek: 'dddd [denier à] LT',
      sameElse: 'L'
    },
    relativeTime: {
      future: 'dans %s',
      past: 'il y a %s',
      s: 'une seconde',
      ss: '%d secondes',
      m: 'une minute',
      mm: '%d minutes',
      h: 'une heure',
      hh: '%d heures',
      d: 'un jour',
      dd: '%d jours',
      M: 'un mois',
      MM: '%d mois',
      y: 'une année',
      yy: '%d années'
    },
    ordinal: function(number) {
      return (~~ (number % 100 / 10) === 1) ? 'er' : 'ème';
    }
  });

}).apply(this);
