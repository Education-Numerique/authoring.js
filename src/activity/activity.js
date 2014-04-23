/**
 * This file is responsible for two things:
 * - expose an API to manipulate and render activity objects
 * - add the learner environemnent including feedback and other consumer related behaviors
 */


/*global Mingus, Handlebars*/

(function($) {
  'use strict';

  $.fn.shuffle = function() {

    var allElems = this.get();
    var getRandom = function(max) {
      return Math.floor(Math.random() * max);
    };
    var shuffled = $.map(allElems, function() {
      var random = getRandom(allElems.length),
              randEl = $(allElems[random]).clone(true)[0];
      allElems.splice(random, 1);
      return randEl;
    });
    // var max = this.length;

    this.each(function(i) {
      $(this).replaceWith($(shuffled[i]));
    });

    return $(shuffled);

  };

})($);


(function() {
  'use strict';
  /**
   * Handle
   */
  Handlebars.registerHelper('ifequalhelp', function(val1, val2, options) {
    // var context = (options.fn.contexts && options.fn.contexts[0]) || this;
    // var val1 = Ember.Handlebars.getPath(context, val1, options.fn);
    // var val2 = Ember.Handlebars.getPath(context, val2, options.fn);
    if (val1 === val2) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });

  Handlebars.registerHelper('mimetype', function(type) {
    return type.split('/').pop();
  });

  (function() {
    var globalIndex = 0;
    var namedIndex = {};
    Handlebars.registerHelper('index', function(property) {
      if (typeof(property) == 'string') {
        if (!namedIndex[property])
          namedIndex[property] = 0;

        return ++namedIndex[property];
      }
      return ++globalIndex;
    });
    Handlebars.registerHelper('reset_index', function(property) {
      if (typeof(property) == 'string') {
        namedIndex[property] = 0;
        return;
      }

      globalIndex = 0;
    });
  })();


  // var session;
  var ifr;
  var bb;
  var pubVersion;

  // Explicit API
  this.LxxlLib.Masher = function() {
    var parse = function(payload, flavor) {
      switch (flavor) {
        case 'application/json':
          return JSON.parse(payload);
          // Workaround nasty shit when on public
          // if(!('draft' in ret))
          //   ret.draft = ret.published;
          // return ret;
        case 'text/html':
          // return (new DOMParser()).parseFromString(payload, 'text/xml');
          return Handlebars.compile(payload);
        default:
          break;
      }
      return payload;
    };

    var readDataUri = function(toLoad) {
      var a = toLoad.path.split(',');
      var t = a.shift().split(';');
      if (t.pop() != 'base64')
        throw 'Only base64 encoded data is supported';
      parse(atob(a.join(',')), t.pop());
    };

    var guessType = function(ext) {
      switch (ext) {
        case 'json':
          return 'application/json';
        case 'tpl':
          return 'text/html';
      }
      return null;
    };

    var loader = function(iri, callback) {
      var toLoad;
      try {
        toLoad = Mingus.grammar.IRI.parse(iri);
      }catch (e) {
        // Eg: receiving something that is not an IRI
        callback(iri);
        return;
      }
      switch (toLoad.scheme) {
        case 'jshint':
          break;
        case 'data':
          callback(readDataUri(toLoad));
          break;
        default:
          // case 'http':
          // case 'file':
          var r = new XMLHttpRequest();
          r.open('GET', iri);
          r.onreadystatechange = function() {
            if (r.readyState == 4) {
              callback(parse(r.responseText, guessType(toLoad.path.split('.').pop()) || 'application/json'));
            }
          };
          r.send();
          break;
      }
    };

    var init = 0;
    var done = 0;
    var tpl;
    var act;
    var styles = [];
    var completionCallback;


    var loadingComplete = function() {
      if (completionCallback)
        completionCallback();
    };

    var note = function(data) {
      if (typeof data == 'function')
        tpl = data;
      else
        act = data;
      init++;
      if (init == done) {
        // ++ All that should migrate into sessionManager
        LxxlLib.sessionManager.start(act, pubVersion);
        var deref = LxxlLib.sessionManager.activity;
        if (!/scorm/.test(location.href))
          deref.seen();
        // Re-attach author from the activity to the dereferenced scope
        var author = deref.author;
        // Now, the tpl can consume the author name
        // <h1>{{author.uid}}</h1>
        // <h1>{{author.username}}</h1>

        deref = pubVersion ? deref.published : deref.draft;
        deref.author = author;
        deref.styleData = [];
        deref.styleUri = [];
        // Style mashuping
        styles.forEach(function(item) {
          try {
            Mingus.grammar.IRI.parse(item);
            deref.styleUri.push({data: item});
          }catch (e) {
            deref.styleData.push({data: item});
          }
        });
        // Fixing the activity
        deref.pages.forEach(function(item, ind) {
          item.id = ind;
        });
        var res = tpl(deref);
        if ('html' in ifr) {
          ifr.html(' ');
          ifr.html(res);
          bindCollapser(ifr);
        }else
          ifr.innerHTML = res;
        LxxlLib.sessionManager.bindDocument(ifr);
        // -- All that should migrate into sessionManager
        loadingComplete();
      }
    };

    var bindCollapser = function(node) {
      // console.warn('entering bind collapser', node[0].innerHTML);

      var currentActivity = LxxlLib.sessionManager.activity;
      currentActivity = pubVersion ? currentActivity.published : currentActivity.draft;

      // var hide = function() {
      //   console.error('--_> HIDFE');
      //   $(this).css('display: none');
      //   // $(this).data('hack', $(this).height());
      //   // $(this).height('0px');
      // };

      // var show = function() {
      //   console.error('--_> SHOW');
      //   $(this).css('display: block');
      //   // $(this).height($(this).data('hack') + 'px');
      // };\
      $(document).tooltip({selector: '[rel=tooltip]'});
      $('h4', node).next().slideUp();
      $('h4', node).append('<i class="collapse-binder"></i>');
      $('h4', node).data('manuWillHateMeAgain', true);
      $('h4 > i.collapse-binder', node).addClass('icon-arrow-down');

      if (!node[0].jobDone) {
        node[0].jobDone = true;
        // does not fire on touch .... at least on ipad (JBT)
        $(document).on('click touchstart', 'h4, a', function(/*e*/) {
          var status = $(this).data('manuWillHateMeAgain');
          $(this).data('manuWillHateMeAgain', !status);
          if (status) {
            $('i.collapse-binder', this).addClass('icon-arrow-up');
            $('i.collapse-binder', this).removeClass('icon-arrow-down');
            $(this).next().slideDown(100);//, show);
            $(this).next().addClass('light_grey_bloc');
          }
          else {
            $('i.collapse-binder', this).addClass('icon-arrow-down');
            $('i.collapse-binder', this).removeClass('icon-arrow-up');
            $(this).next().slideUp(100);//, hide);
          }
        });
      }

      currentActivity.pages.forEach(function(page, index) {

        if (page.flavor.id != 'jmt')
          return;

        var container = $('[data-page="' + index + '"]');

        $('.questions > li', container).each(function(index, item) {
          $(item).data('lxxl-question', index);
        });

        $('.propositions > li', container).each(function(index, item) {
          $(item).data('lxxl-proposition', index);
        });

        if (page.sequencing > 0) {
          $('.questions > li', container).shuffle();
          $('.questions > li', container).shuffle();
        }

        var total = $('.propositions > li', container).length;
        page.score = new LxxlScoring.mixScore(total);

        $('.questions > li', container).droppable({
          // display BUG : when dragged && scrolling, hotpoint looses dragpoint ....
          activeClass: 'ui-state-active',
          hoverClass: 'ui-state-hover',
          drop: function(event, ui) {
            if (ui.draggable.data('lxxl-proposition') == $(this).data('lxxl-question')) {
              
              var height = ui.draggable.outerHeight();
              var currentHeight = $(this).find('.title').outerHeight();

              // cloning and appending prevents the revert animation from still occurring

              ui.draggable.clone(true).css('position', 'inherit').appendTo($(this).find('.response'));
              ui.draggable.remove();

              if (currentHeight < height)
                $(this).find('.title').outerHeight(height + 'px');

              $(this).droppable('disable');
              $(this).addClass('ui-state-correct');

              console.warn('Result', page.score.getResult(total - $('.propositions > li', container).length));
              if (!$('.propositions > li', container).length) {
                LxxlLib.sessionManager.MixAndMatchComplete(index, page.score.getResult(total - $('.propositions > li',
                    container).length));
              }
            } else {
              page.score.addPenalty();
              console.warn('Penalty!!!!');
              $(this).addClass('ui-state-wrong');
              var $this = $(this);
              setTimeout(function() { $this.removeClass('ui-state-wrong'); }, 1000);
            }
          }
        });
        $('.propositions > li', container).shuffle();
        $('.propositions > li', container).shuffle();

        $('.propositions > li', container).draggable({
          containment: 'body', //$('.mix-and-match', container),
          revert: true,
          stack: $('.propositions > li', container)
        });
      });





      // var dataParent = $(this).attr('data-parent');
      // var speed = parseInt($(this).attr('data-speed')) || 500;
      // var nodeTarget = $($(this).attr('data-target'));

      // if (nodeTarget.hasClass('slidify-on')) {
      //   nodeTarget.slideUp(speed, hide);
      // } else {
      //   if (dataParent)
      //     $(dataParent).find('.slidify-on').slideUp(speed, hide);

      // console.warn('exiting bind collapser', node);
    };


    this.setupViewport = function(node, noframe) {
      if (ifr && ifr.parentNode)
        ifr.parentNode.removeChild(ifr);
      if (bb && bb.parentNode) {
        bb.parentNode.removeChild(bb);
      }
      if (!noframe) {
        if (!('appendChild' in node))
          node = node[0];
        ifr = document.createElement('iframe');
        bb = ifr;
        node.appendChild(ifr);
        ifr = ifr.contentDocument.body;
      }else {
        ifr = node;
        node.html(' ');
      }
    };

    this.addStyle = function(styleBlob) {
      styles.push(styleBlob);
    };


    this.setupTemplate = function(templateIri) {
      done++;
      loader(templateIri ||    'activity.tpl', note);
    };

    this.showActivity = function(activityIri, callback, published) {
      pubVersion = published;
      done++;
      completionCallback = callback;
      loader(activityIri, note);
      var c = window.onunload;
      window.onunload = function() {
        LxxlLib.sessionManager.end();
        if (c)
          c();
      };
    };

    // Allow to encode stuff
    var encode = function(obj) {
      return btoa(JSON.stringify(obj));
    };

    this.makeDataUri = function(obj) {
      return 'data:application/json;base64,' + encode(obj);
    };

  };





  /*  Ember.Handlebars.registerHelper('isEqual', function(key, options) {
    return key ==
    options.defaultValue = '---';
    var ret = I18n.translate(key, options);
    return (ret != '---') && ret || null;
  });*/


  /*
  var helpers = new (function() {
    var pad = function(subject, n, pattern) {
      subject = subject + '';
      while (subject.length < n) {
        subject = pattern + '' + subject;
      }
      return subject;
    };

// XXX use this instead of the other crap

// var date = new Date(null);
//       date.setSeconds(this.get('currentPage.limitedTime'));
//       var time = date.toUTCString().split('1970 ').pop().split('GMT').shift().split(':').map(function(i) {
//         return parseInt(i);
//       });


    this.chronometer = function(node, seconds, toutCbk) {
      var cur = seconds;
      $(node).html(pad(Math.floor(cur / 60), 2, '0') + ':' + pad(cur % 60, 2, '0'));
      var tout;

      var ticker = function() {
        if (cur < seconds / 2) {
          $(node).addClass('hurry');
        }

        if (!cur) {
          this.dead = true;
          $(node).addClass('finished');
          toutCbk();
          return;
        }
        cur--;
        $(node).html(pad(Math.floor(cur / 60), 2, '0') + ':' + pad(cur % 60, 2, '0'));
        tout = window.setTimeout(ticker, 1000);
      };

      this.start = function() {
        if (!this.dead)
          ticker();
      };

      this.dead = false;

      this.stop = function() {
        window.clearTimeout(tout);
      };
    };
  })();
  */









  /*
  var ActivityUserController = function(mesh) {
    this.activity = new LxxlLib.model.Activity(mesh);

    this.start = function(node) {
      console.warn('starting activity bound on node', node);
      behaviors(node);
      // var isThere = LxxlLib.scorm.execute(LxxlLib.scorm.INIT);
      // if (!isThere)
      //   console.error('No LMS found - won\'t use the api at all');
    };

    this.end = function() {
      LxxlLib.scorm.execute(LxxlLib.scorm.FINISH);
      console.warn('stopping activity');
    };


    var pageEnter = function(index) {
      console.warn('Entering page ', index);
      if (this.activity.pages[index].chrono)
        this.activity.pages[index].chrono.start();
    };

    var pageExit = function(index) {
      console.warn('Exiting page ', index);
      if (this.activity.pages[index].chrono && !this.activity.pages[index].chrono.dead)
        this.activity.pages[index].chrono.stop();
    };

    var behaviors = function(dom) {
      // Chronometers binding
      $('.clocker').each(function(i, item) {
        var s = parseInt($(item).attr('data-chrono'), 10);
        var id = parseInt($(item).attr('data-binding'), 10);
        if (s) {
          this.activity.pages[i].chrono = new helpers.chronometer(item, s, function() {
            console.warn('Timedout like a mangouste on ', id);
          });
        }else {
          $(item).hide();
        }
      });

    };
  };
  */
}).apply(this);

