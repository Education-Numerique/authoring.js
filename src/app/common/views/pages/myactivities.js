(function() {
  'use strict';
  var t = this.lxxlPageView('pages/myactivities');

  var activities = t.activities = [];
  var pactivities = t.publishedActivities = [];
  var dactivities = t.draftActivities = [];


  t.didInsertElement = function(){

    console.warn("*********************************************************************");
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
      var nn = $('.mydrafts.data-table').dataTable();
      var cc = '.mydrafts';
      if(arr == pactivities){
        nn = $('.mypublished.data-table').dataTable();
        cc = '.mypublished'
      }

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

/*
Titre
Durée
Difficulté
Matière
Niveau
Date de publication
*/
    var did = function(arr, start, removeCount, addCount) {
      var nn = $('.mydrafts.data-table').dataTable();
      var cc = '.mydrafts';
      if(arr == pactivities){
        nn = $('.mypublished.data-table').dataTable();
        cc = '.mypublished'
      }
      console.warn(nn);

      for(var x = start, item; x < start + addCount; x++){
        item = arr[x];
        nn.fnAddData([
          '',
          '',
          item.published.title,
          item.published.duration.title,
          item.published.difficulty.title,
          item.seenCount,
          item.publicationDate ? moment(item.publicationDate).fromNow() : '',
          item.author.username,
          item.id
        ]);
        var s = $(cc + '.data-table tbody tr:last-of-type td:first-child+td');
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

      $(cc + '.data-table tr>td:first-child').each(function(ind, item){
        item = $(item);
        if(!item.html()){
          item.html('<button class="icon-edit"></button>');
          item.bind('click', function(e){
            var id = e.target.parentNode.parentNode.lastChild.innerText;
            LxxlApp.router.send('showActivityEdit', {id: id});
          });
        }
      });

      $(cc + '.data-table tr>td:first-child+td').each(function(ind, item){
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
    };

    var rehash = function(){

    };

    this.activities.addArrayObserver(this, { willChange: function(){}, didChange: rehash});
    this.publishedActivities.addArrayObserver(this, { willChange: will, didChange: did});
    this.draftActivities.addArrayObserver(this, { willChange: will, didChange: did});

    // XXX listMine
    LxxlLib.service.activities.list(function(d){
      activities.replace(0, activities.length);
      d.forEach(function(item){
        var act = LxxlLib.factories.activities.getActivity(item);
        activities.pushObject(act);
        if(activities.isPublished)
          pactivities.pushObject(act);
        else
          dactivities.pushObject(act);
      });
    }, Em.K);

    LxxlLib.behaviors.bindBehaviors(this.get('element'));
    this.set('parentView.controller.pageTitle', I18n.translate('breadcrumb.myactivities.title'));

    this._super();
  };

  this.MyActivitiesView = Ember.View.extend(t);

}).apply(LxxlApp);


