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