(function() {
  'use strict';

  // Activity may be passed as a json url, or embedded as a datauri?
  if (/(?:embed\.html)/.test(location.href)) {
    var requestDraft = location.href.match(/draft/i); // but service will not display draft to anonymous ...
    var id = location.href.match(/id=([a-z0-9]+)/i);
    if (id) {
      id = id.pop();
      var a = new LxxlLib.Masher();
      a.setupViewport($('#lxxlroot'), true);
      // a.addStyle('body{background-color: blue;}');
      a.setupTemplate('activity.tpl');
      // activity.published
      id = '//api.education-et-numerique.fr/1.0/activities/' + id + (requestDraft ? '/draft' : '/public');
      a.showActivity(id, function() {
        // console.warn('All set baby!');
      }, true);
    }

    var SERVICE_CONFIG = {
      key: {
        id: 'PROD',
        secret: 'a8f4981e5bb946993e4173d1e7af4cb866528c4e87f51f80'
      },
      server: {
        host: '{PUKE-SERVICE-HOST}',
        port: '{PUKE-SERVICE-PORT}',
        // host: 'snap.lxxl.com',8081
        // port: '90',
        version: '1.0'
      },
      anonymous: {
        id: 'anonymous',
        login: 'anonymous',
        password: '860b9dbbda6ee5f71ddf3b44e54c469e'
      }
    };

    jsBoot.service.core.initialize(SERVICE_CONFIG.key, SERVICE_CONFIG.server, SERVICE_CONFIG.anonymous);

  }

})();
