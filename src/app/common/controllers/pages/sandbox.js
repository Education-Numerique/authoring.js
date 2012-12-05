/**
 * @file
 * @summary Sandbox controller
 *
 * @author {PUKE-RIGHTS-AUTHOR}
 * @version {PUKE-PACKAGE-VERSION}
 *
 * @license {PUKE-RIGHTS-LICENSE}.
 * @copyright {PUKE-RIGHTS-COPYRIGHT}
 * @name {PUKE-GIT-ROOT}/app/common/controllers/pages/sandbox.js{PUKE-GIT-REVISION}
 */

(function() {
  'use strict';

  // All that stupid gymnastic is meant to splice together damn dataTable and Handlebars together.
  // Technically, both do manipulate the DOM in incompatible ways, so, we have to override HB 
  // entirely and replace it with DT inner methods calls.
  var ctl = new (function(){

    var ach = this.activities = [];

    var colors = ['#abbd2b', '#79961e', '#af4227', '#8e2f1c', '#d23a95', '#b13d7b', '#6eb4ce', '#3b86ae'];

    var hashMatters = Ember.Object.create({});
    var innerMatters = [];

    this.matters = (function(){
      if(!innerMatters.length){
        LxxlLib.factories.metadata.matters.forEach(function(item, idx){
          var mt = Ember.Object.create({
            id: item.id,
            title: item.title,
            count: 0,
            style: 'background-color: ' + colors[(idx) % colors.length]
            /*, (idx * 2 + 1) % colors.length]*/
          });
          hashMatters.set(item.id, mt);
          innerMatters.pushObject(mt);
        });
      }
      innerMatters.forEach(function(i){
        i.set('count', 0);
      });
      console.warn('-----------> mattering');
      var a = this.get('activities');
      console.warn('-----------> mattering');
      a.forEach(function(j){
        console.warn('/', j.published.matter);
        hashMatters[j.published.matter.id].set('count', d[j.published.matter.id].get('count') + 1);
      });
      return innerMatters;
    }).property('LxxlLib.factories.metadata.matters', 'activities');


    var hashLevels = Ember.Object.create({});
    var innerLevels = [];

    this.levels = (function(){
      if(!innerLevels.length){
        LxxlLib.factories.metadata.levels.forEach(function(item, idx){
          var mt = Ember.Object.create({
            id: item.id,
            title: item.title,
            count: 0,
            style: 'background-color: ' + colors[(idx) % colors.length]
            /*, (idx * 2 + 1) % colors.length]*/
          });
          hashLevels.set(item.id, mt);
          innerLevels.pushObject(mt);
        });
      }
      innerLevels.forEach(function(i){
        i.set('count', 0);
      });
      var a = this.get('activities');
      a.forEach(function(j){
        hashLevels[j.published.level.id].set('count', d[j.published.level.id].get('count') + 1);
      });
      return innerLevels;
    }).property('LxxlLib.factories.metadata.levels', 'activities');


    var drawPie = function(){
      var piePie = new LxxlLib.widgets.ApplePie($('#piepie')[0]);
      piePie.halign = piePie.CENTER;
      piePie.reverse = false;
      piePie.fill = true;
      piePie.mode = piePie.FULL;
      piePie.addColor('#abbd2b', '#79961e');
      piePie.addColor('#af4227', '#8e2f1c');
      piePie.addColor('#d23a95', '#b13d7b');
      piePie.addColor('#6eb4ce', '#3b86ae');
      piePie.bind({array: innerMatters, valueKey: 'count', labelKey: 'title'});
    };

    this.pull = function(){
      LxxlLib.service.activities.listPublished((function(d){
        d.forEach(function(item){
          var act = LxxlLib.factories.activities.getActivity(item);
          if(act.isPublished){
            this.activities.pushObject(act);
          }
        }, this);
      }.bind(this)), function(){
        // Errrr
      });

      drawPie();
    };

    var doPreview = function(node, activity) {
      var a = new LxxlLib.Masher();
      a.setupViewport(node, true);
      // a.addStyle('body{background-color: blue;}');
      /*
    a.addStyle('http://static.loft.sn.ackitup.net:4242/lib/frameworks/normalize/normalize-2.0.css');
    */
      a.setupTemplate('{PUKE-PACKAGE-VERSION}/activity/activity.tpl');

      a.showActivity(activity.published, function() {
        console.warn('All set baby!');
      });
    };

    var will = function(arr, start, removeCount, addCount) {
      var nn = $('.sandbox.data-table').dataTable();
      for(var x = start + removeCount - 1; x >= start; x--)
        nn.fnDeleteRow(x);
    };

    // var clickHandler = function(e){
    //   var t = e.target;
    // };

    // XXX
    // $('.data-table button').bind('click', clickHandler)


    var popoverContent = '<div class="thumbnail">{thumbnail}</div>' + 
      '<h5>{nickname}</h5>' +
      '<div><span>{duration}</span>&nbsp;<span>{difficulty}</span></div>' +
      '<div class="avatar">{useravatar}</div>' +
      '<div>{description}</div>';

    var did = function(arr, start, removeCount, addCount) {
      var nn = $('.sandbox.data-table').dataTable();
      for(var x = start, item; x < start + addCount; x++){
        item = arr[x];
        nn.fnAddData([
          '',
          '',
          item.published.title,
          moment(item.publicationDate).fromNow(),
          item.seenCount,
          /*item.published.duration.title,
          item.published.difficulty.title,
          item.author.username,*/
          item.id
        ]);
        var s = $('.sandbox.data-table tbody tr:last-of-type td:first-child+td');
        s.attr('data-title', item.published.title)
        var ct = popoverContent.replace('{nickname}', item.author.username);
        ct = ct.replace('{thumbnail}', item.published.thumbnailUrl ?
              '<img src="' + item.published.thumbnailUrl + '" />' :
              '');
        ct = ct.replace('{duration}', item.published.duration.title);
        var needle = '<span class="icon-warning-sign" />';
        var df = '';
        switch(item.published.difficulty.id){
          case 'hard':
            df += needle;
          case 'normal':
            df += needle;
          default:
          case 'easy':
            df += needle;
          break;
        }
        ct = ct.replace('{difficulty}', df);
        ct = ct.replace('{useravatar}', item.author.avatarUrl ?
            '<img src="' + item.author.avatarUrl + '" />' :
            '');
        ct = ct.replace('{description}', item.published.description);
        s.attr('data-html', ct);
        s.attr('data-placement', 'right');
        s.attr('rel', 'popover');
      }

      $('.sandbox.data-table tr>td:first-child').each(function(ind, item){
        item = $(item);
        if(!item.html()){
          item.html('<button class="icon-edit"></button>');
          item.bind('click', function(e){
            var id = e.target.parentNode.parentNode.lastChild.innerText;
            LxxlApp.router.send('showActivityEdit', {id: id});
          });
        }
      });

      $('.sandbox.data-table tr>td:first-child+td').each(function(ind, item){
        item = $(item);
        if(!item.html()){
          item.html('<button class="icon-eye-open"></button>');
          item.bind('click', function(e){
            $('#modal-preview').modal({keyboard: false, backdrop: true});
            var id = e.target.parentNode.parentNode.lastChild.innerText;
            var a = ach.filter(function(item){
              return item.id == id;
            }).pop();
            doPreview($('#modal-preview-body'), a);
          });
        }
      });

/*
*/
      // $('.sandbox')html
    };

    this.activities.addArrayObserver(this, { willChange: will, didChange: did});

  })();

  window.CUL = this.SandboxController = Ember.ObjectController.extend(ctl);


        // {{#collection contentBinding="activities" tagName="tbody"}}
        //     <td class="user-reviewer"><button {{action showActivityEdit this href=true}} class="icon-edit"></button></td>
        //     <td><button {{action showPlayQTI this href=true}} class="icon-eye-open"></button></td>
        //     <td>{{view.content.title}}</td>
        //     <td>
        //       {{moment view.content.controller.publicationDate fromNow="false"}}
        //     </td>
        //     <td>{{view.content.controller.seenCount}}</td>
        //     <td>{{view.content.length.title}}</td>
        //     <td>{{view.content.difficulty.title}}</td>
        //     <td>{{view.content.controller.author.username}}</td>
        // {{/collection}}


    /*
    qti: (function() {
      var ret = [
        {id: 'abc', author: 'Roger Doe', title: 'Stuff', category: 'Anglais pas littéraire'},
        {id: 'cde', author: 'Jane Doe', title: 'Stuff 2', category: 'Maths'}
      ];
      for (var x = 0; x < 150; x++)
        ret.push({id: x, author: 'Roger', title: 'Stuff' + x, category: 'Maths > ' + Math.round(10 * Math.random())});
      return ret;
    })(),

    authors: function() {
      var o = {};
      var k = this.get('qti').forEach(function(item) {
        if (!(item.author in o))
          o[item.author] = 0;
        o[item.author]++;
      });
      return o;
    }.property('qti'),

    categories: function() {
      var o = {};
      var k = this.get('qti').forEach(function(item) {
        if (!(item.category in o))
          o[item.category] = 0;
        o[item.category]++;
      });
      return o;
    }.property('qti'),

    nbActivities: function() {
      return this.get('qti').length;
    }.property('qti'),

    nbCategories: function() {
      return Object.keys(this.get('categories')).length;
    }.property('categories'),

    nbAuthors: function() {
      return Object.keys(this.get('authors')).length;
    }.property('authors')
    */


}).apply(LxxlApp);
