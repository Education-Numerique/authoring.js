(function() {
  'use strict';
  var t = this.lxxlPageView('pages/myactivities');

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


  var popoverContent = '<div class="thumbnail">{thumbnail}</div>' +
        '<h5>{nickname}</h5>' +
        '<div><span>{duration}</span>&nbsp;<span>{difficulty}</span></div>' +
        '<div class="avatar">{useravatar}</div>' +
        '<div>{description}</div>';



  var TABLE_OPTIONS = {
    "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
      var id = aData[aData.length - 1];

      if ($(nRow).attr('data-rid'))
        return;


      $(nRow).attr('data-rid', id);
      var preview = $(nRow).find('td:eq(1)');
      var item = hookBack(id);

      var infos = item.isPublished ? item.published : item.draft;

      preview.attr('data-title', infos.title);
      preview.html('<button class="icon-eye-open"></button>');
      var ct = popoverContent.replace('{nickname}', item.author.username);
      ct = ct.replace('{thumbnail}', infos.thumbnailUrl ?
          '<img src="' + infos.thumbnailUrl + '" />' :
          '');
      ct = ct.replace('{duration}', infos.duration.title);
      var needle = '<span class="icon-warning-sign" />';
      var df = '';
      switch (infos.difficulty.id) {
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
      ct = ct.replace('{description}', infos.description);
      preview.attr('data-html', ct);
      preview.attr('data-placement', 'right');
      preview.attr('rel', 'popover');

      preview.bind('click', function(e) {
        $('#modal-preview').modal({keyboard: false, backdrop: true});
        doPreview($('#modal-preview-body'), item);
      });

      var button = $(nRow).find('td:eq(0)');
      button.html('<button class="icon-edit"></button>');

      button.bind('click', function (e) {
        LxxlApp.router.send('showActivityEdit', item);
      });
      // console.log(preview.html('bite'));
    }
  };
  
  
  var activities = t.activities = [];
  var pactivities = t.publishedActivities = [];
  var dactivities = t.draftActivities = [];


  var hookBack = function(id){
    return activities.filter(function(item){
      return item.id == id;
    }).pop();
  };


  t.didInsertElement = function() {

    var will = function(arr, start, removeCount, addCount) {
      var nn = $('.mydrafts.data-table').dataTable();
      if (arr == pactivities) {
        nn = $('.mypublished.data-table').dataTable();
      }

      for (var x = start + removeCount - 1; x >= start; x--)
        nn.fnDeleteRow(x);
    };

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
      if (arr == pactivities) {
        nn = $('.mypublished.data-table').dataTable();
        cc = '.mypublished';
      }
      // console.warn(nn);

      for (var x = start, item, infos; x < start + addCount; x++) {
        item = arr[x];
        window.CUL = item;
        if (cc == '.mydrafts')
          infos = item.draft;
        else
          infos = item.published;



        if (!infos.duration)
          infos.duration = {title: '', id: 0};

        if (!item.published.difficulty)
          infos.difficulty = {title: '', id: 0};
        
        nn.fnAddData([
          '',
          '',
          infos.title,
          infos.duration.title,
          infos.difficulty.title,
          '', //Matière
          '', //Niveau
          item.publicationDate ? moment(item.publicationDate).fromNow() : '',
          item.seenCount,
          item.author.username,
          item.id
        ]);

        
      }
    };

    var rehash = function() {

    };

    this.activities.addArrayObserver(this, { willChange: function() {}, didChange: rehash});
    this.publishedActivities.addArrayObserver(this, { willChange: will, didChange: did});
    this.draftActivities.addArrayObserver(this, { willChange: will, didChange: did});

    // XXX listMine
    LxxlLib.service.activities.list(function(d) {
      activities.replace(0, activities.length);
      d.forEach(function(item) {
        var act = LxxlLib.factories.activities.getActivity(item);
        activities.pushObject(act);
        if (activities.isPublished)
          pactivities.pushObject(act);
        else
          dactivities.pushObject(act);
      });
    }, Em.K);

    LxxlLib.behaviors.bindBehaviors(this.get('element'), TABLE_OPTIONS);
    this.set('parentView.controller.pageTitle', I18n.translate('breadcrumb.myactivities.title'));

    this._super();
  };

  this.MyActivitiesView = Ember.View.extend(t);

}).apply(LxxlApp);


