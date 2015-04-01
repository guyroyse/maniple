describe("Maniple.SelectBox", function() {

  var subject;

  beforeEach(function() {

    var knownOptions = {
      alpha: optionString('alpha', 'Alpha'),
      bravo: optionString('bravo', 'Bravo'),
      charlie: optionString('charlie', 'Charlie'),
      foo: optionString('foo', 'Foo'),
      bar: optionString('bar', 'Bar'),
      baz: optionString('baz', 'Baz')
    };

    function optionString(key, value) {
      return '<option value="' + key +'">' + value + '</option>'
    }

    jasmine.addMatchers({
      toContainOptions : function(util, customEqualityTesters) {
        return {
          compare : function(actual) {

            var options = Array.prototype.slice.call(arguments, 1);

            var result = {};

            result.pass = _(options).every(function(option) {
              return util.contains(actual.html(), knownOptions[option], customEqualityTesters);
            });

            return result;

          }
        }
      }
    });

    setFixtures(
      '<select multiple="multiple" id="theId">' +
        knownOptions.alpha +
        knownOptions.bravo +
        knownOptions.charlie +
      '</select>'
    );

    subject = Maniple.SelectBox.create('#theId');
  });

  describe("clear", function() {

    beforeEach(function() {
      subject.clear();
    });

    it("removes all entries", function() {
      expect($('#theId')).not.toContainOptions('alpha', 'bravo', 'charlie');
    });

  });

  describe("addOption", function() {

    beforeEach(function() {
      subject.addOption('foo', 'Foo');
    });

    it("does not remove previous entries", function() {
      expect($('#theId')).toContainOptions('alpha', 'bravo', 'charlie');
    });

    it("add the item the select", function() {
      expect($('#theId')).toContainOptions('foo');
    });

  });

  describe("addOptions", function() {

    when("adding options with data from an array of objects with default property names of 'id' and 'name'", function() {

      beforeEach(function() {
        subject.addOptions([
          { id: 'foo', name: 'Foo' },
          { id: 'bar', name: 'Bar' },
          { id: 'baz', name: 'Baz' }
        ]);
      });

      it("does not remove previous entries", function() {
        expect($('#theId')).toContainOptions('alpha', 'bravo', 'charlie');
      });

      it("adds the items to the select", function() {
        expect($('#theId')).toContainOptions('foo', 'bar', 'baz');
      });

    });

    when("adding options with data from and array of objects with custom property names", function() {

      beforeEach(function() {
        subject.addOptions([
          { i: 'foo', n: 'Foo' },
          { i: 'bar', n: 'Bar' },
          { i: 'baz', n: 'Baz' }
        ], 'i', 'n');
      });

      it("does not remove previous entries", function() {
        expect($('#theId')).toContainOptions('alpha', 'bravo', 'charlie');
      });

      it("add the items the select", function() {
        expect($('#theId')).toContainOptions('foo', 'bar', 'baz');
      });

    });

    when("adding options with data from a single object with default property names of 'id' and 'name'", function() {

      beforeEach(function() {
        subject.addOptions({ id: 'foo', name: 'Foo' });
      });

      it("does not remove previous entries", function() {
        expect($('#theId')).toContainOptions('alpha', 'bravo', 'charlie');
      });

      it("add the item the select", function() {
        expect($('#theId')).toContainOptions('foo');
      });

    });

    when("adding options with data from a single object with custom property names", function() {

      beforeEach(function() {
        subject.addOptions({ i: 'foo', n: 'Foo' }, 'i', 'n');
      });

      it("does not remove previous entries", function() {
        expect($('#theId')).toContainOptions('alpha', 'bravo', 'charlie');
      });

      it("add the item the select", function() {
        expect($('#theId')).toContainOptions('foo');
      });

    });

  });

  describe("populate", function() {

    when("populating with data from an array of objects with default property names of 'id' and 'name'", function() {

      beforeEach(function() {
        subject.populate([
          { id: 'foo', name: 'Foo' },
          { id: 'bar', name: 'Bar' },
          { id: 'baz', name: 'Baz' }
        ]);
      });

      it("removes previous entries", function() {
        expect($('#theId')).not.toContainOptions('alpha', 'bravo', 'charlie');
      });

      it("populates the select", function() {
        expect($('#theId')).toContainOptions('foo', 'bar', 'baz');
      });

    });

    when("populating with data from and array of objects with custom property names", function() {

      beforeEach(function() {
        subject.populate([
          { i: 'foo', n: 'Foo' },
          { i: 'bar', n: 'Bar' },
          { i: 'baz', n: 'Baz' }
        ], 'i', 'n');
      });

      it("removes previous entries", function() {
        expect($('#theId')).not.toContainOptions('alpha', 'bravo', 'charlie');
      });

      it("populates the select", function() {
        expect($('#theId')).toContainOptions('foo', 'bar', 'baz');
      });

    });

    when("populating with data from a single object with default property names of 'id' and 'name'", function() {

      beforeEach(function() {
        subject.populate({ id: 'foo', name: 'Foo' });
      });

      it("removes previous entries", function() {
        expect($('#theId')).not.toContainOptions('alpha', 'bravo', 'charlie');
      });

      it("populates the select", function() {
        expect($('#theId')).toContainOptions('foo');
      });

    });

    when("populating with data from a single object with custom property names", function() {

      beforeEach(function() {
        subject.populate({ i: 'foo', n: 'Foo' }, 'i', 'n');
      });

      it("removes previous entries", function() {
        expect($('#theId')).not.toContainOptions('alpha', 'bravo', 'charlie');
      });

      it("populates the select", function() {
        expect($('#theId')).toContainOptions('foo');
      });

    });

  });

  describe("querying the select box", function() {

    when("no items are selected", function() {

      it("returns null from value", function() {
        expect(subject.value()).toBeNull();
      });

      it("returns an empty array from values", function() {
        expect(subject.values()).toBeEmptyArray();
      });

      it("returns null from text", function() {
        expect(subject.text()).toBeNull();
      });

      it("returns an empty array from texts", function() {
        expect(subject.texts()).toBeEmptyArray();
      });

    });

    when("a single item is selected", function() {

      beforeEach(function() {
        $('#theId').val('bravo');
      });

      it("returns the selected item from value", function() {
        expect(subject.value()).toBe('bravo');
      });

      it("returns the selected item in an array from values", function() {
        expect(subject.values()).toEqual(['bravo']);
      });

      it("returns the selected item from text", function() {
        expect(subject.text()).toBe('Bravo');
      });

      it("returns the selected item in an array from texts", function() {
        expect(subject.texts()).toEqual(['Bravo']);
      });

    });

    when("multiple items are selected", function() {

      beforeEach(function() {
        $('#theId').val(['alpha', 'charlie']);
      });

      it("returns the first item from value", function() {
        expect(subject.value()).toBe('alpha');
      });

      it("returns the selected items in an array from values", function() {
        expect(subject.values()).toEqual(['alpha', 'charlie']);
      });

      it("returns the first item from text", function() {
        expect(subject.text()).toBe('Alpha');
      });

      it("returns the selected items in an array from texts", function() {
        expect(subject.texts()).toEqual(['Alpha', 'Charlie']);
      });

    });

  });

  // by value OR text
    // deselect item
    // deselect items
    // deselect all items
    // select item
    // select items
    // select all items

});
