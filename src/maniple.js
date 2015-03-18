var Maniple = Maniple || {};

Maniple.TextBox = {
  create: function(selector) {

    var $textBox = $(selector);

    function text(s) {
      if (s !== undefined) $textBox.val(s);
      return $textBox.val();
    }

    return {
      text: text
    };

  }
};
