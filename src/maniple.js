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

    function clear() {
      $selectBox.find('option').remove();
    }

    function populate(data, idField, nameField) {
      clear();
      addOptions(arrayIt(data), defaultIt(idField, 'id'), defaultIt(nameField, 'name'));
    }

    function value() {
      return defaultIt(values()[0], null);
    }

    function values() {
      return nothingSelected() ? [] : getSelectedValues();
    }

    function text() {
      return defaultIt(texts()[0], null);
    }

    function texts() {
      return nothingSelected() ? [] : getSelectedText();
    }

    function addOptions(data, idField, nameField) {
      _(data).each(function(item) {
        addOption(item[idField], item[nameField]);
      });
    }

    function addOption(value, text) {
      var option = $('<option />').val(value).text(text)
      $selectBox.append(option);
    }

    function nothingSelected() {
      return selectedOptions().length === 0;
    }

    function getSelectedText() {
      return getSelectedField('text');
    }

    function getSelectedValues() {
      return getSelectedField('val');
    }

    function getSelectedField(field) {
      return selectedOptions().map(function() {
        return $(this)[field]();
      });
    }

    function selectedOptions() {
      return $selectBox.find('option:selected');
    }

    function arrayIt(it) {
      if (it === undefined) return [];
      return it instanceof Array ? it : [it];
    }

    function defaultIt(it, defaultValue) {
      return it === undefined ? defaultValue : it;
    }

    return {
      clear: clear,
      populate: populate,
      value: value,
      values: values,
      text: text,
      texts: texts
    };

  }
};
