(function(){
  this.unicorn = new (function(){
    // Toggle active state on one menu item
    this.makeMenuItemActive = function(node){
      var parentLi = node.parents('li');
      var allSubmenus = $('#sidebar li.submenu ul');

      var currentSubmenu = node.siblings('ul');
      var otherLis = $('#sidebar li');

      console.warn('Unicorn toggling:', node, parentLi);
      if(parentLi.hasClass('open') || parentLi.hasClass('active'))
        return;

      if(($(window).width() > 768) || ($(window).width() < 479)) {
        allSubmenus.slideUp();     
        currentSubmenu.slideDown();
      } else {
        allSubmenus.fadeOut(250);
        currentSubmenu.fadeIn(250);
      }
      otherLis.removeClass('open');   
      otherLis.removeClass('active');   
      if(parentLi.hasClass('submenu')){
        parentLi.addClass('open');
        node.siblings('ul > li:first-child').addClass('active');
      }
      parentLi.addClass('active');
    };

    this.bindBehaviors = function(node){
      console.warn('binding behaviors on ', node);
      $('.tip', node).tooltip();  
      $('.tip-left', node).tooltip({ placement: 'left' });  
      $('.tip-right', node).tooltip({ placement: 'right' });  
      $('.tip-top', node).tooltip({ placement: 'top' });  
      $('.tip-bottom', node).tooltip({ placement: 'bottom' });  
    };
  })();

  $(document).ready(function(){

  	// === Sidebar navigation === //

    // Sidebar mobile
    $(document).delegate('#sidebar > a', 'click', function(e)
    {
      e.preventDefault();
      var ul = $('#sidebar > ul');
      var sidebar = $('#sidebar');
      if(sidebar.hasClass('open'))
      {
        sidebar.removeClass('open');
        ul.slideUp(250);
      } else {
        sidebar.addClass('open');
        ul.slideDown(250);
      }
    });
  	
  	// === Search input typeahead === //
    // XXX rebind search 
  	// $('#search input[type=text]').typeahead({
  	// 	source: ['Dashboard','Form elements','Common Elements','Validation','Wizard','Buttons','Icons','Interface elements','Support','Calendar','Gallery','Reports','Charts','Graphs','Widgets'],
  	// 	items: 4
  	// });
  	
  });

}).apply(this);
