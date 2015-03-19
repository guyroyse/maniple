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

    function populate(data, idField, nameField) {
      clear();
      addOptions(arrayIt(data), defaultIt(idField, 'id'), defaultIt(nameField, 'name'));
    }

    function clear() {
      $selectBox.find('option').remove();
    }

    function addOptions(data, idField, nameField) {
      _(data).each(function(item) {
        addOption(item[idField], item[nameField]);
      });
    }

    function addOption(value, text) {
      $selectBox.append('<option value="' + value + '">' + text + '</option>');
    }

    function arrayIt(it) {
      return it instanceof Array ? it : [it];
    }

    function defaultIt(it, defaultValue) {
      return it === undefined ? defaultValue : it;
    }

    return {
      populate: populate
    };

  }
};

