if(!('LxxlLib' in window))
  window.LxxlLib = {};

(function(){
  // Explicit API
  this.LxxlLib.activity = function(){

    var parse = function(payload, flavor){
      switch(flavor){
        case 'application/json':
          return JSON.parse(payload);
        break;
        case 'text/html':
          // return (new DOMParser()).parseFromString(payload, 'text/xml');
          console.warn("OK");
          var toto = Handlebars.compile(payload);
          console.warn("Has compiled", toto);
          return toto;
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
        var res = tpl(act);
        if('html' in ifr)
          ifr.html(res);
        else
          ifr.innerHTML = res;
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
