(function(){
  // Bootstrap popover is a piece of shite - use our own in place, recycling just their style
  var popover = $('<div class="popover">' +
      '<div class="arrow"></div>' +
      '<div class="popover-inner">' + 
      '<h3 class="popover-title"></h3>' +
      '<div class="popover-content"><p></p></div>' +
      '</div>' +
      '</div>');

  $(function(){
    $('body').append(popover);
    popover.hide();
  });

  $(document).on('mouseenter.popover', '[rel=popover]', function(e){
    var n = $(this);
    var pos = n.data('placement') || 'top';
    var title = n.data('title');
    var html = n.data('html');
    var text = n.data('content');

    $('.popover-title', popover).html(title);
    if(text)
      $('.popover-content p', popover).text(text);
    else
      $('.popover-content p', popover).html(html);

    var off = n.offset();
    var w = n.width();
    var h = n.width();

    popover.removeClass('top');
    popover.removeClass('bottom');
    popover.removeClass('left');
    popover.removeClass('right');
    popover.addClass(pos);

    if(pos == 'top' || pos == 'bottom')
      popover.css('left', (n.offset().left + n.width() / 2 - popover.width() / 2) + 'px');
    else
      popover.css('top', (n.offset().top + n.height() / 2 - popover.height() / 2) + 'px');

    switch(pos){
      case 'right':
        popover.css('left', (n.offset().left + n.width() + 20) + 'px');
      break;
      case 'left':
        popover.css('left', (n.offset().left - popover.width() - 20) + 'px');
      break;
      case 'bottom':
        popover.css('top', (n.offset().top + n.height() + 20) + 'px');
      break;
      case 'top':
      default:
        popover.css('top', (n.offset().top - popover.height() - 20) + 'px');
      break;
    }
    popover.show();
  });

  $(document).on('mouseleave.popover', '[rel=popover]', function(e){
    popover.hide();
  });
})();
