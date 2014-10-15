define([
  "jquery",
  "underscore",
  "backbone",
], function($, _, Backbone) {
  var lskey = 'metacpan-explorer-dragbar',
      cancel_event = function () { return false; };

  return Backbone.View.extend({
    events: {
      // The move/up events are handled in the start/stop methods.
      'mousedown': 'start'
    },

    initialize: function (options) {
      this.dragging = false;
      this.$body = $('body');
      this.$container = options.container;
      this.$left  = options.left;
      this.$right = options.right;
      this.fetch();
      this._bound_move = _.bind(this.move, this);
      this._bound_stop = _.bind(this.stop, this);
    },

    fetch: function () {
      try {
        this.position = localStorage[lskey] || 50;
      }
      catch (e) {
        this.position = 50;
      }
    },

    render: function () {
      this.setPosition(this.position);
      return this;
    },

    start: function (e) {
      // Only with left-button.
      if(e.which !== 1){ return; }

      this.dragging = true;

      // Cache this here as it seems unlikely to change while dragging.
      // Subtract one to help center the bar under the cursor.
      this.offsetLeft = this.$container.offset().left - 1;
      this.totalWidth = this.$container.width();

      this.$body
        // Don't let the browser think we're trying to select text.
        .addClass('dragging')
        .on('selectstart.dragbar', cancel_event)
        // Listen to mouse move/up on whole body so that dragging ends
        // even if the mouse moves off the bar.
        // Only listen to body mouse events when dragging.
        .on('mousemove.dragbar', this._bound_move)
        .on('mouseup.dragbar',   this._bound_stop);
    },

    move: function (e) {
      if(!this.dragging){ return; }

      // Convert position to percentage of width
      // so it can easily be used as width for surrounding elements.
      var pos = ((e.pageX - this.offsetLeft) / this.totalWidth) * 100;

      // Don't let either box get too small.
      if( pos >= 10 && pos <= 90 ){
        this.setPosition(pos);
      }
    },

    stop: function () {
      if(!this.dragging){ return; }

      this.dragging = false;

      this.$body
        .off('.dragbar')
        .removeClass('dragging');

      this.save();
    },

    save: function () {
      localStorage[lskey] = this.position;
    },

    setPosition: function (pos) {
      this.position = pos;
      this.$el.css('left',    pos + '%');
      this.$left.css('width', pos + '%');
      this.$right.css('width', (100 - pos) + '%');
    }
  });
});
