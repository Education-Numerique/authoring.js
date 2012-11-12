if(!('LxxlLib' in window))
  window.LxxlLib = {};

(function(){

  /**
   * Handlebouze
   */
  Handlebars.registerHelper('ifequalhelp', function(val1, val2, options) {
    var context = (options.fn.contexts && options.fn.contexts[0]) || this;
    // var val1 = Ember.Handlebars.getPath(context, val1, options.fn);
    // var val2 = Ember.Handlebars.getPath(context, val2, options.fn);
    if (val1 === val2) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });


  /**
   * Scorm stuff - untested
   */
  this.LxxlLib.scorm = new (function(){
    this.INIT = 'Initialize';
    this.FINISH = 'Finish';
    this.GET = 'GetValue';
    this.SET = 'SetValue';
    this.COMMIT = 'Commit';
    /*
    doLMSGetLastError
    doLMSGetErrorString
    doLMSGetDiagnostic
    */  

    this.PASSED = 'passed';
    this.COMPLETED = 'completed';
    this.FAILED = 'failed';
    this.INCOMPLETE = 'incomplete';
    this.BROWSED = 'browsed';
    this.NO_ATM = 'not attempted';

    this.TIME_OUT = 'time-out';
    this.SUSPEND = 'suspend';
    this.LOGOUT = 'logout';
    this.BLANK = '';

    var isFunctional = true;

    // Wrap shitny API
    this.execute = function(statement, data){
      console.warn(' [scorm/lms] - about to execute', statement, data);
      if(!isFunctional){
        console.error(' NO LMS available - just passing by');
        return;
      }
      var ret = window['doLMS' + statement].apply(this, data);
      console.warn(' [scorm/lms] - returned', ret);
      if(!ret && (statement == this.INIT)){
        console.error('LMS initialization fail - disabling scorm entirely');
        isFunctional = false;
      }
      return ret;
      // var err = doLMSGetLastError();
      // console.warn(' [scorm/lms] - last err', err, doLMSGetErrorString(err));
    };

    var startTime = (new Date()).getTime();
    this.start = function(){
      this.execute(this.INIT);
      this.execute(this.SET, ['cmi.core.lesson_status', this.BROWSED]);
      this.execute(this.SET, ['cmi.core.score.min', 0]);
      this.execute(this.SET, ['cmi.core.score.max', 100]);
      this.execute(this.COMMIT);
    };

    this.end = function(status){
      switch(status){
        case this.COMPLETED:
        case this.INCOMPLETE:
          this.score(max, score, min, status, tokens);
          this.execute(this.SET, ['cmi.core.session_time', crapTime((new Date()).getTime() - startTime)]);
        break;
      }
      this.execute(this.COMMIT);
      this.execute(this.FINISH);
    };

    this.score = function(max, score, min, status, tokens){
      this.execute(this.SET, ['cmi.core.score.max', max]);
      this.execute(this.SET, ['cmi.core.score.raw', score]);
      this.execute(this.SET, ['cmi.core.score.min', min]);
      tokens.forEach(function(token, idx){
        this.execute(this.SET, ['cmi.objectives.' + idx + '.id', 'objective_' + token.id]);
        this.execute(this.SET, ['cmi.objectives.' + idx + '.max', token.max]);
        this.execute(this.SET, ['cmi.objectives.' + idx + '.raw', token.score]);
        this.execute(this.SET, ['cmi.objectives.' + idx + '.min', token.min]);
        this.execute(this.SET, ['cmi.objectives.' + idx + '.status', status]);

        this.execute(this.SET, ['cmi.interactions.' + idx + '.id', 'interaction_' + token.id]);
        this.execute(this.SET, ['cmi.interactions.' + idx + '.weighting', token.weighting]);
        // Whatever the fuck
        this.execute(this.SET, ['cmi.interactions.' + idx + '.type', 'performance']);
        this.execute(this.SET, ['cmi.interactions.' + idx + '.student_response', token.response]);
      }, this);
      this.execute(this.COMMIT);
    };

    // Stolen from hotp - highly buggy, not compliant, and inefficient
    // XXX rewrite
    var crapTime = function(seconds){
      seconds = Math.round(seconds/1000);
      var S = seconds % 60;
      seconds -= S;
      if (S < 10){
        S = '0' + S;
      }
      var M = (seconds / 60) % 60;
      if (M < 10){M = '0' + M;}
      var H = Math.floor(seconds / 3600);
      if (H < 10){H = '0' + H;}
      return H + ':' + M + ':' + S;
    };

  })();




/*  Ember.Handlebars.registerHelper('isEqual', function(key, options) {
    return key == 
    options.defaultValue = '---';
    var ret = I18n.translate(key, options);
    return (ret != '---') && ret || null;
  });*/


  var helpers = new (function(){
    var pad = function(subject, n, pattern) {
      subject = subject + "";
      while(subject.length < n){
        subject = pattern + "" + subject;
      }
      return subject;
    };

/*
XXX use this instead of the other crap

var date = new Date(null);
      date.setSeconds(this.get('currentPage.limitedTime'));
      var time = date.toUTCString().split('1970 ').pop().split('GMT').shift().split(':').map(function(i) {
        return parseInt(i);
      });
 */

    this.chronometer = function(node, seconds, toutCbk){
      var cur = seconds;
      $(node).html(pad(Math.floor(cur / 60), 2, "0") + ':' + pad(cur % 60, 2, "0"));
      var tout;

      var ticker = function(){
        if(cur < seconds / 2){
          $(node).addClass('hurry');
        }

        if(!cur){
          this.dead = true;
          $(node).addClass('finished');
          toutCbk();
          return;
        }
        cur--;
        $(node).html(pad(Math.floor(cur / 60), 2, "0") + ':' + pad(cur % 60, 2, "0"));
        tout = window.setTimeout(ticker, 1000);
      };

      this.start = function(){
        if(!this.dead)
          ticker();
      };

      this.dead = false;

      this.stop = function(){
        window.clearTimeout(tout);
      };
    };
  })();


  // Explicit API
  this.LxxlLib.activity = function(){
    var pageEnter = function(index){
      console.warn("Entering page ", index);
      if(act.pages[index].chrono)
        act.pages[index].chrono.start();
    };

    var pageExit = function(index){
      console.warn("Exiting page ", index);
      if(act.pages[index].chrono && !act.pages[index].chrono.dead)
        act.pages[index].chrono.stop();
    };


    var behaviors = function(dom){
      // Chronometers binding
      $('.clocker').each(function(i, item){
        var s = parseInt($(item).attr('data-chrono'));
        var id = parseInt($(item).attr('data-binding'));
        if(s){
          act.pages[i].chrono = new helpers.chronometer(item, s, function(){
            console.warn("Timedout like a mangouste on ", id);
          });
        }else{
          $(item).hide();
        }
      });

      // Tat thingies
      $('[data-type="tat"]', dom).each(function(ind, item){
        console.log("Found some tat", item);
        item = $(item);
        var clue = item.attr('data-clue');
        var alt = item.attr('data-alt').split(',');
        var answer = item.html();
        item.html('trou à remplir');
        item.on('click', function(){
          console.warn("HAS CLICKYCLICK");
          $('#modal-preview-tat').modal({keyboard: false, backdrop: true});
          var stuff = '<h5>' + clue+ '</h5>' +
            '<input type="text"></input>'
          $('#modal-preview-tat-body').html(stuff);
        });
      });

      // Make page 0 active, if any
      var acti = $('.pages-list > li', dom);
      if(acti.length){
        $(acti[0]).addClass('active');
        pageEnter(0);
      }
      // Hide pages content
      $('.pages-content > li', dom).each(function(ind, item){
        $(item).hide();
      });

      acti = $('.pages-content > li', dom)
      if(acti.length)
        $(acti[0]).fadeIn(1000, function(){console.warn("done");});


      // Pages navigation
      $('.pages-list > li', dom).on('click', function(event){
        var idx;
        $('.pages-list > li', dom).each(function(ind, item){
          if(item == this){
            $(item).addClass('active');
            idx = ind;
            pageEnter(ind);
          }else{
            if($(item).hasClass('active')){
              pageExit(ind);
              $(item).removeClass('active');
            }
          }
        }.bind(this));

        $('.pages-content > li', dom).each(function(ind, item){
          if(ind != idx)
            $(item).hide();
          else
            $(item).fadeIn(1000, function(){console.warn("done");});
            // $(item).show();
        });
        event.preventDefault();
        return false;
      });

    };

    var parse = function(payload, flavor){
      switch(flavor){
        case 'application/json':
          return JSON.parse(payload);
        break;
        case 'text/html':
          // return (new DOMParser()).parseFromString(payload, 'text/xml');
          return Handlebars.compile(payload);
        break;
        default:
        break;
      }
      return payload;
    };

    var readDataUri = function(toLoad){
      var a = toLoad.path.split(',');
      var t = a.shift().split(';');
      if(t.pop() != 'base64')
        throw "Only base64 encoded data is supported";
      parse(atob(a.join(',')), t.pop());
    };

    var guessType = function(ext){
      switch(ext){
        case 'json':
          return 'application/json';
        break;
        case 'tpl':
          return 'text/html';
        break;
      }
      return null;
    };

    var loader = function(iri, callback){
      var toLoad;
      try{
        toLoad = Mingus.grammar.IRI.parse(iri);
      }catch(e){
        // Eg: receiving something that is not an IRI
        callback(iri);
        return;
      }
      switch(toLoad.scheme){
        case 'data':
          callback(readDataUri(toLoad));
        break;
        case 'http':
        case 'file':
        default:
          var r = new XMLHttpRequest();
          r.open('GET', iri);
          r.onreadystatechange = function(){
            if(r.readyState == 4){
              callback(parse(r.responseText, guessType(toLoad.path.split('.').pop())));
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


    var loadingComplete = function(){
      if(completionCallback)
        completionCallback();
    };

    var note = function(data){
      ((typeof data == 'function') && (tpl = data)) || (act = data);
      init++;
      if(init == done){
        act.styleData = [];
        act.styleUri = [];
        // Style mashuping
        styles.forEach(function(item){
          try{
            Mingus.grammar.IRI.parse(item);
            act.styleUri.push({data: item});
          }catch(e){
            act.styleData.push({data: item});
          }
        });
        // Fixing the activity
        act.pages.forEach(function(item, ind){
          item.id = ind;
        });
        var res = tpl(act);
        if('html' in ifr)
          ifr.html(res);
        else
          ifr.innerHTML = res;
        behaviors(ifr);
        // Check if there is a LMS
        var isThere = LxxlLib.scorm.execute(LxxlLib.scorm.INIT);
        if(!isThere)
          console.error("No LMS found - won't use the api at all");
        loadingComplete();
      }
    };




    var ifr;
    this.setupViewport = function(node, noframe){
      if(ifr)
        ifr.parentNode.removeChild(ifr);
      if(!noframe){
        ifr = document.createElement('iframe');
        node.appendChild(ifr);
        ifr = ifr.contentDocument.body;
      }else
        ifr = node;
    };

    this.addStyle = function(styleBlob){
      styles.push(styleBlob);
    };


    this.setupTemplate = function(templateIri){
      done++;
      loader(templateIri || 'activity.tpl', note);
    };

    this.showActivity = function(activityIri, callback){
      done++;
      completionCallback = callback;
      loader(activityIri, note);
    };

    // Allow to encode stuff
    var encode = function(obj){
      return btoa(JSON.stringify(obj));
    };

    this.makeDataUri = function(obj){
      return 'data:application/json;base64,' + encode(obj);
    };

    this.end = function(){
      LxxlLib.scorm.execute(LxxlLib.scorm.FINISH);
    };

  };

}).apply(this);

/*
// window.onload = function(){
//   console.warn("loade");
var a = new LxxlLib.activity();
a.setupViewport(document.body, true);
a.addStyle('body{background-color: blue;}');
a.addStyle('http://static.loft.sn.ackitup.net:4242/lib/frameworks/normalize/normalize-2.0.css');
a.setupTemplate('activity.tpl');
a.showActivity('test.json', function(){
  console.warn("All set baby!");
});
// };
*/

// a.makeDataUri({title: "thing", chist: "stuff"});
