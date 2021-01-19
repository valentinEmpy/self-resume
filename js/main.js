var Layout = (function () {
  // handle group element heights
  var handleHeight = function () {
    $("[data-auto-height]").each(function () {
      var parent = $(this);
      var items = $("[data-height]", parent);
      var height = 0;
      var mode = parent.attr("data-mode");
      var offset = parseInt(parent.attr("data-offset") ? parent.attr("data-offset") : 0);

      items.each(function () {
        if ($(this).attr("data-height") == "height") {
          $(this).css("height", "");
        } else {
          $(this).css("min-height", "");
        }

        var height_ = mode == "base-height" ? $(this).outerHeight() : $(this).outerHeight(true);
        if (height_ > height) {
          height = height_;
        }
      });

      height = height + offset;

      items.each(function () {
        if ($(this).attr("data-height") == "height") {
          $(this).css("height", height);
        } else {
          $(this).css("min-height", height);
        }
      });

      if (parent.attr("data-related")) {
        $(parent.attr("data-related")).css("height", parent.height());
      }
    });
  };

  return {
    init: function () {
      handleHeight(); // initial setup for group element height
    },

    // To get the correct viewport width based on  http://andylangton.co.uk/articles/javascript/get-viewport-size-javascript/
    getViewPort: function () {
      var e = window,
        a = "inner";
      if (!("innerWidth" in window)) {
        a = "client";
        e = document.documentElement || document.body;
      }

      return {
        width: e[a + "Width"],
        height: e[a + "Height"],
      };
    },
  };
})();

$(document).ready(function () {
  Layout.init();
});
