(function() {
  /*jshint maxstatements:30*/
  'use strict';

  var get = Em.get, set = Em.set;

  Em.BLANK_IMAGE_DATA_URL = 'data:image/gif;base64,R0lGODlhAQABAJAAAP///wAAACH5BAUQAAAALAAAAAABAAEAAAICBAEAOw==';


  /**
  @extends Em.View
  */
  Em.Image = Em.View.extend({
    tagName: 'img',

    /**
    Image source url

    @property {String}
  */
    src: Em.BLANK_IMAGE_DATA_URL,

    /**
    @property {Number}
  */
    height: null,

    /**
    @property {Number}
  */
    width: null,

    /**
    @property {String}
  */
    alt: null,

    /**
    @property {String}
  */
    defaultImage: Em.BLANK_IMAGE_DATA_URL,

    /**
    @property {String}
  */
    status: 'none',

    attributeBindings: ['src', 'alt', 'height', 'width'],

    /**
    Reset image src to default blank value
  */
    reset: function() {
      this.$().prop('src', get(this, 'defaultImage'));
      set(this, 'status', 'none');
    },

    didInsertElement: function() {
      this.willChangeSrc();
      this.$()
      .load(this.didLoad.bind(this))
      .error(this.didError.bind(this));
    },

    willChangeSrc: function() {
      if (this.get('src') == 'false' || !this.get('src'))
        this.set('src', Em.BLANK_IMAGE_DATA_URL);
      else
        this.set('src', String(this.get('src')));

      set(this, 'status', 'loading');

      this.$().css('visibility', 'hidden');
    }.observes('src'),

    didLoad: function() {
      set(this, 'status', 'loaded');
      
      var width = this.$().width();
      var height = this.$().height();

      var pWidth = this.$().parent().width();
      var pHeight = this.$().parent().height();
      var ratio, pRatio, ratioSwitch, diffRatio;

      this.$().css('margin-top', 0);
      this.$().css('margin-left', 0);

      if (!width || !height) {
        width = pWidth;
        height = pHeight;
      }

      if (width < pWidth && height < pHeight && get(this, 'src')) {
        this.$().css('margin-top', (pHeight - height) / 2);
        this.$().css('margin-left', (pWidth - width) / 2);

      } else {
        ratio = width / height;
        pRatio = pWidth / pHeight;

        ratioSwitch = false;

        if (Math.round(pRatio, 1) == Math.round(ratio, 1) && ratio > 1)
          ratioSwitch = true;
        else if (Math.round(pRatio, 1) != Math.round(ratio, 1) && ratio > 1)
          ratioSwitch = false;
        else if (Math.round(pRatio, 1) == Math.round(ratio, 1) && ratio < 1)
          ratioSwitch = false;
        else if (Math.round(pRatio, 1) != Math.round(ratio, 1) && ratio < 1)
          ratioSwitch = true;


        diffRatio = Math.abs(pRatio - ratio);

        if (ratioSwitch) {
          if (diffRatio < 0.1) {
            pHeight += diffRatio * pHeight;
          }
          this.$().css('height', pHeight);
          this.$().css('margin-left', -(pHeight * ratio - pWidth) / 2);
        } else {
          if (diffRatio < 0.1) {
            pWidth += pWidth * diffRatio;
          }
          this.$().css('width', pWidth);
          this.$().css('margin-top', -(pWidth / ratio - pHeight) / 2);
        }
      }
      this.$().css('visibility', 'visible');

    },
    didError: function() {
      this.$().css('visibility', 'visible');
      this.$().prop('src', get(this, 'defaultImage'));
      set(this, 'status', 'failed');
    },

    willDestroyElement: function() {
      this.$().unbind('load');
      this.$().unbind('error');
    }
  });
})();
