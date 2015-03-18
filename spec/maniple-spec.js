describe("Maniple.TextBox", function() {

  var subject;

  beforeEach(function() {
    setFixtures('<input id="theId" />')
    subject = Maniple.TextBox.create('#theId');
  });

  it("returns the value of the text box", function() {
    $('#theId').val('foo');
    expect(subject.text()).toBe('foo');
  });

  it("changes the value of the text box", function() {
    subject.text('foo');
    expect($('#theId')).toHaveValue('foo');
  });

});

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

    it("populates the select with data from an array of objects with default property names of 'id' and 'name'", function() {
      expect($('#theId')).toContainHtml('<option value="foo">Foo</option>')
      expect($('#theId')).toContainHtml('<option value="bar">Bar</option>')
      expect($('#theId')).toContainHtml('<option value="baz">Baz</option>')
    });

    it("removes previous entries", function() {
      expect($('#theId')).not.toContainHtml('<option value="qux">Qux</option>')
    });

  });

});
