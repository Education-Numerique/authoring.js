LxxlApp.ApplicationController = Ember.ObjectController.extend({
  init: function(){
    // Get a ref to the user account
    console.warn(this.content);
    this._super();
  },
  // Selected element in the left navigation
  selected: null
});

// LxxlApp.ApplicationController.addObserver('selected', function(){
//   console.warn("slectyed changed!!!", this.get('selected'));
// });

(function(root){
/*
  var mainUser = new (function(){
    // Bla
    this.login;
    this.name;

  })();
*/

  var uControl = new (function(){
    this.AUTHOR = 1;
    this.REVIEWER = 2;
    this.ADMIN = 3;

    var loginSuccess = function(level){
      switch(level){
        default:
        case this.AUTHOR:
          $('#lxxlroot').addClass('user-author');
        break;
        case this.REVIEWER:
          $('#lxxlroot').addClass('user-reviewer');
        break;
        case this.ADMIN:
          $('#lxxlroot').addClass('user-admin');
        break;
      }

    }.bind(this);

    var loginFailure = function(){
      // XXX Show the failure banner on the login view
    };

    this.login = function(login, password){
      loginSuccess();
    };

    this.logout = function(){
      $('#lxxlroot').removeClass('user-author');
      $('#lxxlroot').removeClass('user-reviewer');
      $('#lxxlroot').removeClass('user-admin');
    };

  })();

  root.UserController = Ember.ObjectController.extend(uControl);

}).call(this, LxxlApp);

