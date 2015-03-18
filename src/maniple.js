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

Maniple.SelectBox = {
  create: function(selector) {

    var $selectBox = $(selector);

    function populate(data) {
      $selectBox.find('option').remove();
      _.each(data, function(item) {
        $selectBox.append('<option value="' + item.id + '">' + item.name + '</option>');
      });
    }

    return {
      populate: populate
    };

  }
};
