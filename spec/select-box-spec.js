describe("Maniple.SelectBox", function() {

  var subject;

  beforeEach(function() {
    setFixtures(
      '<select multiple="multiple" id="theId">' +
        '<option value="alpha">Alpha</option>' +
        '<option value="bravo">Bravo</option>' +
        '<option value="charlie">Charlie</option>' +
      '</select>'
    );

    subject = Maniple.SelectBox.create('#theId');
  });

  describe("clear", function() {

    beforeEach(function() {
      subject.clear();
    });

    it("removes all entries", function() {
      expect($('#theId')).not.toContainHtml('<option value="alpha">Alpha</option>')
      expect($('#theId')).not.toContainHtml('<option value="bravo">Bravo</option>')
      expect($('#theId')).not.toContainHtml('<option value="charlie">Charlie</option>')
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
        expect($('#theId')).not.toContainHtml('<option value="alpha">Alpha</option>')
        expect($('#theId')).not.toContainHtml('<option value="bravo">Bravo</option>')
        expect($('#theId')).not.toContainHtml('<option value="charlie">Charlie</option>')
      });

      it("populates the select", function() {
        expect($('#theId')).toContainHtml('<option value="foo">Foo</option>')
        expect($('#theId')).toContainHtml('<option value="bar">Bar</option>')
        expect($('#theId')).toContainHtml('<option value="baz">Baz</option>')
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
        expect($('#theId')).not.toContainHtml('<option value="alpha">Alpha</option>')
        expect($('#theId')).not.toContainHtml('<option value="bravo">Bravo</option>')
        expect($('#theId')).not.toContainHtml('<option value="charlie">Charlie</option>')
      });

      it("populates the select", function() {
        expect($('#theId')).toContainHtml('<option value="foo">Foo</option>')
        expect($('#theId')).toContainHtml('<option value="bar">Bar</option>')
        expect($('#theId')).toContainHtml('<option value="baz">Baz</option>')
      });

    });

    when("populating with data from a single object with default property names of 'id' and 'name'", function() {

      beforeEach(function() {
        subject.populate({ id: 'foo', name: 'Foo' });
      });

      it("removes previous entries", function() {
        expect($('#theId')).not.toContainHtml('<option value="alpha">Alpha</option>')
        expect($('#theId')).not.toContainHtml('<option value="bravo">Bravo</option>')
        expect($('#theId')).not.toContainHtml('<option value="charlie">Charlie</option>')
      });

      it("populates the select", function() {
        expect($('#theId')).toContainHtml('<option value="foo">Foo</option>')
      });

    });

    when("populating with data from a single object with custom property names", function() {

      beforeEach(function() {
        subject.populate({ i: 'foo', n: 'Foo' }, 'i', 'n');
      });

      it("removes previous entries", function() {
        expect($('#theId')).not.toContainHtml('<option value="alpha">Alpha</option>')
        expect($('#theId')).not.toContainHtml('<option value="bravo">Bravo</option>')
        expect($('#theId')).not.toContainHtml('<option value="charlie">Charlie</option>')
      });

      it("populates the select", function() {
        expect($('#theId')).toContainHtml('<option value="foo">Foo</option>')
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

  // add option permutations

  // by value OR text
    // deselect item
    // deselect items
    // deselect all items
    // select item
    // select items
    // select all items

});
