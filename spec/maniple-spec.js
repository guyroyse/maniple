describe("Maniple.TextBox", function() {

  var subject;

  beforeEach(function() {
    setFixtures('<input id="textBox" />')
    subject = Maniple.TextBox.create('#textBox');
  });

  it("returns the value of the text box", function() {
    $('#textBox').val('foo');
    expect(subject.text()).toBe('foo');
  });

  it("changes the value of the text box", function() {
    subject.text('foo');
    expect($('#textBox').val()).toBe('foo');
  });

});
