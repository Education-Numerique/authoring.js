(function() {
  'use strict';
  var t = this.lxxlPageView('admin/users');

  var users,
      admins,
      authors;


  var TABLE_OPTIONS = {
    "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
      var id = aData[aData.length - 1];
      if ($(nRow).attr('data-uid'))
        return;


      $(nRow).attr('data-uid', id);
      var item = hookBack(id);

      var button = $(nRow).find('td:eq(0)');
      button.html('<button class="icon-edit"></button>');

      if (item.get('level') != "3") {
        var admin = $(nRow).find('td:eq(1)');
        admin.html('<button class="icon-arrow-up" rel="tooltip" data-placement="right" title="Changer les droits de cet utilisateur en administrateur"></button>');


        admin.bind('click', function(e) {
          LxxlLib.service.user.acl.push(Em.K, Em.K, item.uid, 3);
          item.set('level', 3);

          authors.removeObject(item);
          admins.pushObject(item);
        });
      } else {
        var admin = $(nRow).find('td:eq(1)');
        admin.html('<button class="icon-arrow-down" rel="tooltip" data-placement="right" title="Changer les droits de cet utilisateur en auteur"></button>');


        admin.bind('click', function(e) {
          LxxlLib.service.user.acl.push(Em.K, Em.K, item.uid, 1);
          item.set('level', 1);
          authors.pushObject(item);
          admins.removeObject(item);
        });
      }

      button.bind('click', function (e) {
        LxxlApp.router.send('showAdminUser', item);
      });
    }
  };

  var hookBack = function(id){
    return users.filter(function(item){
      return item.uid == id;
    }).pop();
  };

  var will = function(arr, start, removeCount, addCount) {

    var nn = $('.authors.data-table').dataTable();
    if (arr == admins) {
      nn = $('.admins.data-table').dataTable();
    }
    for (var x = start + removeCount - 1; x >= start; x--)
      nn.fnDeleteRow(x);
  };


  var did = function(arr, start, removeCount, addCount) {
    var nn = $('.authors.data-table').dataTable();
    if (arr == admins) {
      nn = $('.admins.data-table').dataTable();
    }

    for (var x = start, item; x < start + addCount; x++) {
      item = arr[x];

      nn.fnAddData([
        '',
        '',
        item.username,
        item.email,
        item.uid
      ]);

      
    }
  };


  t.willDestroyElement = function  () {
    this.get('authors').removeArrayObserver(this, { willChange: will, didChange: did});
    this.get('admins').removeArrayObserver(this, { willChange: will, didChange: did});
  };


  t.didInsertElement = function () {
    LxxlLib.behaviors.bindBehaviors(this.get('element'), TABLE_OPTIONS);
    users = this.users = [];
    admins = this.admins = [];
    authors = this.authors = [];

    this.get('authors').addArrayObserver(this, { willChange: will, didChange: did});
    this.get('admins').addArrayObserver(this, { willChange: will, didChange: did});


    LxxlLib.service.user.list(function (d) {
      users.replace(0, users.length);
      d.forEach(function(item) {
        var user = new LxxlLib.model.User(item);
        console.warn(user.profile.discipline);
        users.pushObject(user);
        if (user.level == "3")
          admins.pushObject(user);
        else
          authors.pushObject(user);
      });
    }, Em.K);

    this.set('parentView.controller.pageTitle', I18n.translate('breadcrumb.admin.users.title'));
  };

  this.UsersView = Ember.View.extend(t);
}).apply(LxxlApp);
