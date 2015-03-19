describe("Maniple.SelectBox", function() {

  var subject;

  beforeEach(function() {
    setFixtures(
      '<select id="theId">' +
        '<option value="qux">Qux</option>' +
      '</select>'
    );

    subject = Maniple.SelectBox.create('#theId');
  });

  when("populating with data from an array of objects with default property names of 'id' and 'name'", function() {

    beforeEach(function() {
      subject.populate([
        { id: 'foo', name: 'Foo' },
        { id: 'bar', name: 'Bar' },
        { id: 'baz', name: 'Baz' }
      ]);
    });

    it("removes previous entries", function() {
      expect($('#theId')).not.toContainHtml('<option value="qux">Qux</option>')
    });

    it("populates the select with data from an array of objects with default property names", function() {
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
      expect($('#theId')).not.toContainHtml('<option value="qux">Qux</option>')
    });

    it("populates the select with data from an array of objects with custom property names", function() {
      expect($('#theId')).toContainHtml('<option value="foo">Foo</option>')
      expect($('#theId')).toContainHtml('<option value="bar">Bar</option>')
      expect($('#theId')).toContainHtml('<option value="baz">Baz</option>')
    });

  });
});

