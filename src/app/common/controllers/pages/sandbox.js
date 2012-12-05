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
    this.pull = function(){
      LxxlLib.service.activities.listPublished((function(d){
        d.forEach(function(item){
          var act = LxxlLib.factories.activities.getActivity(item);
          if(act.isPublished){
            this.activities.pushObject(act);
          }
        }, this);
  // isPublished: true
      }.bind(this)), function(){
        // Errrr
      });
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

    var did = function(arr, start, removeCount, addCount) {
      var nn = $('.sandbox.data-table').dataTable();
      for(var x = start, item; x < start + addCount; x++){
        item = arr[x];
        nn.fnAddData([
          '',
          '',
          // $()<button {{action showEditActivity this href=true}} class="icon-edit"></button>,
          item.published.title,
          moment(item.publicationDate).fromNow(),
          item.seenCount,
          item.published.duration.title,
          item.published.difficulty.title,
          item.author.username,
          item.id
        ]);
        $('.sandbox.data-table tbody tr:last-of-type td').attr('data-title', 'titre');
        $('.sandbox.data-table tbody tr:last-of-type td').attr('data-html', '<h4>toto</h4>');
        $('.sandbox.data-table tbody tr:last-of-type td').attr('data-placement', 'right');
        $('.sandbox.data-table tbody tr:last-of-type td').attr('rel', 'popover');
          /*,
          selector: '#popover'*/
      }

// $('tbody tr:last-of-type td').popover({content: 'cul', title: 'tit', trigger: 'hover'});
// $('#example').popover({content: 'toit', title: 'tite'});

      $('.sandbox.data-table tr>td:first-child').each(function(ind, item){
        item = $(item);
        if(!item.html()){
          item.html('<button class="icon-edit"></button>');
          item.bind('click', function(e){
            // item.id);
            var id = e.target.parentNode.parentNode.lastChild.innerText;
            LxxlApp.router.send('showEditActivity', {id: id});
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
            // LxxlApp.router.send('showEditActivity', {id: item.id});
            // console.warn("play", e);
          });
        }
      });

      $('.sandbox.data-table tr').bind('hover', function(e){
      });
/*
*/
      // $('.sandbox')html
    };

    this.activities.addArrayObserver(this, { willChange: will, didChange: did});

  })();

  window.CUL = this.SandboxController = Ember.ObjectController.extend(ctl);


        // {{#collection contentBinding="activities" tagName="tbody"}}
        //     <td class="user-reviewer"><button {{action showEditActivity this href=true}} class="icon-edit"></button></td>
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
